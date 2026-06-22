---
baseline_commit: 2be23965d38aa0fcf2e18516ea736025566c7fca
---

# Story 1.5 — Zustand Stores with Persistence Middleware

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

**As a** developer
**I want** `deck-store.ts`, `card-store.ts`, and `ui-store.ts` with Dexie-backed persistence
**So that** all UI state is managed centrally and auto-saved

## Acceptance Criteria

1. [x] `deck-store.ts` exposes verb-first actions (`addDeck`, `renameDeck`, `deleteDeck`, `setActiveDeck`) using Zustand
2. [x] `card-store.ts` exposes verb-first actions (`addCard`, `updateCard`, `deleteCard`, `reorderCards`) using Zustand
3. [x] `ui-store.ts` exposes verb-first actions (`setView`, `setSelectedCardId`, `setTheme`, `setDensity`) using Zustand
4. [x] Each store uses Zustand `persist` middleware with Dexie storage adapter, debounced at 500ms
5. [x] Stores use selector-isolated re-renders per architecture diagram (consumers subscribe to narrow slices)
6. [x] Unit tests verify each action mutates state correctly
7. [x] Repo calls for persistence happen inside store actions, never in components
8. [x] Stores translate between DB records (`CardRecord`, `DeckRecord`) and domain types (`Card`, `Deck`) at the boundary

## Tasks / Subtasks

- [x] Set up Zustand persist middleware with Dexie storage adapter (shared utility) (AC: 4)
- [x] Create `src/stores/deck-store.ts` (AC: 1)
  - [x] Define `DeckState` with `decks: Deck[]`, `activeDeckId: string | null`
  - [x] Add `addDeck(name)` — creates `Deck` object, dispatches to decks-repo, updates state
  - [x] Add `renameDeck(id, name)` — updates via repo, patches state
  - [x] Add `deleteDeck(id)` — removes via repo, clears activeDeckId if matching
  - [x] Add `setActiveDeck(id)` — updates `activeDeckId` in state
  - [x] Configure persist with `name: 'deck-store'`, `storage: dexieStorage`, partialize to `decks` + `activeDeckId`
- [x] Create `src/stores/card-store.ts` (AC: 2)
  - [x] Define `CardState` with `cards: Card[]` scoped to active deck, `selectedCardId: string | null`
  - [x] Add `addCard(deckId, cardType)` — creates `Card` with generated id, inserts via cards-repo, pushes to state
  - [x] Add `updateCard(partial)` — patches via repo, immutably updates matching card in state
  - [x] Add `deleteCard(id)` — removes via repo, filters from state, clears selectedCardId if matching
  - [x] Add `reorderCards(deckId, startIndex, endIndex)` — reorders array in state, persists new order via repo
  - [x] Configure persist similarly with debounce
- [x] Create `src/stores/ui-store.ts` (AC: 3)
  - [x] Define `UiState` with `view: 'grid' | 'editor' | 'print'`, `selectedCardId: string | null`, `theme: string`, `density: DensityPreset`
  - [x] Add `setView(view)`, `setSelectedCardId(id)`, `setTheme(theme)`, `setDensity(density)`
  - [x] Persist `view`, `theme`, `density` (exclude transient `selectedCardId` from persistence)
- [x] Create `src/stores/index.ts` barrel export (AC: all)
- [x] Create `src/stores/use-deck-store.test.ts` (AC: 6)
  - [x] Test `addDeck` creates deck with generated id and updates state
  - [x] Test `renameDeck` updates name in state and calls repo
  - [x] Test `deleteDeck` removes deck and clears activeDeckId
  - [x] Test `setActiveDeck` updates activeDeckId
  - [x] Mock repo methods, verify calls
- [x] Create `src/stores/use-card-store.test.ts` (AC: 6)
  - [x] Test `addCard` creates card with correct deckId
  - [x] Test `updateCard` patches fields immutably
  - [x] Test `deleteCard` removes card and clears selectedCardId
  - [x] Test `reorderCards` reorders array correctly
  - [x] Mock repo methods, verify calls
- [x] Create `src/stores/use-ui-store.test.ts` (AC: 6)
  - [x] Test each setter updates corresponding state slice
  - [x] Verify `selectedCardId` is not persisted
- [x] Run `pnpm tsc --noEmit` and verify no type errors introduced

## Dev Notes

