# Feature: SEO Landing Page

**Status**: Todo
**Priority**: 5

## Problem

App is at `/` or `/[lng]/` but no landing page for organic discovery. Users from Google/reddit need to understand what this is immediately.

## Solution

Single landing page with:
- Clear value proposition
- Screenshot/demo
- Keywords for SEO
- Link to app

## Success Criteria

- [ ] Landing page at root `/`
- [ ] Or app moved to `/app/`, landing at `/`
- [ ] Title: "D&D Card Maker - Print Beautiful Spell & Item Cards"
- [ ] Meta description with keywords
- [ ] OG image for social sharing
- [ ] 2-3 screenshots of cards
- [ ] CTA button to launch app

## Keywords to Target

- "dnd card maker"
- "dungeons and dragons printable cards"
- "spell card generator"
- "dnd item cards"

## Technical Notes

Static page, no auth needed. Can be:
- Next.js page at `app/page.tsx` (current home)
- Or separate marketing site (overkill for now)

## Related

- [feat-web-sharing](./feat-web-sharing.md) — OG image generation
