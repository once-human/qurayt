# qurayt – Product Overview

## What is qurayt?
qurayt is a web app that helps UI/UX designers, frontend developers, and indie hackers find real-life UI inspiration quickly. Users type a natural language prompt (e.g., "dark mode product card with see more button"), and qurayt returns relevant UI screenshots from platforms like Dribbble (and later Behance). Clicking a result takes the user to the original source for further exploration.

## Who is it for?
- UI/UX Designers
- Frontend Developers
- Indie Hackers
- Anyone seeking UI inspiration without endless scrolling

## Core Features (MVP)
- **AI-powered search:** Type natural language, get matching UI shots
- **Screenshot grid:** Clean gallery of results with hover/click details
- **Link to original:** Click a result to visit Dribbble or Behance
- **Optional filters:** Platform (web/mobile), style (minimal, bold)
- **Caching layer:** Avoid slow API calls on every search

## Tech Stack
| Layer         | Tech                                 | Why                                  |
|--------------|--------------------------------------|--------------------------------------|
| Frontend     | Next.js + Tailwind CSS               | Easy SSR, fast, familiar             |
| API Backend  | Next.js API routes                   | Simpler deployment                   |
| Search       | Weaviate (self-hosted vector DB)     | Semantic search engine               |
| AI           | OpenAI Embeddings (text-embedding-3-small) | Converts prompts into meaning |
| Data Source  | Dribbble API (Behance later)         | Search design shots                  |
| Storage      | Redis or Supabase (optional)         | Cache recent queries                 |
| Deployment   | Vercel                               | Easy, free                           |
| Auth         | None for MVP                         | Skip for now                         |
| State Mgmt   | Next.js hooks + SWR                  | Keep it minimal                      |

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

## Implementation Phases
### Phase 1: MVP (Dribbble Only)
- Minimal UI: input, search button, result grid
- Backend: Dribbble API integration, search API
- AI: OpenAI embeddings, Weaviate vector search
- Result display: images, tags, links
- Deploy to Vercel

### Phase 2: Caching + Behance
- Add Behance API
- Add Redis/Supabase caching
- Merge/multi-source results, add filters

### Phase 3: Advanced Features
- Favorites board
- Reverse image search
- Figma/Chrome plugin
- Auto-tagging (GPT-4 Vision)

## API Keys & Accounts Needed
- OpenAI
- Dribbble
- Weaviate
- Vercel
- Redis/Supabase (optional)

## Timeline Estimate
- Setup + Dribbble API: 1 day
- OpenAI embeddings + Weaviate: 1–2 days
- Build frontend search & display: 1–2 days
- Deploy MVP: 1 day
- **Total:** ~1 week 