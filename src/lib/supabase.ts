import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Entry = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  achievement_date: string;
  privacy_level: 'private' | 'team' | 'organization';
  category_id: string | null;
  created_at: string;
  updated_at: string;
};

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  default_privacy: 'private' | 'team' | 'organization';
  notification_preferences: {
    weekly_reminder: boolean;
    share_notifications: boolean;
    endorsement_notifications: boolean;
  };
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: string;
  user_id: string;
  name: string;
  color: string | null;
  created_at: string;
};

export type Tag = {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
};

export type Attachment = {
  id: string;
  entry_id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  created_at: string;
};

export type EntryShare = {
  id: string;
  entry_id: string;
  shared_by: string;
  shared_with: string;
  viewed: boolean;
  viewed_at: string | null;
  created_at: string;
};

export type Endorsement = {
  id: string;
  entry_id: string;
  endorser_id: string;
  comment: string | null;
  created_at: string;
};

export type Notification = {
  id: string;
  user_id: string;
  type: 'share' | 'endorsement' | 'reminder' | 'system';
  title: string;
  message: string;
  related_entry_id: string | null;
  read: boolean;
  created_at: string;
};
