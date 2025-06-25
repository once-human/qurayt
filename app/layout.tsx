import './globals.css';
import React from 'react';

export const metadata = {
  title: 'qurayt',
  description: 'AI-powered UI inspiration search',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-gray-100 transition-colors duration-300" style={{ fontFamily: 'Inter, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
