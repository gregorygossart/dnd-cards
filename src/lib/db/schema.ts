import Dexie, { type Table } from "dexie";

// ---------------------------------------------------------------------------
// Data model interfaces (plain TypeScript — no Zod at DB layer)
// ---------------------------------------------------------------------------

export interface DeckRecord {
  id: string;
  name: string;
  /** JSON-serialized DeckSettings */
  settings: string;
  /** "poker" | "tarot" */
  cardFormat: string;
  densityPreset: string;
  createdAt: number; // Unix timestamp
  updatedAt: number; // Unix timestamp
}

export interface CardRecord {
  id: string;
  deckId: string;
  /** Discriminator, e.g. "spell" */
  type: string;
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  /** JSON-serialized Components object */
  components: string;
  duration: string;
  description: string;
  higherLevels?: string;
  accentColor: string;
  /** Optional BlobRef reference */
  artwork?: string;
  createdAt: number; // Unix timestamp
  updatedAt: number; // Unix timestamp
}

export interface ArtworkRecord {
  id: string;
  cardId: string;
  blob: Blob;
  mimeType: string;
  createdAt: number; // Unix timestamp
}

// ---------------------------------------------------------------------------
// Dexie schema version & typed database class
// ---------------------------------------------------------------------------

export class TomeForgeDB extends Dexie {
  declare decks: Table<DeckRecord, string>;
  declare cards: Table<CardRecord, string>;
  declare artwork: Table<ArtworkRecord, string>;

  constructor() {
    super("TomeForgeDB");

    // Schema version 1 (MVP) — indexes defined per architecture naming patterns
    this.version(1).stores({
      decks: "id",
      cards: "id, deckId",
      artwork: "id",
    });
  }
}

// Convenience type exports
export type DecksTable = TomeForgeDB["decks"];
export type CardsTable = TomeForgeDB["cards"];
export type ArtworkTable = TomeForgeDB["artwork"];