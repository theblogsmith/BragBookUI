import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey, stripe-signature",
};

interface StripeEvent {
  id: string;
  type: string;
  data: {
    object: any;
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      throw new Error("No stripe signature found");
    }

    const body = await req.text();
    const stripeWebhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

    if (!stripeWebhookSecret) {
      throw new Error("STRIPE_WEBHOOK_SECRET not configured");
    }

    const stripe = await import("npm:stripe@14");
    const stripeClient = new stripe.default(Deno.env.get("STRIPE_SECRET_KEY")!, {
      apiVersion: "2023-10-16",
      httpClient: stripe.default.createFetchHttpClient(),
    });

    const event = stripeClient.webhooks.constructEvent(
      body,
      signature,
      stripeWebhookSecret
    ) as StripeEvent;

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log(`Processing webhook event: ${event.type}`);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const userId = session.metadata?.user_id;
        const planType = session.metadata?.plan_type;
        const billingPeriod = session.metadata?.billing_period;

        if (!userId || !planType || !billingPeriod) {
          throw new Error("Missing required metadata in checkout session");
        }

        const subscription = await stripeClient.subscriptions.retrieve(
          session.subscription as string
        );

        const { error: subError } = await supabase
          .from("subscriptions")
          .upsert({
            user_id: userId,
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: session.subscription as string,
            plan_type: planType,
            billing_period: billingPeriod,
            status: "active",
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            cancel_at_period_end: false,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: "user_id"
          });

        if (subError) throw subError;

        const { error: eventError } = await supabase
          .from("payment_events")
          .insert({
            user_id: userId,
            stripe_event_id: event.id,
            event_type: "checkout_completed",
            amount: session.amount_total,
            currency: session.currency,
            status: "processed",
            metadata: { session_id: session.id },
          });

        if (eventError) throw eventError;

        console.log(`Subscription created for user ${userId}`);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object;
        const userId = subscription.metadata?.user_id;

        if (!userId) {
          const { data: existingSub } = await supabase
            .from("subscriptions")
            .select("user_id")
            .eq("stripe_subscription_id", subscription.id)
            .single();

          if (!existingSub) {
            console.log("Subscription not found, skipping update");
            break;
          }
        }

        const updateData: any = {
          status: subscription.status === "active" ? "active" :
                  subscription.status === "past_due" ? "past_due" :
                  subscription.status === "canceled" ? "cancelled" : "incomplete",
          current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          cancel_at_period_end: subscription.cancel_at_period_end || false,
          updated_at: new Date().toISOString(),
        };

        const { error: subError } = await supabase
          .from("subscriptions")
          .update(updateData)
          .eq("stripe_subscription_id", subscription.id);

        if (subError) throw subError;

        console.log(`Subscription updated: ${subscription.id}`);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;

        const { error: subError } = await supabase
          .from("subscriptions")
          .update({
            plan_type: "free",
            status: "cancelled",
            stripe_subscription_id: null,
            billing_period: null,
            current_period_start: null,
            current_period_end: null,
            cancel_at_period_end: false,
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_subscription_id", subscription.id);

        if (subError) throw subError;

        console.log(`Subscription cancelled: ${subscription.id}`);
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object;
        const subscriptionId = invoice.subscription as string;

        const { data: subscription } = await supabase
          .from("subscriptions")
          .select("user_id")
          .eq("stripe_subscription_id", subscriptionId)
          .single();

        if (subscription) {
          const { error: eventError } = await supabase
            .from("payment_events")
            .insert({
              user_id: subscription.user_id,
              stripe_event_id: event.id,
              event_type: "payment_succeeded",
              amount: invoice.amount_paid,
              currency: invoice.currency,
              status: "processed",
              metadata: { invoice_id: invoice.id },
            });

          if (eventError) throw eventError;
        }

        console.log(`Payment succeeded for invoice: ${invoice.id}`);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;
        const subscriptionId = invoice.subscription as string;

        const { data: subscription } = await supabase
          .from("subscriptions")
          .select("user_id")
          .eq("stripe_subscription_id", subscriptionId)
          .single();

        if (subscription) {
          const { error: subError } = await supabase
            .from("subscriptions")
            .update({
              status: "past_due",
              updated_at: new Date().toISOString(),
            })
            .eq("stripe_subscription_id", subscriptionId);

          if (subError) throw subError;

          const { error: eventError } = await supabase
            .from("payment_events")
            .insert({
              user_id: subscription.user_id,
              stripe_event_id: event.id,
              event_type: "payment_failed",
              amount: invoice.amount_due,
              currency: invoice.currency,
              status: "failed",
              metadata: { invoice_id: invoice.id },
            });

          if (eventError) throw eventError;
        }

        console.log(`Payment failed for invoice: ${invoice.id}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(
      JSON.stringify({ received: true }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Webhook error:", error);
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
