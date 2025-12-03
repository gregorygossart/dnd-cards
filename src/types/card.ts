import { z } from 'zod';



export const CardVisualsSchema = z.object({
    accentColor: z.string(),
    backgroundImage: z.string().optional(),
});

// Casting time units
export enum CastingTimeUnit {
    Action = "Action",
    BonusAction = "Bonus Action",
    Reaction = "Reaction",
    Minute = "Minute",
    Hour = "Hour",
}

// Simple casting time schema: amount + unit
export const CastingTimeSchema = z.object({
    amount: z.number().min(1),
    unit: z.enum([
        CastingTimeUnit.Action,
        CastingTimeUnit.BonusAction,
        CastingTimeUnit.Reaction,
        CastingTimeUnit.Minute,
        CastingTimeUnit.Hour,
    ]),
});

export enum DurationType {
    Instantaneous = "Instantaneous",
    Time = "Time", // Covers Round, Minute, Hour, Day
    UntilDispelled = "Until Dispelled",
}

export enum TimeDurationUnit {
    Round = "Round",
    Minute = "Minute",
    Hour = "Hour",
    Day = "Day",
}

export const DurationSchema = z.discriminatedUnion('type', [
    // Instantaneous - no concentration possible
    z.object({
        type: z.literal(DurationType.Instantaneous),
    }),
    // Time-based (Amount + Unit)
    z.object({
        type: z.literal(DurationType.Time),
        duration: z.object({
            amount: z.number().min(1),
            unit: z.enum(TimeDurationUnit),
        }),
        concentration: z.boolean(),
    }),
    // Until Dispelled
    z.object({
        type: z.literal(DurationType.UntilDispelled),
        concentration: z.boolean(),
    }),
]);

// Components
export const ComponentsSchema = z.object({
    verbal: z.boolean(),
    somatic: z.boolean(),
    material: z.boolean(),
});

// Range types
export enum RangeType {
    Self = "Self",
    Touch = "Touch",
    Ranged = "Ranged",
    Sight = "Sight",
    Unlimited = "Unlimited",
}

// Range distance units
export enum RangeDistanceUnit {
    Feet = "Feet",
    Miles = "Miles",
}

// Range schema: Discriminated union
export const RangeSchema = z.discriminatedUnion('type', [
    // Simple ranges (no distance)
    z.object({
        type: z.enum([
            RangeType.Self,
            RangeType.Touch,
            RangeType.Sight,
            RangeType.Unlimited,
        ]),
    }),
    // Ranged with distance
    z.object({
        type: z.literal(RangeType.Ranged),
        distance: z.object({
            amount: z.number().min(1),
            unit: z.enum([RangeDistanceUnit.Feet, RangeDistanceUnit.Miles]),
        }),
    }),
]);

export enum CardType {
    Item = "Item",
    Spell = "Spell",
    Ability = "Ability",
}

export const CardTypeSchema = z.enum(CardType);

// Base schema shared by all card types
const BaseCardSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string(),
    visuals: CardVisualsSchema,
});

export type CardBaseData = z.infer<typeof BaseCardSchema>;

export const ItemCardSchema = BaseCardSchema.extend({
    type: z.literal(CardType.Item),
});

export const SpellCardSchema = BaseCardSchema.extend({
    type: z.literal(CardType.Spell),
    school: z.enum([
        'Abjuration',
        'Conjuration',
        'Divination',
        'Enchantment',
        'Evocation',
        'Illusion',
        'Necromancy',
        'Transmutation',
    ]).optional(),
    level: z.number().min(0).max(9).optional(),
    castingTime: CastingTimeSchema,
    range: RangeSchema,
    duration: DurationSchema,
    ritual: z.boolean(),
    components: ComponentsSchema,
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


export type CardVisuals = z.infer<typeof CardVisualsSchema>;
export type CastingTime = z.infer<typeof CastingTimeSchema>;
export type Range = z.infer<typeof RangeSchema>;
export type Duration = z.infer<typeof DurationSchema>;
export type Components = z.infer<typeof ComponentsSchema>;

export type ItemCard = z.infer<typeof ItemCardSchema>;
export type SpellCard = z.infer<typeof SpellCardSchema>;
export type AbilityCard = z.infer<typeof AbilityCardSchema>;

export type Card = ItemCard | SpellCard | AbilityCard;

export interface Deck {
    id: string;
    name: string;
    cards: Card[];
}
