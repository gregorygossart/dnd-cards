# Feature: Spell Material Text Field

**Status**: Done
**Priority**: 1 (Critical)

## Problem

Spell cards have:
- ✓ Verbal component toggle
- ✓ Somatic component toggle
- ✓ Material component toggle
- ✗ Material description text field (missing)

User can say "has material component" but not specify what it is (e.g., "a tiny ball of bat guano and sulfur" for Fireball).

## Solution

Add text input for material description when material toggle is enabled.

### UI Placement

Option A: Right sidebar with other spell inputs
- Components section: V | S | M [text field appears when M checked]

Option B: In card body as separate line
- Below components badges: "Materials: [text]"

Option C: Both
- Input in sidebar, display in card body

## Success Criteria

- [x] Text field appears when "Material" component is enabled
- [x] Field stores and persists material description
- [x] Description displays on card (inside card body after description)
- [x] Label uses consistent EditorLabel styling

## Schema Changes

```typescript
// Add to SpellCardSchema
materials: z.string().optional(), // e.g., "a tiny ball of bat guano"
```

## UI Text

Placeholder: "Describe the material component (e.g., 'a tiny ball of bat guano')"

## Related

- [feat-spell-card-complete](./feat-spell-card-complete.md) — this completes spell card feature
