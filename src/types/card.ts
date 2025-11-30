import { z } from 'zod';

export const CardBlockSchema = z.discriminatedUnion('type', [
    z.object({
        type: z.literal('text'),
        content: z.string(),
    }),
    z.object({
        type: z.literal('separator'),
        content: z.null().optional(),
    }),
]);

export const CardVisualsSchema = z.object({
    accentColor: z.string().optional(),
    backgroundImage: z.string().optional(),
});

export enum CardType {
    Item = "Item",
    Spell = "Spell",
    Ability = "Ability",
}

export const CardTypeSchema = z.enum(CardType);

// Base schema shared by all card types
const BaseCardSchema = z.object({
    title: z.string().min(1, "Title is required"),
    blocks: z.array(CardBlockSchema),
    visuals: CardVisualsSchema,
});

export const ItemCardSchema = BaseCardSchema.extend({
    type: z.literal(CardType.Item),
});

export const SpellCardSchema = BaseCardSchema.extend({
    type: z.literal(CardType.Spell),
});

export const AbilityCardSchema = BaseCardSchema.extend({
    type: z.literal(CardType.Ability),
});

// Union schema for validation
export const CardSchema = z.discriminatedUnion('type', [
    ItemCardSchema,
    SpellCardSchema,
    AbilityCardSchema,
]);

export type CardBlock = z.infer<typeof CardBlockSchema>;
export type CardVisuals = z.infer<typeof CardVisualsSchema>;

export type ItemCard = z.infer<typeof ItemCardSchema>;
export type SpellCard = z.infer<typeof SpellCardSchema>;
export type AbilityCard = z.infer<typeof AbilityCardSchema>;

export type Card = ItemCard | SpellCard | AbilityCard;
