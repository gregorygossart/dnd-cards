---
baseline_commit: 90d8321524a393f20e3044de45098c848164ac66
---

# Story 1.2 — Dexie Schema & Database Instance

**As a** developer
**I want** a Dexie schema with tables for `decks`, `cards`, and `artwork`
**So that** binary assets and card data can be persisted in IndexedDB

## Acceptance Criteria

1. [x] `src/lib/db/schema.ts` defines tables, columns, and indexes per architecture
2. [x] `src/lib/db/db.ts` exports a single Dexie instance
3. [x] Schema includes `idx_cards_deckId` index
4. [x] Unit tests verify schema structure

## Tasks / Subtasks

- [x] Create `src/lib/db/schema.ts` with Dexie schema definition (AC: 1, 3)
  - [x] Define `decks` table with `id` as primary key, columns: `name`, `createdAt`, `updatedAt` plus `settings`, `cardFormat`, `densityPreset`
  - [x] Define `cards` table with `id` as primary key, columns: `deckId`, `type`, `name`, `level`, `school`, `castingTime`, `range`, `components`, `duration`, `description`, `higherLevels`, `accentColor`, `artwork`, `createdAt`, `updatedAt`
  - [x] Define `idx_cards_deckId` index on `cards.deckId` (Dexie index named `deckId`)
  - [x] Define `artwork` table with `id` as primary key, columns: `cardId`, `blob`, `mimeType`, `createdAt`
  - [x] Export `TomeForgeDB` class extending Dexie with typed table accessors
- [x] Create `src/lib/db/db.ts` that exports a single Dexie instance (AC: 2)
  - [x] Instantiate and export a singleton `TomeForgeDB` instance
  - [x] Ensure the instance is created once (singleton pattern)
- [x] Create co-located unit test `src/lib/db/schema.test.ts` (AC: 4)
  - [x] Verify all three tables exist (`decks`, `cards`, `artwork`)
  - [x] Verify `idx_cards_deckId` index exists on cards table
  - [x] Verify schema version is correct
  - [x] Verify table column mappings are correct
- [x] Run tests and verify no regressions
- [x] Run build to confirm no errors

## Dev Notes

- **Story 1.2** from Epic 1 (Project Foundation & Data Layer) — Prerequisite: Story 1.1 (completed)
- **Estimate:** 2 SP
- dexie@^4.4.4 is already installed (from story 1.1)
- `src/lib/db/` directory exists but is currently empty — this story creates the initial files

### Architecture Compliance

