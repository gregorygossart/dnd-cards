# Feature: Analytics

**Status**: Todo
**Priority**: 5

## Problem

No visibility into:
- How many users actually use the app
- Which card types are created most
- Which features are used (print vs export)
- Where users drop off

Can't make data-driven decisions for v2.0.

## Solution

Privacy-respecting analytics (Plausible recommended).

## Success Criteria

- [ ] Analytics installed and collecting
- [ ] Page views tracked
- [ ] Custom events:
  - deck_created
  - card_created (with type: spell/item/ability)
  - print_initiated
  - export_json
  - import_json
  - image_uploaded
- [ ] Dashboard accessible

## Technical Options

**Plausible** (Recommended):
- €9/month for 10k pageviews
- No cookies, no GDPR banner
- Simple dashboard
- Open source, self-host later

**GA4**:
- Free
- Cookie consent needed (EU)
- Complex setup
- Google data sharing

## Privacy Requirements

- No PII collected
- No user tracking across sessions
- Aggregate data only
- Optional: Respect DNT (Do Not Track)

## Related

All features emit events for complete picture.
