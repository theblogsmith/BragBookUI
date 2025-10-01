/*
  # Email Functionality for Brag Ledger

  ## Overview
  This migration adds email-based entry logging functionality, allowing users to:
  - Receive weekly email prompts
  - Reply to emails to create achievements
  - Send emails to their unique address to log achievements anytime
  - Configure email preferences and schedules

  ## New Tables

  ### `email_settings`
  - `user_id` (uuid, primary key) - References profiles.id
  - `unique_email_address` (text, unique) - User's unique email address for logging (e.g., user123@bragledger.com)
  - `email_enabled` (boolean) - Whether email functionality is enabled
  - `weekly_prompt_enabled` (boolean) - Whether to send weekly prompts
  - `prompt_day_of_week` (integer) - Day of week for weekly prompt (0=Sunday, 6=Saturday)
  - `prompt_time` (time) - Time of day to send prompt (in user's timezone)
  - `prompt_timezone` (text) - User's timezone for scheduling
  - `additional_prompt_days` (integer[]) - Additional days for prompts
  - `last_prompt_sent_at` (timestamptz) - Last time a prompt was sent
  - `created_at` (timestamptz) - Settings creation timestamp
  - `updated_at` (timestamptz) - Last settings update

  ### `email_logs`
  - `id` (uuid, primary key) - Unique log identifier
  - `user_id` (uuid, foreign key) - References profiles.id
  - `email_type` (text) - Type: 'prompt_sent', 'entry_received', 'error'
  - `from_address` (text) - Sender email address
  - `to_address` (text) - Recipient email address
  - `subject` (text) - Email subject line
  - `body_preview` (text) - First 500 chars of body
  - `entries_created` (integer) - Number of entries created from this email
  - `error_message` (text, optional) - Error details if processing failed
  - `raw_email_id` (text, optional) - ID from email service provider
  - `processed` (boolean) - Whether email was successfully processed
  - `created_at` (timestamptz) - Log timestamp

  ### `email_attachments_temp`
  - `id` (uuid, primary key) - Unique temp attachment identifier
  - `email_log_id` (uuid, foreign key) - References email_logs.id
  - `file_name` (text) - Original filename
  - `file_url` (text) - Temporary storage URL
  - `file_type` (text) - MIME type
  - `file_size` (integer) - Size in bytes
  - `processed` (boolean) - Whether attached to an entry
  - `created_at` (timestamptz) - Upload timestamp
  - `expires_at` (timestamptz) - When temp file expires

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Users can only access their own email settings and logs
  - Email addresses are unique and randomly generated
  - Rate limiting enforced at application level

  ## Important Notes
  1. Default email settings: enabled by default, weekly on Friday at 2pm
  2. Unique email addresses use format: {random_slug}@bragledger.com
  3. Email logs retained for auditing and debugging
  4. Temporary attachments auto-expire after 24 hours
  5. Users can opt out by disabling email_enabled
*/

-- Create email_settings table
CREATE TABLE IF NOT EXISTS email_settings (
  user_id uuid PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  unique_email_address text UNIQUE NOT NULL,
  email_enabled boolean DEFAULT true,
  weekly_prompt_enabled boolean DEFAULT true,
  prompt_day_of_week integer DEFAULT 5 CHECK (prompt_day_of_week >= 0 AND prompt_day_of_week <= 6),
  prompt_time time DEFAULT '14:00:00',
  prompt_timezone text DEFAULT 'America/New_York',
  additional_prompt_days integer[] DEFAULT '{}',
  last_prompt_sent_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create email_logs table
CREATE TABLE IF NOT EXISTS email_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  email_type text NOT NULL CHECK (email_type IN ('prompt_sent', 'entry_received', 'error')),
  from_address text NOT NULL,
  to_address text NOT NULL,
  subject text NOT NULL,
  body_preview text,
  entries_created integer DEFAULT 0,
  error_message text,
  raw_email_id text,
  processed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create email_attachments_temp table
CREATE TABLE IF NOT EXISTS email_attachments_temp (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email_log_id uuid NOT NULL REFERENCES email_logs(id) ON DELETE CASCADE,
  file_name text NOT NULL,
  file_url text NOT NULL,
  file_type text NOT NULL,
  file_size integer NOT NULL,
  processed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz DEFAULT (now() + interval '24 hours')
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_email_settings_unique_address ON email_settings(unique_email_address);
CREATE INDEX IF NOT EXISTS idx_email_settings_prompt_enabled ON email_settings(weekly_prompt_enabled, email_enabled);
CREATE INDEX IF NOT EXISTS idx_email_logs_user_id ON email_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_created_at ON email_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_email_logs_type ON email_logs(email_type);
CREATE INDEX IF NOT EXISTS idx_email_attachments_temp_email_log ON email_attachments_temp(email_log_id);
CREATE INDEX IF NOT EXISTS idx_email_attachments_temp_expires ON email_attachments_temp(expires_at);

-- Enable Row Level Security
ALTER TABLE email_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_attachments_temp ENABLE ROW LEVEL SECURITY;

-- Email settings policies
CREATE POLICY "Users can view own email settings"
  ON email_settings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own email settings"
  ON email_settings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own email settings"
  ON email_settings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own email settings"
  ON email_settings FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Email logs policies
CREATE POLICY "Users can view own email logs"
  ON email_logs FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert email logs"
  ON email_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Email attachments temp policies
CREATE POLICY "Users can view own email attachments"
  ON email_attachments_temp FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM email_logs
      WHERE email_logs.id = email_attachments_temp.email_log_id
      AND email_logs.user_id = auth.uid()
    )
  );

CREATE POLICY "System can insert email attachments"
  ON email_attachments_temp FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "System can update email attachments"
  ON email_attachments_temp FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Function to generate unique email address
CREATE OR REPLACE FUNCTION generate_unique_email_address()
RETURNS text AS $$
DECLARE
  new_address text;
  address_exists boolean;
BEGIN
  LOOP
    -- Generate random 12-character alphanumeric string
    new_address := lower(substr(md5(random()::text || clock_timestamp()::text), 1, 12)) || '@bragledger.com';

    -- Check if address already exists
    SELECT EXISTS(SELECT 1 FROM email_settings WHERE unique_email_address = new_address) INTO address_exists;

    -- Exit loop if unique
    IF NOT address_exists THEN
      EXIT;
    END IF;
  END LOOP;

  RETURN new_address;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update email_settings updated_at
CREATE TRIGGER update_email_settings_updated_at BEFORE UPDATE ON email_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create email settings when profile is created
CREATE OR REPLACE FUNCTION create_default_email_settings()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO email_settings (user_id, unique_email_address)
  VALUES (NEW.id, generate_unique_email_address());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to create email settings for new users
CREATE TRIGGER profile_created_email_settings AFTER INSERT ON profiles
  FOR EACH ROW EXECUTE FUNCTION create_default_email_settings();

-- Function to clean up expired temp attachments
CREATE OR REPLACE FUNCTION cleanup_expired_attachments()
RETURNS void AS $$
BEGIN
  DELETE FROM email_attachments_temp
  WHERE expires_at < now() AND processed = false;
END;
$$ LANGUAGE plpgsql;