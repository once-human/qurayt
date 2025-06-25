# qurayt – Project Plan

## Product Overview
A web app for UI/UX designers and developers to search for real-life UI screenshots using natural language prompts. The app returns relevant UI shots from platforms like Dribbble (and later Behance), allowing users to click through to the original source for inspiration.

---

## Phased Implementation

### PHASE 1: MVP – Dribbble-Only Semantic UI Search

#### 1. Project Setup
- [x] Initialize Next.js project with TypeScript
- [x] Move all files to correct directory (no nested qurayt/)
- [x] Set up Tailwind CSS (manual config due to CLI issues)
- [x] Configure project structure (see below, all folders/files scaffolded, including src/pages/api)
- [ ] Set up environment variables (.env.local)

> **Note:** Tailwind CLI was not working via npx/npm, so config files were created manually. The project now uses the classic src/pages and src/pages/api structure as planned, not the app/ directory.

#### 2. Frontend
- [ ] Build minimal search UI (input + button)
- [ ] Create grid layout for displaying results
- [ ] Implement ScreenshotCard component (image, title, link)
- [ ] Add loading and error states

#### 3. Backend/API
- [ ] Create API route for `/api/search` (handles user prompt)
- [ ] Create API route for `/api/fetch` (fetches Dribbble shots)
- [ ] Integrate Dribbble API (fetch title, image, url for shots)
- [ ] Store top 10 results per search

#### 4. AI & Search
- [ ] Set up OpenAI API (text-embedding-3-small)
- [ ] Create embedding logic for Dribbble shot titles
- [ ] Set up Weaviate (self-hosted or cloud) and connect from backend
- [ ] Store embeddings in Weaviate
- [ ] On user search: embed prompt, query Weaviate, return top 10 matches

#### 5. Result Display
- [ ] Show images, tags, and links in frontend grid
- [ ] Ensure clicking a card opens the original Dribbble shot

#### 6. Deployment
- [ ] Deploy MVP to Vercel

---

### PHASE 2: Caching & Multi-Source

- [ ] Add Behance API integration
- [ ] Add Redis or Supabase for caching previous results
- [ ] Merge and deduplicate results from Dribbble + Behance
- [ ] Add source/platform filter in UI

---

### PHASE 3: Advanced Features (Optional)

- [ ] Save favorite UI examples to a board (local or user account)
- [ ] Reverse search: upload screenshot → find similar UIs
- [ ] Figma plugin or Chrome extension
- [ ] Auto-tagging with GPT-4 Vision

---

## Project Structure (Suggested)

```
qurayt/
├── public/
│   └── logo.svg
├── src/
│   ├── pages/
│   │   ├── index.tsx         # Search Page
│   │   └── api/
│   │       ├── search.ts     # Handles user prompt
│   │       └── fetch.ts      # Dribbble fetch logic
│   ├── components/
│   │   ├── SearchInput.tsx
│   │   ├── ResultGrid.tsx
│   │   └── ScreenshotCard.tsx
│   ├── lib/
│   │   ├── embeddings.ts     # OpenAI wrapper
│   │   ├── weaviate.ts       # Weaviate client
│   │   └── cache.ts          # Optional Redis/Supabase cache
│   └── styles/
│       └── globals.css
├── .env.local
├── next.config.js
├── package.json
└── README.md
```

---

## API Keys & Accounts Needed
- [ ] OpenAI (embeddings)
- [ ] Dribbble (API access)
- [ ] Weaviate (cloud or self-hosted)
- [ ] Vercel (deployment)
- [ ] Redis/Supabase (optional, for caching)

---

## Technical Notes
- **No authentication for MVP**
- **Minimal state management:** Next.js hooks + SWR
- **Focus on speed and clean UX**
- **Handle API rate limits and errors gracefully**

---

## Timeline Estimate
| Task                              | Time      |
|-----------------------------------|-----------|
| Setup + Dribbble API              | 1 day     |
| OpenAI embeddings + Weaviate      | 1–2 days  |
| Build frontend search & display   | 1–2 days  |
| Deploy MVP to Vercel              | 1 day     |
| **Total (MVP)**                   | ~1 week   |

---

## Next Steps
1. Set up Next.js project and Tailwind CSS (done)
2. Move files to correct directory (done)
3. Implement Dribbble API integration
4. Set up OpenAI and Weaviate
5. Build frontend search and result grid
6. Deploy MVP
7. Iterate on feedback and add Phase 2 features 