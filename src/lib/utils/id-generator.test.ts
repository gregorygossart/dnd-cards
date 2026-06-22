import { describe, it, expect } from "vitest";
import { generateId, isValidId, createShortId } from "./id-generator";

describe("generateId", () => {
  it("returns a UUID v4 string matching the expected regex", () => {
    const id = generateId();
    expect(id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
  });

  it("returns unique values on successive calls", () => {
    const ids = new Set<string>();
    for (let i = 0; i < 100; i++) {
      ids.add(generateId());
    }
    expect(ids.size).toBe(100);
  });
});

describe("isValidId", () => {
  it("returns true for a valid UUID v4", () => {
    const id = generateId();
    expect(isValidId(id)).toBe(true);
  });

  it("returns false for an empty string", () => {
    expect(isValidId("")).toBe(false);
  });

  it("returns false for a malformed UUID", () => {
    expect(isValidId("not-a-uuid")).toBe(false);
  });

  it("returns false for a UUID with wrong version (v1 instead of v4)", () => {
    // v1 UUID has second char group starting with 1 instead of 4
    expect(
      isValidId("550e8400-e29b-11d4-a716-446655440000"),
    ).toBe(false);
  });

  it("returns false for a UUID with wrong variant bits", () => {
    // The third char group starts with a variant that is not 8, 9, a, or b
    expect(
      isValidId("550e8400-e29b-41d4-c716-446655440000"),
    ).toBe(false);
  });
});

describe("createShortId", () => {
  it("returns a string in the format prefix_xxxx", () => {
    const shortId = createShortId("deck");
    expect(shortId).toMatch(/^deck_[0-9a-f]{4}$/);
  });

  it("produces different values on successive calls", () => {
    const ids = new Set<string>();
    for (let i = 0; i < 10; i++) {
      ids.add(createShortId("card"));
    }
    // With 10 calls and 4 hex chars (16^4 = 65536 possibilities),
    // the probability of collision is negligible
    expect(ids.size).toBe(10);
  });

  it("handles different prefixes", () => {
    const deckId = createShortId("deck");
    const cardId = createShortId("card");
    expect(deckId).toMatch(/^deck_/);
    expect(cardId).toMatch(/^card_/);
  });
});