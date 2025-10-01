import { supabase } from '../lib/supabase';

export interface EmailSettings {
  user_id: string;
  unique_email_address: string;
  email_enabled: boolean;
  weekly_prompt_enabled: boolean;
  prompt_day_of_week: number;
  prompt_time: string;
  prompt_timezone: string;
  additional_prompt_days: number[];
  last_prompt_sent_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface EmailLog {
  id: string;
  user_id: string;
  email_type: 'prompt_sent' | 'entry_received' | 'error';
  from_address: string;
  to_address: string;
  subject: string;
  body_preview: string | null;
  entries_created: number;
  error_message: string | null;
  raw_email_id: string | null;
  processed: boolean;
  created_at: string;
}

export async function fetchEmailSettings(userId: string): Promise<EmailSettings | null> {
  const { data, error } = await supabase
    .from('email_settings')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching email settings:', error);
    throw error;
  }

  return data;
}

export async function updateEmailSettings(
  userId: string,
  settings: Partial<Omit<EmailSettings, 'user_id' | 'unique_email_address' | 'created_at' | 'updated_at'>>
): Promise<EmailSettings> {
  const { data, error } = await supabase
    .from('email_settings')
    .update(settings)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating email settings:', error);
    throw error;
  }

  return data;
}

export async function fetchEmailLogs(userId: string, limit = 50): Promise<EmailLog[]> {
  const { data, error } = await supabase
    .from('email_logs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching email logs:', error);
    throw error;
  }

  return data || [];
}

export async function sendTestEmail(userId: string): Promise<void> {
  const settings = await fetchEmailSettings(userId);

  if (!settings) {
    throw new Error('Email settings not found');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('email, full_name')
    .eq('id', userId)
    .single();

  if (!profile) {
    throw new Error('Profile not found');
  }

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const response = await fetch(`${supabaseUrl}/functions/v1/send-test-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      userId,
      email: profile.email,
      name: profile.full_name,
      uniqueEmailAddress: settings.unique_email_address,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to send test email: ${error}`);
  }
}
