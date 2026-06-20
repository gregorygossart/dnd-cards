---
title: TomeForge User Experience
status: final
created: 2026-06-20
updated: 2026-06-20
---

# TomeForge User Experience

_EXPERIENCE.md — information architecture, behavior, states, interactions, accessibility, journeys._

---

## Foundation

**Form-factor:** Desktop-first web application, responsive down to tablet. Primary use case is at a desk with keyboard + mouse while preparing D&D sessions. Mobile is future scope.

**UI System:** Custom-built (Tailwind CSS + shadcn/ui components). Visual identity is defined in `DESIGN.md`.

## Information Architecture

### Surface Map

| Surface | Route | Purpose |
|---------|-------|---------|
| **Editor** | `/` | Main workspace with two coordinated sub-views: Deck View and Card View |
| **Print Preview** | `/print` | Arrange cards on a page grid and export to PDF |

### Core Navigation Concept: Coordinated Context-Aware Panels

The center and right panels respond to the **same focus** in complementary ways — the center shows *what you're looking at*, the right shows *what you can tweak*. This cleanly separates Deck Settings (global) from Card Editor (per-card) without mixing them.

```
┌──────────────────────────────────────────────────────────────┐
│ ┌─────────────┐ ┌────────────────────┐ ┌──────────────────┐ │
│ │ Left Panel  │ │  Center Panel      │ │  Right Panel     │ │
│ │ (260px)     │ │  (flex)            │ │  (384px)         │ │
│ │             │ │                    │ │  COORDINATED     │ │
│ │  Deck 1     │ │  DECK VIEW:        │ │  Deck Settings   │ │
│ │  Deck 2 ◀───│──▶ Card grid         │◀─── when deck      │ │
│ │  Deck 3     │ │                    │ │  selected        │ │
│ │  ─────────  │ │  or                │ │                  │ │
│ │  Card A ◀───│──▶ Card preview      │◀─── Card Editor    │ │
│ │  Card B     │ │                    │ │  when card       │ │
│ │             │ │                    │ │  selected        │ │
│ │ [+ Deck]    │ │                    │ │                  │ │
│ │ [+ Card]    │ │                    │ │                  │ │
│ └─────────────┘ └────────────────────┘ └──────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

### Navigation Logic

- **Click a deck name** in left panel → Deck View (grid center, deck settings right)
- **Click a card** in left panel or thumbnail → Card View (preview center, card editor right)
- **Click the deck name again** → back to Deck View
- The selected deck/card is always highlighted in the left panel

### View States

#### State 1: Deck View (user clicks a deck in left panel)

| Panel | Content |
|-------|---------|
| **Left** | Deck list. Selected deck highlighted. Cards within the deck shown below. |
| **Center** | **Card Grid Gallery** — thumbnails of all cards in the deck, arranged in a responsive grid (3 columns by default). Clicking a card thumbnail switches to Card View. |
| **Right** | **Deck Settings** — controls that affect ALL cards in the deck. |

*Deck View is the entry state when the app opens (first deck auto-selected, or empty state if no decks exist).*

#### State 2: Card View (user clicks a card in left panel or card thumbnail in grid)

| Panel | Content |
|-------|---------|
| **Left** | Deck list + cards within selected deck. Selected card is highlighted. |
| **Center** | **Single Card Preview** — live-rendered card at 1x scale. Updates in real-time as the user edits. |
| **Right** | **Card Editor** — per-card fields ONLY. Type-aware sections that adapt based on card type. |

*Navigating back: clicking the deck name in left panel returns to Deck View.*

### Left Panel — Deck & Card Navigation (same in both views)

- **Deck list** at top (scrollable). Each deck shows its name.
- **"New Deck"** button at top of panel.
- **Below decks:** Cards within the selected deck (scrollable list).
- **"New Card"** button at bottom of card list.
- **Right-click context menu:** Rename deck, delete deck, duplicate deck, export deck.
- **Drag to reorder:** Cards can be dragged to reorder within the deck.

### Center Panel States

#### Deck View — Card Grid Gallery
- Responsive grid of card thumbnails (3 columns, auto-fill).
- Each thumbnail shows a miniature card render + card title below.
- Thumbnails update in real-time when deck settings change (font, radius, format).
- Click thumbnail → transitions to Card View for that card.
- **Empty deck:** "No cards yet — add your first card" with CTA button.

#### Card View — Single Preview
- Live card preview updated in real-time as user edits fields in the right panel.
- **Format badge** (Poker/Tarot) shown as a subtle overlay near the card.
- **Zoom controls:** Fit, 1:1, 2x buttons in a toolbar below the card.
- **Side toggle:** Click the card to flip between front and back.
- **Overflow indicator:** "Content may overflow" warning when text exceeds card bounds.
- **"← Back to [Deck Name]"** breadcrumb link at top to return to Deck View.

### Right Panel States

#### Deck Settings (Deck View)
- Controls that apply to ALL cards in the deck:
  - **Card Format** (Poker / Tarot)
  - **Corner Radius** (slider, 0-3rem)
  - **Image Height** (slider, 0-100%)
  - **Density Presets** (Compact / Normal / Spacious)
  - **Title Font Size** (slider or input)
  - **Body Font Size** (slider or input)
  - **Line Height** (slider)
  - **Padding Multiplier** (slider)
- Changes propagate to all card thumbnails in the grid in real-time.
- Collapsible groups for visual organization.

#### Card Editor (Card View)
- Contains ONLY per-card fields. No deck settings visible.
- Collapsible sections:
  1. **Title & Type** — Card name (text, required), Card type (Spell/Ability/Weapon/Armor)
  2. **Spell Details** (shown only for Spell type) — Level (0-9), School, Casting time, Range, Components (V/S/M), Duration, Higher Levels
  3. **Combat Details** (shown only for Weapon/Armor) — Damage, AC, attack type, properties, attunement
  4. **Description** — Multiline textarea for card body
  5. **Artwork** — Image upload (JPEG/PNG/WebP) with preview thumbnail
  6. **Accent Color** — Color swatch picker (presets + custom picker)
- **Validation:** Card name is required. Invalid fields show red border + helper text.
- **Auto-save:** Every field change persists to local storage within 500ms.

### Surface: Print Preview (`/print`)

- **"← Back to Editor"** navigation link.
- **Card arrangement grid** — 3×3 (Poker) or 2×3 (Tarot) per A4/letter page.
- **Left controls:** Paper size (A4/Letter), card size indicator, margin controls.
- **Drag cards** to rearrange on the page grid.
- **Add/remove cards** from the print batch (all cards in deck included by default).
- **"Export PDF"** button triggers PDF generation.
- **Cards render** at 1.5x print resolution.
- **Empty state:** Disable export, show "Add cards before printing" message.

## Component Patterns

### CardGridGallery (Deck View, Center)
- Responsive grid with auto-fill, minimum card width ~180px.
- Each cell: miniature card render (scaled down) + card title.
- Click → navigate to Card View for that card.
- Keyboard: arrow keys to navigate, Enter to select.

### CardEditorForm (Card View, Right)
- Type-aware sections show/hide based on selected card type.
- Auto-save: every change persisted to local storage.
- Image upload: click to upload, shows preview thumbnail.
- Accent color: swatch picker with presets + custom color.

### DeckList (Left Panel, both views)
- Expandable deck items (click deck name to show/hide its cards).
- Selected state: highlighted deck, highlighted card in sub-list.
- Context menu: right-click for rename, delete, duplicate.
- Drag reorder for cards within the deck.

## State Patterns

### Empty States
- **No decks:** "Create your first deck" CTA button with illustration.
- **No cards in deck:** "Add your first card" inline prompt in grid area.
- **No card selected (Deck View):** Card grid shows empty state message.

### Loading States
- **Skeleton loaders** for all three panels (already implemented).
- **Hydration check** before showing content (already implemented).

### Error States
- **Corrupted data:** "No Deck Found" screen with "Create New Deck" button (already implemented).
- **Image upload failure:** Toast notification with error details.
- **Local storage full:** Warning with export prompt.

### Edge Cases
- **Overflow content:** Warning indicator on card + truncation in print layout.
- **Large decks (50+ cards):** Virtualized grid for smooth scrolling.
- **Single-user only (local storage):** No sync conflicts possible.

## Interaction Primitives

- **Click to navigate:** Click deck → Deck View. Click card → Card View.
- **Breadcrumb:** "← Back to [Deck Name]" link in Card View.
- **Drag and drop:** Reorder cards within deck (left panel), rearrange on print grid.
- **Auto-save:** Every field change persists within 500ms.
- **Keyboard shortcuts:**
  - `Ctrl+N` — New card
  - `Ctrl+Shift+N` — New deck
  - `Ctrl+P` — Print preview
  - `Delete` — Delete selected card (with confirmation)
  - `Escape` — Close any open modal/drawer

## Accessibility Floor

- **Keyboard navigation:** All panels navigable via Tab/Shift+Tab with visible focus indicators.
- **Form labels:** Every input has an associated `<label>`.
- **Color contrast:** Text on backgrounds meets WCAG AA (4.5:1 for normal text).
- **Reduced motion:** Card flip animation respects `prefers-reduced-motion`.
- **Screen reader announcements:** Deck/card creation/deletion announced via live regions.
- **View transitions:** Clear visual distinction between Deck View and Card View.

## Key Flows

### UJ-1: Player creates a new spell deck
1. Opens TomeForge → enters Deck View (or empty state). Clicks "New Deck" → types "Merric's Spellbook"
2. **Deck View:** Center shows empty card grid, right panel shows Deck Settings
3. Adjusts Tarot format, sets font preferences → grid updates in real-time
4. Clicks "New Card" → switches to Card View
5. **Card View:** Center shows single preview, right panel shows Card Editor
6. Types spell name → preview updates instantly
7. Fills spell details, uploads artwork, picks accent color
8. Clicks "New Card" again → adds another card
9. After 10 spells, clicks deck name in left panel → back to Deck View
10. Sees all 10 card thumbnails in grid, drags to reorder
11. Clicks "Print Preview"

### UJ-2: DM adjusts deck appearance
1. Opens TomeForge → Deck View with last deck selected
2. Sees card grid center, Deck Settings right panel
3. Adjusts corner radius slider → all card thumbnails update to show new radius
4. Changes from Poker to Tarot → grid re-renders at new size
5. Clicks a specific card → switches to Card View to edit its stats
6. Clicks deck name → back to Deck View
7. Proceeds to Print Preview

### UJ-3: DM shares a deck on Discord
1. DM right-clicks deck in left panel → "Share Deck"
2. Generates a shareable link
3. Copies → pastes on Discord
4. Players click link → read-only view of all cards

## Future UX Considerations

- **Mobile adaptation:** Tab-based navigation (Decks tab | Cards tab | Editor tab).
- **Bulk operations:** Multi-select cards in grid to delete or move between decks.
- **Undo/redo:** History stack for card edits (local storage based).
- **Search/filter:** Filter cards by name or type when deck has 20+ cards.
- **Print wizard:** Step-by-step flow for first-time printers.