// utils/fetchUIs.ts
// Utility to fetch UI data from Supabase for Qurayt.

import { supabase } from '../lib/supabase';
import type { UI } from '../types/ui';

export type FetchUIFilters = {
  platform?: string;
  tags?: string[];
  limit?: number;
};

export async function fetchUIsByFilter(filters: FetchUIFilters = {}): Promise<UI[]> {
  let query = supabase.from('ui_screenshots').select('*');
  if (filters.platform) {
    query = query.eq('platform', filters.platform);
  }
  if (filters.tags && filters.tags.length > 0) {
    // Assuming tags is a string[] column in Supabase
    for (const tag of filters.tags) {
      query = query.contains('tags', [tag]);
    }
  }
  if (filters.limit) {
    query = query.limit(filters.limit);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data as UI[];
} 