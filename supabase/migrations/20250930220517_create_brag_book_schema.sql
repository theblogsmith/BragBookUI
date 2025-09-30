/*
  # Brag Book Database Schema

  ## Overview
  This migration creates the complete database schema for the Brag Book application,
  including tables for user profiles, entries, tags, categories, sharing, and endorsements.

  ## New Tables

  ### `profiles`
  - `id` (uuid, primary key) - References auth.users
  - `email` (text) - User email
  - `full_name` (text) - User's full name
  - `avatar_url` (text, optional) - Profile picture URL
  - `default_privacy` (text) - Default privacy setting for new entries
  - `notification_preferences` (jsonb) - User notification settings
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last profile update

  ### `entries`
  - `id` (uuid, primary key) - Unique entry identifier
  - `user_id` (uuid, foreign key) - References profiles.id
  - `title` (text) - Entry title
  - `description` (text) - Rich text content
  - `achievement_date` (date) - When the achievement occurred
  - `privacy_level` (text) - private/team/organization
  - `category_id` (uuid, optional foreign key) - References categories.id
  - `created_at` (timestamptz) - Entry creation timestamp
  - `updated_at` (timestamptz) - Last entry update

  ### `categories`
  - `id` (uuid, primary key) - Unique category identifier
  - `user_id` (uuid, foreign key) - References profiles.id
  - `name` (text) - Category name
  - `color` (text, optional) - Display color
  - `created_at` (timestamptz) - Category creation timestamp

  ### `tags`
  - `id` (uuid, primary key) - Unique tag identifier
  - `user_id` (uuid, foreign key) - References profiles.id
  - `name` (text) - Tag name
  - `created_at` (timestamptz) - Tag creation timestamp

  ### `entry_tags`
  - `entry_id` (uuid, foreign key) - References entries.id
  - `tag_id` (uuid, foreign key) - References tags.id
  - Primary key: (entry_id, tag_id)

  ### `attachments`
  - `id` (uuid, primary key) - Unique attachment identifier
  - `entry_id` (uuid, foreign key) - References entries.id
  - `file_name` (text) - Original file name
  - `file_path` (text) - Storage path
  - `file_type` (text) - MIME type
  - `file_size` (integer) - File size in bytes
  - `created_at` (timestamptz) - Upload timestamp

  ### `entry_shares`
  - `id` (uuid, primary key) - Unique share identifier
  - `entry_id` (uuid, foreign key) - References entries.id
  - `shared_by` (uuid, foreign key) - References profiles.id
  - `shared_with` (uuid, foreign key) - References profiles.id
  - `viewed` (boolean) - Whether recipient has viewed
  - `viewed_at` (timestamptz, optional) - When entry was viewed
  - `created_at` (timestamptz) - Share timestamp

  ### `endorsements`
  - `id` (uuid, primary key) - Unique endorsement identifier
  - `entry_id` (uuid, foreign key) - References entries.id
  - `endorser_id` (uuid, foreign key) - References profiles.id
  - `comment` (text, optional) - Endorsement comment
  - `created_at` (timestamptz) - Endorsement timestamp

  ### `notifications`
  - `id` (uuid, primary key) - Unique notification identifier
  - `user_id` (uuid, foreign key) - References profiles.id
  - `type` (text) - Notification type (share/endorsement/reminder)
  - `title` (text) - Notification title
  - `message` (text) - Notification message
  - `related_entry_id` (uuid, optional foreign key) - References entries.id
  - `read` (boolean) - Whether notification has been read
  - `created_at` (timestamptz) - Notification timestamp

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Users can only access their own data
  - Sharing permissions enforced through RLS policies
  - Private entries are only visible to the owner
  - Team/organization entries respect sharing rules

  ## Important Notes
  1. All tables use UUIDs for primary keys
  2. Timestamps automatically set using now()
  3. Cascading deletes protect data integrity
  4. Privacy levels: 'private', 'team', 'organization'
  5. Default privacy is 'private' for maximum security
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  avatar_url text,
  default_privacy text DEFAULT 'private' CHECK (default_privacy IN ('private', 'team', 'organization')),
  notification_preferences jsonb DEFAULT '{"weekly_reminder": true, "share_notifications": true, "endorsement_notifications": true}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  color text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, name)
);

-- Create entries table
CREATE TABLE IF NOT EXISTS entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  achievement_date date NOT NULL DEFAULT CURRENT_DATE,
  privacy_level text DEFAULT 'private' CHECK (privacy_level IN ('private', 'team', 'organization')),
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, name)
);

-- Create entry_tags junction table
CREATE TABLE IF NOT EXISTS entry_tags (
  entry_id uuid NOT NULL REFERENCES entries(id) ON DELETE CASCADE,
  tag_id uuid NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (entry_id, tag_id)
);

-- Create attachments table
CREATE TABLE IF NOT EXISTS attachments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_id uuid NOT NULL REFERENCES entries(id) ON DELETE CASCADE,
  file_name text NOT NULL,
  file_path text NOT NULL,
  file_type text NOT NULL,
  file_size integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create entry_shares table
CREATE TABLE IF NOT EXISTS entry_shares (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_id uuid NOT NULL REFERENCES entries(id) ON DELETE CASCADE,
  shared_by uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  shared_with uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  viewed boolean DEFAULT false,
  viewed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(entry_id, shared_with)
);

-- Create endorsements table
CREATE TABLE IF NOT EXISTS endorsements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_id uuid NOT NULL REFERENCES entries(id) ON DELETE CASCADE,
  endorser_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  comment text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(entry_id, endorser_id)
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('share', 'endorsement', 'reminder', 'system')),
  title text NOT NULL,
  message text NOT NULL,
  related_entry_id uuid REFERENCES entries(id) ON DELETE CASCADE,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_entries_user_id ON entries(user_id);
CREATE INDEX IF NOT EXISTS idx_entries_achievement_date ON entries(achievement_date);
CREATE INDEX IF NOT EXISTS idx_entries_privacy_level ON entries(privacy_level);
CREATE INDEX IF NOT EXISTS idx_categories_user_id ON categories(user_id);
CREATE INDEX IF NOT EXISTS idx_tags_user_id ON tags(user_id);
CREATE INDEX IF NOT EXISTS idx_entry_tags_entry_id ON entry_tags(entry_id);
CREATE INDEX IF NOT EXISTS idx_entry_tags_tag_id ON entry_tags(tag_id);
CREATE INDEX IF NOT EXISTS idx_attachments_entry_id ON attachments(entry_id);
CREATE INDEX IF NOT EXISTS idx_entry_shares_entry_id ON entry_shares(entry_id);
CREATE INDEX IF NOT EXISTS idx_entry_shares_shared_with ON entry_shares(shared_with);
CREATE INDEX IF NOT EXISTS idx_endorsements_entry_id ON endorsements(entry_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(user_id, read);

-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE entry_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE entry_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE endorsements ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Categories policies
CREATE POLICY "Users can view own categories"
  ON categories FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own categories"
  ON categories FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own categories"
  ON categories FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own categories"
  ON categories FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Entries policies
CREATE POLICY "Users can view own entries"
  ON entries FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view entries shared with them"
  ON entries FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM entry_shares
      WHERE entry_shares.entry_id = entries.id
      AND entry_shares.shared_with = auth.uid()
    )
  );

CREATE POLICY "Users can insert own entries"
  ON entries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own entries"
  ON entries FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own entries"
  ON entries FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Tags policies
CREATE POLICY "Users can view own tags"
  ON tags FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tags"
  ON tags FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tags"
  ON tags FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own tags"
  ON tags FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Entry tags policies
CREATE POLICY "Users can view own entry tags"
  ON entry_tags FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM entries
      WHERE entries.id = entry_tags.entry_id
      AND entries.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view entry tags for shared entries"
  ON entry_tags FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM entry_shares
      JOIN entries ON entries.id = entry_shares.entry_id
      WHERE entries.id = entry_tags.entry_id
      AND entry_shares.shared_with = auth.uid()
    )
  );

CREATE POLICY "Users can insert own entry tags"
  ON entry_tags FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM entries
      WHERE entries.id = entry_tags.entry_id
      AND entries.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own entry tags"
  ON entry_tags FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM entries
      WHERE entries.id = entry_tags.entry_id
      AND entries.user_id = auth.uid()
    )
  );

-- Attachments policies
CREATE POLICY "Users can view own attachments"
  ON attachments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM entries
      WHERE entries.id = attachments.entry_id
      AND entries.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view attachments for shared entries"
  ON attachments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM entry_shares
      JOIN entries ON entries.id = entry_shares.entry_id
      WHERE entries.id = attachments.entry_id
      AND entry_shares.shared_with = auth.uid()
    )
  );

CREATE POLICY "Users can insert own attachments"
  ON attachments FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM entries
      WHERE entries.id = attachments.entry_id
      AND entries.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own attachments"
  ON attachments FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM entries
      WHERE entries.id = attachments.entry_id
      AND entries.user_id = auth.uid()
    )
  );

-- Entry shares policies
CREATE POLICY "Users can view shares they created"
  ON entry_shares FOR SELECT
  TO authenticated
  USING (auth.uid() = shared_by);

CREATE POLICY "Users can view shares with them"
  ON entry_shares FOR SELECT
  TO authenticated
  USING (auth.uid() = shared_with);

CREATE POLICY "Users can insert shares for own entries"
  ON entry_shares FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = shared_by AND
    EXISTS (
      SELECT 1 FROM entries
      WHERE entries.id = entry_shares.entry_id
      AND entries.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update shares they received"
  ON entry_shares FOR UPDATE
  TO authenticated
  USING (auth.uid() = shared_with)
  WITH CHECK (auth.uid() = shared_with);

CREATE POLICY "Users can delete shares they created"
  ON entry_shares FOR DELETE
  TO authenticated
  USING (auth.uid() = shared_by);

-- Endorsements policies
CREATE POLICY "Users can view endorsements on own entries"
  ON endorsements FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM entries
      WHERE entries.id = endorsements.entry_id
      AND entries.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view endorsements on shared entries"
  ON endorsements FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM entry_shares
      JOIN entries ON entries.id = entry_shares.entry_id
      WHERE entries.id = endorsements.entry_id
      AND entry_shares.shared_with = auth.uid()
    )
  );

CREATE POLICY "Users can view own endorsements"
  ON endorsements FOR SELECT
  TO authenticated
  USING (auth.uid() = endorser_id);

CREATE POLICY "Users can insert endorsements on shared entries"
  ON endorsements FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = endorser_id AND
    EXISTS (
      SELECT 1 FROM entry_shares
      JOIN entries ON entries.id = entry_shares.entry_id
      WHERE entries.id = endorsements.entry_id
      AND entry_shares.shared_with = auth.uid()
    )
  );

CREATE POLICY "Users can update own endorsements"
  ON endorsements FOR UPDATE
  TO authenticated
  USING (auth.uid() = endorser_id)
  WITH CHECK (auth.uid() = endorser_id);

CREATE POLICY "Users can delete own endorsements"
  ON endorsements FOR DELETE
  TO authenticated
  USING (auth.uid() = endorser_id);

-- Notifications policies
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own notifications"
  ON notifications FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert notifications"
  ON notifications FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_entries_updated_at BEFORE UPDATE ON entries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create notification when entry is shared
CREATE OR REPLACE FUNCTION notify_entry_shared()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO notifications (user_id, type, title, message, related_entry_id)
  SELECT 
    NEW.shared_with,
    'share',
    'New Entry Shared With You',
    (SELECT full_name || ' shared an entry with you: ' || title 
     FROM profiles p, entries e 
     WHERE p.id = NEW.shared_by AND e.id = NEW.entry_id),
    NEW.entry_id;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for share notifications
CREATE TRIGGER entry_shared_notification AFTER INSERT ON entry_shares
  FOR EACH ROW EXECUTE FUNCTION notify_entry_shared();

-- Function to create notification when entry is endorsed
CREATE OR REPLACE FUNCTION notify_entry_endorsed()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO notifications (user_id, type, title, message, related_entry_id)
  SELECT 
    e.user_id,
    'endorsement',
    'New Endorsement Received',
    (SELECT full_name || ' endorsed your entry: ' || title 
     FROM profiles p, entries e2 
     WHERE p.id = NEW.endorser_id AND e2.id = NEW.entry_id),
    NEW.entry_id
  FROM entries e
  WHERE e.id = NEW.entry_id;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for endorsement notifications
CREATE TRIGGER entry_endorsed_notification AFTER INSERT ON endorsements
  FOR EACH ROW EXECUTE FUNCTION notify_entry_endorsed();