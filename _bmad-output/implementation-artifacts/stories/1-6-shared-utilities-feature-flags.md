---
baseline_commit: 30fa48f83bd12c27f9a3a7afdee5241fa3594515
---

# Story 1.6 — Shared Utilities & Feature Flags

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

**As a** developer
**I want** helpers for ID generation, date formatting, and feature flags
**So that** implementation patterns are consistent across the codebase

## Acceptance Criteria

1. [x] `src/lib/utils/id-generator.ts` exports `generateId()` using `crypto.randomUUID()`
2. [x] `src/lib/utils/date-utils.ts` converts Unix timestamps ↔ ISO strings
3. [x] `src/lib/features.ts` exports `as const` flags (e.g., `isPremium = false`)
4. [x] Unit tests for each utility — co-located in `src/lib/utils/` and `src/lib/` respectively

## Tasks / Subtasks

- [x] Create `src/lib/utils/id-generator.ts` (AC: 1)
  - [x] Export `generateId()` that returns `crypto.randomUUID()`
  - [x] Export `isValidId(id: string): boolean` that validates UUID format
  - [x] Export `createShortId(): string` for display-friendly IDs (prefix + first 4 chars, e.g. `deck_a1b2`)
- [x] Create `src/lib/utils/date-utils.ts` (AC: 2)
  - [x] Export `unixToIso(unixTs: number): string` — converts Unix timestamp to ISO 8601 string
  - [x] Export `isoToUnix(isoStr: string): number` — converts ISO 8601 string to Unix timestamp (ms)
  - [x] Export `formatDate(unixTs: number, locale?: string): string` — returns human-readable date (e.g., "Jun 22, 2026")
  - [x] Export `now(): number` — returns current Unix timestamp (ms)
- [x] Create `src/lib/features.ts` (AC: 3)
  - [x] Export `FEATURES` as `as const` object with:
    - `isPremium: false` — gate for Premium-only features
    - `enableArtworkSharing: false` — artwork in share links (Premium)
    - `enableRemoteShare: false` — edge function sharing (Premium)
    - `enableMultiCardTypes: false` — ItemCard, CapacityCard etc. (future)
  - [x] Export `type FeatureFlags = typeof FEATURES` for use in consumers
  - [x] Export `isFeatureEnabled(key: keyof typeof FEATURES): boolean` — runtime check
- [x] Create `src/lib/utils/id-generator.test.ts` (AC: 4)
  - [x] Test `generateId()` returns a UUID v4 string matching regex
  - [x] Test `generateId()` returns unique values on successive calls
  - [x] Test `isValidId()` returns true for valid UUIDs, false for invalid strings
  - [x] Test `createShortId()` returns prefix + first 4 UUID chars
- [x] Create `src/lib/utils/date-utils.test.ts` (AC: 4)
  - [x] Test `unixToIso()` round-trips correctly
  - [x] Test `isoToUnix()` round-trips correctly
  - [x] Test `now()` returns current time within 1s tolerance
  - [x] Test `formatDate()` returns expected string for known timestamp
- [x] Create `src/lib/features.test.ts` (AC: 4)
  - [x] Test `FEATURES.isPremium` is `false`
  - [x] Test `isFeatureEnabled('isPremium')` returns `false`
  - [x] Test all feature flags are booleans (compile-time + runtime)
- [x] Run `pnpm tsc --noEmit` and verify no type errors introduced
- [x] Run `pnpm vitest run` and verify all tests pass

## Dev Notes

