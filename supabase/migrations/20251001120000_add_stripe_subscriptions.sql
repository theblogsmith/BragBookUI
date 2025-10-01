/*
  # Add Stripe Subscription Management

  ## Overview
  This migration adds complete subscription management functionality for Stripe payments,
  including subscription tracking, payment history, and feature access control.

  ## New Tables

  ### `subscriptions`
  - `id` (uuid, primary key) - Unique subscription identifier
  - `user_id` (uuid, foreign key) - References profiles.id
  - `stripe_customer_id` (text) - Stripe customer ID
  - `stripe_subscription_id` (text, optional) - Stripe subscription ID (null for free tier)
  - `plan_type` (text) - Subscription plan: 'free', 'pro', 'team'
  - `billing_period` (text, optional) - Billing period: 'monthly', 'annual' (null for free)
  - `status` (text) - Subscription status: 'active', 'cancelled', 'past_due', 'incomplete'
  - `current_period_start` (timestamptz, optional) - Current billing period start
  - `current_period_end` (timestamptz, optional) - Current billing period end
  - `cancel_at_period_end` (boolean) - Whether subscription cancels at period end
  - `created_at` (timestamptz) - Subscription creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `payment_events`
  - `id` (uuid, primary key) - Unique event identifier
  - `user_id` (uuid, foreign key) - References profiles.id
  - `stripe_event_id` (text) - Stripe event ID for idempotency
  - `event_type` (text) - Event type (e.g., 'payment_succeeded', 'subscription_created')
  - `amount` (integer, optional) - Amount in cents
  - `currency` (text, optional) - Currency code
  - `status` (text) - Event processing status
  - `metadata` (jsonb) - Additional event data
  - `created_at` (timestamptz) - Event timestamp

  ## Profile Updates
  - Add `current_plan` column to profiles (default 'free')
  - Add `stripe_customer_id` column to profiles
  - Add `subscription_status` column to profiles (default 'active')

  ## Functions
  - `get_user_entry_limit` - Returns entry limit based on user's current plan
  - `check_can_create_entry` - Validates if user can create more entries

  ## Security
  - Row Level Security enabled on all new tables
  - Users can read their own subscription data
  - Only service role can write subscription data
  - Payment events are read-only for users

  ## Important Notes
  1. Free tier users have limit of 20 entries
  2. Pro and Team tier users have unlimited entries
  3. Stripe webhook events will update subscription status
  4. All monetary amounts stored in cents
  5. Timestamps track billing periods for accurate access control
*/

-- Add subscription-related columns to profiles table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'current_plan'
  ) THEN
    ALTER TABLE profiles ADD COLUMN current_plan text DEFAULT 'free' CHECK (current_plan IN ('free', 'pro', 'team'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'stripe_customer_id'
  ) THEN
    ALTER TABLE profiles ADD COLUMN stripe_customer_id text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'subscription_status'
  ) THEN
    ALTER TABLE profiles ADD COLUMN subscription_status text DEFAULT 'active' CHECK (subscription_status IN ('active', 'cancelled', 'past_due', 'incomplete'));
  END IF;
END $$;

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  stripe_customer_id text NOT NULL,
  stripe_subscription_id text,
  plan_type text NOT NULL DEFAULT 'free' CHECK (plan_type IN ('free', 'pro', 'team')),
  billing_period text CHECK (billing_period IN ('monthly', 'annual')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'past_due', 'incomplete')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create payment_events table
CREATE TABLE IF NOT EXISTS payment_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  stripe_event_id text NOT NULL UNIQUE,
  event_type text NOT NULL,
  amount integer,
  currency text,
  status text NOT NULL DEFAULT 'processed',
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer_id ON subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_subscription_id ON subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_payment_events_user_id ON payment_events(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_events_stripe_event_id ON payment_events(stripe_event_id);
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer_id ON profiles(stripe_customer_id);

-- Enable Row Level Security
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_events ENABLE ROW LEVEL SECURITY;

-- Subscriptions policies
CREATE POLICY "Users can view own subscription"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all subscriptions"
  ON subscriptions FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Payment events policies
CREATE POLICY "Users can view own payment events"
  ON payment_events FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all payment events"
  ON payment_events FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Function to get user's entry limit based on plan
CREATE OR REPLACE FUNCTION get_user_entry_limit(p_user_id uuid)
RETURNS integer AS $$
DECLARE
  v_plan text;
BEGIN
  SELECT current_plan INTO v_plan
  FROM profiles
  WHERE id = p_user_id;

  CASE v_plan
    WHEN 'free' THEN RETURN 20;
    WHEN 'pro' THEN RETURN -1;
    WHEN 'team' THEN RETURN -1;
    ELSE RETURN 20;
  END CASE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user can create more entries
CREATE OR REPLACE FUNCTION check_can_create_entry(p_user_id uuid)
RETURNS boolean AS $$
DECLARE
  v_limit integer;
  v_count integer;
BEGIN
  v_limit := get_user_entry_limit(p_user_id);

  IF v_limit = -1 THEN
    RETURN true;
  END IF;

  SELECT COUNT(*) INTO v_count
  FROM entries
  WHERE user_id = p_user_id;

  RETURN v_count < v_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update subscriptions updated_at timestamp
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to sync profile with subscription
CREATE OR REPLACE FUNCTION sync_profile_subscription()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles
  SET
    current_plan = NEW.plan_type,
    subscription_status = NEW.status,
    stripe_customer_id = NEW.stripe_customer_id,
    updated_at = now()
  WHERE id = NEW.user_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to sync profile when subscription changes
CREATE TRIGGER sync_profile_on_subscription_change
  AFTER INSERT OR UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION sync_profile_subscription();
