import { z } from "zod";
import { CardFormat } from "./constants";
import {
  CardVisualsSchema,
  BaseCardSchema,
  AbilityCardSchema,
} from "./schemas";
import { type ItemCard, ItemCardSchema } from "@/features/items/schemas";
import { type SpellCard } from "@/features/spells/types";
import { SpellCardSchema } from "@/features/spells/schemas";

// Exported types
export type CardBaseData = z.infer<typeof BaseCardSchema>;
export type CardVisuals = z.infer<typeof CardVisualsSchema>;
export type AbilityCard = z.infer<typeof AbilityCardSchema>;
export type Card = ItemCard | SpellCard | AbilityCard;

// Union schema for validation
export const CardSchema = z.discriminatedUnion("type", [
  ItemCardSchema,
  SpellCardSchema,
  AbilityCardSchema,
]);
