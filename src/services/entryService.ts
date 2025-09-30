import { supabase, Entry } from '../lib/supabase';

export type EntryWithDetails = Entry & {
  category?: { id: string; name: string; color: string | null } | null;
  tags?: Array<{ id: string; name: string }>;
  attachments?: Array<{ id: string; file_name: string; file_path: string; file_type: string; file_size: number }>;
  endorsements?: Array<{
    id: string;
    endorser: { full_name: string; email: string };
    comment: string | null;
    created_at: string;
  }>;
  shares?: Array<{
    id: string;
    shared_with_user: { full_name: string; email: string };
    viewed: boolean;
    created_at: string;
  }>;
};

export async function fetchEntries(userId: string) {
  const { data, error } = await supabase
    .from('entries')
    .select(`
      *,
      category:categories(id, name, color),
      entry_tags(tag:tags(id, name)),
      attachments(id, file_name, file_path, file_type, file_size),
      endorsements(
        id,
        comment,
        created_at,
        endorser:profiles(full_name, email)
      ),
      entry_shares(
        id,
        viewed,
        created_at,
        shared_with_user:profiles!entry_shares_shared_with_fkey(full_name, email)
      )
    `)
    .eq('user_id', userId)
    .order('achievement_date', { ascending: false });

  if (error) throw error;

  return data.map((entry: any) => ({
    ...entry,
    tags: entry.entry_tags?.map((et: any) => et.tag) || [],
    shares: entry.entry_shares?.map((share: any) => ({
      ...share,
      shared_with_user: share.shared_with_user
    })) || []
  })) as EntryWithDetails[];
}

export async function fetchEntryById(entryId: string) {
  const { data, error } = await supabase
    .from('entries')
    .select(`
      *,
      category:categories(id, name, color),
      entry_tags(tag:tags(id, name)),
      attachments(id, file_name, file_path, file_type, file_size, created_at),
      endorsements(
        id,
        comment,
        created_at,
        endorser:profiles(full_name, email)
      ),
      entry_shares(
        id,
        viewed,
        created_at,
        shared_with_user:profiles!entry_shares_shared_with_fkey(full_name, email)
      )
    `)
    .eq('id', entryId)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return {
    ...data,
    tags: data.entry_tags?.map((et: any) => et.tag) || [],
    shares: data.entry_shares?.map((share: any) => ({
      ...share,
      shared_with_user: share.shared_with_user
    })) || []
  } as EntryWithDetails;
}

export async function createEntry(entry: {
  title: string;
  description: string;
  achievement_date: string;
  privacy_level: 'private' | 'team' | 'organization';
  category_id?: string | null;
  user_id: string;
}) {
  const { data, error } = await supabase
    .from('entries')
    .insert(entry)
    .select()
    .single();

  if (error) throw error;
  return data as Entry;
}

export async function updateEntry(
  entryId: string,
  updates: Partial<Omit<Entry, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
) {
  const { data, error } = await supabase
    .from('entries')
    .update(updates)
    .eq('id', entryId)
    .select()
    .single();

  if (error) throw error;
  return data as Entry;
}

export async function deleteEntry(entryId: string) {
  const { error } = await supabase
    .from('entries')
    .delete()
    .eq('id', entryId);

  if (error) throw error;
}

export async function addTagsToEntry(entryId: string, tagIds: string[]) {
  const entryTags = tagIds.map(tagId => ({
    entry_id: entryId,
    tag_id: tagId
  }));

  const { error } = await supabase
    .from('entry_tags')
    .insert(entryTags);

  if (error) throw error;
}

export async function removeTagFromEntry(entryId: string, tagId: string) {
  const { error } = await supabase
    .from('entry_tags')
    .delete()
    .eq('entry_id', entryId)
    .eq('tag_id', tagId);

  if (error) throw error;
}

export async function shareEntry(entryId: string, sharedBy: string, sharedWith: string) {
  const { data, error } = await supabase
    .from('entry_shares')
    .insert({
      entry_id: entryId,
      shared_by: sharedBy,
      shared_with: sharedWith
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function markShareAsViewed(shareId: string) {
  const { error } = await supabase
    .from('entry_shares')
    .update({ viewed: true, viewed_at: new Date().toISOString() })
    .eq('id', shareId);

  if (error) throw error;
}

export async function addEndorsement(entryId: string, endorserId: string, comment?: string) {
  const { data, error } = await supabase
    .from('endorsements')
    .insert({
      entry_id: entryId,
      endorser_id: endorserId,
      comment: comment || null
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateEndorsement(endorsementId: string, comment: string) {
  const { error } = await supabase
    .from('endorsements')
    .update({ comment })
    .eq('id', endorsementId);

  if (error) throw error;
}

export async function deleteEndorsement(endorsementId: string) {
  const { error } = await supabase
    .from('endorsements')
    .delete()
    .eq('id', endorsementId);

  if (error) throw error;
}
