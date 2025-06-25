// lib/db.ts
// Supabase SQL helper for Qurayt. Provides functions to fetch and insert UI entries.

import { supabase } from './supabase';
import type { UI } from '../types/ui';

// Fetch UI entries by an array of IDs
export async function fetchUIs(ids: string[]): Promise<UI[]> {
  const { data, error } = await supabase
    .from('ui_screenshots')
    .select('*')
    .in('id', ids);
  if (error) throw error;
  return data as UI[];
}

// Insert a new UI entry
export async function insertUI(ui: Omit<UI, 'id'>): Promise<UI> {
  const { data, error } = await supabase
    .from('ui_screenshots')
    .insert([ui])
    .select()
    .single();
  if (error) throw error;
  return data as UI;
}

// Optionally, a generic query helper
export async function query(table: string, filters: Record<string, any>) {
  let q = supabase.from(table).select('*');
  for (const key in filters) {
    q = q.eq(key, filters[key]);
  }
  const { data, error } = await q;
  if (error) throw error;
  return data;
} 