- **Story 1.6** from Epic 1 (Project Foundation & Data Layer) — Prerequisite: Story 1.1 (domain libraries installed)
- **Estimate:** 1 SP
- **ID generation:** `crypto.randomUUID()` is the ONLY allowed ID pattern. Do not use `nanoid`, `uuid` (npm package), or custom counter-based IDs. [Source: architecture.md#ID-Generation-Pattern]
- **Date semantics:** All stores use Unix timestamps (`number`, ms precision). The `date-utils.ts` utility exists to convert at the UI boundary only. Store code never calls `unixToIso()` — that's for display components. [Source: architecture.md#Date-Handling-Pattern]
- **Feature flag pattern:** Single `src/lib/features.ts` with `as const` flags. All Premium boundaries gate on these flags. Never add a second feature flag file. [Source: architecture.md#Feature-Flag-Pattern]
- **`src/lib/utils/` directory:** Does NOT exist yet — must be created. `mkdirp` equivalent: the file creation tool will auto-create the directory.
- **Existing `src/lib/utils.ts`** (root level) contains `cn()` and `assertUnreachable()`. The new `src/lib/utils/` directory (with children) will coexist alongside it. Do NOT delete or move `src/lib/utils.ts` — it has different content (Tailwind helper + type guard).
- **Tests co-located:** Unit tests go next to source files (`id-generator.test.ts` next to `id-generator.ts`). No separate test folder for these. [Source: architecture.md#Test-Location]
- **Barrel export:** Add new exports to `src/lib/utils/index.ts` (create if missing) so consumers import from `@/lib/utils`. For `src/lib/features.ts`, consumers import directly from `@/lib/features`. See Architecture Compliance section below for export conventions.
- **Type safety:** Feature flags use `as const` so TypeScript narrows literal types. The `isFeatureEnabled` helper provides a runtime check without sprinkling raw `FEATURES.isPremium` throughout the codebase — this makes it easier to swap for an API-driven flag system later.

### Disaster Prevention

- **DO NOT** add `crypto.randomUUID` mock in tests unless the test environment lacks `crypto`. Node 19+ / modern jsdom provides it. If the test runner fails, add `globalThis.crypto = require('node:crypto').webcrypto` in vitest setup.
- **DO NOT** store UUIDs in `number` fields — always `string`.
- **DO NOT** put feature flags in `src/lib/utils/` — they belong at `src/lib/features.ts` (lib root), per the architecture. [Source: architecture.md#Project-Structure]
- **DO NOT** add more feature flag files or patterns — all flags go in this single file with `as const`.
- **DO NOT** import from `@/features/cards/constants` — that's the legacy enum-based system. Story 1.4 and 1.5 use the types in `src/types/`. The two systems coexist but shared utilities must not depend on either.

### Architecture Compliance

- **ID Generation:** `crypto.randomUUID()` only — no exceptions. [Source: architecture.md#ID-Generation-Pattern]
- **Date Handling:** Unix timestamps in store code (`number`), ISO conversion only at UI boundary. [Source: architecture.md#Date-Handling-Pattern]
- **Feature Flag Pattern:** Single `src/lib/features.ts` with `as const` flags. [Source: architecture.md#Feature-Flag-Pattern]
- **Naming Patterns:** kebab-case file names, camelCase functions/variables. [Source: architecture.md#Naming-Patterns]
- **Testing:** Co-located unit tests, no Dexie mocking needed (pure functions). [Source: architecture.md#Test-Location]

### Project Structure Notes

- `src/lib/utils/id-generator.ts` — **NEW file** — ID generation helpers
- `src/lib/utils/date-utils.ts` — **NEW file** — Date conversion utilities
- `src/lib/utils/features.ts` — **DO NOT CREATE** — features belong at lib root (see below)
- `src/lib/features.ts` — **NEW file** — Feature flag definitions (`as const`)
- `src/lib/utils/index.ts` — **NEW file** (optional barrel) — Re-export both utilities
- `src/lib/utils/id-generator.test.ts` — **NEW file** — ID generator unit tests
- `src/lib/utils/date-utils.test.ts` — **NEW file** — Date utility unit tests
- `src/lib/features.test.ts` — **NEW file** — Feature flag unit tests

### Previous Story Intelligence

Story 1.5 (Zustand Stores) established:
- Stores use Unix timestamps for `createdAt`/`updatedAt` — this story provides the conversion tools for UI display
- `dexie-storage-adapter.ts` uses debounced writes — this story is independent of persistence but the ID generator and date utils will be consumed by store actions
- Store tests mock repos — this story's tests are pure function tests, no mocking needed
- Store tests pass — ensure no regressions after adding shared utilities

For Story 1.6, these learnings mean:
- `generateId()` must return valid UUID v4 strings compatible with Dexie string primary keys
- `date-utils.ts` must use ms-precision Unix timestamps (matching `Date.now()`), not seconds
- Feature flags must be designed for store consumption: e.g., `if (isFeatureEnabled('isPremium'))` in store actions

## References

- [Source: _bmad-output/implementation-artifacts/epics-stories-TomeForge-2026-06-20.md#Story-1.6] — Core story requirements, ACs, prerequisites
- [Source: _bmad-output/planning-artifacts/architecture.md#ID-Generation-Pattern] — `crypto.randomUUID()` only rule
- [Source: _bmad-output/planning-artifacts/architecture.md#Date-Handling-Pattern] — Unix timestamps in store, ISO at UI layer
- [Source: _bmad-output/planning-artifacts/architecture.md#Feature-Flag-Pattern] — Single `src/lib/features.ts` with `as const` flags
- [Source: _bmad-output/planning-artifacts/architecture.md#Naming-Patterns] — kebab-case files, camelCase functions
- [Source: _bmad-output/planning-artifacts/architecture.md#Test-Location] — Co-located unit tests
- [Source: _bmad-output/planning-artifacts/architecture.md#Project-Structure] — `src/lib/utils/` for shared helpers, `src/lib/features.ts` for flags
- [Source: src/lib/utils.ts] — Existing utility file (DO NOT overwrite or move)
- [Source: _bmad-output/implementation-artifacts/stories/1-5-zustand-stores-with-persistence-middleware.md] — Previous story dev notes and patterns
- [Source: src/stores/deck-store.ts] — Stores use `crypto.randomUUID()` directly; this story centralizes it

## Dev Agent Record

### Agent Model Used

Anthropic Claude 4.5 (Cline)

### Debug Log References

### Completion Notes List

### File List