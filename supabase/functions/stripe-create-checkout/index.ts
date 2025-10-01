import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface CheckoutRequest {
  planType: "pro" | "team";
  billingPeriod: "monthly" | "annual";
  successUrl: string;
  cancelUrl: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: { Authorization: req.headers.get("Authorization")! },
      },
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error("Unauthorized");
    }

    const { planType, billingPeriod, successUrl, cancelUrl }: CheckoutRequest = await req.json();

    if (!planType || !billingPeriod || !successUrl || !cancelUrl) {
      throw new Error("Missing required fields");
    }

    if (!["pro", "team"].includes(planType)) {
      throw new Error("Invalid plan type");
    }

    if (!["monthly", "annual"].includes(billingPeriod)) {
      throw new Error("Invalid billing period");
    }

    const priceIds: Record<string, string> = {
      pro_monthly: Deno.env.get("STRIPE_PRICE_ID_PRO_MONTHLY")!,
      pro_annual: Deno.env.get("STRIPE_PRICE_ID_PRO_ANNUAL")!,
      team_monthly: Deno.env.get("STRIPE_PRICE_ID_TEAM_MONTHLY")!,
      team_annual: Deno.env.get("STRIPE_PRICE_ID_TEAM_ANNUAL")!,
    };

    const priceKey = `${planType}_${billingPeriod}`;
    const priceId = priceIds[priceKey];

    if (!priceId) {
      throw new Error(`Price ID not configured for ${priceKey}`);
    }

    const stripe = await import("npm:stripe@14");
    const stripeClient = new stripe.default(Deno.env.get("STRIPE_SECRET_KEY")!, {
      apiVersion: "2023-10-16",
      httpClient: stripe.default.createFetchHttpClient(),
    });

    const { data: profile } = await supabase
      .from("profiles")
      .select("email, stripe_customer_id")
      .eq("id", user.id)
      .single();

    if (!profile) {
      throw new Error("Profile not found");
    }

    let customerId = profile.stripe_customer_id;

    if (!customerId) {
      const customer = await stripeClient.customers.create({
        email: profile.email,
        metadata: {
          user_id: user.id,
        },
      });
      customerId = customer.id;

      await supabase
        .from("profiles")
        .update({ stripe_customer_id: customerId })
        .eq("id", user.id);
    }

    const session = await stripeClient.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        user_id: user.id,
        plan_type: planType,
        billing_period: billingPeriod,
      },
      subscription_data: {
        metadata: {
          user_id: user.id,
          plan_type: planType,
          billing_period: billingPeriod,
        },
      },
    });

    return new Response(
      JSON.stringify({ sessionId: session.id, url: session.url }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Checkout error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
