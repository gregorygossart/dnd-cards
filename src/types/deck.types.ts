// ---------------------------------------------------------------------------
// Deck type definitions — domain layer, separate from DB storage records
// ---------------------------------------------------------------------------

export type CardFormat = "poker" | "tarot";

export type DensityPreset = "standard" | "compact" | "spacious";

export interface DeckSettings {
  format: CardFormat;
  density: DensityPreset;
}

export interface Deck {
  id: string;
  name: string;
  settings: DeckSettings;
  createdAt: number; // Unix timestamp
  updatedAt: number; // Unix timestamp
}