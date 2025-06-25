// utils/parsePrompt.ts
// Utility to refine and clean incoming search prompts for Qurayt.

/**
 * Cleans and normalizes a search prompt: trims, lowercases, removes extra spaces.
 */
export function parsePrompt(prompt: string): string {
  return prompt.trim().toLowerCase().replace(/\s+/g, ' ');
} 