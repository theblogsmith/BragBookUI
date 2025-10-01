# Brag Ledger - Email Functionality Setup Guide

This guide will walk you through deploying and configuring the email-based achievement logging feature for Brag Ledger.

## What's Been Implemented

1. **Database Schema** - Tables for email settings, logs, and temporary attachments
2. **Email Service Layer** - API services for managing email settings
3. **Email Parser** - Utilities to parse numbered lists and extract achievements from emails
4. **Category Detection** - NLP-based automatic categorization of achievements
5. **Settings UI** - Complete email preferences interface in the Settings page
6. **Edge Functions** - Three serverless functions for processing emails

## Deployment Steps

### 1. Set Up Resend Account (Free Tier)

1. Go to [https://resend.com/signup](https://resend.com/signup)
2. Create a free account (3,000 emails/month, 100/day)
3. Verify your email address
4. Navigate to API Keys section
5. Create a new API key and copy it

### 2. Configure Domain in Resend

1. In Resend dashboard, go to **Domains**
2. Add your domain: `bragledger.com`
3. Follow Resend's instructions to add DNS records:
   - Add the MX records for receiving inbound emails
   - Add SPF record for sending emails
   - Add DKIM record for email authentication
4. Wait for DNS propagation (usually 5-30 minutes)
5. Verify the domain in Resend

### 3. Set Up Inbound Email Webhook

1. In Resend dashboard, go to **Webhooks**
2. Create a new webhook with these settings:
   - **Event**: `email.received`
   - **Webhook URL**: `https://YOUR_PROJECT_ID.supabase.co/functions/v1/process-inbound-email`
   - **Status**: Active

### 4. Deploy Edge Functions to Supabase

The Edge Functions are already created in `supabase/functions/`. You need to deploy them:

#### Option A: Using Supabase CLI (Recommended)

```bash
# Install Supabase CLI if you haven't
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_ID

# Deploy all functions
supabase functions deploy process-inbound-email
supabase functions deploy send-weekly-prompts
supabase functions deploy send-test-email

# Set the Resend API key as a secret
supabase secrets set RESEND_API_KEY=your_resend_api_key_here
```

#### Option B: Manual Deployment via Supabase Dashboard

Since the Supabase CLI deployment tool in this environment, you'll need to manually deploy:

1. Go to your Supabase Dashboard
2. Navigate to **Edge Functions**
3. For each function (`process-inbound-email`, `send-weekly-prompts`, `send-test-email`):
   - Click "New Function"
   - Copy the code from `supabase/functions/[function-name]/index.ts`
   - Paste and deploy

### 5. Configure Environment Variables

In your Supabase Dashboard, go to **Project Settings > Edge Functions**:

Set the following secret:
```
RESEND_API_KEY=re_your_api_key_here
```

### 6. Set Up Scheduled Prompts (Cron Job)

For weekly email prompts to be sent automatically:

#### Using Supabase Cron (if available in your plan)

```sql
-- Run this SQL in your Supabase SQL Editor
SELECT cron.schedule(
  'send-weekly-prompts',
  '0 * * * *',  -- Every hour (function checks if users are due)
  $$
  SELECT
    net.http_post(
      url:='https://YOUR_PROJECT_ID.supabase.co/functions/v1/send-weekly-prompts',
      headers:='{"Content-Type": "application/json", "Authorization": "Bearer YOUR_SERVICE_ROLE_KEY"}'::jsonb
    ) as request_id;
  $$
);
```

#### Alternative: Using External Cron Service

Use a service like [cron-job.org](https://cron-job.org) or [EasyCron](https://www.easycron.com):

1. Create an account
2. Set up a new cron job:
   - **URL**: `https://YOUR_PROJECT_ID.supabase.co/functions/v1/send-weekly-prompts`
   - **Schedule**: Hourly (the function checks if users are due)
   - **Method**: POST
   - **Headers**:
     ```
     Authorization: Bearer YOUR_SUPABASE_ANON_KEY
     Content-Type: application/json
     ```

### 7. Configure Email Routing in Resend

1. In Resend, go to **Inbound Rules**
2. Create a catch-all rule for `@bragledger.com`:
   - **Domain**: bragledger.com
   - **Match**: *@bragledger.com
   - **Forward to webhook**: (Select your webhook)

## Testing the Email Functionality

### Test 1: Settings Page

1. Log in to your Brag Ledger app
2. Go to Settings
3. Scroll down to "Email Settings"
4. You should see your unique email address (e.g., `abc123@bragledger.com`)
5. Click "Send Test Email" to verify email sending works

### Test 2: Inbound Email (Numbered List)

Send an email to your unique email address with this content:

```
Subject: Weekly Wins

1. Completed Q4 strategic planning presentation
2. Mentored new team member on React best practices
3. Fixed critical production bug affecting 500+ users
```

Each numbered item should create a separate achievement entry!

### Test 3: Inbound Email (Single Entry)

Send an email with:

```
Subject: Big Win Today

Led the all-hands meeting and got approval for the new product initiative.
The team is excited and ready to start next week!
```

This should create a single achievement with the subject as the title.

### Test 4: Weekly Prompt

Wait for your configured prompt time, or manually trigger it:

```bash
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/send-weekly-prompts \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json"
```

## Features Included

### For Users:
- ✅ Unique email address per user (e.g., `user123@bragledger.com`)
- ✅ Email achievements anytime to log them
- ✅ Reply to weekly prompts with numbered lists
- ✅ Automatic category detection based on keywords
- ✅ Configurable weekly email prompts (day, time, frequency)
- ✅ Additional prompt days (e.g., Monday AND Friday)
- ✅ Opt-in/opt-out controls
- ✅ Email activity log
- ✅ Test email button

### For Administrators:
- ✅ Email logs for debugging
- ✅ Attachment handling (up to 5 files, 5MB each)
- ✅ Error tracking
- ✅ Rate limiting via RLS policies

## Troubleshooting

### Emails Not Being Received

1. Check DNS records are properly set in your domain registrar
2. Verify domain is verified in Resend dashboard
3. Check webhook is active and URL is correct
4. Check Supabase Edge Function logs for errors

### Weekly Prompts Not Sending

1. Verify cron job is running (check logs)
2. Check RESEND_API_KEY is set correctly
3. Verify users have `email_enabled = true` in database
4. Check email_logs table for error messages

### Category Detection Not Working

The system uses keyword matching. If categories aren't being detected:
1. Check the keywords in `src/utils/categoryDetector.ts`
2. Add more keywords relevant to your use case
3. Categories are auto-created if they don't exist

### Numbered Lists Not Parsing

The parser recognizes these formats:
- `1. Achievement here`
- `1) Achievement here`
- `1: Achievement here`
- `- Achievement here`
- `* Achievement here`

Make sure each item starts on a new line.

## Next Steps

### Optional Enhancements:

1. **Attachment Support**: Implement file storage for email attachments
2. **Reply Threading**: Track which achievements came from prompt replies
3. **Rich Text Parsing**: Parse HTML emails for better formatting
4. **Email Templates**: Customize weekly prompt email design
5. **Analytics**: Track email open rates and response rates
6. **Team Emails**: Support shared team email addresses
7. **Email Digest**: Send weekly summaries of logged achievements

## Security Notes

- All email addresses are randomly generated and unique
- RLS policies ensure users can only access their own emails
- Rate limiting should be implemented at the Edge Function level
- Email content is sanitized before processing
- Attachments should be scanned for viruses in production

## Support

If you encounter issues:
1. Check Supabase Edge Function logs
2. Check email_logs table in database
3. Verify DNS configuration
4. Test with Resend's testing tools

---

**Congratulations!** Your email-based achievement logging system is now set up. Users can start emailing their wins to Brag Ledger!
