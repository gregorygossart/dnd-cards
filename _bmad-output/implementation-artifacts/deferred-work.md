# Deferred Work

## Deferred from: code review of 1-3-repository-layer (2026-06-22)

- **Test DB isolation shared singleton across test files** [src/lib/db/decks-repo.test.ts:16, src/lib/db/cards-repo.test.ts:15, src/lib/db/artwork-repo.test.ts:14] — Calling `db.delete()` on the shared singleton closes it globally; proper fix requires either modifying `getDb()` to support per-suite instances or accepting the shared singleton with `beforeEach` cleanup. The same issue was deferred from Story 1.2.

- **getArtworkByCard unindexed full table scan** [src/lib/db/artwork-repo.ts:17] — Uses `db.artwork.filter().first()` without a `cardId` index. Functional but O(n) per call. Spec does not mandate adding an index.
- **getAllDecks/getAllCards no pagination or ordering** [src/lib/db/decks-repo.ts:6, src/lib/db/cards-repo.ts:6] — Returns all records without explicit sort or limit. Functional at current scale; add pagination when dataset grows.
- **getCardsByDeck accepts empty deckId** [src/lib/db/cards-repo.ts:16] — No guard against `""` input. Caller validation responsibility per repo thin-wrapper design.

## Deferred from: code review of 1-2-dexie-schema-database-instance (2026-06-21)

- **Tests share single db instance — fragile for write tests** [src/lib/db/schema.test.ts:7-9] — The `beforeAll` block creates one `db` instance shared across all 8 tests. While current tests are read-only (schema introspection), any future write-based test would suffer from cross-test contamination. Should use `beforeEach` to recreate the instance when write tests are added.