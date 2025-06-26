'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

// Simple theme switcher component
function ThemeSwitcher({ className = '' }: { className?: string }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 transition ${className}`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
}

// Simple search input component
function SearchInput({ 
  value, 
  onChange, 
  onSearch, 
  loading = false, 
  autoFocus = false 
}: { 
  value: string; 
  onChange: (value: string) => void; 
  onSearch: () => void; 
  loading?: boolean; 
  autoFocus?: boolean; 
}) {
  return (
    <div className="relative flex-1">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && onSearch()}
        placeholder="Describe the UI you're looking for..."
        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        disabled={loading}
        autoFocus={autoFocus}
      />
    </div>
  );
}

// Simple result grid component
function ResultGrid({ results, loading }: { results: any[]; loading: boolean }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200 dark:bg-neutral-700" />
            <div className="p-4">
              <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded mb-2" />
              <div className="h-3 bg-gray-200 dark:bg-neutral-700 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((result, i) => (
        <div key={i} className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div className="h-48 bg-gray-200 dark:bg-neutral-700 flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">Screenshot Placeholder</span>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{result.title || 'Untitled'}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{result.platform || 'Unknown Platform'}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function FloatingCards({ isDark }: { isDark: boolean }) {
  if (!isDark) return null; // Only show floating cards in dark mode for subtlety
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <div className="absolute top-10 left-1/4 w-48 h-32 bg-white/60 dark:bg-neutral-800/60 rounded-2xl shadow-xl blur-2xl rotate-6" />
      <div className="absolute top-40 right-1/4 w-56 h-36 bg-blue-100/60 dark:bg-blue-900/40 rounded-2xl shadow-xl blur-2xl -rotate-3" />
      <div className="absolute bottom-10 left-1/3 w-40 h-24 bg-indigo-100/60 dark:bg-indigo-900/40 rounded-xl shadow-lg blur-2xl rotate-12" />
      <div className="absolute bottom-24 right-1/3 w-32 h-20 bg-pink-100/60 dark:bg-pink-900/40 rounded-xl shadow-lg blur-2xl -rotate-12" />
    </div>
  );
}

function QuraytLogo({ fontSize = 'text-2xl', fontWeight = 'font-extrabold', className = '' }) {
  return (
    <span className={`${fontSize} ${fontWeight} tracking-tight select-none bg-gradient-to-r from-gray-800 via-gray-500 to-gray-900 dark:from-gray-100 dark:via-gray-400 dark:to-gray-200 bg-clip-text text-transparent ${className}`} style={{ letterSpacing: '-0.04em', fontFamily: 'Inter, sans-serif' }}>
      qurayt
    </span>
  );
}

function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-6 fixed top-0 left-0 z-20 bg-white/90 dark:bg-transparent shadow-sm dark:shadow-none border-b border-gray-100 dark:border-none backdrop-blur-lg">
      <QuraytLogo fontSize="text-2xl" fontWeight="font-extrabold" />
      <div className="flex items-center gap-6 text-gray-900 dark:text-gray-200 font-medium text-base">
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
    <footer className="w-full py-8 px-4 flex items-center justify-between bg-white/90 dark:bg-gradient-to-t dark:from-white/5 dark:via-transparent dark:to-transparent border-t border-gray-100 dark:border-neutral-800 shadow-sm dark:shadow-none mt-24 relative">
      <QuraytLogo fontSize="text-lg" fontWeight="font-bold" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center w-full pointer-events-none">
        <span className="text-xs text-gray-500 dark:text-gray-400 text-center pointer-events-auto">Designed with <span className="text-red-500">❤️</span> | Inspired by <a href="https://khushibanthia.framer.website" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">Khushi Banthia</a>’s brilliant idea.</span>
      </div>
      <div className="flex gap-6 text-gray-500 dark:text-gray-400 text-sm">
        <a href="#" className="hover:text-blue-500 transition">Privacy</a>
        <a href="#" className="hover:text-blue-500 transition">Terms</a>
        <a href="https://github.com/once-human/qurayt" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">GitHub</a>
      </div>
    </footer>
  );
}

const PLATFORMS = ['All', 'Dribbble', 'Behance'];

export default function LandingPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [platform, setPlatform] = useState('All');
  const [isDark, setIsDark] = useState(false);

  const filteredResults = results.filter(
    r => platform === 'All' || r.platform?.toLowerCase() === platform.toLowerCase()
  );

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setResults([]);
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query }),
      });
      if (!res.ok) {
        const err = await res.json();
        setError(err.error || 'Something went wrong. Please try again.');
        setLoading(false);
        return;
      }
      const data = await res.json();
      setResults(data.results || []);
      setLoading(false);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center transition-colors duration-300 bg-gradient-to-br from-white via-blue-100 to-blue-400 dark:bg-gradient-to-br dark:from-neutral-900 dark:via-neutral-950 dark:to-blue-950 overflow-x-hidden">
      <FloatingCards isDark={isDark} />
      <Navbar />
      <section className="relative z-10 flex flex-col items-center justify-center py-40 px-4 w-full transition-colors duration-300">
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
          </div>
        )}
      </section>
      <footer className={`w-full py-8 px-4 flex items-center justify-between ${isDark ? 'bg-gradient-to-t from-black/10 via-transparent to-transparent dark:from-white/5' : 'bg-gradient-to-t from-white/80 via-blue-50/70 to-blue-100/60'} border-t ${isDark ? 'border-gray-200 dark:border-neutral-800' : 'border-gray-100'} shadow-sm dark:shadow-none mt-24 relative`}>
        <QuraytLogo fontSize="text-lg" fontWeight="font-bold" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center w-full pointer-events-none">
          <span className={`text-xs ${isDark ? 'text-gray-200 dark:text-gray-400' : 'text-gray-500'} text-center pointer-events-auto`}>Designed with <span className="text-red-500">❤️</span> | Inspired by <a href="https://khushibanthia.framer.website" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">Khushi Banthia</a>’s brilliant idea.</span>
        </div>
        <div className={`flex gap-6 ${isDark ? 'text-gray-500 dark:text-gray-400' : 'text-gray-500'} text-sm`}>
          <a href="#" className="hover:text-blue-500 transition">Privacy</a>
          <a href="#" className="hover:text-blue-500 transition">Terms</a>
          <a href="https://github.com/once-human/qurayt" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">GitHub</a>
        </div>
      </footer>
    </main>
  );
}
