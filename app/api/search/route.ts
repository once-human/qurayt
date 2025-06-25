// app/api/search/route.ts
// API route for semantic search in Qurayt.

import { NextRequest, NextResponse } from 'next/server';
import { getEmbedding } from '../../../lib/openai';
import { searchUIs } from '../../../lib/search';
import { parsePrompt } from '../../../utils/parsePrompt';
import type { SearchRequest, SearchResponse } from '../../../types/search';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SearchRequest;
    const prompt = parsePrompt(body.prompt);
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required.' }, { status: 400 });
    }
    // Get embedding from OpenAI
    const embedding = await getEmbedding(prompt);
    // Query Supabase for similar UIs
    const results = await searchUIs(embedding, body.limit || 12);
    const response: SearchResponse = {
      results,
      total: results.length,
    };
    return NextResponse.json(response);
  } catch (err: any) {
    console.error('Search API error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
} 