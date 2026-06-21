import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import "fake-indexeddb/auto";
import { getDb } from "./db";
import type { TomeForgeDB } from "./schema";
import {
  createCard,
  getCardById,
  getCardsByDeck,
  updateCard,
  deleteCard,
} from "./cards-repo";

let db: TomeForgeDB;

beforeAll(() => {
  db = getDb() as unknown as TomeForgeDB;
});

beforeEach(async () => {
  await db.cards.clear();
});

describe("cards-repo", () => {
  const sampleCard = {
    deckId: "deck-1",
    type: "spell",
    name: "Fireball",
    level: 3,
    school: "Evocation",
    castingTime: "1 action",
    range: "150 feet",
    components: '{"verbal":true,"somatic":true,"material":"a tiny ball of bat guano and sulfur"}',
    duration: "Instantaneous",
    description: "A bright streak flashes from your finger.",
    higherLevels: "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd.",
    accentColor: "#ff4400",
    artwork: "artwork-1",
  };

  it("createCard should insert a card and return the full record", async () => {
    const record = await createCard(sampleCard);

    expect(record.id).toBeDefined();
    expect(record.deckId).toBe("deck-1");
    expect(record.name).toBe("Fireball");
    expect(record.level).toBe(3);
    expect(record.createdAt).toBeGreaterThan(0);
    expect(record.updatedAt).toBe(record.createdAt);

    // Verify persistence
    const stored = await db.cards.get(record.id);
    expect(stored).toEqual(record);
  });

  it("createCard should work without optional fields", async () => {
    const { higherLevels, artwork, ...requiredOnly } = sampleCard;
    const record = await createCard(requiredOnly);

    expect(record.id).toBeDefined();
    expect(record.higherLevels).toBeUndefined();
    expect(record.artwork).toBeUndefined();
  });

  it("getCardById should return the card for an existing id", async () => {
    const created = await createCard(sampleCard);

    const found = await getCardById(created.id);
    expect(found).toEqual(created);
  });

  it("getCardById should return undefined for a non-existent id", async () => {
    const found = await getCardById("non-existent-id");
    expect(found).toBeUndefined();
  });

  it("getCardsByDeck should return cards filtered by deckId", async () => {
    await createCard({ ...sampleCard, deckId: "deck-a", name: "Card A1" });
    await createCard({ ...sampleCard, deckId: "deck-a", name: "Card A2" });
    await createCard({ ...sampleCard, deckId: "deck-b", name: "Card B1" });

    const deckACards = await getCardsByDeck("deck-a");
    expect(deckACards).toHaveLength(2);
    expect(deckACards.map((c) => c.name).sort()).toEqual([
      "Card A1",
      "Card A2",
    ]);

    const deckBCards = await getCardsByDeck("deck-b");
    expect(deckBCards).toHaveLength(1);
    expect(deckBCards[0].name).toBe("Card B1");
  });

  it("getCardsByDeck should return an empty array when no cards match", async () => {
    const cards = await getCardsByDeck("non-existent-deck");
    expect(cards).toEqual([]);
  });

  it("updateCard should merge changes and update the timestamp", async () => {
    const created = await createCard(sampleCard);
    const originalUpdatedAt = created.updatedAt;

    await new Promise((r) => setTimeout(r, 5));

    const updated = await updateCard(created.id, { name: "Fireball+" });
    expect(updated).toBeDefined();
    expect(updated!.name).toBe("Fireball+");
    expect(updated!.updatedAt).toBeGreaterThan(originalUpdatedAt);
    // Unchanged fields persist
    expect(updated!.level).toBe(3);
  });

  it("updateCard should return undefined for a non-existent id", async () => {
    const result = await updateCard("non-existent-id", { name: "Nope" });
    expect(result).toBeUndefined();
  });

  it("deleteCard should remove the card", async () => {
    const created = await createCard(sampleCard);
    expect(await db.cards.get(created.id)).toBeDefined();

    await deleteCard(created.id);
    expect(await db.cards.get(created.id)).toBeUndefined();
  });

  it("deleteCard should not throw for a non-existent id", async () => {
    await expect(deleteCard("non-existent-id")).resolves.toBeUndefined();
  });
});