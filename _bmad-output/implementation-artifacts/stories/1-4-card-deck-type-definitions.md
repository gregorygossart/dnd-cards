---
baseline_commit: d6b75914988628645a8d98cc59e461294834e2ee
---

# Story 1.4 — Card & Deck Type Definitions

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

**As a** developer
**I want** TypeScript types for `CardType`, `CardBase`, `SpellCard`, `Deck`, `DeckSettings`, `CardFormat`, `DensityPreset`, and share-related types
**So that** the polymorphic card system is strongly typed and all downstream code can rely on exhaustive, type-safe contracts

## Acceptance Criteria

1. [x] `src/types/card.types.ts` exports `CardType`, `CardBase`, `SpellCard`, `SchoolOfMagic`, and `BlobRef`
2. [x] `src/types/deck.types.ts` exports `Deck`, `DeckSettings`, `CardFormat`, and `DensityPreset`
3. [x] `src/types/share.types.ts` exports share-related types (e.g. `SharedDeckPayload`)
4. [x] Exhaustive switch coverage is enforced: a `never` return on `card.type` triggers a TypeScript error on missing variants
5. [x] A compile-time type discrimination test (`card.types.test.ts`) proves exhaustive coverage

## Tasks / Subtasks

- [x] Create `src/types/card.types.ts` (AC: 1)
- [x] Define `CardType = "spell" | "item" | "capacity"` (string literal union reserving room for future variants)
  - [x] Define `SchoolOfMagic` enum / const union matching D&D 5e schools
  - [x] Define `BlobRef` (string reference keying into Dexie `artwork` table)
  - [x] Define `CardBase` with id, deckId, type, name, createdAt, updatedAt
  - [x] Define `SpellCard extends CardBase` with all FR-4.1.1 fields (level, school, castingTime, range, components, duration, description, higherLevels, accentColor, optional artwork)
  - [x] Export `type Card = SpellCard` (extendable to `ItemCard | CapacityCard | ...` later)
  - [x] Export `type CardComponent = { verbal: boolean; somatic: boolean; material: boolean; materialText?: string }`
- [x] Create `src/types/deck.types.ts` (AC: 2)
  - [x] Define `CardFormat = "poker" | "tarot"`
  - [x] Define `DensityPreset = "standard" | "compact" | "spacious"`
  - [x] Define `DeckSettings` with `format`, `density`, optional theme config placeholders
  - [x] Define `Deck` using existing `DeckRecord` semantics + `settings: DeckSettings`
- [x] Create `src/types/share.types.ts` (AC: 3)
  - [x] Define `SharedDeckPayload` v1 — text-only (no artwork blobs for MVP)
  - [x] Include `version`, `exportedAt`, `decks`, and `cards` arrays aligned with DB records
  - [x] `SharedDeckPayload` keeps `decks` (plural) because the export format bundles multiple decks; `cards` is top-level to preserve flat card ordering independent of deck nesting
- [x] Create compile-time test `src/types/card.types.test.ts` (AC: 5)
  - [x] Implement `assertExhaustiveCardType(card: Card)` that switches on `card.type` and returns `never` on default
  - [x] Test file compiles cleanly with current `Card` union
- [x] Run `pnpm tsc --noEmit` and verify no type errors introduced
- [x] Apply review patches: add `cards`/`cardCount` to `SharedDeckPayload`, expand `CardType` to union, update exhaustiveness test

## Dev Notes

