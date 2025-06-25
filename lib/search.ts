// lib/search.ts
// Semantic search logic using Supabase pgvector for Qurayt.

import { supabase } from './supabase';
import type { UI } from '../types/ui';

/**
 * Search for the most similar UI entries to a given embedding.
 * @param embedding The query embedding vector
 * @param limit Number of results to return (default 12)
 */
export async function searchUIs(embedding: number[], limit = 12): Promise<UI[]> {
  // Supabase SQL: ORDER BY embedding <#> '[...]'::vector ASC (cosine distance)
  const { data, error } = await supabase.rpc('match_ui_screenshots', {
    query_embedding: embedding,
    match_count: limit,
  });
  if (error) throw error;
  return data as UI[];
}

// Note: Requires a Postgres function 'match_ui_screenshots' defined in Supabase:
// CREATE FUNCTION match_ui_screenshots(query_embedding vector(1536), match_count int)
// RETURNS TABLE (...columns...) AS $$
//   SELECT * FROM ui_screenshots
//   ORDER BY embedding <#> query_embedding
//   LIMIT match_count;
// $$ LANGUAGE sql STABLE; 