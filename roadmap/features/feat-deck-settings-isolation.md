# Feature: Deck Settings Isolation

**Status**: Todo
**Priority**: 4

## Problem

Changing deck settings (font size, padding) can break cards silently:
- User increases font size
- Text overflows on other cards they weren't looking at
- They print and cards are broken

Deck and card settings mixed in same UI space causes confusion.

## Solution Options

**Option A: Impact Preview**
- When changing deck setting, temporarily highlight all affected cards in sidebar
- Show count: "This affects 12 cards"
- Let user review before confirming

**Option B: Card-Level Override**
- Allow individual cards to override deck settings
- "Use deck font size" toggle per card
- More complex but prevents unwanted changes

**Option C: Separation + Warning**
- Clear visual split: "Deck Settings" vs "Card Settings"
- Warning banner: "Changing deck settings affects all cards"
- Acceptance check before applying

## Success Criteria

- [ ] User understands which settings are deck-level vs card-level
- [ ] User gets warning/preview before deck changes impact cards
- [ ] No silent card breakage

## Related

- [feat-three-level-view-architecture](./feat-three-level-view-architecture.md) — **Superior approach**: separates deck and card editing into distinct views
- [feat-text-overflow](./feat-text-overflow.md) — overflow detection catches this
- [feat-input-organization](./feat-input-organization.md) — UI reorganization

## Note

This feature (Settings Isolation) can be achieved through [feat-three-level-view-architecture](./feat-three-level-view-architecture.md), which is the recommended path forward. The three-level architecture naturally separates deck settings (in Deck Detail view) from card settings (in Card Detail view), making this explicit separation unnecessary as a standalone feature.
