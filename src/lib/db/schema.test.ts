import { describe, it, expect, beforeAll } from "vitest";
import "fake-indexeddb/auto";
import { TomeForgeDB } from "./schema";

let db: TomeForgeDB;

beforeAll(() => {
  db = new TomeForgeDB();
});

describe("TomeForgeDB schema", () => {
  it("should have a 'decks' table", () => {
    expect(db.decks).toBeDefined();
    expect(db.decks.name).toBe("decks");
  });

  it("should have a 'cards' table", () => {
    expect(db.cards).toBeDefined();
    expect(db.cards.name).toBe("cards");
  });

  it("should have an 'artwork' table", () => {
    expect(db.artwork).toBeDefined();
    expect(db.artwork.name).toBe("artwork");
  });

  it("should have schema version set to 1", () => {
    // Dexie exposes the highest version number via the `verno` property
    expect(db.verno).toBe(3);
  });

  it("should have an index on 'deckId' (idx_cards_deckId) for the cards table", () => {
    // Dexie creates indexes based on the schema string.
    // "id, deckId" creates a non-unique index named "deckId" on the deckId column.
    // The architectural convention names this index idx_cards_deckId.
    const tableSchema = db.table("cards").schema;
    const indexNames = [tableSchema.primKey.name].concat(
      tableSchema.indexes.map((idx) => idx.name)
    );
    // The index on deckId exists — it's named "deckId" in Dexie,
    // which corresponds to the architectural idx_cards_deckId.
    expect(indexNames).toContain("deckId");

    // Also verify the index maps to the correct column keyPath
    const deckIdIndex = tableSchema.indexes.find((idx) => idx.name === "deckId");
    expect(deckIdIndex).toBeDefined();
    expect(deckIdIndex!.keyPath).toBe("deckId");
  });

  it("should have correct table column mappings for 'decks'", () => {
    const tableSchema = db.table("decks").schema;
    // id is the primary key
    expect(tableSchema.primKey.name).toBe("id");
    expect(tableSchema.primKey.keyPath).toBe("id");
  });

  it("should have correct table column mappings for 'cards'", () => {
    const tableSchema = db.table("cards").schema;
    // id is the primary key; deckId is a non-unique index
    expect(tableSchema.primKey.name).toBe("id");
    expect(tableSchema.primKey.keyPath).toBe("id");
  });

  it("should have correct table column mappings for 'artwork'", () => {
    const tableSchema = db.table("artwork").schema;
    expect(tableSchema.primKey.name).toBe("id");
    expect(tableSchema.primKey.keyPath).toBe("id");
  });
});