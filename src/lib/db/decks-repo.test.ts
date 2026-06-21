import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import "fake-indexeddb/auto";
import { getDb } from "./db";
import type { TomeForgeDB } from "./schema";
import {
  createDeck,
  getDeckById,
  getAllDecks,
  updateDeck,
  deleteDeck,
} from "./decks-repo";

let db: TomeForgeDB;

beforeAll(() => {
  // Obtain the singleton instance (backed by fake-indexeddb).
  // Vitest isolates modules per file, so each test file gets a fresh singleton.
  db = getDb() as unknown as TomeForgeDB;
});

beforeEach(async () => {
  // Clear all records before each test to guarantee isolation.
  await db.decks.clear();
});

describe("decks-repo", () => {
  const sampleDeck = {
    name: "Test Deck",
    settings: '{"theme":"dark"}',
    cardFormat: "poker",
    densityPreset: "compact",
  };

  it("createDeck should insert a deck and return the full record", async () => {
    const record = await createDeck(sampleDeck);

    expect(record.id).toBeDefined();
    expect(record.name).toBe("Test Deck");
    expect(record.settings).toBe('{"theme":"dark"}');
    expect(record.cardFormat).toBe("poker");
    expect(record.densityPreset).toBe("compact");
    expect(record.createdAt).toBeGreaterThan(0);
    expect(record.updatedAt).toBe(record.createdAt);

    // Verify it was actually persisted
    const stored = await db.decks.get(record.id);
    expect(stored).toEqual(record);
  });

  it("getDeckById should return the deck for an existing id", async () => {
    const created = await createDeck(sampleDeck);

    const found = await getDeckById(created.id);
    expect(found).toEqual(created);
  });

  it("getDeckById should return undefined for a non-existent id", async () => {
    const found = await getDeckById("non-existent-id");
    expect(found).toBeUndefined();
  });

  it("getAllDecks should return all decks", async () => {
    await createDeck({ ...sampleDeck, name: "Deck 1" });
    await createDeck({ ...sampleDeck, name: "Deck 2" });
    await createDeck({ ...sampleDeck, name: "Deck 3" });

    const all = await getAllDecks();
    expect(all).toHaveLength(3);
    expect(all.map((d) => d.name).sort()).toEqual([
      "Deck 1",
      "Deck 2",
      "Deck 3",
    ]);
  });

  it("getAllDecks should return an empty array when no decks exist", async () => {
    const all = await getAllDecks();
    expect(all).toEqual([]);
  });

  it("updateDeck should merge changes and update the timestamp", async () => {
    const created = await createDeck(sampleDeck);
    const originalUpdatedAt = created.updatedAt;

    // Small delay so timestamp differs
    await new Promise((r) => setTimeout(r, 5));

    const updated = await updateDeck(created.id, { name: "Renamed Deck" });
    expect(updated).toBeDefined();
    expect(updated!.name).toBe("Renamed Deck");
    expect(updated!.updatedAt).toBeGreaterThan(originalUpdatedAt);
    // Unchanged fields persist
    expect(updated!.settings).toBe('{"theme":"dark"}');
    expect(updated!.cardFormat).toBe("poker");
  });

  it("updateDeck should return undefined for a non-existent id", async () => {
    const result = await updateDeck("non-existent-id", { name: "Nope" });
    expect(result).toBeUndefined();
  });

  it("deleteDeck should remove the deck", async () => {
    const created = await createDeck(sampleDeck);
    expect(await db.decks.get(created.id)).toBeDefined();

    await deleteDeck(created.id);
    expect(await db.decks.get(created.id)).toBeUndefined();
  });

  it("deleteDeck should not throw for a non-existent id", async () => {
    await expect(deleteDeck("non-existent-id")).resolves.toBeUndefined();
  });
});