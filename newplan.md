# Qurayt — The New Plan (No Weaviate Edition 🚀)

Qurayt is an AI-powered tool to find the best real UI inspiration from Dribbble, Behance, and similar platforms — instantly, intelligently, and beautifully.

---

## ✅ What this version does:

- Takes a **natural language query** like:
  > "dark mode onboarding in fintech"

- Uses **OpenAI embeddings** to convert that text into a **vector**.
- Searches a **Supabase (pgvector)** table of tagged UI screenshots.
- Shows visual results: thumbnails, tags, source (like Dribbble).
- Works fully client-server with **Next.js + Supabase backend**.
- No Weaviate, Pinecone, or heavy infra.

---

## 🧠 How Semantic Search Works (Simplified)

1. User types: "dark mode login screen"
2. `openai.ts` → gets embedding from OpenAI API
3. `search.ts` → uses pgvector to find similar UI entries
4. UI data fetched from Supabase table: includes title, tags, URL, image
5. Frontend renders grid results beautifully

---

## 🔧 Tech Stack

**Frontend**
- Next.js App Router
- Tailwind CSS + ShadCN
- Zustand (optional)
- next-themes (dark mode)

**Backend**
- Supabase (Postgres + pgvector)
- Supabase Storage (UI thumbnails)
- OpenAI embeddings (text-embedding-3-small)

**Infra**
- Vercel (frontend/backend)
- Supabase (auth, db, vector)
- Cron jobs (for scraping later)

**Other**
- Plausible or Vercel Analytics (usage)
- GitHub + Vercel CI/CD

---

## ✨ MVP Features

1. 🔎 Search with prompt (semantic)
2. 🖼️ Visual gallery with real UI screenshots
3. 📁 Tags: minimal, dark mode, form, onboarding
4. 🌗 Dark/light mode toggle
5. 🎯 Filters by platform/style (optional)
6. 🤍 Footer message — "Designed with ❤️ based on Khushi's idea"

---

## ✅ Next Steps

Ask Cursor to:

1. Delete any code related to Weaviate or previous backend
2. Set up:
    - Supabase client
    - OpenAI integration
    - Embedding + pgvector search system
3. Generate detailed `tasks.md` with clear actionables
4. Keep UI as-is — no changes


/app
  /api
    /search/route.ts         → Calls OpenAI, then pgvector search
    /scrape/route.ts         → Future: to get real-time UI screenshots
  /gallery                   → Display all matched UIs
  /features
  /use-cases
  /(marketing)               → Hero, how it works, footer

/components
  /ui                        → Shadcn-based Button, Card, Input, etc.
  /layout.tsx
  /navbar.tsx
  /footer.tsx

/lib
  openai.ts                  → OpenAI embedding utils
  supabase.ts                → Supabase client
  search.ts                  → pgvector semantic search logic
  db.ts                      → helper for querying Supabase SQL

/types
  ui.ts                      → UI result structure
  search.ts                  → Search types

/utils
  fetchUIs.ts                → Utility to fetch DB UIs
  parsePrompt.ts             → Refine incoming query

/public
  /images
  /logo.svg

.env.local
README.md
newplan.md                  ← (You're about to add this)
tasks.md                    ← (Cursor will generate this)


💡 Final Tech Stack for Qurayt
Layer	Tool	Reason
Frontend	Next.js (App Router) + Tailwind CSS	Fast, modern, minimal
State Mgmt	Zustand (or built-in useState)	Dead simple
Components	shadcn/ui + custom	For fast iteration
Dark Mode	next-themes	Easy toggler
Backend	Supabase	Handles auth, DB, storage, vector search
Semantic AI	OpenAI Embeddings (text-embedding-3-small)	Best for understanding user queries
Search	Supabase Vector (pgvector)	No Weaviate. Cheaper, simpler, solid
Scraping (Later)	Playwright	To crawl Dribbble/Behance
Deployment	Vercel	Free tier is perfect for MVP
Analytics	Plausible or Vercel Insights	Simple and clean 