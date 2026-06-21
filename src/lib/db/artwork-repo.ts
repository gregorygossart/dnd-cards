import { getDb } from "./db";
import type { ArtworkRecord } from "./schema";

export async function getArtworkById(
  id: string
): Promise<ArtworkRecord | undefined> {
  const db = getDb();
  return db.artwork.get(id);
}

export async function getArtworkByCard(
  cardId: string
): Promise<ArtworkRecord | undefined> {
  const db = getDb();
  // Artwork table does not have a cardId index, so we filter manually.
  // If query performance becomes an issue, a cardId index can be added.
  return db.artwork.filter((a) => a.cardId === cardId).first();
}

export async function createArtwork(
  data: Omit<ArtworkRecord, "id" | "createdAt">
): Promise<ArtworkRecord> {
  const db = getDb();
  const now = Date.now();
  const record: ArtworkRecord = {
    id: crypto.randomUUID(),
    ...data,
    createdAt: now,
  };
  await db.artwork.add(record);
  return record;
}

export async function deleteArtwork(id: string): Promise<void> {
  const db = getDb();
  await db.artwork.delete(id);
}