// scripts/fetchDribbbleToSupabase.ts
// Fetches shots from Dribbble API, generates OpenAI embeddings, and inserts them into Supabase.
// Usage: npx tsx scripts/fetchDribbbleToSupabase.ts
//
// Required env vars in .env.local:
// DRIBBBLE_ACCESS_TOKEN=your_dribbble_access_token
// OPENAI_API_KEY=your_openai_api_key
// NEXT_PUBLIC_SUPABASE_URL=...
// NEXT_PUBLIC_SUPABASE_ANON_KEY=...

import { config } from 'dotenv';
import path from 'path';
import fetch from 'node-fetch';
import { createClient } from '@supabase/supabase-js';
config({ path: path.resolve(process.cwd(), '.env.local') });

const DRIBBBLE_ACCESS_TOKEN = process.env.DRIBBBLE_ACCESS_TOKEN!;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const OPENAI_EMBEDDING_MODEL = 'text-embedding-3-small';

// Type for Dribbble shot
interface DribbbleShot {
  title: string;
  tags: string[];
  html_url: string;
  images?: {
    hidpi?: string;
    normal?: string;
    teaser?: string;
  };
}

async function getEmbedding(text: string): Promise<number[]> {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({ input: text, model: OPENAI_EMBEDDING_MODEL }),
  });
  if (!response.ok) throw new Error(`OpenAI error: ${response.status}`);
  const data: any = await response.json();
  return data.data[0].embedding;
}

async function fetchDribbbleShots(page = 1, perPage = 10): Promise<DribbbleShot[]> {
  const res = await fetch(`https://api.dribbble.com/v2/user/shots?page=${page}&per_page=${perPage}`, {
    headers: { Authorization: `Bearer ${DRIBBBLE_ACCESS_TOKEN}` },
  });
  if (!res.ok) throw new Error(`Dribbble API error: ${res.status}`);
  return (await res.json()) as DribbbleShot[];
}

async function main() {
  let page = 1;
  const perPage = 10;
  let totalInserted = 0;
  while (true) {
    const shots = await fetchDribbbleShots(page, perPage);
    if (!shots.length) break;
    for (const shot of shots) {
      try {
        const title = shot.title || '';
        const tags = shot.tags || [];
        const url = shot.html_url;
        const image_url = shot.images?.hidpi || shot.images?.normal || shot.images?.teaser;
        const platform = 'dribbble';
        const embedding = await getEmbedding(title + ' ' + tags.join(' '));
        const { error } = await supabase.from('ui_screenshots').insert([
          { title, tags, url, image_url, platform, embedding }
        ]);
        if (error) throw error;
        console.log(`Inserted: ${title}`);
        totalInserted++;
      } catch (err) {
        console.error('Failed to insert shot:', err);
      }
    }
    if (shots.length < perPage) break;
    page++;
  }
  console.log(`Done. Inserted ${totalInserted} shots.`);
}

main(); 