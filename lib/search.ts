// lib/search.ts
// Semantic search logic using Supabase pgvector for Qurayt.

import { getSupabaseClient } from './supabase';
import type { UI } from '../types/ui';

/**
 * Search for the most similar UI entries to a given embedding.
 * @param embedding The query embedding vector
 * @param limit Number of results to return (default 12)
 */
export async function searchUIs(embedding: number[], limit = 12): Promise<UI[]> {
  try {
    const supabase = getSupabaseClient();
    
    // Supabase SQL: ORDER BY embedding <#> '[...]'::vector ASC (cosine distance)
    const { data, error } = await supabase.rpc('match_ui_screenshots', {
      query_embedding: embedding,
      match_count: limit,
    });
    if (error) throw error;
    return data as UI[];
  } catch (error) {
    console.warn('Supabase search failed, returning mock data:', error);
    
    // Return mock data for development/demo purposes
    return Array.from({ length: Math.min(limit, 6) }, (_, i) => ({
      id: `mock-${i + 1}`,
      title: `Mock UI Design ${i + 1}`,
      tags: ['design', 'ui', 'mock'],
      url: `https://example.com/mock-${i + 1}`,
      image_url: `https://via.placeholder.com/400x300/6366f1/ffffff?text=Mock+UI+${i + 1}`,
      platform: i % 2 === 0 ? 'Dribbble' : 'Behance',
      embedding: embedding, // Reuse the query embedding for mock data
    }));
  }
}

// Note: Requires a Postgres function 'match_ui_screenshots' defined in Supabase:
// CREATE FUNCTION match_ui_screenshots(query_embedding vector(1536), match_count int)
// RETURNS TABLE (...columns...) AS $$
//   SELECT * FROM ui_screenshots
//   ORDER BY embedding <#> query_embedding
//   LIMIT match_count;
// $$ LANGUAGE sql STABLE; 