---
title: TomeForge Product Requirements Document
status: final
created: 2026-06-20
updated: 2026-06-20
---

# TomeForge Product Requirements Document

## 1. Product Vision

TomeForge provides the best overall experience for creating, managing, and printing D&D cards — with an easy workflow and no difficulties for the best looking card. Our promise: *"The easiest way to turn your D&D content into beautiful, printable cards — organized your way, no paper wasted."*

The platform empowers both players and Dungeon Masters equally, enabling them to organize cards by character, class, campaign, or custom categories while minimizing paper waste during printing. The MVP focuses on D&D 5e (2014) Spell cards, with a long-term roadmap to expand to capacities, items, characters, monsters, and NPC statblocks.

## 2. Target Audience & User Journeys

### Primary Audiences

**Players** — want their character's spells, capacities, and items organized into beautiful, printable decks. They value ease of use, efficient printing, and customization flexibility.

**Dungeon Masters** — want NPC statblocks, monster cards, merchant inventories, and campaign resources at their fingertips. They need a tool that scales across multiple characters and sessions.

### User Journeys

**UJ-1: Player creates a spell deck for a new character**
1. User opens TomeForge and sees an empty workspace
2. Clicks "New Deck" → names it after their character (e.g., "Merric's Spellbook")
3. Clicks "Add Card" → fills in spell name, level, school, casting time, range, components, duration, description
4. Optionally uploads artwork for the card
5. Card renders instantly in the selected visual theme
6. User adds more spells, repeats
7. When ready, opens Print Layout, chooses Poker/TCG size, adjusts card arrangement on page
8. Exports to PDF and prints

**UJ-2: DM prepares monster statblock cards for a session**
1. User creates a deck named "LMoP Encounters"
2. Adds creature cards with name, AC, HP, speed, abilities, actions
3. Organizes cards by encounter order
4. Prints in Tarot size for more room on statblock text
5. Shares the deck link on Discord for players to preview before session

## 3. Problem Statement

Currently, D&D players and DMs have very few options for creating custom cards, and existing tools produce poor-looking results. The end product rarely does justice to the effort players put into their characters and campaigns. This leads to:

- **Poor visual quality:** Existing tools produce cards that look unprofessional and lack visual appeal.
- **No artwork integration:** No easy way to incorporate custom art into cards.
- **Limited options:** Only a handful of tools exist, offering little choice in formats, styles, or content types.
- **Time-consuming processes:** Players spend significant time on card creation, often with disappointing visual results.
- **Wasted paper:** Inefficient printing layouts lead to excessive paper use.
- **Disorganization:** No intuitive way to organize cards by character, campaign, or theme.

TomeForge's mission is to make every card visually stunning so players and DMs can take pride in their homemade creations.

## 4. Functional Requirements

### FR-4.1 Spell Card Creator

**FR-4.1.1** The system shall provide a form to create D&D 5e (2014) spell cards with the following fields:
- Spell name (text, required)
- Spell level (0-9, selector; 0 = cantrip)
- School of magic (selector: Abjuration, Conjuration, Divination, Enchantment, Evocation, Illusion, Necromancy, Transmutation)
- Casting time (text, e.g. "1 action", "1 bonus action", "1 reaction")
- Range (text, e.g. "60 feet", "Self", "Touch")
- Components (checkboxes: V, S, M + text field for material component)
- Duration (text, e.g. "Instantaneous", "Concentration, up to 1 minute")
- Description (rich text or multiline text supporting paragraphs)
- Higher levels (multiline text, optional — describes effect when cast at higher spell levels)

**FR-4.1.2** The system shall render a live preview of the card as the user fills in fields.

**FR-4.1.3** The system shall support at least 2 visual themes for cards at MVP (e.g., "Classic" and "Modern") with consistent field placement across themes. [ASSUMPTION: theme count and names to be validated during UX phase]

### FR-4.2 Deck Management

**FR-4.2.1** The system shall allow users to:
- Create a new deck with a name
- Rename an existing deck
- Delete a deck (with confirmation to prevent accidental loss)
- View a list of all decks

**FR-4.2.2** The system shall allow adding cards to a deck and removing cards from a deck.

**FR-4.2.3** The system shall allow reordering cards within a deck (drag-and-drop or move up/down controls).

**FR-4.2.4** The system shall auto-save all changes to local storage. No explicit "Save" button required.

### FR-4.3 Print Layout & Export

**FR-4.3.1** The system shall support two card sizes for printing:
- **Poker/TCG** (approx 2.5" × 3.5") — default, for spells
- **Tarot** (approx 2.75" × 4.75") — for cards with more text content

**FR-4.3.2** The Print Layout Editor shall:
- Display a page grid showing where each card will be placed
- Allow users to drag cards onto the grid to arrange them
- Show cut lines between cards
- Allow adding/removing cards from the print layout

**FR-4.3.3** The system shall export the print layout as a PDF file optimized for home printing on standard letter/A4 paper.

**FR-4.3.4** The system shall automatically calculate optimal card placement to minimize paper waste by default.

### FR-4.4 Artwork & Visual Themes

**FR-4.4.1** The system shall allow users to upload an image (JPEG, PNG, WebP) to use as card artwork.

