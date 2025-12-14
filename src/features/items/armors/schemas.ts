import { z } from "zod";
import { BaseCardSchema } from "@/features/cards/schemas";
import { CardType } from "@/features/cards/constants";
import { ItemRarity } from "../constants";
import { ArmorType } from "./constants";

export const ArmorItemSchema = BaseCardSchema.extend({
  type: z.literal(CardType.Armor),
  armorType: z.enum(ArmorType),
  rarity: z.enum(ItemRarity),
  attunement: z.boolean(),
  ac: z.string(), // e.g. "12 + Dex (max 2)"
  strengthRequirement: z.number().optional(), // Strength score required (e.g. 13)
  stealthDisadvantage: z.boolean(),
});

export type ArmorItem = z.infer<typeof ArmorItemSchema>;
