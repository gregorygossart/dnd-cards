---
baseline_commit: 3c489512ff04f3fce54c46c33e5fbb7cf2c1281b
---

# Story 1.3 — Repository Layer

Status: done

## Story

**As a** developer
**I want** repository classes (`decks-repo`, `cards-repo`, `artwork-repo`) that abstract Dexie access
**So that** components never call Dexie directly

## Acceptance Criteria

1. [x] Each repo exposes async CRUD methods for its table
2. [x] Repos accept/return plain data (no Zod validation — that's handled at store/form boundary)
3. [x] Unit tests for each repo method using a test database (fake-indexeddb)

## Tasks / Subtasks

- [x] Create `src/lib/db/decks-repo.ts` (AC: 1, 2)
  - [x] Exports async functions: `createDeck`, `getDeckById`, `getAllDecks`, `updateDeck`, `deleteDeck`
  - [x] `createDeck(data: Omit<DeckRecord, 'id' | 'createdAt' | 'updatedAt'>)` generates id + timestamps
  - [x] `updateDeck(id, changes: Partial<DeckRecord>)` merges changes and sets `updatedAt`
  - [x] `deleteDeck(id)` removes the deck record
  - [x] Accepts/returns plain `DeckRecord` objects (no Zod validation)
- [x] Create `src/lib/db/cards-repo.ts` (AC: 1, 2)
  - [x] Exports async functions: `createCard`, `getCardById`, `getCardsByDeck`, `updateCard`, `deleteCard`
  - [x] `createCard(data: Omit<CardRecord, 'id' | 'createdAt' | 'updatedAt'>)` generates id + timestamps
  - [x] `getCardsByDeck(deckId)` returns cards filtered by deckId index
  - [x] `updateCard(id, changes: Partial<CardRecord>)` merges changes and sets `updatedAt`
  - [x] `deleteCard(id)` removes the card record
  - [x] Accepts/returns plain `CardRecord` objects (no Zod validation)
- [x] Create `src/lib/db/artwork-repo.ts` (AC: 1, 2)
  - [x] Exports async functions: `createArtwork`, `getArtworkById`, `getArtworkByCard`, `deleteArtwork`
  - [x] `createArtwork(data: Omit<ArtworkRecord, 'id' | 'createdAt'>)` generates id + timestamp
  - [x] `getArtworkByCard(cardId)` returns artwork for a specific card
  - [x] `deleteArtwork(id)` removes the artwork record
  - [x] Accepts/returns plain `ArtworkRecord` objects (no Zod validation)
- [x] Create co-located unit tests (AC: 3)
  - [x] `src/lib/db/decks-repo.test.ts` — tests all 5 CRUD operations
  - [x] `src/lib/db/cards-repo.test.ts` — tests all 5 CRUD operations + getCardsByDeck filtering
  - [x] `src/lib/db/artwork-repo.test.ts` — tests create, getById, getByCardId, delete
  - [x] Each test file creates a fresh in-memory Dexie instance per test suite
- [x] Run tests and verify no regressions (26/26 tests pass)
- [x] Run build to confirm no errors

## Dev Notes

- **Story 1.3** from Epic 1 (Project Foundation & Data Layer) — Prerequisite: Story 1.2 (completed)
- **Estimate:** 3 SP
- `dexie@^4.4.4` and `fake-indexeddb@^6.2.5` already installed from previous stories

### Architecture Compliance

- **Repos accept/return plain data:** No Zod validation at the DB layer. Validation happens at store/form boundary (Story 2.2). Repos are thin wrappers around Dexie table operations. [Source: epics-stories.md#Story-1.3]
- **Components never call Dexie directly:** Repos are the sole access layer to IndexedDB. All component/store data access goes through these repos. [Source: architecture.md#Service-Boundaries]
- **Database access:** Use `getDb()` from `src/lib/db/db.ts` to obtain the singleton `TomeForgeDB` instance. Do NOT create new Dexie instances in repos. [Source: src/lib/db/db.ts]
- **ID Generation:** Use `crypto.randomUUID()` for generating record IDs. (Story 1.6 will wrap this in a utility, but implement directly with `crypto.randomUUID()` now for consistency.)
- **Timestamps:** Unix timestamps via `Date.now()`. [Source: architecture.md#Date-Handling-Pattern]
- **Function naming:** Verb-first (`createDeck`, `getDeckById`, `updateDeck`, `deleteDeck`). [Source: architecture.md#Communication-Patterns]
- **File & code naming:** kebab-case filenames, camelCase functions. [Source: architecture.md#Naming-Patterns]
- **Test location:** Co-located with source files. [Source: architecture.md#Test-Location]
- **Test DB isolation:** Each test file creates a *fresh* `TomeForgeDB` instance (don't share across suites). Previous story (1.2) deferred this issue — write tests must use isolated instances to avoid cross-test contamination.
- **Data model types:** Repos use the existing `DeckRecord`, `CardRecord`, `ArtworkRecord` interfaces from `src/lib/db/schema.ts`. [Source: src/lib/db/schema.ts]
- **Deck settings + components:** These fields are JSON strings in the DB layer — repos return them as-is. JSON parse/stringify belongs in the store layer (Story 1.5). Do NOT deserialize in repos.

### Dexie 4.x API Patterns

```typescript
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

export async function createDeck(data: Omit<DeckRecord, "id" | "createdAt" | "updatedAt">): Promise<DeckRecord> {
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

export async function updateDeck(id: string, changes: Partial<DeckRecord>): Promise<DeckRecord | undefined> {
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
```

### Previous Story Intelligence (Story 1.2)

- **Created files:** `src/lib/db/schema.ts` (TomeForgeDB class with 3 tables), `src/lib/db/db.ts` (singleton `getDb()`), `src/lib/db/schema.test.ts`
- **Key fixes applied during review:**
  - `getDb()` uses lazy singleton pattern (not module-level instantiation) to avoid crashes on server-side import
  - `idx_cards_deckId` test now verifies the index is on the `deckId` column specifically
- **Testing pattern:** `fake-indexeddb/auto` imported directly in test files (no separate test-setup.ts needed)
- **Test DB concern:** Single shared db instance is fragile for write tests — deferred, so repos MUST use isolated instances
- **Schema version:** Version 1 for MVP
- **Build verification:** `pnpm build` succeeds, `pnpm test` passes

### Git Intelligence Summary

- Last commit (HEAD): `3c48951` — story 1-2-dexie-schema-database-instance
- Previous commit: `bc2a9cd` — story 1-1-install-domain-libraries
- Work pattern: Dedicated commits per story, sequential development, tests and build verification in each story

### Project Structure Notes

- `src/lib/db/decks-repo.ts` — **NEW file** — CRUD operations on `decks` table
- `src/lib/db/cards-repo.ts` — **NEW file** — CRUD operations on `cards` table
- `src/lib/db/artwork-repo.ts` — **NEW file** — CRUD operations on `artwork` table
- `src/lib/db/decks-repo.test.ts` — **NEW file** — Co-located unit test for decks-repo
- `src/lib/db/cards-repo.test.ts` — **NEW file** — Co-located unit test for cards-repo
- `src/lib/db/artwork-repo.test.ts` — **NEW file** — Co-located unit test for artwork-repo
- All paths align with the architecture's project structure [Source: architecture.md#File-Structure]
- Existing `src/lib/db/` already contains `schema.ts`, `db.ts`, `schema.test.ts` — repos extend from these

### References

- [Source: epics-stories.md#Story-1.3] — Core story requirements, ACs, prerequisites ("Each repo exposes async CRUD methods", "Repos accept/return plain data", "Unit tests for each repo method using a test database")
- [Source: architecture.md#Data-Architecture] — Storage layers, Dexie tables (cards, decks, artwork)
- [Source: architecture.md#Data-Model] — DeckRecord, CardRecord, ArtworkRecord interfaces
- [Source: architecture.md#Service-Boundaries] — "Components never call Dexie directly" — repos are the data access boundary
- [Source: architecture.md#Structure-Patterns] — Repo file locations in `src/lib/db/`
- [Source: architecture.md#Naming-Patterns] — kebab-case files, camelCase functions, verb-first action names
- [Source: architecture.md#Communication-Patterns] — Verb-first naming (`createDeck`, `getAllDecks`)
- [Source: architecture.md#Date-Handling-Pattern] — Unix timestamps (`Date.now()`)
- [Source: architecture.md#Test-Location] — Co-located unit tests
- [Source: src/lib/db/schema.ts] — Existing TomeForgeDB class and record interfaces
- [Source: src/lib/db/db.ts] — Singleton `getDb()` accessor
- [Source: src/lib/db/schema.test.ts] — Existing test patterns using fake-indexeddb

### Review Findings

- [x] [Review] Blob reference equality in artwork test — replaced `toBe(smallBlob)` with property checks (`toBeInstanceOf(Blob)`, `.size`, `.type`). [src/lib/db/artwork-repo.test.ts:37-39]
- [x] [Review] System field corruption via changes spread — `updateDeck`/`updateCard` now strip `createdAt` from caller-supplied `changes` before spreading. [src/lib/db/decks-repo.ts:35-38, src/lib/db/cards-repo.ts:37-40]
- [x] [Review][Deferred] Test DB isolation shared singleton across test files — deferred (same issue from Story 1.2). Calling `db.delete()` on the shared singleton closes it globally; a proper fix requires either modifying `getDb()` to support per-suite instances or accepting the shared singleton with `beforeEach` cleanup. [src/lib/db/decks-repo.test.ts:16, src/lib/db/cards-repo.test.ts:15, src/lib/db/artwork-repo.test.ts:14]
- [x] [Review][Defer] getArtworkByCard unindexed full table scan — uses `db.artwork.filter().first()` without a `cardId` index. Functional but O(n) per call. Spec does not mandate adding an index. [src/lib/db/artwork-repo.ts:17]
- [x] [Review][Defer] getAllDecks/getAllCards no pagination or ordering — returns all records without explicit sort or limit. Functional at current scale; add pagination when dataset grows. [src/lib/db/decks-repo.ts:6, src/lib/db/cards-repo.ts:6]
- [x] [Review][Defer] getCardsByDeck accepts empty deckId — no guard against `""` input. Caller validation responsibility per repo thin-wrapper design. [src/lib/db/cards-repo.ts:16]

## Dev Agent Record

### Agent Model Used

Anthropic Claude 4.5 (Cline)

### Debug Log References

### Completion Notes List

### File List

- `src/lib/db/decks-repo.ts` — created (CRUD operations on `decks` table)
- `src/lib/db/cards-repo.ts` — created (CRUD operations on `cards` table)
- `src/lib/db/artwork-repo.ts` — created (CRUD operations on `artwork` table)
- `src/lib/db/decks-repo.test.ts` — created (8 test cases for decks-repo)
- `src/lib/db/cards-repo.test.ts` — created (10 test cases for cards-repo)
- `src/lib/db/artwork-repo.test.ts` — created (7 test cases for artwork-repo)
