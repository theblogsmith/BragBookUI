import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface InboundEmailPayload {
  from: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
  attachments?: Array<{
    filename: string;
    content: string;
    contentType: string;
    size: number;
  }>;
  messageId?: string;
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
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const payload: InboundEmailPayload = await req.json();

    const { to, from, subject, text, attachments, messageId } = payload;

    const toAddress = to.toLowerCase();
    const { data: emailSettings } = await supabase
      .from("email_settings")
      .select("user_id, email_enabled")
      .eq("unique_email_address", toAddress)
      .maybeSingle();

    if (!emailSettings) {
      console.error(`No user found for email address: ${toAddress}`);
      return new Response(
        JSON.stringify({ error: "Invalid recipient address" }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!emailSettings.email_enabled) {
      console.log(`Email disabled for user: ${emailSettings.user_id}`);
      return new Response(
        JSON.stringify({ message: "Email logging disabled" }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const userId = emailSettings.user_id;

    const { data: profile } = await supabase
      .from("profiles")
      .select("default_privacy")
      .eq("id", userId)
      .single();

    const emailLog = await supabase
      .from("email_logs")
      .insert({
        user_id: userId,
        email_type: "entry_received",
        from_address: from,
        to_address: toAddress,
        subject: subject || "(no subject)",
        body_preview: text.substring(0, 500),
        raw_email_id: messageId,
        processed: false,
      })
      .select()
      .single();

    if (emailLog.error) {
      throw emailLog.error;
    }

    const cleanedBody = cleanEmailBody(text);
    const entries = parseNumberedList(cleanedBody);

    if (entries.length === 0 && cleanedBody.length > 0) {
      entries.push({
        title: extractSubjectTitle(subject),
        description: cleanedBody,
      });
    }

    let createdCount = 0;
    for (const entry of entries) {
      const detectedCategory = detectCategory(entry.title, entry.description);
      let categoryId = null;

      if (detectedCategory) {
        const { data: category } = await supabase
          .from("categories")
          .select("id")
          .eq("user_id", userId)
          .eq("name", detectedCategory)
          .maybeSingle();

        if (category) {
          categoryId = category.id;
        } else {
          const { data: newCategory } = await supabase
            .from("categories")
            .insert({
              user_id: userId,
              name: detectedCategory,
              color: getRandomColor(),
            })
            .select("id")
            .single();

          if (newCategory) {
            categoryId = newCategory.id;
          }
        }
      }

      const { error: insertError } = await supabase.from("entries").insert({
        user_id: userId,
        title: entry.title.substring(0, 200),
        description: entry.description,
        achievement_date: new Date().toISOString().split("T")[0],
        privacy_level: profile?.default_privacy || "private",
        category_id: categoryId,
      });

      if (!insertError) {
        createdCount++;
      }
    }

    await supabase
      .from("email_logs")
      .update({
        entries_created: createdCount,
        processed: true,
      })
      .eq("id", emailLog.data.id);

    return new Response(
      JSON.stringify({
        success: true,
        entriesCreated: createdCount,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing inbound email:", error);

    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

function cleanEmailBody(body: string): string {
  let cleaned = body;
  const quotedPattern = /^(>|On .* wrote:)/gm;
  cleaned = cleaned.replace(quotedPattern, "");

  const signaturePatterns = [
    /^\-\-\s*$/m,
    /^Sent from my /m,
    /^Best regards,/m,
    /^Thanks,/m,
    /^Regards,/m,
  ];

  for (const pattern of signaturePatterns) {
    const match = cleaned.match(pattern);
    if (match && match.index) {
      cleaned = cleaned.substring(0, match.index);
    }
  }

  return cleaned.replace(/\s+/g, " ").trim();
}

function parseNumberedList(text: string): Array<{ title: string; description: string }> {
  const entries: Array<{ title: string; description: string }> = [];
  const lines = text.split("\n").map((line) => line.trim()).filter((line) => line.length > 0);
  const numberedPattern = /^(\d+[\.\):]|\-|\*|\•)\s*(.+)/;

  let currentEntry: { title: string; description: string } | null = null;

  for (const line of lines) {
    const match = line.match(numberedPattern);

    if (match) {
      if (currentEntry) {
        entries.push(currentEntry);
      }

      const content = match[2].trim();
      currentEntry = {
        title: content.substring(0, 100),
        description: content,
      };
    } else if (currentEntry && line.length > 0) {
      currentEntry.description += " " + line;
    }
  }

  if (currentEntry) {
    entries.push(currentEntry);
  }

  return entries;
}

function extractSubjectTitle(subject: string): string {
  const prefixes = ["Re:", "Fwd:", "RE:", "FWD:", "Fw:"];
  let title = subject;

  for (const prefix of prefixes) {
    if (title.startsWith(prefix)) {
      title = title.substring(prefix.length).trim();
    }
  }

  return title || "Email Achievement";
}

function detectCategory(title: string, description: string): string | null {
  const categoryKeywords: Record<string, string[]> = {
    "Professional Achievements": ["project", "completed", "delivered", "launched", "shipped", "achievement", "goal"],
    "Recognition & Feedback": ["award", "recognition", "praise", "feedback", "thank", "appreciated"],
    "Learning & Development": ["learned", "training", "course", "certification", "skill", "workshop"],
    "Leadership": ["led", "managed", "mentored", "coached", "supervised", "team"],
    "Innovation": ["innovate", "created", "invented", "designed", "solution", "idea"],
  };

  const combinedText = `${title} ${description}`.toLowerCase();

  let bestMatch: { categoryName: string; score: number } | null = null;

  for (const [categoryName, keywords] of Object.entries(categoryKeywords)) {
    let score = 0;
    for (const keyword of keywords) {
      const regex = new RegExp(`\\b${keyword}\\b`, "gi");
      const matches = combinedText.match(regex);
      if (matches) {
        score += matches.length;
      }
    }

    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { categoryName, score };
    }
  }

  return bestMatch ? bestMatch.categoryName : null;
}

function getRandomColor(): string {
  const colors = [
    "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16",
    "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9",
    "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}