---
baseline_commit: 90d8321524a393f20e3044de45098c848164ac66
---

# Story 1.1 — Install Domain Libraries

**As a** developer
**I want** the required libraries (`dexie`, `@react-pdf/renderer`, `@dnd-kit/core`, `@dnd-kit/sortable`, `zod`) installed
**So that** I can build features on the prescribed architecture

## Acceptance Criteria
- [x] All domain libraries added to `package.json` with compatible versions
- [x] `vitest.config.ts` supports co-located tests
- [x] Project builds without errors after install

## Tasks/Subtasks
- [x] Install dexie
- [x] Install @react-pdf/renderer
- [x] Install @dnd-kit/core
- [x] Install @dnd-kit/sortable
- [x] Verify zod and zustand are already installed
- [x] Verify vitest.config.ts supports co-located tests (includePattern)
- [x] Create install verification test
- [x] Run build to confirm no errors
- [x] Run tests to confirm no regressions

## Dev Notes
- Story 1.1 from Epic 1 (Project Foundation & Data Layer)
- Libraries needed: dexie, @react-pdf/renderer, @dnd-kit/core, @dnd-kit/sortable
- zod (^4.1.13) and zustand (^5.0.9) are already installed
- Vitest should be configured for co-located tests via `include` or `includeSource` in vitest.config.ts
- Install verification test should import each library and verify they resolve
- Test: `pnpm test` should pass, `pnpm build` should succeed

## Dev Agent Record

### Implementation Plan
1. Install each domain library using pnpm
2. Update vitest.config.ts to add `includeSource` for co-located tests (patterns like `src/**/*.{test,spec}.{ts,tsx}`)
3. Create `src/__tests__/install-verification.test.ts` that imports each new library
4. Run `pnpm test` to verify tests pass
5. Run `pnpm build` to verify project builds successfully

### Debug Log
- Started implementation at 2026-06-21
- Code review completed 2026-06-21 — clean, no findings

### Senior Developer Review (AI)
**Date:** 2026-06-21
**Outcome:** Approved

**Review Layers:**
| Layer | Result | Findings |
|-------|--------|----------|
| Blind Hunter | ✅ Pass | No issues found |
| Edge Case Hunter | ✅ Pass | No issues found |
| Acceptance Auditor | ✅ Pass | All ACs satisfied |

**Action Items:** None

### Completion Notes
- All 4 domain libraries installed: dexie@^4.4.4, @react-pdf/renderer@^4.5.1, @dnd-kit/core@^6.3.1, @dnd-kit/sortable@^10.0.0
- zod@^4.1.13 and zustand@^5.0.9 were already present
- vitest.config.ts updated with `include` and `includeSource` for co-located test support
- Project builds successfully with no errors
- Code review clean — story marked done

## File List
- `package.json` (modified — new dependencies added)
- `vitest.config.ts` (modified — co-located test support)
- `src/__tests__/install-verification.test.ts` (new)
- `_bmad-output/implementation-artifacts/stories/1-1-install-domain-libraries.md` (new — story file)

## Change Log
- Installed dexie, @react-pdf/renderer, @dnd-kit/core, @dnd-kit/sortable as dependencies
- Updated vitest.config.ts to support co-located tests (include + includeSource)
- Created install verification test suite (6 tests)

## Status
done
