import { z } from "zod";
import { BaseCardSchema } from "@/features/cards/schemas";
import { CardType } from "@/features/cards/constants";
import { ItemRarity } from "./constants";
import { WeaponItemSchema } from "./weapons/schemas";

export const BaseItemFields = BaseCardSchema.extend({
  type: z.literal(CardType.Item),
  rarity: z.enum(ItemRarity),
  attunement: z.boolean(),
});

export const ItemCardSchema = WeaponItemSchema;

export type ItemCard = z.infer<typeof ItemCardSchema>;
