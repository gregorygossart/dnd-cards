# Feature: Card Templates

**Status**: Todo
**Priority**: 5

## Problem

New users face blank canvas. Don't know what fields to fill or what good defaults look like.

## Solution

3 starting templates that create pre-filled cards.

## Template Definitions

**Minimal** (NPC names, simple reminders):
- Title
- Description only
- No stats

**Standard** (most spells, items):
- Title
- 1-line subtitle
- Header image
- Description
- 2-3 key stats

**Detailed** (complex homebrew):
- Full title/subtitle
- Image
- Full stat block
- Description
- Footer text

## Success Criteria

- [ ] "New Card from Template" dropdown
- [ ] 3 templates available
- [ ] Template preview before creation
- [ ] User can switch template after creation (non-destructive where possible)

## Related

- [feat-card-crud](./feat-card-crud.md) — card creation
