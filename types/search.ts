// types/search.ts
// Types for search API requests and responses in Qurayt.

import type { UI } from './ui';

export type SearchRequest = {
  prompt: string;
  platform?: string;
  tags?: string[];
  limit?: number;
};

export type SearchResponse = {
  results: UI[];
  total: number;
}; 