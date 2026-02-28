import { createClient } from '@supabase/supabase-js';

// These environment variables will be set in Vercel
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for memories
export interface Memory {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: 'couple' | 'family' | 'pet' | 'special';
  date: string;
  created_at?: string;
}

// Helper functions for memories
export async function getMemories() {
  const { data, error } = await supabase
    .from('memories')
    .select('*')
    .order('date', { ascending: false });
  
  if (error) throw error;
  return data as Memory[];
}

export async function addMemory(memory: Omit<Memory, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('memories')
    .insert([memory])
    .select()
    .single();
  
  if (error) throw error;
  return data as Memory;
}

export async function deleteMemory(id: string) {
  const { error } = await supabase
    .from('memories')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}
