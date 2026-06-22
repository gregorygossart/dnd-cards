import Dexie, { type Table } from "dexie";

// ---------------------------------------------------------------------------
// Data model interfaces (plain TypeScript — no Zod at DB layer)
// ---------------------------------------------------------------------------

export interface DeckRecord {
  id: string;
  name: string;
  settings: string;
  cardFormat: string;
  densityPreset: string;
  createdAt: number; // Unix timestamp
  updatedAt: number; // Unix timestamp
}

export interface CardRecord {
  id: string;
  deckId: string;
  type: string;
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: string;
  higherLevels?: string;
  accentColor: string;
  artwork?: string;
  order?: number;
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

/**
 * Generic key/value records used by Zustand's persist middleware
 * through the Dexie storage adapter (see `src/stores/dexie-storage-adapter.ts`).
 *
 * This table is the backing store for serialized Zustand state in IndexedDB,
 * replacing `localStorage` so persisted state survives reloads and stays
 * confined to the Dexie layer.
 */
export interface KeyValueRecord {
  key: string;
  value: string;
}

// ---------------------------------------------------------------------------
// Dexie schema version & typed database class
// ---------------------------------------------------------------------------

export class TomeForgeDB extends Dexie {
  declare decks: Table<DeckRecord, string>;
  declare cards: Table<CardRecord, string>;
  declare artwork: Table<ArtworkRecord, string>;
  declare kv: Table<KeyValueRecord, string>;

  constructor() {
    super("TomeForgeDB");

    // Schema version 3 (stores) — added `order` field on cards for deterministic reordering
    this.version(3).stores({
      decks: "id",
      cards: "id, deckId, order",
      artwork: "id",
      kv: "key",
    });
  }
}

export type DecksTable = TomeForgeDB["decks"];
export type CardsTable = TomeForgeDB["cards"];
export type ArtworkTable = TomeForgeDB["artwork"];