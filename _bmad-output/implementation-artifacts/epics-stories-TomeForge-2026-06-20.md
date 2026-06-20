---
title: TomeForge Epics & Stories
status: final
created: 2026-06-20
updated: 2026-06-20
sourceDocuments:
  - _bmad-output/planning-artifacts/prds/prd-TomeForge-2026-06-20/prd.md
  - _bmad-output/planning-artifacts/architecture.md
---

# TomeForge Epics & Stories

## Epic Summary

| ID | Epic | FRs Covered | Priority |
|----|------|-------------|----------|
| E1 | Project Foundation & Data Layer | FR-4.6, NFR-5.3 | P0 |
| E2 | Card Editor & Live Preview | FR-4.1, FR-4.4 | P0 |
| E3 | Deck Management & Persistence | FR-4.2, FR-4.6 | P0 |
| E4 | Print Layout & PDF Export | FR-4.3 | P1 |

---

## Epic 1: Project Foundation & Data Layer

**Goal:** Establish the storage layer, state management, and core types so that all subsequent features have a solid base.

**FRs covered:** FR-4.6
**Dependencies:** None
**Estimated stories:** 6

---

### Story 1.1 — Install Domain Libraries

**As a** developer
**I want** the required libraries (`dexie`, `@react-pdf/renderer`, `@dnd-kit/core`, `@dnd-kit/sortable`, `zod`) installed
**So that** I can build features on the prescribed architecture

**Acceptance Criteria:**
- [ ] All domain libraries added to `package.json` with compatible versions
- [ ] `vitest.config.ts` supports co-located tests
- [ ] Project builds without errors after install

**Prerequisites:** None
**Estimate:** 1 SP

---

### Story 1.2 — Dexie Schema & Database Instance

**As a** developer
**I want** a Dexie schema with tables for `decks`, `cards`, and `artwork`
**So that** binary assets and card data can be persisted in IndexedDB

**Acceptance Criteria:**
- [ ] `src/lib/db/schema.ts` defines tables, columns, and indexes per architecture
- [ ] `src/lib/db/db.ts` exports a single Dexie instance
- [ ] Schema includes `idx_cards_deckId` index
- [ ] Unit tests verify schema structure

**Prerequisites:** Story 1.1
**Estimate:** 2 SP

---

### Story 1.3 — Repository Layer

**As a** developer
**I want** repository classes (`decks-repo`, `cards-repo`, `artwork-repo`) that abstract Dexie access
**So that** components never call Dexie directly

