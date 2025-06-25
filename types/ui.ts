// types/ui.ts
// Type definition for a UI screenshot entry in Qurayt.

export type UI = {
  id: string;
  title: string;
  tags: string[];
  url: string;
  image_url: string;
  platform: string;
  embedding: number[];
}; 