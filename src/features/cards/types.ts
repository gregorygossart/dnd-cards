import { z } from "zod";
import {
  CardVisualsSchema,
  BaseCardSchema,
  AbilityCardSchema,
} from "./schemas";
import {
  type WeaponItem,
  WeaponItemSchema,
} from "@/features/items/weapons/schemas";
import {
  type ArmorItem,
  ArmorItemSchema,
} from "@/features/items/armors/schemas";
import { type SpellCard } from "@/features/spells/types";
import { SpellCardSchema } from "@/features/spells/schemas";

export type CardBaseData = z.infer<typeof BaseCardSchema>;
export type CardVisuals = z.infer<typeof CardVisualsSchema>;
export type AbilityCard = z.infer<typeof AbilityCardSchema>;

export type Card = AbilityCard | SpellCard | ArmorItem | WeaponItem;

// Union schema for validation
export const CardSchema = z.discriminatedUnion("type", [
  AbilityCardSchema,
  SpellCardSchema,
  ArmorItemSchema,
  WeaponItemSchema,
]);
