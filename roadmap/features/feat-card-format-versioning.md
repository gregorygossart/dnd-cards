# Feature: Card Format Versioning

**Status**: Todo
**Priority**: 4

## Problem

Card JSON format will evolve. Old exported decks may:
- Fail to import
- Lose data
- Crash the app

No migration path for breaking changes.

## Solution

Add version field to card/deck schema. Handle migrations on import.

## Success Criteria

- [ ] Each card has `version` field
- [ ] Each deck export has `formatVersion` field
- [ ] Import detects old versions
- [ ] Automatic migration or clear error message
- [ ] Breaking changes documented

## Technical Approach

```typescript
// In card schema
version: z.number().default(1),

// On import
if (imported.version < CURRENT_VERSION) {
  const migrated = migrateCard(imported);
}

// Migration functions
const migrations = {
  1: (card) => card, // no change
  2: (card) => ({ ...card, materials: '' }), // add new field
};
```

## Migration Policy

- Minor changes: Auto-migrate silently
- Breaking changes: Show warning, manual review
- Too old: Reject with "Please recreate card"

## Related

- [feat-import-export](./feat-import-export.md) — current implementation
