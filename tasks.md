# Qurayt — Tasks Breakdown

## 🧠 Tasks for Me (Founder/Owner)

- [ ] Set up a Supabase project (https://app.supabase.com)
- [ ] Create a Supabase database (Postgres)
- [ ] Enable pgvector extension in Supabase
- [ ] Create a table for UI screenshots (fields: id, title, tags, url, image_url, platform, embedding vector)
- [ ] Set up Supabase Storage bucket for UI thumbnails
- [ ] Get OpenAI API key (https://platform.openai.com)
- [ ] (Optional) Get Dribbble API key for future scraping
- [ ] (Optional) Prepare a CSV or JSON of initial UI screenshots to upload
- [ ] Add Supabase and OpenAI API keys to .env.local
- [ ] Set up Vercel project for deployment
- [ ] (Optional) Set up Plausible or Vercel Analytics
- [ ] (Optional) Upload logo.svg and any brand assets to /public/images

---

## 💻 Dev Tasks (Cursor/Engineering)

> **Note:** Next step is to automate and scale data ingestion from top platforms (Dribbble, Behance, etc).

### Supabase Integration
- [x] Write `/lib/supabase.ts` — Supabase client util *(complete)*
- [x] Write `/lib/openai.ts` — OpenAI embedding utility *(complete)*
- [x] Write `/lib/db.ts` — Helper for querying Supabase SQL *(complete)*
- [x] Write `/lib/search.ts` — Semantic search logic using pgvector *(complete)*

### API Routes
- [x] Create `/app/api/search/route.ts` — Accepts prompt, gets embedding, queries Supabase vector, returns results *(complete)*
- [ ] Create `/app/api/scrape/route.ts` — (Future) For scraping Dribbble/Behance

### Types & Utils
- [x] Define `/types/ui.ts` — UI result structure (id, title, tags, url, image_url, platform, embedding) *(complete)*
- [x] Define `/types/search.ts` — Search request/response types *(complete)*
- [x] Write `/utils/fetchUIs.ts` — Utility to fetch UI data from Supabase *(complete)*
- [x] Write `/utils/parsePrompt.ts` — Refine/clean incoming search prompt *(complete)*

### Frontend (if needed)
- [x] Connect frontend search bar to `/api/search` endpoint *(complete)*
- [⏳] Display real results from Supabase in the gallery grid *(in progress)*
- [⏳] Show tags, platform, and source link on each card *(in progress)*
- [ ] Add error/loading states for real API
- [ ] Add filter UI for platform/style (optional)

### Data Ingestion (Optional for MVP)
- [ ] Write script to batch upload UI screenshots and embeddings to Supabase
- [ ] Write script to generate embeddings for all existing UI entries
- [ ] Automate fetching and ingesting UI inspiration data from Dribbble, Behance, etc *(next step)*

### Deployment & Infra
- [ ] Add Supabase and OpenAI keys to Vercel project settings
- [ ] Test deployment on Vercel
- [ ] (Optional) Set up cron job for periodic scraping

### Docs & Misc
- [ ] Update README.md with new stack and setup instructions
- [ ] Document Supabase schema and API usage
- [ ] Document how to add new UI screenshots/assets

---

> Chip away at these tasks one at a time for a fast, industry-grade MVP. No Weaviate, no Pinecone — just Supabase + OpenAI for semantic search. UI stays premium and beautiful as built. 