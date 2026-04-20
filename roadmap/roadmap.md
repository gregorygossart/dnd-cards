# D&D Cards Roadmap

Based on current codebase audit and feature review.

---

## Legend

- **Priority 1**: Blocks "usable" status — fix first
- **Priority 2**: Blocks "complete" status
- **Priority 3-4**: Quality improvements
- **Priority 5+**: Growth features (after core solid)

---

## Phase: Done (No Work Needed)

| Feature | Status | Notes |
|---------|--------|-------|
| i18n | Done | EN + FR sufficient |
| Deck CRUD | Done | Create, read, update, delete, export |
| Card CRUD | Done | Create, read, update, duplicate, delete |
| JSON Export/Import | Done | Works; friction is future problem |
| Print Preview | Done | A4 works; improvements needed |
| Rich Text Editor | Done | Description formatting works |

---

## Phase: Fix Critical Issues

**Goal**: Fix silent failures and broken experiences before any polish work.

| Feature | Status | Priority | Notes |
|---------|--------|----------|-------|
| [Text Overflow Detection](./features/done/feat-text-overflow.md) | Done | 1 | Real-time detection, deck list warnings, print blocking |
| [Safe Print Margins](./features/done/feat-safe-print-margins.md) | Done | 1 | Center cards, add printer-safe margins |
| [Material Component Field](./features/done/feat-spell-materials.md) | Done | 1 | Add text input for "materials needed" on spells |

---

## Phase: Core Completeness

**Goal**: Make existing features actually complete, not "mostly works".

| Feature | Status | Priority | Notes |
|---------|--------|----------|-------|
| [Card Reordering](./features/feat-card-reordering.md) | Todo | 2 | Drag/drop cards within deck |
| [Letter Paper Size](./features/feat-letter-paper.md) | Todo | 2 | US paper format support |
| [Cut Lines on Print](./features/feat-print-cut-lines.md) | Todo | 3 | Industry-standard crop marks |
| [Input Organization](./features/feat-input-organization.md) | Todo | 3 | Reorder right-sidebar logically |

---

## Phase: Quality Improvements

**Goal**: Make the experience feel professional.

| Feature | Status | Priority | Notes |
|---------|--------|----------|-------|
| [Better Default Illustrations](./features/feat-default-illustrations.md) | Todo | 3 | Strong defaults that work for any card type |
| [Deck vs Card Settings](./features/feat-deck-settings-isolation.md) | Todo | 4 | Separate or clarify what affects what |
| [Card Format Versioning](./features/feat-card-format-versioning.md) | Todo | 4 | Handle breaking changes in JSON export/import |

---

## Phase: Growth (After Core is Solid)

**Goal**: Acquisition and engagement features.

| Feature | Status | Priority | Notes |
|---------|--------|----------|-------|
| [Analytics](./features/feat-analytics.md) | Todo | 5 | Plausible or GA4 |
| [SEO Landing Page](./features/feat-seo-landing.md) | Todo | 5 | Single landing page for organic discovery |
| [Card Templates](./features/feat-templates.md) | Todo | 5 | Minimal, Standard, Detailed starting points |
| [Web Sharing (Server)](./features/feat-web-sharing.md) | Todo | 6 | Short URLs — requires server budget |
