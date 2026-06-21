import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import "fake-indexeddb/auto";
import { getDb } from "./db";
import type { TomeForgeDB } from "./schema";
import {
  createArtwork,
  getArtworkById,
  getArtworkByCard,
  deleteArtwork,
} from "./artwork-repo";

let db: TomeForgeDB;

beforeAll(() => {
  db = getDb() as unknown as TomeForgeDB;
});

beforeEach(async () => {
  await db.artwork.clear();
});

describe("artwork-repo", () => {
  const smallBlob = new Blob(["fake-image-data"], { type: "image/png" });

  const sampleArtwork = {
    cardId: "card-1",
    blob: smallBlob,
    mimeType: "image/png",
  };

  it("createArtwork should insert an artwork record and return the full record", async () => {
    const record = await createArtwork(sampleArtwork);

    expect(record.id).toBeDefined();
    expect(record.cardId).toBe("card-1");
    expect(record.mimeType).toBe("image/png");
    expect(record.blob).toBeInstanceOf(Blob);
    expect(record.blob.size).toBe(smallBlob.size);
    expect(record.blob.type).toBe(smallBlob.type);
    expect(record.createdAt).toBeGreaterThan(0);

    // Verify persistence (blob serialization by fake-indexeddb may differ
    // from the original Blob; real IndexedDB handles this correctly)
    const stored = await db.artwork.get(record.id);
    expect(stored).toBeDefined();
    expect(stored!.id).toBe(record.id);
    expect(stored!.cardId).toBe(record.cardId);
    expect(stored!.mimeType).toBe(record.mimeType);
    expect(stored!.createdAt).toBe(record.createdAt);
  });

  it("getArtworkById should return the artwork for an existing id", async () => {
    const created = await createArtwork(sampleArtwork);

    const found = await getArtworkById(created.id);
    expect(found).toBeDefined();
    expect(found!.id).toBe(created.id);
    expect(found!.cardId).toBe(created.cardId);
    expect(found!.mimeType).toBe(created.mimeType);
    expect(found!.createdAt).toBe(created.createdAt);
  });

  it("getArtworkById should return undefined for a non-existent id", async () => {
    const found = await getArtworkById("non-existent-id");
    expect(found).toBeUndefined();
  });

  it("getArtworkByCard should return artwork for a specific card", async () => {
    await createArtwork({
      ...sampleArtwork,
      cardId: "card-x",
      mimeType: "image/jpeg",
      blob: new Blob(["jpeg-data"], { type: "image/jpeg" }),
    });
    await createArtwork({
      ...sampleArtwork,
      cardId: "card-y",
      mimeType: "image/png",
    });

    const found = await getArtworkByCard("card-y");
    expect(found).toBeDefined();
    expect(found!.cardId).toBe("card-y");
    expect(found!.mimeType).toBe("image/png");
  });

  it("getArtworkByCard should return undefined when no artwork exists for the card", async () => {
    const found = await getArtworkByCard("card-with-no-art");
    expect(found).toBeUndefined();
  });

  it("deleteArtwork should remove the artwork record", async () => {
    const created = await createArtwork(sampleArtwork);
    expect(await db.artwork.get(created.id)).toBeDefined();

    await deleteArtwork(created.id);
    expect(await db.artwork.get(created.id)).toBeUndefined();
  });

  it("deleteArtwork should not throw for a non-existent id", async () => {
    await expect(deleteArtwork("non-existent-id")).resolves.toBeUndefined();
  });
});