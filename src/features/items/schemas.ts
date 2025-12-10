import { z } from "zod";
import { BaseCardSchema } from "@/features/cards/schemas";
import { CardType } from "@/features/cards/constants";
import { ItemRarity, ItemSubtype } from "./constants";
import { WeaponType } from "./weapons/constants";

export const BaseItemFields = BaseCardSchema.extend({
  type: z.literal(CardType.Item),
  rarity: z.enum(ItemRarity),
  attunement: z.boolean(),
});

export const WeaponItemSchema = BaseItemFields.extend({
  subtype: z.literal(ItemSubtype.Weapon),
  weaponType: z.enum(WeaponType),
  damage: z.string().optional(),
  range: z.string().optional(),
  properties: z.string().optional(), // Comma separated list
});

export type WeaponItem = z.infer<typeof WeaponItemSchema>;

export const ItemCardSchema = WeaponItemSchema;

export type ItemCard = z.infer<typeof ItemCardSchema>;
