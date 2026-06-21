import { getDb } from "./db";
import type { CardRecord } from "./schema";

export async function getAllCards(): Promise<CardRecord[]> {
  const db = getDb();
  return db.cards.toArray();
}

export async function getCardById(id: string): Promise<CardRecord | undefined> {
  const db = getDb();
  return db.cards.get(id);
}

export async function getCardsByDeck(deckId: string): Promise<CardRecord[]> {
  const db = getDb();
  return db.cards.where("deckId").equals(deckId).toArray();
}

export async function createCard(
  data: Omit<CardRecord, "id" | "createdAt" | "updatedAt">
): Promise<CardRecord> {
  const db = getDb();
  const now = Date.now();
  const record: CardRecord = {
    id: crypto.randomUUID(),
    ...data,
    createdAt: now,
    updatedAt: now,
  };
  await db.cards.add(record);
  return record;
}

export async function updateCard(
  id: string,
  changes: Partial<CardRecord>
): Promise<CardRecord | undefined> {
  const db = getDb();
  const updatedAt = Date.now();
  // Strip system-managed fields from caller-supplied changes to prevent
  // accidental overwrites of createdAt, id, etc.
  const { createdAt, ...safeChanges } = changes as Record<string, unknown>;
  await db.cards.update(id, { ...safeChanges, updatedAt });
  return db.cards.get(id);
}

export async function deleteCard(id: string): Promise<void> {
  const db = getDb();
  await db.cards.delete(id);
}