- **Dexie Table Naming:** Tables must be plural lowercase (`decks`, `cards`, `artwork`). Columns must be camelCase (`deckId`, `createdAt`, `accentColor`). Indexes follow pattern `idx_{table}_{column}` (`idx_cards_deckId`). [Source: architecture.md#Naming-Patterns]
- **Storage Architecture:** Dexie (IndexedDB) for cards + artwork blobs (~50MB+ quota). localStorage for settings (separate concern). [Source: architecture.md#Data-Architecture]
- **Data Model:** The CardBase/SpellCard/Deck interfaces from architecture define the shape each table stores. Cards table stores the polymorphic discriminated union via the `type` discriminator field. [Source: architecture.md#Data-Model]
- **File Structure:** Schema goes in `src/lib/db/schema.ts`, DB instance in `src/lib/db/db.ts`. Repositories (Story 1.3) will be added later in `src/lib/db/`. [Source: architecture.md#Structure-Patterns]
- **Components never call Dexie directly** — that's the repository layer's job (Story 1.3). This story only creates schema + instance. [Source: architecture.md#Service-Boundaries]
- **Dexie version:** Use version 1 for MVP. The schema will be versioned for future migrations.
- **Test location:** Unit tests are co-located with source files (`schema.test.ts` next to `schema.ts`). [Source: architecture.md#Test-Location]
- **ID Generation:** IDs are generated via `crypto.randomUUID()` (will be implemented in Story 1.6). For schema purposes, `id` columns are plain strings.
- **Timestamps:** Stored as Unix timestamps (numbers). [Source: architecture.md#Date-Handling-Pattern]
- **No Zod validation at DB layer** — validation happens at store/form boundary. Repos return plain data. [Source: epics-stories.md#Story-1.3]

### Dexie 4.x API Notes

- Dexie 4 uses `dexie` npm package. The schema is defined in the constructor via `this.version(n).stores({...})`.
- Table accessor types: `Dexie.Table<T, TKey>` where T is the interface and TKey is the primary key type.
- Map each table to its corresponding TypeScript interface for type safety.
- Use `export type TableName = TomeForgeDB['tablename']` pattern for convenient type exports.

### Data Model Mapping

```
decks table (primary key: id)
  - id: string (crypto.randomUUID)
  - name: string
  - settings: string (JSON-serialized DeckSettings)
  - cardFormat: string ('poker' | 'tarot')
  - densityPreset: string
  - createdAt: number (Unix timestamp)
  - updatedAt: number (Unix timestamp)

cards table (primary key: id)
  - id: string
  - deckId: string (INDEX: idx_cards_deckId)
  - type: string ('spell' | discriminator)
  - name: string
  - level: number
  - school: string
  - castingTime: string
  - range: string
  - components: string (JSON-serialized Components object)
  - duration: string
  - description: string
  - higherLevels: string (optional)
  - accentColor: string
  - artwork: string (optional, BlobRef reference)
  - createdAt: number
  - updatedAt: number

artwork table (primary key: id)
  - id: string
  - cardId: string
  - blob: Blob
  - mimeType: string
  - createdAt: number
```

### Previous Story Intelligence (Story 1.1)

- **Completed files:** `package.json` (modified), `vitest.config.ts` (modified), `src/__tests__/install-verification.test.ts` (new)
- **Libraries installed:** dexie@^4.4.4, @react-pdf/renderer@^4.5.1, @dnd-kit/core@^6.3.1, @dnd-kit/sortable@^10.0.0
- **Testing setup:** Vitest configured with co-located test support via `include` + `includeSource` patterns
- **Baseline commit:** `90d8321524a393f20e3044de45098c848164ac66`
- **Build verification:** `pnpm build` succeeds, `pnpm test` passes
- **Code review outcome:** Clean — no findings, all layers passed (Blind Hunter, Edge Case Hunter, Acceptance Auditor)

### Project Structure Notes

- `src/lib/db/schema.ts` — **NEW file** — Dexie schema definition with typed tables
- `src/lib/db/db.ts` — **NEW file** — Singleton Dexie instance export
- `src/lib/db/schema.test.ts` — **NEW file** — Co-located unit test
- All paths align with the architecture's project structure [Source: architecture.md#File-Structure]
- Existing `src/lib/db/` directory is empty — no existing files to modify

### References

- [Source: epics-stories.md#Story-1.2] — Core story requirements, ACs, prerequisites
- [Source: architecture.md#Data-Architecture] — Storage layers, tech choices, rationale
- [Source: architecture.md#Data-Model] — CardBase, SpellCard, Deck type definitions
- [Source: architecture.md#Naming-Patterns] — Table naming (plural lowercase), column naming (camelCase), index naming (idx_{table}_{column})
- [Source: architecture.md#Structure-Patterns] — Project file locations
- [Source: architecture.md#Service-Boundaries] — Components never call Dexie directly
- [Source: architecture.md#Date-Handling-Pattern] — Unix timestamps at store level
- [Source: epics-stories.md#Story-1.3] — Repos accept/return plain data (no Zod at DB layer)
- [Source: prd.md#FR-4.6] — Data persistence requirements
- [Source: architecture.md#Implementation-Patterns] — Pattern guardrails and enforcement guidelines

## Review Findings

- [x] [Review][Patch] Dexie instance created at module scope — crashes on server-side import [src/lib/db/db.ts:5]
- [x] [Review][Patch] `idx_cards_deckId` test doesn't verify the index is on the `deckId` column [src/lib/db/schema.test.ts:32-43]
- [x] [Review][Defer] Tests share single db instance — fragile for write tests [src/lib/db/schema.test.ts:7-9] — deferred, read-only tests only; revisit when write tests are added

## Dev Agent Record

### Agent Model Used

Anthropic Claude 4.5 (Cline)

### Debug Log References

- Schema was initially deployed with `&idx_cards_deckId` (unique constraint) — corrected to non-unique `deckId` index since multiple cards can belong to the same deck.
- `fake-indexeddb@6.2.5` added as dev dependency for IndexedDB mocking in jsdom test environment.

### Completion Notes List

- Created `src/lib/db/schema.ts` — defines `TomeForgeDB` class extending Dexie with three typed tables (`decks`, `cards`, `artwork`), each with their respective interfaces (`DeckRecord`, `CardRecord`, `ArtworkRecord`). Schema version 1 with indexes: `decks` (id), `cards` (id, deckId), `artwork` (id). The `deckId` column on cards creates the `idx_cards_deckId` index per architectural naming convention.
- Created `src/lib/db/db.ts` — exports a singleton `TomeForgeDB` instance, created at import time and reused across the app lifecycle.
- Created `src/lib/db/schema.test.ts` — 8 unit tests covering all tables existence, schema version (1), `idx_cards_deckId` index presence, and primary key mappings.
- All 8 tests pass (0 failures, 0 regressions).
- Production build succeeds with no TypeScript errors.
- `fake-indexeddb` (v6.2.5) installed as dev dependency for in-memory IndexedDB mocking.
- Created and removed `test-setup.ts` (not needed — fake-indexeddb imported directly in test file).

### File List

- `src/lib/db/schema.ts` (new)
- `src/lib/db/db.ts` (new)
- `src/lib/db/schema.test.ts` (new)
- `package.json` (modified — added fake-indexeddb dev dependency)
- `pnpm-lock.yaml` (modified — dependency resolution)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (modified — status: in-progress)

## Status

done
