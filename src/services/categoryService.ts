import { supabase, Category } from '../lib/supabase';

export async function fetchCategories(userId: string) {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('user_id', userId)
    .order('name');

  if (error) throw error;
  return data as Category[];
}

export async function createCategory(name: string, userId: string, color?: string) {
  const { data, error } = await supabase
    .from('categories')
    .insert({ name, user_id: userId, color: color || null })
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      const { data: existingCategory, error: fetchError } = await supabase
        .from('categories')
        .select('*')
        .eq('name', name)
        .eq('user_id', userId)
        .maybeSingle();

      if (fetchError) throw fetchError;
      if (existingCategory) return existingCategory as Category;
    }
    throw error;
  }

  return data as Category;
}

export async function updateCategory(categoryId: string, updates: { name?: string; color?: string }) {
  const { data, error } = await supabase
    .from('categories')
    .update(updates)
    .eq('id', categoryId)
    .select()
    .single();

  if (error) throw error;
  return data as Category;
}

export async function deleteCategory(categoryId: string) {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', categoryId);

  if (error) throw error;
}
