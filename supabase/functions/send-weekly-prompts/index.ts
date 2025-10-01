import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const now = new Date();
    const currentDayOfWeek = now.getDay();
    const currentTime = now.toTimeString().substring(0, 5);

    const { data: usersToEmail } = await supabase
      .from("email_settings")
      .select(`
        user_id,
        unique_email_address,
        prompt_day_of_week,
        prompt_time,
        additional_prompt_days,
        last_prompt_sent_at,
        profiles:user_id (
          email,
          full_name
        )
      `)
      .eq("email_enabled", true)
      .eq("weekly_prompt_enabled", true);

    if (!usersToEmail || usersToEmail.length === 0) {
      return new Response(
        JSON.stringify({ message: "No users to email" }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    let emailsSent = 0;
    const errors: string[] = [];

    for (const user of usersToEmail) {
      try {
        const shouldSendToday =
          user.prompt_day_of_week === currentDayOfWeek ||
          user.additional_prompt_days?.includes(currentDayOfWeek);

        if (!shouldSendToday) {
          continue;
        }

        const lastSent = user.last_prompt_sent_at
          ? new Date(user.last_prompt_sent_at)
          : null;
        const today = new Date().toDateString();

        if (lastSent && lastSent.toDateString() === today) {
          continue;
        }

        const profile = Array.isArray(user.profiles)
          ? user.profiles[0]
          : user.profiles;

        const appUrl = supabaseUrl.replace('.supabase.co', '');
        const emailHtml = generateEmailTemplate(
          profile.full_name || "there",
          appUrl
        );

        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Brag Ledger <prompts@bragledger.com>",
            to: profile.email,
            subject: "What did you accomplish this week?",
            html: emailHtml,
          }),
        });

        if (!emailResponse.ok) {
          const error = await emailResponse.text();
          throw new Error(`Resend API error: ${error}`);
        }

        const emailResult = await emailResponse.json();

        await supabase.from("email_logs").insert({
          user_id: user.user_id,
          email_type: "prompt_sent",
          from_address: "prompts@bragledger.com",
          to_address: profile.email,
          subject: "What did you accomplish this week?",
          body_preview: "Weekly prompt email",
          raw_email_id: emailResult.id,
          processed: true,
        });

        await supabase
          .from("email_settings")
          .update({ last_prompt_sent_at: new Date().toISOString() })
          .eq("user_id", user.user_id);

        emailsSent++;
      } catch (error) {
        console.error(`Error sending email to user ${user.user_id}:`, error);
        errors.push(`User ${user.user_id}: ${error.message}`);

        await supabase.from("email_logs").insert({
          user_id: user.user_id,
          email_type: "error",
          from_address: "prompts@bragledger.com",
          to_address: user.profiles?.email || "unknown",
          subject: "Weekly prompt failed",
          error_message: error.message,
          processed: false,
        });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        emailsSent,
        errors: errors.length > 0 ? errors : undefined,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in send-weekly-prompts:", error);

    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

function generateEmailTemplate(name: string, appUrl: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Weekly Wins Prompt</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #fef08a; border: 4px solid #000; padding: 30px; box-shadow: 8px 8px 0px 0px rgba(0,0,0,0.8);">
      <h1 style="margin: 0 0 20px 0; font-size: 28px; font-weight: 900; color: #000;">
        BRAG LEDGER
      </h1>

      <div style="background-color: #fff; border: 4px solid #000; padding: 25px; margin: 20px 0;">
        <h2 style="margin: 0 0 15px 0; font-size: 22px; font-weight: 800; color: #000;">
          Hi ${name}!
        </h2>

        <p style="margin: 0 0 15px 0; font-size: 16px; line-height: 1.6; color: #000; font-weight: 600;">
          It's time for your weekly check-in. Take a moment to reflect:
        </p>

        <div style="background-color: #a7f3d0; border: 3px solid #000; padding: 20px; margin: 20px 0;">
          <p style="margin: 0; font-size: 18px; font-weight: 700; color: #000;">
            What did you accomplish this week? Tell us about your wins.
          </p>
        </div>
      </div>

      <div style="text-align: center; margin-top: 30px;">
        <a href="${appUrl}/new-entry"
           style="display: inline-block; padding: 15px 30px; background-color: #000; color: #fff; text-decoration: none; font-weight: 800; border: 4px solid #000; box-shadow: 4px 4px 0px 0px rgba(0,0,0,0.8); font-size: 16px;">
          ADD YOUR WINS
        </a>
      </div>

      <div style="text-align: center; margin-top: 20px;">
        <a href="${appUrl}/dashboard"
           style="display: inline-block; padding: 12px 25px; background-color: #fff; color: #000; text-decoration: none; font-weight: 700; border: 3px solid #000; font-size: 14px;">
          View Your Ledger
        </a>
      </div>
    </div>

    <div style="text-align: center; margin-top: 20px; padding: 15px;">
      <p style="margin: 0; font-size: 12px; color: #6b7280; font-weight: 600;">
        Don't want these emails?
        <a href="${appUrl}/settings"
           style="color: #000; text-decoration: underline; font-weight: 700;">
          Update your settings
        </a>
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}