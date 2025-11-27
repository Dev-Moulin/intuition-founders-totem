/**
 * Core founder data structure used throughout the application.
 * Previously defined in FounderCard.tsx, now centralized here.
 */
export interface FounderData {
  id: string;
  name: string;
  shortBio: string;
  fullBio?: string;
  twitter?: string | null;
  linkedin?: string | null;
  github?: string | null;
  image?: string;
  atomId?: string; // INTUITION Atom ID (Hex) - populated after on-chain creation
}
