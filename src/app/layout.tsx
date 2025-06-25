import './globals.css';
import React from 'react';

export const metadata = {
  title: 'qurayt',
  description: 'AI-powered UI inspiration search',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
} 