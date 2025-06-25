'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (stored === 'dark' || stored === 'light') setTheme(stored);
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="fixed top-6 right-6 z-50">
        <button
          aria-label="Toggle dark mode"
          onClick={toggleTheme}
          className="rounded-full p-2 bg-white/80 dark:bg-neutral-800/80 shadow border border-gray-200 dark:border-neutral-700 hover:scale-105 transition-transform"
        >
          {theme === 'dark' ? (
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M17.657 16.243A8 8 0 017.757 6.343 8.001 8.001 0 1017.657 16.243z" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          ) : (
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" stroke="#2563eb" strokeWidth="2"/><path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/></svg>
          )}
        </button>
      </div>
      {children}
    </ThemeContext.Provider>
  );
} 