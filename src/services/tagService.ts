import { supabase, Tag } from '../lib/supabase';

export async function fetchTags(userId: string) {
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .eq('user_id', userId)
    .order('name');

  if (error) throw error;
  return data as Tag[];
}

export async function createTag(name: string, userId: string) {
  const { data, error } = await supabase
    .from('tags')
    .insert({ name, user_id: userId })
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      const { data: existingTag, error: fetchError } = await supabase
        .from('tags')
        .select('*')
        .eq('name', name)
        .eq('user_id', userId)
        .maybeSingle();

      if (fetchError) throw fetchError;
      if (existingTag) return existingTag as Tag;
    }
    throw error;
  }

  return data as Tag;
}

export async function deleteTag(tagId: string) {
  const { error } = await supabase
    .from('tags')
    .delete()
    .eq('id', tagId);

  if (error) throw error;
}
