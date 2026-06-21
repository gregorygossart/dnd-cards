// ---------------------------------------------------------------------------
// Share payload types — MVP v1 (text-only, no blobs)
// ---------------------------------------------------------------------------

export interface SharedDeckPayload {
  version: string;
  exportedAt: number;
  deck: SharedDeck;
}

export interface SharedDeck {
  id: string;
  name: string;
  settings: SharedDeckSettings;
  cards: SharedCard[];
}

export interface SharedDeckSettings {
  format: string;
  density: string;
}

export interface SharedCard {
  id: string;
  deckId: string;
  type: string;
  name: string;
}
