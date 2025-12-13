import { z } from "zod";
import { CardType } from "./constants";

export const CardVisualsSchema = z.object({
  accentColor: z.string(),
  headerImage: z.string().optional(),
  backImage: z.string().optional(),
  backTint: z.string().optional(),
});

export const CardTypeSchema = z.enum(CardType);

// Base schema shared by all card types
export const BaseCardSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  visuals: CardVisualsSchema,
});

export const AbilityCardSchema = BaseCardSchema.extend({
  type: z.literal(CardType.Ability),
});
