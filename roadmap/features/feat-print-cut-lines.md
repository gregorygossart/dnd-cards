# Feature: Print Cut Lines (Crop Marks)

**Status**: Todo
**Priority**: 3

## Problem

No guidance for cutting cards after printing. Users guess or use rulers.

## Solution

Add crop marks at card corners — industry standard for print-and-play.

## Success Criteria

- [ ] Thin dashed lines at card corners
- [ ] Marks extend 3mm outside card bounds
- [ ] Visible only on print (not screen preview)
- [ ] Optional toggle (some users prefer without)

## Technical Notes

CSS `@media print` with absolute positioned lines:

```css
@media print {
  .crop-mark {
    position: absolute;
    border: 0.5pt dashed #666;
  }
}
```

## Related

- [feat-safe-print-margins](./feat-safe-print-margins.md) — print layout
