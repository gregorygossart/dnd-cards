# Feature: Input Organization (Right Sidebar)

**Status**: Todo
**Priority**: 3

## Problem

Right sidebar mixes deck settings and card inputs. User feedback:
- "Visual style and card back placement weird"
- "Should we separate them?"
- "Order of inputs doesn't make sense"

## Solution

Reorganize into logical groups with clear hierarchy.

### Proposed Structure

**When Card Selected:**
1. **Identity** (always top)
   - Title
   - Subtitle / Type
   - Description (rich text)

2. **Card-Specific Data**
   - Spell: Level, School, Casting Time, Range, Duration, Components, Materials
   - Item: Damage/AC, Properties, Rarity
   - Ability: (simpler)

3. **Visual Style**
   - Accent color
   - Header image
   - Card back (preset or custom)

4. **Card Actions**
   - Duplicate
   - Delete

**When Deck Selected / No Card:**
1. **Deck Settings**
   - Card format (Poker/Tarot)
   - Font sizes
   - Padding
   - Line height
   - Corner radius
   - Image height

2. **Deck Actions**
   - Rename
   - Export
   - Delete

## Success Criteria

- [ ] Clear visual separation between card vs deck context
- [ ] Inputs grouped logically
- [ ] Card back and visual style grouped together
- [ ] Less scrolling to reach common actions

## Open Questions

1. Two-panel approach? (Left: card list, Right: card edit OR deck settings)
2. Or tabs within right sidebar?
3. How to handle "deck settings affect all cards" warning?

## Related

- [feat-deck-settings-isolation](./feat-deck-settings-isolation.md) — related UX problem
