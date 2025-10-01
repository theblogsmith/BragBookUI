import "jsr:@supabase/functions-js/edge-runtime.d.ts";

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
    const { email, name } = await req.json();

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;

    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const appUrl = supabaseUrl.replace('.supabase.co', '');

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test Email from Brag Ledger</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #fef08a; border: 4px solid #000; padding: 30px;">
      <h1 style="margin: 0 0 20px 0; font-size: 28px; font-weight: 900; color: #000;">
        BRAG LEDGER - TEST EMAIL
      </h1>

      <div style="background-color: #fff; border: 4px solid #000; padding: 25px;">
        <p style="font-size: 16px; line-height: 1.6; color: #000; font-weight: 600;">
          Hi ${name || "there"}!
        </p>

        <p style="font-size: 16px; line-height: 1.6; color: #000; font-weight: 600;">
          This is a test email from Brag Ledger. Your email settings are working correctly!
        </p>

        <div style="background-color: #a7f3d0; border: 3px solid #000; padding: 20px; margin: 20px 0;">
          <p style="margin: 0; font-size: 16px; font-weight: 700; color: #000;">
            You'll receive weekly prompts to capture your achievements.
          </p>
        </div>

        <div style="text-align: center; margin-top: 20px;">
          <a href="${appUrl}/new-entry"
             style="display: inline-block; padding: 12px 25px; background-color: #000; color: #fff; text-decoration: none; font-weight: 700; border: 3px solid #000; font-size: 14px;">
            Log an Achievement Now
          </a>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Brag Ledger <prompts@bragledger.com>",
        to: email,
        subject: "Test Email from Brag Ledger",
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Resend API error: ${error}`);
    }

    const result = await response.json();

    return new Response(
      JSON.stringify({ success: true, emailId: result.id }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error sending test email:", error);

    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});