---
title: TomeForge Design System
status: final
created: 2026-06-20
updated: 2026-06-20
tokens:
  colors:
    surface-dark: '#0f172a'
    surface-panel: '#1e293b'
    surface-border: '#334155'
    surface-card-bg: '#000000'
    surface-card-content: '#ffffff'
    text-primary: '#f1f5f9'
    text-secondary: '#94a3b8'
    text-card-default: '#0f172a'
    accent-violet: '#8b5cf6'
    accent-violet-hover: '#7c3aed'
    status-error: '#ef4444'
    status-warning: '#f59e0b'
    status-success: '#22c55e'
  typography:
    font-family-ui: 'Inter, system-ui, sans-serif'
    font-family-card: 'Inter, system-ui, sans-serif'
    font-family-print: 'Inter, serif'
    font-title-card: 24px
    font-body-card: 14px
    line-height-card: 1.5
  rounded:
    card-corner-radius: 1.5rem
    panel-radius: 0.5rem
    input-radius: 0.375rem
    button-radius: 0.375rem
    modal-radius: 0.75rem
  spacing:
    panel-padding: 1rem
    panel-gap: 0px
    section-gap: 1.5rem
    field-gap: 0.75rem
  components:
    CardPreview:
      card: { width: 'var(--card-dimensions)', font: 'font-family-card', bg: 'surface-card-bg', radius: 'card-corner-radius' }
      art-area: { height: 'imageHeightPercent%' }
      body: { bg: 'surface-card-content', padding: 'calc(BASE_PADDING * paddingMultiplier)px' }
      separator-svg: { color: 'accentColor' }
    LeftPanel:
      width: 260px
      bg: 'surface-panel'
      border: 'surface-border'
      deck-item: { height: 44px, padding: '0.75rem 1rem' }
      card-item: { height: 36px, padding: '0.5rem 1rem 0.5rem 2rem' }
    RightPanel:
      width: 384px
      bg: 'surface-panel'
      border: 'surface-border'
      section-gap: 'section-gap'
    EditorLayout:
      bg: 'surface-dark'
---

# TomeForge Design System

_DESIGN.md — visual identity per the Google Labs spec._

---

## Brand & Style

TomeForge is a D&D card creation tool with a **modern TCG aesthetic** — dark UI panels framing crisp white cards with vibrant accent colors. The visual language draws from trading card game presentation: clean, print-focused, with the digital UI receding so the card takes center stage.

**Design principles:**
- **Card-forward:** The UI is a frame for the card. Panels are dark and subdued so the card's white background and accent colors pop.
- **TCG precision:** Sharp typography, clean separators, subtle shadows. Cards look like they could be printed and played.
- **Dark themed workspace:** Reduces eye strain during long D&D prep sessions. Dark slate panels with violet accents for interactive elements.
- **D&D flavor:** Accent colors, thematic separators, and the spell-level badge nod to D&D's visual heritage without cosplaying as fantasy UI.

---

## Colors

### UI Colors (Workspace)

| Token | Hex | Usage |
|-------|-----|-------|
| `surface-dark` | `#0f172a` | Main page background |
| `surface-panel` | `#1e293b` | Left/Right panel backgrounds |
| `surface-border` | `#334155` | Panel borders, dividers |
| `text-primary` | `#f1f5f9` | Primary text on dark surfaces |
| `text-secondary` | `#94a3b8` | Secondary text, labels |
| `accent-violet` | `#8b5cf6` | Buttons, active states, interactive elements |
| `accent-violet-hover` | `#7c3aed` | Hover state for interactive elements |
| `status-error` | `#ef4444` | Error states, validation |
| `status-warning` | `#f59e0b` | Overflow warnings |
| `status-success` | `#22c55e` | Success confirmations |

### Card Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `surface-card-bg` | `#000000` | Card outer border/background |
| `surface-card-content` | `#ffffff` | Card content area background |
| `text-card-default` | `#0f172a` | Body text on card |
| `accentColor` | *dynamic* | Card-specific accent (user-defined per card) |

*The `accentColor` token is user-defined per card and controls the separator SVG color and decorative elements on the card front.*

