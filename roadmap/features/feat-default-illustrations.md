# Feature: Better Default Illustrations

**Status**: Todo
**Priority**: 3

## Problem

Current 2 default backs "not great" per user feedback:
- shield-sword
- magic-eye

Need strong defaults that work for ANY card type (spells, items, abilities).

## Solution

Design versatile, type-agnostic card backs.

### Ideas for New Defaults

1. **Arcane Circle** — neutral, works for magic or mundane
2. **Leather Texture** — classic D&D tome feel
3. **Minimal Line Art** — geometric, clean
4. **Parchment** — aged paper texture

### Success Criteria

- [ ] 3-4 high-quality default backs
- [ ] Each works for spells, items, and abilities
- [ ] Consistent art style
- [ ] Small file sizes (optimized PNG/WebP)

## Technical Notes

Current presets in `cardConstants.ts`:

```typescript
CARD_BACK_PRESETS = [
  { id: "shield-sword", name: "Shield & Sword", src: "/card-backs/shield-sword.png" },
  { id: "magic-eye", name: "Magic Eye", src: "/card-backs/magic-eye.png" },
];
```

Add new entries here.

## Asset Sources

Options:
1. Commission simple illustrations (Fiverr, $20-50 each)
2. Use CC0 assets from OpenGameArt
3. SVG patterns (scalable, tiny file size)

## Related

- [feat-custom-art](./feat-custom-art.md) — user upload feature (done)
