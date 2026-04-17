# Feature: Web Sharing (Server Required)

**Status**: Todo
**Priority**: 6 (Blocked by server budget)

## Problem

JSON file sharing is friction. Users won't share files on Reddit/Discord. Want:
- Click button → get link
- Paste link → see deck
- No file download/upload

## Solution

Short URLs with server storage.

**v1.0**: JSON file export (done, sufficient for now)
**v2.0**: This feature — requires server infrastructure

## Success Criteria

- [ ] "Share" button generates short URL
- [ ] URL opens deck without login
- [ ] Metadata stored on server (text only, no images)
- [ ] Images remain local/user-hosted
- [ ] Optional: password protection, expiration

## Why Deferred

**Costs**:
- Database: $15-50/month
- Bandwidth: minimal (no images)
- Time: setup, maintenance

**Requirements for implementation**:
- Subscription revenue > $200/month
- 1000+ active users
- Time for moderation (if public sharing)

## Technical Architecture

```
User clicks Share
  → Upload deck metadata to server
  → Server returns short code "abc123"
  → URL: dnd-cards.app/d/abc123
  
Visitor opens URL
  → Server returns metadata
  → App fetches images from user's hosting or shows placeholders
```

## Related

- [feat-import-export](./feat-import-export.md) — current JSON solution
- [feat-subscription](./feat-subscription.md) — revenue to fund this
