# Brag Ledger - Email Testing Guide

## Your Configuration

**Your Unique Email Address:** `abb690bfe0fd@bragledger.com`
**Your Email:** `madeline.osman@gmail.com`
**Supabase URL:** `https://0ec90b57d6e95fcbda19832f.supabase.co`

## Deployed Edge Functions

✅ `process-inbound-email` - Handles incoming emails
✅ `send-test-email` - Sends test emails
✅ `send-weekly-prompts` - Sends weekly prompt emails

## Step 1: Configure Resend Webhook

### Add Webhook
1. Go to [Resend Webhooks](https://resend.com/webhooks)
2. Click "Add Webhook"
3. Configure:
   - **Event**: `email.received`
   - **Webhook URL**: `https://0ec90b57d6e95fcbda19832f.supabase.co/functions/v1/process-inbound-email`
   - **Status**: Active
4. Click Save

### Add Inbound Route
1. Go to [Resend Inbound](https://resend.com/inbound)
2. Click "Add Inbound Route"
3. Configure:
   - **Domain**: `bragledger.com`
   - **Match Pattern**: `*@bragledger.com` (catch-all)
   - **Forward to**: Select the webhook you created above
4. Click Save

## Step 2: Test Email Sending (via App)

1. Log in to your Brag Ledger app at your deployed URL
2. Go to **Settings** page
3. Scroll down to **Email Settings** section
4. You should see:
   - Your unique email address: `abb690bfe0fd@bragledger.com`
   - Email enabled toggle (should be ON)
   - Weekly prompt settings
5. Click the **"Send Test Email"** button
6. Check your inbox at `madeline.osman@gmail.com` for the test email

## Step 3: Test Inbound Email (Numbered List)

Send an email from `madeline.osman@gmail.com` to `abb690bfe0fd@bragledger.com`:

**Subject:** Weekly Wins

**Body:**
```
1. Completed Q4 strategic planning presentation and got executive approval
2. Mentored new team member on React best practices and code review process
3. Fixed critical production bug affecting 500+ users, reduced error rate by 95%
4. Led cross-functional meeting to align on product roadmap for next quarter
```

**Expected Result:**
- 4 separate achievement entries created in your Brag Ledger
- Each with automatic category detection
- Check your Dashboard to see them

## Step 4: Test Inbound Email (Single Entry)

Send another email to `abb690bfe0fd@bragledger.com`:

**Subject:** Big Win Today

**Body:**
```
Led the all-hands meeting and got approval for the new product initiative.
The team is excited and ready to start next week! This was a major milestone
we've been working toward for months.
```

**Expected Result:**
- 1 achievement entry created
- Title: "Big Win Today"
- Description contains the full body text

## Step 5: Test Weekly Prompt Email (Manual Trigger)

You can manually trigger the weekly prompt function using curl or Postman:

```bash
curl -X POST 'https://0ec90b57d6e95fcbda19832f.supabase.co/functions/v1/send-weekly-prompts' \
  -H "Content-Type: application/json"
```

**Expected Result:**
- You receive an email with the weekly prompt
- Email has a reply-to address set to your unique address
- You can reply with a numbered list

## Step 6: Set Up Cron Job for Automated Weekly Prompts

### Option A: Using Supabase Cron (if available)

Run this SQL in your Supabase SQL Editor:

```sql
SELECT cron.schedule(
  'send-weekly-prompts',
  '0 * * * *',  -- Every hour (function checks if users are due)
  $$
  SELECT
    net.http_post(
      url:='https://0ec90b57d6e95fcbda19832f.supabase.co/functions/v1/send-weekly-prompts',
      headers:='{"Content-Type": "application/json"}'::jsonb
    ) as request_id;
  $$
);
```

### Option B: Using External Cron Service (Recommended)

**Using cron-job.org (Free):**

1. Sign up at [https://cron-job.org](https://cron-job.org)
2. Create new cron job:
   - **Title**: Brag Ledger Weekly Prompts
   - **URL**: `https://0ec90b57d6e95fcbda19832f.supabase.co/functions/v1/send-weekly-prompts`
   - **Schedule**: `0 * * * *` (Every hour - the function checks if users are due)
   - **Request Method**: POST
   - **Request Headers**:
     ```
     Content-Type: application/json
     ```
   - **Execution**: Enabled
3. Save

**Using EasyCron (Alternative):**
1. Sign up at [https://www.easycron.com](https://www.easycron.com)
2. Similar configuration as above

## Verification Checklist

### Email Sending ✅
- [ ] Test email button works in Settings
- [ ] Test email received at madeline.osman@gmail.com
- [ ] Email has correct styling (yellow/black brutalist design)
- [ ] Unique email address displayed correctly

### Inbound Email Processing ✅
- [ ] Numbered list creates multiple entries
- [ ] Single paragraph creates one entry
- [ ] Achievements appear in Dashboard
- [ ] Categories auto-detected and assigned
- [ ] Email signature stripped correctly

### Weekly Prompts ✅
- [ ] Manual trigger sends email
- [ ] Cron job configured and running
- [ ] Prompt email received
- [ ] Reply-to address is unique user address
- [ ] Can reply to create achievements

### Settings Configuration ✅
- [ ] Unique email address displayed
- [ ] Can copy email address
- [ ] Can toggle email enabled/disabled
- [ ] Can toggle weekly prompts
- [ ] Can change day of week
- [ ] Can change time
- [ ] Can add additional days
- [ ] Settings save correctly

## Troubleshooting

### Not Receiving Emails?

1. **Check Resend Dashboard:**
   - Go to Logs section
   - Look for your email sends
   - Check for any errors

2. **Check Spam Folder:**
   - Test emails might go to spam initially
   - Mark as "Not Spam" to train filters

3. **Verify DNS Records:**
   - All DNS records should show "Verified" in Resend
   - Wait 5-30 minutes if recently added

### Inbound Emails Not Creating Entries?

1. **Check Webhook Logs:**
   - Go to Resend Webhooks
   - Click on your webhook
   - Check recent deliveries

2. **Check Edge Function Logs:**
   - Go to Supabase Dashboard
   - Edge Functions > process-inbound-email
   - Check logs for errors

3. **Check Email Logs Table:**
   ```sql
   SELECT * FROM email_logs
   ORDER BY created_at DESC
   LIMIT 10;
   ```

### Categories Not Auto-Detecting?

The system looks for these keywords:
- **Professional Achievements**: project, completed, delivered, launched, shipped
- **Recognition & Feedback**: award, recognition, praise, feedback, thank
- **Learning & Development**: learned, training, course, certification, skill
- **Leadership**: led, managed, mentored, coached, supervised, team
- **Innovation**: innovate, created, invented, designed, solution, idea

Include these keywords in your achievement descriptions for better detection.

## Email Logs Query

Check all email activity:

```sql
SELECT
  email_type,
  from_address,
  to_address,
  subject,
  entries_created,
  processed,
  created_at,
  error_message
FROM email_logs
ORDER BY created_at DESC
LIMIT 20;
```

## Testing Tips

1. **Start Simple**: Test with the "Send Test Email" button first
2. **Test Numbered Lists**: Use 1-3 items initially
3. **Check Dashboard**: Refresh after sending to see new entries
4. **Monitor Logs**: Keep email_logs table open while testing
5. **Test Reply**: Reply to a weekly prompt to test the full flow

## Advanced: Testing with curl

### Test Email Processing Directly

```bash
curl -X POST 'https://0ec90b57d6e95fcbda19832f.supabase.co/functions/v1/process-inbound-email' \
  -H "Content-Type: application/json" \
  -d '{
    "from": "madeline.osman@gmail.com",
    "to": "abb690bfe0fd@bragledger.com",
    "subject": "Test Achievement",
    "text": "1. First win\n2. Second win\n3. Third win",
    "messageId": "test-123"
  }'
```

## Success Criteria

Your email system is fully functional when:
- ✅ Test emails send successfully
- ✅ Inbound emails create achievement entries
- ✅ Numbered lists create multiple entries
- ✅ Categories auto-detect correctly
- ✅ Weekly prompts send on schedule
- ✅ Can reply to prompts to create entries
- ✅ Email logs track all activity
- ✅ Settings page shows correct configuration

---

**Need Help?** Check the email_logs table for debugging information and Edge Function logs in Supabase dashboard.