---

## Typography

### UI Typography

| Element | Font | Size | Weight | Usage |
|---------|------|------|--------|-------|
| UI Body | `Inter, system-ui, sans-serif` | 14px | 400 | Panel labels, input text |
| UI Small | `Inter, system-ui, sans-serif` | 12px | 500 | Helper text, badges |
| Button | `Inter, system-ui, sans-serif` | 14px | 600 | Button labels |
| Section Header | `Inter, system-ui, sans-serif` | 13px | 600 | Collapsible group headers |

### Card Typography

| Element | Font | Size | Weight | Usage |
|---------|------|------|--------|-------|
| Card Title | `Inter, system-ui, sans-serif` | 24px (configurable) | 900 | Card name (uppercase, tracking-tight) |
| Card Body | `Inter, system-ui, sans-serif` | 14px (configurable) | 400 | Description text |
| Card Stats | `Inter, system-ui, sans-serif` | 11px | 600 | Spell stats labels |
| Card Level Badge | `Inter, system-ui, sans-serif` | 12px | 800 | Level indicator in separator |

---

## Layout & Spacing

### Editor Layout
- **3-column layout:** Left panel (260px) | Center (flex) | Right panel (384px)
- **Background:** `surface-dark` (`#0f172a`)
- **Panel backgrounds:** `surface-panel` (`#1e293b`) with `surface-border` (`#334155`) dividers

### Card Dimensions
- **Poker/TCG:** 2.5" × 3.5" (63mm × 88mm) — rendered at 1.5x resolution for print clarity
- **Tarot:** 2.75" × 4.75" (70mm × 121mm) — rendered at 1.5x resolution

### Card Layout
- **Z-stack:** Card art (full width, imageHeightPercent) → SVG separator → Level badge → Content area (white)
- **Content area:** Subheader → Title → Stats row → Description
- **Padding:** Controlled by `paddingMultiplier` (0.5-1.5 range, default 1.0) applied to `BASE_PADDING`
- **Corner radius:** Controlled by `cornerRadius` (0.0-3.0 rem, default 1.5)

---

## Shapes

| Token | Value | Usage |
|-------|-------|-------|
| `card-corner-radius` | 1.5rem (configurable 0-3rem) | Card outer corners |
| `panel-radius` | 0.5rem | Panel edges (not used in current layout — full height panels) |
| `input-radius` | 0.375rem | Input fields, textareas |
| `button-radius` | 0.375rem | Buttons |
| `modal-radius` | 0.75rem | Modal/dialog containers |

---

## Components

### Card Preview (Center Panel)
- Renders at 1x scale in editor, 1.5x scale in print preview.
- **Art area:** Full-width image at top, height configurable via `imageHeightPercent` (default 40%).
- **Separator:** SVG decorative line with integrated level badge (positioned at bottom of art area).
- **Badge:** Circular badge for spell level, positioned at left side of separator.
- **White content area:** Subheader (school, level) → Title (black, uppercase, 900 weight) → Stats row (icons/labels) → Body text.
- **Shadow:** `shadow-2xl` on card container for depth.

### Deck List (Left Panel)
- Deck items: 44px height, `surface-panel` background.
- Card items: 36px height, indented under deck.
- Hover: slight background lightening.
- Selected: violet left border indicator.
- Context menu on right-click.

### Card Editor (Right Panel)
- Collapsible section groups with clear headers.
- Input fields with dark background (`#334155`), white text.
- Validation: red border + helper text.
- Image upload: drop zone with preview thumbnail.

---

## Do's and Don'ts

**Do:**
- Keep the card area pure white — it represents the printed card.
- Use accent colors sparingly — they draw attention to the card's decorative elements.
- Maintain contrast: dark UI, bright card.
- Use uppercase + tracking-tight for card titles (TCG convention).

**Don't:**
- Don't put bright colors in the UI panels — they compete with the card.
- Don't use fantasy/D&D-themed UI fonts — keep UI typography clean and modern.
- Don't add heavy shadows or gloss effects to the card (keeps print output clean).
- Don't crowd the card — overflow detection warns when content exceeds space.