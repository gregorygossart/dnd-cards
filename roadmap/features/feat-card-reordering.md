# Feature: Card Reordering

**Status**: Todo
**Priority**: 2

## Problem

Cards in a deck are fixed in creation order. User cannot:
- Move important cards to front
- Group related cards together
- Sort alphabetically

## Solution

Drag and drop reordering in left sidebar.

## Success Criteria

- [ ] Drag handle on each card in deck list
- [ ] Visual feedback during drag
- [ ] Drop target indicator
- [ ] Persist new order to store

## Technical Notes

Use `@dnd-kit/core` or `@hello-pangea/dnd` for React-friendly drag/drop.

## Related

- [feat-decks](./feat-decks.md) — deck management
