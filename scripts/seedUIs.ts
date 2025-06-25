// scripts/seedUIs.ts
// Script to seed Supabase with UI screenshots and embeddings for Qurayt.
// Usage: npx tsx scripts/seedUIs.ts
//
// Sample JSON structure (save as seedUIs.json):
// [
//   {
//     "title": "Dark mode onboarding for fintech app",
//     "tags": ["dark mode", "onboarding", "fintech"],
//     "url": "https://dribbble.com/shots/12345678",
//     "image_url": "https://cdn.dribbble.com/users/123/screenshots/12345678/media/abc123.png",
//     "platform": "dribbble"
//   },
//   ...
// ]

import fs from 'fs/promises';
import path from 'path';
import { config } from 'dotenv';
config({ path: path.resolve(process.cwd(), '.env.local') });
import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
const OPENAI_EMBEDDING_MODEL = 'text-embedding-3-small';

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

async function main() {
  const filePath = path.resolve(process.cwd(), 'seedUIs.json');
  const raw = await fs.readFile(filePath, 'utf-8');
  const items = JSON.parse(raw);
  for (const item of items) {
    try {
      const embedding = await getEmbedding(item.title + ' ' + (item.tags || []).join(' '));
      const { error } = await supabase.from('ui_screenshots').insert([
        { ...item, embedding }
      ]);
      if (error) throw error;
      console.log(`Inserted: ${item.title}`);
    } catch (err) {
      console.error(`Failed to insert: ${item.title}`, err);
    }
  }
  console.log('Seeding complete.');
}

main(); 