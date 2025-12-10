import { z } from "zod";
import { CardFormat } from "./constants";
import {
  CardVisualsSchema,
  BaseCardSchema,
  CastingTimeSchema,
  RangeSchema,
  DurationSchema,
  ComponentsSchema,
  SpellCardSchema,
  AbilityCardSchema,
} from "./schemas";
import { type ItemCard, ItemCardSchema } from "@/features/items/schemas";

// Exported types
export type CardBaseData = z.infer<typeof BaseCardSchema>;
export type CardVisuals = z.infer<typeof CardVisualsSchema>;
export type CastingTime = z.infer<typeof CastingTimeSchema>;
export type Range = z.infer<typeof RangeSchema>;
export type Duration = z.infer<typeof DurationSchema>;
export type Components = z.infer<typeof ComponentsSchema>;
export type SpellCard = z.infer<typeof SpellCardSchema>;
export type AbilityCard = z.infer<typeof AbilityCardSchema>;
export type Card = ItemCard | SpellCard | AbilityCard;

// Deck-related interfaces
export interface DeckStyle {
  cardFormat: CardFormat;
  imageHeightPercent: number; // Image height as percentage of card height, default: 40 (range: 0-100)
  titleFontSize: number; // Font size in pixels, default: 24
  bodyFontSize: number; // Font size in pixels, default: 14
  lineHeight: number; // Line height multiplier, default: 1.5
  paddingMultiplier: number; // Padding multiplier, default: 1.0 (range: 0.5-1.5)
  cornerRadius: number; // Corner radius in rem, default: 1.5 (range: 0.0-3.0)
}

export interface Deck {
  id: string;
  name: string;
  cards: Card[];
  style: DeckStyle;
}

// Union schema for validation
export const CardSchema = z.discriminatedUnion("type", [
  ItemCardSchema,
  SpellCardSchema,
  AbilityCardSchema,
]);
