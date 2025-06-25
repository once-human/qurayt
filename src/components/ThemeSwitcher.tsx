'use client';

import React, { useEffect, useLayoutEffect, useState } from 'react';

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') return stored;
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
}

export default function ThemeSwitcher({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState('light');

  // SSR-safe: useLayoutEffect to avoid hydration mismatch
  useLayoutEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      aria-label="Toggle dark mode"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={`flex items-center w-16 h-9 rounded-full shadow-lg border border-gray-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 transition-colors duration-300 focus:outline-none group ${className}`}
      style={{ boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)' }}
    >
      <span
        className={`w-7 h-7 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow transform transition-transform duration-300 ${theme === 'dark' ? 'translate-x-7' : 'translate-x-1'}`}
      >
        {theme === 'dark' ? (
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M17.657 16.243A8 8 0 017.757 6.343 8.001 8.001 0 1017.657 16.243z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        ) : (
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" stroke="#fff" strokeWidth="2"/><path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
        )}
      </span>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
} 