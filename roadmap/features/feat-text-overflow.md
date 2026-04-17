# Feature: Text Overflow Detection

**Status**: Todo
**Priority**: 1 (Critical)

## Problem

When users:
- Type too much text in card description
- Increase font size in deck settings
- Change card padding

The text overflows the card bounds silently. User prints and gets garbage. No warning.

## Solution

Detect overflow and warn user.

### Implementation Options

**Option A: Visual indicator (best)**
- Red border or "overflow" badge on card preview
- Real-time detection via ResizeObserver or scrollHeight check
- User sees immediately

**Option B: Deck setting confirmation**
- When applying deck style changes, check all cards for overflow
- Warn: "This change will overflow 3 cards. Proceed?"
- Slower but catches edge cases

**Option C: Auto-shrink (dangerous)**
- Automatically reduce font size to fit
- May produce unreadable cards user doesn't notice
- Not recommended

## Success Criteria

- [ ] User sees warning when card content overflows visible area
- [ ] Warning appears in real-time during editing
- [ ] Warning appears before print
- [ ] Deck style changes check all cards for overflow

## Technical Approach

```typescript
// In CardRenderer or useEffect
const checkOverflow = () => {
  const element = cardRef.current;
  if (element.scrollHeight > element.clientHeight) {
    setHasOverflow(true);
  }
};
```

Use `ResizeObserver` on card body. Compare `scrollHeight` vs `clientHeight`.

## Related

- [feat-deck-settings-isolation](./feat-deck-settings-isolation.md) — deck changes affect all cards
