import { z } from "zod";
import { CardType } from "@/features/cards/constants";
import { BaseCardSchema } from "@/features/cards/schemas";
import {
  CastingTimeUnit,
  DurationType,
  TimeDurationUnit,
  RangeType,
  RangeDistanceUnit,
} from "./constants";

// Simple casting time schema: amount + unit
export const CastingTimeSchema = z.object({
  amount: z.number().min(1),
  unit: z.enum(CastingTimeUnit),
});

export const DurationSchema = z.discriminatedUnion("type", [
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

// Range schema: Discriminated union
export const RangeSchema = z.discriminatedUnion("type", [
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
      unit: z.enum(RangeDistanceUnit),
    }),
  }),
]);

export const SpellCardSchema = BaseCardSchema.extend({
  type: z.literal(CardType.Spell),
  school: z
    .enum([
      "Abjuration",
      "Conjuration",
      "Divination",
      "Enchantment",
      "Evocation",
      "Illusion",
      "Necromancy",
      "Transmutation",
    ])
    .optional(),
  level: z.number().min(0).max(9).optional(),
  castingTime: CastingTimeSchema,
  range: RangeSchema,
  duration: DurationSchema,
  ritual: z.boolean(),
  components: ComponentsSchema,
});