- **Story 1.4** from Epic 1 (Project Foundation & Data Layer) — Prerequisite: Story 1.1 (install libraries), runs in parallel with 1.2/1.3
- **Estimate:** 2 SP
- **Type discrimination discipline:** The architecture mandates exhaustive `switch(card.type)` with `never` return. This story establishes the union. Future stories add variants by extending the union; the `never` test catches omissions at compile time, not runtime. [Source: architecture.md#Card-Type-Discrimination-Pattern]
- **MVP scope:** Only `SpellCard` is required for MVP. The union and interfaces are places for `ItemCard`, `CapacityCard`, etc. to be added later. Design for extension from day one, but only implement `SpellCard`. [Source: architecture.md#Deferred-Decisions]
- **DB layer alignment:** Epics/stories describe `CardRecord`/`DeckRecord` interfaces already present in `src/lib/db/schema.ts`. These DB records use loose `string` for type discriminants. `src/types/` defines the strictly typed domain layer above them. Do NOT import from `schema.ts` into `src/types/` to avoid coupling the domain layer to the storage representation. Instead, the store layer (Story 1.5) will translate between `CardRecord` ↔ `Card` / `DeckRecord` ↔ `Deck`.
- **Date semantics:** Store `createdAt`/`updatedAt` as Unix timestamps (`number`) per architecture rules. Convert to ISO only at UI boundary. [Source: architecture.md#Date-Handling-Pattern]
- **School of Magic:** Match PRD FR-4.1.1 exactly: Abjuration, Conjuration, Divination, Enchantment, Evocation, Illusion, Necromancy, Transmutation. Use a `const` object + `as const` + `type SchoolOfMagic = typeof SCHOOLS[keyof typeof SCHOOLS]` pattern so it stays synchronous and avoids enum overhead. This also plays nicely with Zod `nativeEnum` later (Story 2.2).
- **`SpellCard.components` shape:** Use a plain object `{ verbal: boolean; somatic: boolean; material: boolean; materialText?: string }` — matches architecture.md data model and the Zod example in `spell-schema.ts`.
- **`SpellCard.accentColor`:** Keep as `string`. The PRD/architecture specify a hex regex in Zod (Story 2.2). No runtime enforcement at the type layer.
- **`BlobRef` semantics:** A `string` key that corresponds to the `id` field in the Dexie `artwork` table. This is a reference, not the blob itself. Repos handle the mapping.
- **File naming:** kebab-case for files, PascalCase for types. [Source: architecture.md#Naming-Patterns]
- **Test location:** Co-located `card.types.test.ts` alongside `card.types.ts`. [Source: architecture.md#Test-Location]

### Architecture Compliance

- **Domain types live in `src/types/`**, separate from `src/lib/db/schema.ts` record interfaces. This enforces the boundary that DB records are storage representations, while domain types are the app's source of truth. [Source: architecture.md#Architectural-Boundaries]
- **Synchronous types:** No Zod in `src/types/`. Zod schemas belong in `src/features/card-editor/` (Story 2.2). [Source: epics-stories.md#Story-1.4]
- **Exhaustive type discrimination:** Exported `never` helper is the canonical way to prove exhaustiveness. [Source: architecture.md#Process-Patterns]

### Project Structure Notes

- `src/types/card.types.ts` — **NEW file** — Card type definitions
- `src/types/deck.types.ts` — **NEW file** — Deck/deck settings definitions
- `src/types/share.types.ts` — **NEW file** — Share payload definitions
- `src/types/card.types.test.ts` — **NEW file** — Compile-time exhaustiveness test
- All paths align with the architecture's project structure [Source: architecture.md#File-Structure]
- Types are plain TypeScript — no runtime code, no decorators

### Previous Story Intelligence

Story 1.3 (Repository Layer) established:
- Repos operate on `DeckRecord`, `CardRecord`, `ArtworkRecord` from `src/lib/db/schema.ts`
- System fields (`id`, `createdAt`, `updatedAt`) are generated at DB/repo layer
- Repos are thin wrappers — no Zod, no business logic
- Test pattern: `fake-indexeddb/auto` imported in each test file

For Story 1.4, these learnings mean:
- The store layer (Story 1.5) will bridge these DB records to these new domain types
- Types must be serializable-friendly (JSON-friendly) since `.tomeforge` export will stringify them
- Tests for this story are compile-time only — no runtime behavior

## References

- [Source: _bmad-output/implementation-artifacts/epics-stories-TomeForge-2026-06-20.md#Story-1.4] — Core story requirements, ACs, prerequisites
- [Source: _bmad-output/planning-artifacts/architecture.md#Card-Type-System] — Polymorphic discriminated union design
- [Source: _bmad-output/planning-artifacts/architecture.md#Data-Model] — DeckRecord, CardRecord, ArtworkRecord interfaces
- [Source: _bmad-output/planning-artifacts/architecture.md#Process-Patterns] — Exhaustive switch coverage with `never`
- [Source: _bmad-output/planning-artifacts/architecture.md#Date-Handling-Pattern] — Unix timestamps in store, ISO at UI boundary
- [Source: _bmad-output/planning-artifacts/prds/prd-TomeForge-2026-06-20/prd.md#FR-4.1.1] — Spell card field requirements (schools, components, etc.)
- [Source: src/lib/db/schema.ts] — Existing TomeForgeDB class and record interfaces (DB layer reference)

## Dev Agent Record

### Agent Model Used

Anthropic Claude 4.5 (Cline)

### Debug Log References

### Completion Notes List

- Implemented domain type layer aligned with architecture.md#Data-Model
- Created `CardType = 'spell'` as string-literal union; exhaustive check implemented via `switch` + `never` parameter helper
- Export `Card = SpellCard` prepared for future `ItemCard`/`CapacityCard` variants
- `SchoolOfMagic` derived from const object, ready for Zod `nativeEnum` in Story 2.2

### File List

- `src/types/card.types.ts` — created
- `src/types/deck.types.ts` — created
- `src/types/share.types.ts` — created
- `src/types/card.types.test.ts` — created