**Acceptance Criteria:**
- [ ] Each repo exposes async CRUD methods
- [ ] Repos accept/return plain data (no Zod validation — that's handled at store/form boundary)
- [ ] Unit tests for each repo method using a test database

**Prerequisites:** Story 1.2
**Estimate:** 3 SP

---

### Story 1.4 — Card & Deck Type Definitions

**As a** developer
**I want** TypeScript types for `CardBase`, `SpellCard`, `Deck`, `CardType`, `DeckSettings`
**So that** the polymorphic card system is strongly typed

**Acceptance Criteria:**
- [ ] `src/types/card.types.ts` exports `CardType`, `CardBase`, `SpellCard`, `SchoolOfMagic`, `BlobRef`
- [ ] `src/types/deck.types.ts` exports `Deck`, `DeckSettings`, `CardFormat`, `DensityPreset`
- [ ] `src/types/share.types.ts` exports share-related types
- [ ] Exhaustive switch coverage enforced: `never` return on `card.type`

**Prerequisites:** Story 1.1
**Estimate:** 2 SP

---

### Story 1.5 — Zustand Stores with Persistence Middleware

**As a** developer
**I want** `deck-store.ts`, `card-store.ts`, and `ui-store.ts` with Dexie-backed persistence
**So that** all UI state is managed centrally and auto-saved

**Acceptance Criteria:**
- [ ] Each store uses Zustand with verb-first actions (`addDeck`, `updateCard`, `setView`)
- [ ] `persist` middleware debounces writes at 500ms
- [ ] Stores use selector-isolated re-renders per architecture diagram
- [ ] Unit tests verify each action mutates state correctly
- [ ] Repo calls happen inside store actions (not in components)

**Prerequisites:** Story 1.3
**Estimate:** 3 SP

---

### Story 1.6 — Shared Utilities & Feature Flags

**As a** developer
**I want** helpers for ID generation, date formatting, and feature flags
**So that** implementation patterns are consistent across the codebase

**Acceptance Criteria:**
- [ ] `id-generator.ts` exports `generateId()` using `crypto.randomUUID()`
- [ ] `date-utils.ts` converts Unix timestamps ↔ ISO strings
- [ ] `features.ts` exports `as const` flags (e.g., `isPremium = false`)
- [ ] Unit tests for each utility

**Prerequisites:** Story 1.1
**Estimate:** 1 SP

---

**Epic 1 Done When:** All 6 stories complete, stores persist to IndexedDB, app renders an empty state.

---

## Epic 2: Card Editor & Live Preview

**Goal:** Build the spell card creation form with live preview, artwork upload, and visual themes.

**FRs covered:** FR-4.1, FR-4.4
**Dependencies:** Epic 1
**Estimated stories:** 7

---

### Story 2.1 — Card Type Discrimination & Content Model

**As a** developer
**I want** the `SpellCardContent` component with exhaustive type switching
**So that** card content renders correctly by card type

**Acceptance Criteria:**
- [ ] `src/components/CardRenderer/SpellCardContent.tsx` renders spell fields (name, level, school, casting time, range, components, duration, description, higher levels)
- [ ] Exhaustive `switch(card.type)` with `never` return — TypeScript errors on missing variants
- [ ] Component is purely presentational: props in, React nodes out

**Prerequisites:** Story 1.4
**Estimate:** 2 SP

---

### Story 2.2 — Spell Card Zod Schema

**As a** developer
**I want** a Zod schema for spell card inputs
**So that** form validation is consistent and type-safe

**Acceptance Criteria:**
- [ ] `src/features/card-editor/spell-schema.ts` validates all FR-4.1.1 fields
- [ ] Name required (min 1, max 100 chars)
- [ ] Level: 0–9
- [ ] School: native enum match
- [ ] Components: object with 3 booleans + optional materialText
- [ ] Higher levels: optional string
- [ ] Exports `SpellCardInput` type

**Prerequisites:** Story 1.4
**Estimate:** 1 SP

---

### Story 2.3 — Card Renderer Component

**As a** developer
**I want** a `CardRenderer` component that renders any card type
**So that** cards display consistently across preview and print

**Acceptance Criteria:**
- [ ] `CardRenderer.tsx` accepts `Card` prop and selected `visualTheme`
- [ ] Delegates to `SpellCardContent` via exhaustive switch
- [ ] Renders front (with optional artwork) and back (flippable or separate view)
- [ ] Memoized to prevent unnecessary re-renders
- [ ] Accepts minimum dimensions (Poker/TCG vs Tarot ratio)

**Prerequisites:** Story 2.1
**Estimate:** 3 SP

---

### Story 2.4 — Card Editor Form (Spell Details)

**As a** user
**I want** a form to enter spell card details
**So that** I can create a spell card

**Acceptance Criteria:**
- [ ] `spell-details-form.tsx` renders all FR-4.1.1 fields
- [ ] "Level" rendered as selector (0–9, labeled "Cantrip" at 0)
- [ ] "School" rendered as select dropdown
- [ ] "Components" rendered as checkboxes (V, S, M) + material text input
- [ ] Form pre-fills from active card in store
- [ ] Zod schema validates on submit/blur
- [ ] Form dispatches `updateCard` action to store

**Prerequisites:** Story 2.2, Story 1.5
**Estimate:** 3 SP

---

### Story 2.5 — Artwork Upload Feature

**As a** user
**I want** to upload an image for my card
**So that** the card looks unique and personal

**Acceptance Criteria:**
- [ ] `artwork-upload.tsx` accepts JPEG, PNG, WebP
- [ ] Uploaded file stored in Dexie `artwork` table via artwork-repo
- [ ] Card's `artwork` field references the blob
- [ ] `CardRenderer` displays artwork in designated art frame
- [ ] User can remove/replace artwork
- [ ] No upload without explicit user click (privacy)

**Prerequisites:** Story 1.3, Story 2.3
**Estimate:** 3 SP

---

### Story 2.6 — Visual Theme Engine

**As a** user
**I want** to choose between visual themes
**So that** my cards match my preferred aesthetic

**Acceptance Criteria:**
- [ ] At least 2 themes implemented (e.g., "Classic", "Modern")
- [ ] Theme selection persists in `uiStore`
- [ ] Themes control: border color, background gradient, font pairing, badge position, accent color
- [ ] `CardRenderer` applies theme via CSS classes or inline styles
- [ ] Theme tokens defined in `tailwind.config.ts` per DESIGN.md mapping

**Prerequisites:** Story 2.3
**Estimate:** 3 SP

---

### Story 2.7 — Live Preview Integration

**As a** user
**I want** to see my card update live as I type
**So that** I can see the result without waiting

**Acceptance Criteria:**
- [ ] Center panel shows `CardRenderer` with active card data
- [ ] Preview re-renders in <200ms after any field change (NFR-5.1.1)
- [ ] Empty state shows placeholder card prompting "Add your first spell"
- [ ] Right panel + center panel stay in sync via shared store

**Prerequisites:** Story 2.4, Story 2.3
**Estimate:** 2 SP

---

**Epic 2 Done When:** User can open app, create a spell card with all fields, see live preview, upload artwork, and switch themes.

---

## Epic 3: Deck Management & Persistence

**Goal:** Enable users to organize cards into decks, with auto-save, reordering, and import/export.

**FRs covered:** FR-4.2, FR-4.6
**Dependencies:** Epic 1
**Estimated stories:** 6

---

### Story 3.1 — Deck CRUD Actions in Store

**As a** developer
**I want** deck management actions in the deck store
**So that** the UI can create, rename, and delete decks

**Acceptance Criteria:**
- [ ] `addDeck(name)` — creates deck with generated ID, adds to store
- [ ] `renameDeck(id, name)` — updates deck name
- [ ] `deleteDeck(id)` — removes deck and all its cards (with confirmation in UI layer)
- [ ] Actions persist to Dexie via repo
- [ ] Unit tests for each action

**Prerequisites:** Story 1.5
**Estimate:** 2 SP

---

### Story 3.2 — Deck List Panel

**As a** user
**I want** to see a list of my decks
**So that** I can switch between them

**Acceptance Criteria:**
- [ ] Left panel shows all decks with name and card count
- [ ] Active deck is highlighted
- [ ] Clicking a deck sets it as active
- [ ] "New Deck" button with inline name input
- [ ] Rename (pencil icon) and delete (trash icon) per deck
- [ ] Delete shows confirmation dialog (no accidental loss)

**Prerequisites:** Story 3.1
**Estimate:** 3 SP

---

### Story 3.3 — Card Add/Remove in Deck

**As a** user
**I want** to add and remove cards from my deck
**So that** I can curate the deck's contents

**Acceptance Criteria:**
- [ ] "Add Card" button in deck view creates a blank spell card and adds to deck
- [ ] Card appears in center grid and becomes active for editing
- [ ] Card item shows remove button (trash icon)
- [ ] Removing a card shows confirmation
- [ ] Card count updates in deck list

**Prerequisites:** Story 3.1, Epic 2
**Estimate:** 2 SP

---

### Story 3.4 — Card Reordering (Drag-and-Drop)

**As a** user
**I want** to reorder cards within a deck
**So that** they are in my preferred sequence

**Acceptance Criteria:**
- [ ] Cards in center grid are sortable via `@dnd-kit`
- [ ] Drag handle on each card thumbnail
- [ ] Reorder dispatches `reorderCard` action to store
- [ ] Persisted to Dexie
- [ ] Keyboard-accessible reorder as fallback (move up/down buttons)

**Prerequisites:** Story 1.1
**Estimate:** 3 SP

---

### Story 3.5 — Auto-Save Confirmation

**As a** user
**I want** confidence that my work is saved
**So that** I don't lose data if I close the browser

**Acceptance Criteria:**
- [ ] All changes (deck, card, settings) auto-save after 500ms debounce
- [ ] Visual indicator (e.g., "Saved" / "Saving…") in UI
- [ ] No explicit "Save" button required
- [ ] On page unload, flush any pending saves (beforeunload handler)

**Prerequisites:** Story 1.5, Story 3.1
**Estimate:** 2 SP

---

### Story 3.6 — Export & Import (.tomeforge)

**As a** user
**I want** to export my entire library and import it back
**So that** I can back up or transfer my data

**Acceptance Criteria:**
- [ ] "Export All" downloads `.tomeforge` file (JSON + base64 artwork)
- [ ] "Import" opens file picker for `.tomeforge`
- [ ] Import offers "Merge" or "Replace" options
- [ ] Zod schema validates structure before parsing
- [ ] Round-trip: Export → Import → identical state (ATDD test)

**Prerequisites:** Story 1.3, Story 1.4
**Estimate:** 3 SP

---

**Epic 3 Done When:** User can create/rename/delete decks, add/remove/reorder cards, and export/import all data as `.tomeforge`.

---

## Epic 4: Print Layout & PDF Export

**Goal:** Enable users to arrange cards on a page and export to print-ready PDF.

**FRs covered:** FR-4.3
**Dependencies:** Epic 1, Epic 2
**Estimated stories:** 4

---

### Story 4.1 — Print Layout Route & Isolation

**As a** developer
**I want** a `/print` route that receives a card snapshot
**So that** print rendering doesn't affect editor performance

**Acceptance Criteria:**
- [ ] `/print/page.tsx` reads deck data from store or URL params
- [ ] Print module is a separate component tree (lazy-loaded)
- [ ] PDF library (`@react-pdf/renderer`) is lazy-loaded in this route
- [ ] Print page has its own layout (full-width grid, minimal chrome)

**Prerequisites:** Epic 1
**Estimate:** 1 SP

---

### Story 4.2 — Print Grid & Card Placement

**As a** user
**I want** to arrange cards on a print grid
**So that** I control how they appear on the printed page

**Acceptance Criteria:**
- [ ] Page shows paper outline (A4/letter) with grid cells
- [ ] Cards from active deck appear as draggable thumbnails
- [ ] User drags cards onto grid cells to place them
- [ ] Cut lines shown between cards
- [ ] "Auto-Arrange" button places cards optimally to minimize waste (FR-4.3.4)
- [ ] Supports Poker/TCG and Tarot sizes (FR-4.3.1)

**Prerequisites:** Story 4.1, Story 1.1
**Estimate:** 5 SP

---

### Story 4.3 — PDF Builder

**As a** user
**I want** to export my arranged layout to PDF
**So that** I can print at home

**Acceptance Criteria:**
- [ ] "Export PDF" button triggers `@react-pdf/renderer` generation
- [ ] PDF generated client-side, completed in <5s for 50 cards (NFR-5.1.3)
- [ ] PDF page size matches selected card format (Poker/TCG or Tarot)
- [ ] Cut lines rendered in PDF
- [ ] Filename includes deck name and date

**Prerequisites:** Story 4.2
**Estimate:** 3 SP

---

### Story 4.4 — Public Sharing (MVP - Text Only)

**As a** user
**I want** to generate a shareable link for my deck
**So that** I can show it to others without an account

**Acceptance Criteria:**
- [ ] "Share" button in deck settings
- [ ] `LocalShareAdapter` encodes deck data in URL (text-only, no artwork for MVP)
- [ ] Shared link opens app in read-only view of the deck
- [ ] Read-only: viewers cannot edit
- [ ] No account required to view shared deck
- [ ] Sharing is free (free tier feature)

**Prerequisites:** Story 3.1, Epic 2
**Estimate:** 3 SP

---

**Epic 4 Done When:** User can print cards from `/print` route, arrange them, export PDF, and share a read-only deck link.

---

## Implementation Sequence

| Phase | Epics | Goal |
|-------|-------|------|
| **Phase 1** | E1 → E2 | Data layer + Spell card creation with live preview |
| **Phase 2** | E3 | Deck management, auto-save, import/export |
| **Phase 3** | E4 | Print layout, PDF export, sharing |

---

## Story Count Summary

| Epic | Stories | Total Estimate |
|------|---------|---------------|
| E1: Foundation & Data Layer | 6 | 12 SP |
| E2: Card Editor & Live Preview | 7 | 16 SP |
| E3: Deck Management & Persistence | 6 | 15 SP |
| E4: Print Layout & PDF Export | 4 | 12 SP |
| **Total** | **23** | **55 SP** |

---

## Test Coverage Requirements

| Story | Required Tests |
|-------|---------------|
| 1.1 | Install verification script |
| 1.2 | Schema structure unit tests |
| 1.3 | Repo CRUD unit tests |
| 1.4 | Type discrimination compile-time check |
| 1.5 | Store action unit tests + persistence integration test |
| 1.6 | Utility unit tests |
| 2.2 | Zod schema validation tests (valid + invalid inputs) |
| 2.4 | Form component render + validation tests |
| 3.1 | Store action unit tests |
| 3.4 | DnD integration test (reorder) |
| 3.6 | ATDD: export → import round-trip |
| 4.3 | PDF snapshot/generation test |
| 4.4 | Share adapter tests (encode/decode) |