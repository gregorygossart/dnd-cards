# Feature: Three-Level View Architecture

**Status**: In Progress
**Priority**: 2

## Problem

Current UI conflates three distinct user goals into a single screen:

1. **Manage my collection** (decks overview)
2. **Edit a deck** (cards + deck settings)
3. **Edit a single card** (card details + card settings)

This causes:
- **Cognitive overload**: Deck list, card list, and card editor all competing for attention
- **Hidden deck settings**: Users must select a card to access deck appearance settings
- **No deck overview**: Cannot see all cards at once to check visual consistency
- **Accidental deck changes**: Editing "card" settings that are actually deck-level

## Solution

Implement three distinct views with clear navigation between them:

```
┌─────────────────────────────────────────────────────────┐
│  DECK GALLERY          →    DECK DETAIL     →   CARD    │
│  (all decks)                (cards grid)        (editor)  │
├─────────────────────────────────────────────────────────┤
│  • Deck list            • Card grid         • Full     │
│  • Create/import          • Deck settings       card     │
│  • Quick actions          • Reorder            editor    │
│                           • Batch select       preview  │
│                           • Print export                │
└─────────────────────────────────────────────────────────┘
```

### View 1: Deck Gallery

**Purpose**: Orient user, manage collection

**Content**:
- List of decks with name, card count, and overflow indicator
- Create deck, import deck buttons
- Quick actions per deck (duplicate, rename, delete, export)

**URL**: `/` or `/decks`

**Overflow indicator**: Conditional warning badge shown only when a deck has overflowing cards (e.g., "3 overflow"). No indicator shown for healthy decks — avoids visual noise. Gives immediate visibility into which decks need attention before printing.

**Note**: No card previews or thumbnails in this view. Deck names carry sufficient semantic meaning (e.g., "Fire Spells", "Equipment", "Level 1 Prepared"). Preview content would add rendering overhead without meaningful information gain.

### View 2: Deck Detail

**Purpose**: Manage cards within a deck, edit deck-wide settings

**Content**:
- **Main**: Grid of all cards (thumbnails, selectable)
- **Right sidebar**: Deck settings only (fonts, colors, card backs)
- **Toolbar**: Add card, reorder mode, select all, print
- **Preview area**: Live preview of selected card (scaled down)

**URL**: `/decks/[deckId]`

**Key interaction**:
- Click card thumbnail → enters card detail view
- Multi-select cards for batch operations
- Drag to reorder cards

### View 3: Card Detail

**Purpose**: Deep editing of single card

**Content**:
- **Main**: Full-size card preview (front/back)
- **Right sidebar**: Card-specific fields only
- **Breadcrumb**: `Decks > [Deck Name] > [Card Title]`
- **Navigation**: Previous/next card arrows

**URL**: `/decks/[deckId]/cards/[cardId]`

## Navigation Model

| From | To | Trigger |
|------|----|---------|
| Gallery | Deck Detail | Click deck thumbnail |
| Deck Detail | Gallery | "← Back to Decks" button |
| Deck Detail | Card Detail | Click card thumbnail |
| Card Detail | Deck Detail | "← Back to [Deck Name]" button |
| Card Detail | Next/Prev Card | Arrow buttons or swipe |

## Settings Separation

| Deck Settings (View 2) | Card Settings (View 3) |
|------------------------|------------------------|
| Font family & size | Title |
| Padding/margins | Description |
| Card back design | Spell-specific fields |
| Color theme (default) | Weapon/armor stats |
| Layout template | Header image |
| | Accent color (override) |

## Success Criteria

- [ ] User can see all decks at a glance
- [ ] User can see all cards in a deck at a glance
- [ ] Deck settings accessible without selecting a card
- [ ] Card editing feels focused (no deck distractions)
- [ ] URL structure supports direct linking to any view
- [ ] Mobile: each view is a full screen, no horizontal scrolling

## Implementation Notes

### State Management
- Current `useDeckStore` needs `currentView` state: `'gallery' | 'deck' | 'card'`
- Or use URL as source of truth with Next.js routing

### Component Structure
```
src/
  views/
    DeckGallery/
      DeckGallery.tsx
      DeckThumbnail.tsx
    DeckDetail/
      DeckDetail.tsx
      CardGrid.tsx
      DeckSettingsPanel.tsx
    CardDetail/
      CardDetail.tsx
      CardEditorPanel.tsx
```

## Implementation Progress

- [x] **Deck Gallery** (`/[lng]/decks`) - Created with list view, overflow badges, CRUD actions
- [ ] **Deck Detail** (`/[lng]/decks/[deckId]`) - Card grid + deck settings
- [ ] **Card Detail** (`/[lng]/decks/[deckId]/cards/[cardId]`) - Single card editor
- [ ] **Navigation** - Breadcrumbs, back buttons, URL routing
- [ ] **Mobile responsiveness** - Full-screen views on mobile

### Migration Path
1. Build new views alongside existing UI ✓ (Deck Gallery done)
2. Add feature flag to toggle between flows
3. Remove old sidebar-based flow once stable

## Related

- [feat-deck-settings-isolation](./feat-deck-settings-isolation.md) — complementary: clarifies what settings belong where
- [feat-card-reordering](./feat-card-reordering.md) — deck detail view enables drag/drop reordering
- [feat-input-organization](./feat-input-organization.md) — card editor organization
