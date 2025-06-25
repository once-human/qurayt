'use client';

import React, { useState } from 'react';
import ThemeSwitcher from '../components/ThemeSwitcher';

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
    <footer className="w-full py-8 px-4 flex flex-col md:flex-row items-center justify-between bg-gradient-to-t from-black/10 via-transparent to-transparent dark:from-white/5 border-t border-gray-200 dark:border-neutral-800 mt-24">
      <div className="flex items-center gap-1 mb-4 md:mb-0">
        <span className="text-xl font-extrabold text-blue-600">Q</span>
        <span className="font-bold text-gray-900 dark:text-white -ml-1">urayt</span>
      </div>
      <div className="flex gap-6 text-gray-500 dark:text-gray-400 text-sm">
        <a href="#" className="hover:text-blue-500 transition">Privacy</a>
        <a href="#" className="hover:text-blue-500 transition">Terms</a>
        <a href="https://github.com/once-human/qurayt" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">GitHub</a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">Twitter</a>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    setLoading(true);
    // Placeholder: Will call API later
    setTimeout(() => {
      setResults([]);
      setLoading(false);
    }, 1000);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-blue-950 overflow-x-hidden">
      <FloatingCards />
      <Navbar />
      <section className="relative z-10 flex flex-col items-center justify-center py-40 px-4 w-full">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white text-center mb-6 tracking-tight drop-shadow-xl">UI Inspiration. <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">Qurayted.</span></h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 text-center max-w-2xl mb-10 font-medium">Describe your vision. See real UI patterns from the best design platforms - instantly, intelligently, beautifully.</p>
        <form
          className="w-full max-w-xl flex flex-col sm:flex-row gap-4 items-center justify-center bg-white/80 dark:bg-neutral-900/80 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-neutral-800 backdrop-blur-lg"
          onSubmit={e => { e.preventDefault(); handleSearch(); }}
        >
          <input
            type="text"
            className="flex-1 px-5 py-3 rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm placeholder-gray-400 dark:placeholder-gray-500 transition"
            placeholder="Describe the UI you want to see..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            disabled={loading}
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
      </section>
      <Footer />
    </main>
  );
}
