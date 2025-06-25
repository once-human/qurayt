'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import ThemeSwitcher from '../components/ThemeSwitcher';
import SearchInput from '../components/SearchInput';
import ResultGrid from '../components/ResultGrid';

function FloatingCards() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <div className="absolute top-10 left-1/4 w-48 h-32 bg-white/60 dark:bg-neutral-800/60 rounded-2xl shadow-xl blur-2xl rotate-6" />
      <div className="absolute top-40 right-1/4 w-56 h-36 bg-blue-100/60 dark:bg-blue-900/40 rounded-2xl shadow-xl blur-2xl -rotate-3" />
      <div className="absolute bottom-10 left-1/3 w-40 h-24 bg-indigo-100/60 dark:bg-indigo-900/40 rounded-xl shadow-lg blur-2xl rotate-12" />
      <div className="absolute bottom-24 right-1/3 w-32 h-20 bg-pink-100/60 dark:bg-pink-900/40 rounded-xl shadow-lg blur-2xl -rotate-12" />
    </div>
  );
}

function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-6 absolute top-0 left-0 z-20">
      <div className="flex items-center gap-1">
        <span className="text-2xl font-extrabold text-blue-600 tracking-tight">Q</span>
        <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight -ml-1">urayt</span>
      </div>
      <div className="flex items-center gap-6 text-gray-700 dark:text-gray-200 font-medium text-base">
        <a href="#how" className="hover:text-blue-500 transition">How it works</a>
        <a href="#gallery" className="hover:text-blue-500 transition">Gallery</a>
        <a href="#usecases" className="hover:text-blue-500 transition">Use Cases</a>
        <a href="#features" className="hover:text-blue-500 transition">Features</a>
        <ThemeSwitcher className="ml-4" />
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="w-full py-8 px-4 flex items-center justify-between bg-gradient-to-t from-black/10 via-transparent to-transparent dark:from-white/5 border-t border-gray-200 dark:border-neutral-800 mt-24 relative">
      <div className="flex items-center gap-1">
        <span className="text-xl font-extrabold text-blue-600">Q</span>
        <span className="font-bold text-gray-900 dark:text-white -ml-1">urayt</span>
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center w-full pointer-events-none">
        <span className="text-xs text-gray-200 dark:text-gray-400 text-center pointer-events-auto">Designed with <span className="text-red-500">❤️</span> | Inspired by <a href="https://khushibanthia.framer.website" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">Khushi Banthia</a>’s brilliant idea.</span>
      </div>
      <div className="flex gap-6 text-gray-500 dark:text-gray-400 text-sm">
        <a href="#" className="hover:text-blue-500 transition">Privacy</a>
        <a href="#" className="hover:text-blue-500 transition">Terms</a>
        <a href="https://github.com/once-human/qurayt" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">GitHub</a>
      </div>
    </footer>
  );
}

const DUMMY_RESULTS = [
  // 36 unique dummy cards for 3 sets of 12 (3 sets = 36)
  {
    title: 'Minimal Product Card',
    image: 'https://source.unsplash.com/random/400x300?ui,product,card',
    url: 'https://dribbble.com/shots/1234567',
    platform: 'Dribbble',
    tags: ['Minimal', 'Product', 'Card'],
  },
  {
    title: 'Dark Mode Dashboard',
    image: 'https://source.unsplash.com/random/400x300?ui,dark,dashboard',
    url: 'https://behance.net/gallery/7654321',
    platform: 'Behance',
    tags: ['Dark', 'Dashboard', 'Analytics'],
  },
  // ... (repeat and vary the above pattern to reach 36 unique cards)
];
while (DUMMY_RESULTS.length < 36) {
  const i = DUMMY_RESULTS.length + 1;
  DUMMY_RESULTS.push({
    title: `Inspiration ${i}`,
    image: `https://source.unsplash.com/random/400x300?sig=${i}&ui,design,${i}`,
    url: i % 2 === 0 ? `https://dribbble.com/shots/${1000000 + i}` : `https://behance.net/gallery/${9000000 + i}`,
    platform: i % 2 === 0 ? 'Dribbble' : 'Behance',
    tags: ['UI', 'Inspiration', `Tag${i}`],
  });
}

const PLATFORMS = ['All', 'Dribbble', 'Behance'];

export default function LandingPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [platform, setPlatform] = useState('All');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const filteredResults = results.filter(
    r => platform === 'All' || r.platform === platform
  );

  const PAGE_SIZE = 12; // 4 rows of 4 columns

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setResults([]);
    setPage(1);
    setHasMore(true);
    setTimeout(() => {
      if (query.toLowerCase().includes('error')) {
        setError('Something went wrong. Please try again.');
        setLoading(false);
        return;
      }
      setResults(DUMMY_RESULTS.slice(0, PAGE_SIZE));
      setLoading(false);
    }, 1200);
  };

  // Robust Intersection Observer infinite scroll
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && !loading && hasMore) {
      setLoading(true);
      setTimeout(() => {
        const nextPage = page + 1;
        const start = PAGE_SIZE * (nextPage - 1);
        const end = PAGE_SIZE * nextPage;
        const nextResults = DUMMY_RESULTS.slice(start, end);
        if (nextResults.length > 0) {
          setResults(prev => [...prev, ...nextResults]);
          setPage(nextPage);
        } else {
          setHasMore(false);
        }
        setLoading(false);
      }, 500);
    }
  }, [loading, hasMore, page]);

  useEffect(() => {
    if (!sentinelRef.current) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new window.IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });
    observerRef.current.observe(sentinelRef.current);
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [handleObserver]);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-blue-950 overflow-x-hidden">
      <FloatingCards />
      <Navbar />
      <section className="relative z-10 flex flex-col items-center justify-center py-40 px-4 w-full">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white text-center mb-6 tracking-tight drop-shadow-xl">
          UI Inspiration. <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">Qurayted.</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 text-center max-w-2xl mb-10 font-medium">
          Describe your vision. See real UI patterns from the best design platforms - instantly, intelligently, beautifully.
        </p>
        <form
          className="w-full max-w-xl flex flex-col sm:flex-row gap-4 items-center justify-center bg-white/80 dark:bg-neutral-900/80 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-neutral-800 backdrop-blur-lg"
          onSubmit={e => { e.preventDefault(); handleSearch(); }}
        >
          <SearchInput
            value={query}
            onChange={setQuery}
            onSearch={handleSearch}
            loading={loading}
            autoFocus
          />
          <button
            type="submit"
            className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg shadow-lg transition disabled:opacity-60"
            disabled={loading || !query.trim()}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
        {error && (
          <div className="mt-4 text-red-500 font-medium text-center">{error}</div>
        )}
        {query.trim() && results.length > 0 && (
          <div className="w-full max-w-6xl mt-10">
            <div className="flex flex-wrap gap-3 mb-6 items-center justify-center">
              {PLATFORMS.map(p => (
                <button
                  key={p}
                  className={`px-4 py-2 rounded-full border font-semibold transition text-sm shadow-sm ${
                    platform === p
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-neutral-700 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                  }`}
                  onClick={() => setPlatform(p)}
                >
                  {p}
                </button>
              ))}
            </div>
            <ResultGrid results={filteredResults} loading={false} />
            <div ref={sentinelRef} style={{ height: 1 }} />
            {loading && (
              <div className="flex justify-center py-6">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {hasMore && !loading && results.length > 0 && (
              <div className="text-center text-gray-400 py-6">Scroll down to load more...</div>
            )}
            {!hasMore && results.length > 0 && (
              <div className="text-center text-gray-400 py-6">No more results.</div>
            )}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
