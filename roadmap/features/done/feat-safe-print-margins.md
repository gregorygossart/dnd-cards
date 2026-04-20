# Feature: Safe Print Margins

**Status**: Done
**Priority**: 1 (Critical)

## Problem

Cards are positioned at paper edges. Home printers have non-printable margins (~5mm) and users misfeed paper. Result: card edges get cut off.

## Solution

Center cards with safe margins.

### Current State

```typescript
PRINT_CONFIG.PAPER.MARGIN_MM = 5; // Too small
```

Cards start at 5mm from edge. Most printers need 10-15mm safe zone.

### Target State

- Minimum 10mm margins on all sides
- Cards centered horizontally and vertically
- Equal spacing between cards
- No cards touch paper edge

## Success Criteria

- [x] Cards positioned away from paper edges (10mm minimum)
- [x] Cards centered in available space
- [x] Equal gap between cards
- [x] Works for both Poker (9 per page) and Tarot (4 per page)

## Technical Notes

Current grid math in `print/page.tsx`:

```typescript
const contentWidth = PRINT_CONFIG.PAPER.WIDTH_MM - 2 * PRINT_CONFIG.PAPER.MARGIN_MM;
const cols = Math.floor(contentWidth / cardWidthMm);
```

Need to add gap calculation and centering.

## Open Questions

1. Keep 5mm gap for spacing but increase to 10mm for page margins?
2. Add printer margin selector? (Advanced: user sets their printer's margins)

## Related

- [feat-print-cut-lines](./feat-print-cut-lines.md) — next print improvement
