import { getDb } from "./db";
import type { DeckRecord } from "./schema";

export async function getAllDecks(): Promise<DeckRecord[]> {
  const db = getDb();
  return db.decks.toArray();
}

export async function getDeckById(id: string): Promise<DeckRecord | undefined> {
  const db = getDb();
  return db.decks.get(id);
}

export async function createDeck(
  data: Omit<DeckRecord, "id" | "createdAt" | "updatedAt">
): Promise<DeckRecord> {
  const db = getDb();
  const now = Date.now();
  const record: DeckRecord = {
    id: crypto.randomUUID(),
    ...data,
    createdAt: now,
    updatedAt: now,
  };
  await db.decks.add(record);
  return record;
}

export async function updateDeck(
  id: string,
  changes: Partial<DeckRecord>
): Promise<DeckRecord | undefined> {
  const db = getDb();
  const updatedAt = Date.now();
  // Strip system-managed fields from caller-supplied changes to prevent
  // accidental overwrites of createdAt, id, etc.
  const { createdAt, ...safeChanges } = changes as Record<string, unknown>;
  await db.decks.update(id, { ...safeChanges, updatedAt });
  return db.decks.get(id);
}

export async function deleteDeck(id: string): Promise<void> {
  const db = getDb();
  await db.decks.delete(id);
}