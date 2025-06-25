// lib/openai.ts
// Utility to get text embeddings from OpenAI (text-embedding-3-small) for Qurayt semantic search.

import fetch from 'node-fetch';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
const OPENAI_EMBEDDING_MODEL = 'text-embedding-3-small';

// Type for OpenAI embeddings API response
interface OpenAIEmbeddingsResponse {
  data: Array<{
    embedding: number[];
    index: number;
    object: string;
  }>;
  model: string;
  object: string;
  usage: {
    prompt_tokens: number;
    total_tokens: number;
  };
}

export async function getEmbedding(text: string): Promise<number[]> {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      input: text,
      model: OPENAI_EMBEDDING_MODEL,
    }),
  });
  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
  }
  const data = (await response.json()) as OpenAIEmbeddingsResponse;
  return data.data[0].embedding;
} 