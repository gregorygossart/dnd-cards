import { describe, it, expect } from 'vitest';
import { getCardSubtitle, formatSpellLevel, formatCastingTime } from './cardUtils';
import { CardType, CastingTimeUnit, type SpellCard, type ItemCard } from '@/types/card';

describe('cardUtils', () => {
    describe('formatSpellLevel', () => {
        it('formats cantrip correctly', () => {
            expect(formatSpellLevel(0)).toBe('Cantrip');
        });

        it('formats 1st level correctly', () => {
            expect(formatSpellLevel(1)).toBe('1st Level');
        });

        it('formats 2nd level correctly', () => {
            expect(formatSpellLevel(2)).toBe('2nd Level');
        });

        it('formats 3rd level correctly', () => {
            expect(formatSpellLevel(3)).toBe('3rd Level');
        });

        it('formats 4th level correctly', () => {
            expect(formatSpellLevel(4)).toBe('4th Level');
        });
    });

    describe('getCardSubtitle', () => {
        it('returns card type for non-spell cards', () => {
            const itemCard: ItemCard = {
                type: CardType.Item,
                title: 'Sword',
                blocks: [],
                visuals: {}
            };
            expect(getCardSubtitle(itemCard)).toBe('Item');
        });

        it('returns "Spell" when no school or level is provided', () => {
            const spellCard: SpellCard = {
                type: CardType.Spell,
                title: 'Magic Missile',
                blocks: [],
                visuals: {}
            };
            expect(getCardSubtitle(spellCard)).toBe('Spell');
        });

        it('returns "School" when only school is provided', () => {
            const spellCard: SpellCard = {
                type: CardType.Spell,
                title: 'Fireball',
                school: 'Evocation',
                blocks: [],
                visuals: {}
            };
            expect(getCardSubtitle(spellCard)).toBe('Evocation');
        });

        it('returns "Spell · Xth Level" when only level is provided', () => {
            const spellCard: SpellCard = {
                type: CardType.Spell,
                title: 'Magic Missile',
                level: 1,
                blocks: [],
                visuals: {}
            };
            expect(getCardSubtitle(spellCard)).toBe('Spell · 1st Level');
        });

        it('returns "School · Xth Level" when both are provided', () => {
            const spellCard: SpellCard = {
                type: CardType.Spell,
                title: 'Fireball',
                school: 'Evocation',
                level: 3,
                blocks: [],
                visuals: {}
            };
            expect(getCardSubtitle(spellCard)).toBe('Evocation · 3rd Level');
        });

        it('handles Cantrip level correctly', () => {
            const spellCard: SpellCard = {
                type: CardType.Spell,
                title: 'Light',
                school: 'Evocation',
                level: 0,
                blocks: [],
                visuals: {}
            };
            expect(getCardSubtitle(spellCard)).toBe('Evocation · Cantrip');
        });

        it('handles Cantrip without school correctly', () => {
            const spellCard: SpellCard = {
                type: CardType.Spell,
                title: 'Light',
                level: 0,
                blocks: [],
                visuals: {}
            };
            expect(getCardSubtitle(spellCard)).toBe('Spell · Cantrip');
        });
    });

    describe('formatCastingTime', () => {
        it('formats action-based casting time correctly', () => {
            expect(formatCastingTime({
                amount: 1,
                unit: CastingTimeUnit.Action,
            })).toBe('1 Action');
        });

        it('formats bonus action correctly', () => {
            expect(formatCastingTime({
                amount: 1,
                unit: CastingTimeUnit.BonusAction,
            })).toBe('1 Bonus Action');
        });

        it('formats reaction correctly', () => {
            expect(formatCastingTime({
                amount: 1,
                unit: CastingTimeUnit.Reaction,
            })).toBe('1 Reaction');
        });

        it('formats singular minute correctly', () => {
            expect(formatCastingTime({
                amount: 1,
                unit: CastingTimeUnit.Minute
            })).toBe('1 Minute');
        });

        it('formats plural minutes correctly', () => {
            expect(formatCastingTime({
                amount: 10,
                unit: CastingTimeUnit.Minute
            })).toBe('10 Minutes');
        });

        it('formats singular hour correctly', () => {
            expect(formatCastingTime({
                amount: 1,
                unit: CastingTimeUnit.Hour
            })).toBe('1 Hour');
        });

        it('formats plural hours correctly', () => {
            expect(formatCastingTime({
                amount: 8,
                unit: CastingTimeUnit.Hour
            })).toBe('8 Hours');
        });
    });
});