**FR-4.4.2** Uploaded artwork shall be displayed on the card in a designated art frame area.

**FR-4.4.3** The system shall provide at least 2 pre-designed visual themes that control card layout, colors, fonts, and overall aesthetic. [ASSUMPTION: specific theme visual design to be defined in UX phase]

### FR-4.5 Public Sharing

**FR-4.5.1** The system shall allow users to generate a shareable link for any deck. [ASSUMPTION: sharing via a URL encoded payload or lightweight serverless function]

**FR-4.5.2** Shared deck links shall be publicly accessible without requiring an account.

**FR-4.5.3** Shared deck views shall be read-only — viewers can browse the deck but not edit it.

**FR-4.5.4** Public sharing shall be free for all users (included in free tier for organic marketing).

### FR-4.6 Data Persistence

**FR-4.6.1** The system shall automatically persist all user data (decks, cards, settings) to browser local storage.

**FR-4.6.2** The system shall provide an Export feature that downloads all user data as a single `.tomeforge` file.

**FR-4.6.3** The system shall provide an Import feature that allows restoring data from a previously exported `.tomeforge` file, with options to merge or replace existing data.

## 5. Non-Functional Requirements

### NFR-5.1 Performance
- **NFR-5.1.1** Card creation form shall render the live preview in under 200ms after any field change.
- **NFR-5.1.2** Print layout with up to 50 cards shall render in under 2 seconds.
- **NFR-5.1.3** PDF export shall complete within 5 seconds for decks up to 50 cards.

### NFR-5.2 Usability
- **NFR-5.2.1** A new user shall be able to create and print their first card within 2 minutes of first visit.
- **NFR-5.2.2** No account creation or login required to create, save, or print cards.

### NFR-5.3 Browser Compatibility
- **NFR-5.3.1** The application shall work on the latest two versions of Chrome, Firefox, Safari, and Edge.

### NFR-5.4 Accessibility
- **NFR-5.4.1** All form controls shall have accessible labels.
- **NFR-5.4.2** The application shall be navigable via keyboard.

### NFR-5.5 Data & Privacy
- **NFR-5.5.1** All user data (cards, decks, uploaded images) shall remain in the user's browser unless explicitly exported or shared.
- **NFR-5.5.2** No user data shall be sent to servers without explicit user action.

## 6. Monetization & Tiering

### Free Tier
- Full spell card creator, deck management, basic printing
- Standard visual themes and templates
- Basic artwork upload
- Public sharing — create shareable deck links
- Core export/import functionality

### Premium Tier (Subscription: $3-5/month or $30-50/year)
- **Expanded Content Types:** Creation tools for capacities, items, characters, and monsters
- **Premium Art & Themes:** Exclusive card backs, premium visual themes, artist-designed templates
- **Advanced Organization:** Enhanced tagging, search, and filtering for large collections
- **Import/Export:** Import from external sources, high-resolution print-quality exports
- **User Accounts:** Persistent cloud storage across devices
- **Ad-free experience**

### Monetization Rationale
- Sustained revenue for ongoing updates, new templates, and D&D edition support
- Lower barrier to entry with free tier — users can try premium for a month without large commitment
- Standard SaaS freemium model aligned with user expectations for web tools

## 7. Success Metrics & Counter-Metrics

### Success Metrics
- **SM-7.1 User Engagement:** Monthly active users, session duration, frequency of card creation/printing
- **SM-7.2 User Retention:** % of users returning within 30 days of first visit
- **SM-7.3 Feature Adoption:** % of users who create at least 5 cards, % who use print export
- **SM-7.4 Sharing Virality:** Number of shared deck links created and viewed
- **SM-7.5 User Satisfaction:** Net Promoter Score (NPS) via in-app survey after first export
- **SM-7.6 Premium Conversion:** % of free users converting to paid within 90 days

### Counter-Metrics
- **CM-7.1 New user friction:** Time-to-first-card should not increase as features are added
- **CM-7.2 Print failure rate:** % of PDF exports that users report as unusable should remain below 1%
- **CM-7.3 Feature overload:** Support requests for "too complex" should remain below 5% of total feedback

## 8. Open Questions

1. What specific premium visual themes should be offered at launch?
2. Should artwork upload have file size limits, and if so, what?
3. What is the exact `.tomeforge` export format (JSON-based, zip with images)?
4. How should shared deck links be served (URL encoding, short-link service, serverless function)?
5. At what scale should we consider moving from local storage to a backend?
6. What is the optimal pricing point between $3-5/month that balances conversion and revenue?

## 9. Future Scope

- **Expanded Content Types:** Capacities (class/race features), items (magic items, weapons, armor), character sheets, monster statblocks, NPC cards
- **Premium Art & Themes:** Ongoing addition of premium card backs and visual themes as paid content
- **Advanced Organization:** Tagging system, search, filters, folder-like grouping
- **User Accounts:** Cloud persistence, sync across devices, account management
- **Integration with VTTs:** Direct export to Roll20, Foundry VTT, or other platforms
- **Mobile Responsiveness:** Optimized for tablet and phone use
- **AI-Powered Suggestions:** Spell idea generation, balance checks via LLM
- **Localization:** Multi-language support for card content and UI
- **Community Features:** Public gallery of decks, upvoting, collections