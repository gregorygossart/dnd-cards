# Feature: Letter Paper Size Support

**Status**: Todo
**Priority**: 2

## Problem

Only A4 (210×297mm) supported. US users need Letter size (216×279mm).

## Solution

Add paper size selector with A4 and Letter presets.

## Success Criteria

- [ ] Paper size dropdown in print settings
- [ ] Letter size: 216mm × 279mm (8.5" × 11")
- [ ] Card grid recalculates for paper size
- [ ] Selection persists per deck or globally

## Technical Notes

Add to `PRINT_CONFIG`:

```typescript
PAPER: {
  A4: { WIDTH_MM: 210, HEIGHT_MM: 297 },
  Letter: { WIDTH_MM: 216, HEIGHT_MM: 279 },
}
```

## Related

- [feat-safe-print-margins](./feat-safe-print-margins.md) — margin logic shared