- **Story 1.5** from Epic 1 (Project Foundation & Data Layer) — Prerequisite: Story 1.3 (repository layer), runs after types are defined (Story 1.4)
- **Estimate:** 3 SP
- **Verb-first actions:** Every Zustand action must be a verb phrase (`addDeck`, not `decks`). This is an architecture constraint. [Source: architecture.md#State-Action-Naming]
- **Selector-isolated re-renders:** Components must subscribe to narrow slices. Example: `const decks = useDeckStore(s => s.decks)` not `useDeckStore(s => s)`. This prevents the entire store subscriber list from re-rendering on every state change. [Source: architecture.md#Selector-Isolation-Pattern]
- **Repo calls inside actions, never in components:** Components dispatch actions; actions call repos. Components are unaware of Dexie. [Source: architecture.md#Separation-of-Concerns]
- **DB ↔ Domain translation at store boundary:** DB records use loose types (e.g., `type: string`); domain types use discriminated unions (e.g., `type: 'spell'`). The store converts `CardRecord` → `Card` on read, and `Card` → plain payload on write. This keeps the domain layer clean. [Source: architecture.md#Architectural-Boundaries]
- **Persistence debounce:** 500ms debounce on persist middleware prevents excessive IndexedDB writes during rapid edits. Use Zustand's `partialize` to limit what gets persisted. [Source: architecture.md#Performance-Patterns]
- **Date semantics:** Store `createdAt`/`updatedAt` as Unix timestamps (`number`). Do not convert to ISO in stores. [Source: architecture.md#Date-Handling-Pattern]
- **Dexie storage adapter:** Zustand's `persist` middleware accepts a custom storage engine. Implement a thin wrapper around the Dexie instance that exposes `getItem`, `setItem`, `removeItem`. This keeps the dependency on Dexie confined to the persistence layer.
- **Card store scoping:** The card store should scope cards to the active deck. When `activeDeckId` changes in `deck-store`, components derive the card list via `useCardStore(s => s.cards.filter(c => c.deckId === activeDeckId))` or the store accepts an `activeDeckId` dependency via a selector. Keep this simple: store holds all cards, component filters.
- **UI store transient state:** `selectedCardId` is UI chrome (which card is highlighted in the grid). It should NOT be persisted — on reload, no card is selected by default. This is why `partialize` is important.
- **Testing pattern:** Mock repo methods using `vi.fn()`. Verify state mutations synchronously (Zustand actions are synchronous by default; only persist is async). Do not test Dexie in unit tests — that belongs in repo tests (Story 1.3). [Source: architecture.md#Test-Strategy]
- **File naming:** `use-` prefix for store hooks (`useDeckStore`, `useCardStore`, `useUiStore`). kebab-case for files. [Source: architecture.md#Naming-Patterns]
- **Barrel export:** `src/stores/index.ts` re-exports all stores and hooks so consumers import from `@/stores` consistently.

### Architecture Compliance

- **Zustand as state container:** No Redux, no Context API for global state. Zustand is the prescribed state library. [Source: architecture.md#Technology-Stack]
- **Persistence via middleware:** `persist` is the canonical way to sync Zustand state to IndexedDB. Do not implement manual save logic. [Source: architecture.md#State-Persistence-Pattern]
- **Actions are the only mutation path:** State is mutated exclusively through store actions. No direct `set` calls from components. [Source: architecture.md#State-Mutation-Pattern]

### Project Structure Notes

- `src/stores/deck-store.ts` — **NEW file** — Deck state and actions
- `src/stores/card-store.ts` — **NEW file** — Card state and actions
- `src/stores/ui-store.ts` — **NEW file** — UI chrome state and actions
- `src/stores/index.ts` — **NEW file** — Barrel re-exports
- `src/stores/use-deck-store.test.ts` — **NEW file** — Deck store unit tests
- `src/stores/use-card-store.test.ts` — **NEW file** — Card store unit tests
- `src/stores/use-ui-store.test.ts` — **NEW file** — UI store unit tests

### Previous Story Intelligence

Story 1.3 (Repository Layer) established:
- Repos expose `addDeck`, `renameDeck`, `deleteDeck`, `addCard`, `updateCard`, `deleteCard`, `reorderCard` async methods
- Repos accept/return plain data — no Zod
- Repos operate on `DeckRecord`, `CardRecord`, `ArtworkRecord` from `src/lib/db/schema.ts`
- Test pattern: mock repos with `vi.fn()`

Story 1.4 (Type Definitions) established:
- `Card = SpellCard` discriminated union with `type: 'spell'`
- `Deck`, `DeckSettings`, `CardFormat`, `DensityPreset` types
- `CardRecord` ↔ `Card` translation required at store boundary
- `createdAt`/`updatedAt` as Unix timestamps

For Story 1.5, these learnings mean:
- Store `addDeck` constructs a `Deck` object (with generated id + timestamps), calls `repos.decks.add(deckPayload)`, then updates state
- Store `addCard` similarly constructs a `Card`, calls `repos.cards.add(cardPayload)`, then pushes to state
- Store actions must convert between domain types and the plain payload shapes repos expect
- `reorderCards` translates Zustand array manipulation into a repo call that updates `order` fields

## References

- [Source: _bmad-output/implementation-artifacts/epics-stories-TomeForge-2026-06-20.md#Story-1.5] — Core story requirements, ACs, prerequisites
- [Source: _bmad-output/planning-artifacts/architecture.md#State-Management] — Zustand store design principles
- [Source: _bmad-output/planning-artifacts/architecture.md#State-Action-Naming] — Verb-first action naming rule
- [Source: _bmad-output/planning-artifacts/architecture.md#Selector-Isolation-Pattern] — Narrow selector subscription rule
- [Source: _bmad-output/planning-artifacts/architecture.md#State-Persistence-Pattern] — Dexie persist middleware pattern
- [Source: _bmad-output/planning-artifacts/architecture.md#Performance-Patterns] — 500ms debounce requirement
- [Source: _bmad-output/planning-artifacts/architecture.md#Architectural-Boundaries] — DB record vs domain type translation
- [Source: _bmad-output/implementation-artifacts/stories/1-3-repository-layer.md] — Repo method signatures and test patterns
- [Source: _bmad-output/implementation-artifacts/stories/1-4-card-deck-type-definitions.md] — Domain type definitions
- [Source: src/lib/db/schema.ts] — Existing DB record interfaces and Dexie instance

## Dev Agent Record

### Agent Model Used

Anthropic Claude 4.5 (Cline)

### Debug Log References

### Completion Notes List

### File List