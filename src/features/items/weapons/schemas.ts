import { z } from "zod";
import { BaseCardSchema } from "@/features/cards/schemas";
import { ItemRarity, ItemSubtype } from "@/features/items/constants";
import { CardType } from "@/features/cards/constants";
import {
  DamageType,
  WeaponProperty,
  WeaponType,
  WeaponAttackType,
  WeaponCategory,
} from "./constants";

export const WeaponDamageSchema = z.object({
  amount: z.string(), // e.g. "1d8"
  type: z.enum(Object.values(DamageType) as [string, ...string[]]),
  versatile: z.string().optional(), // e.g. "1d10"
});

export const WeaponRangeSchema = z.object({
  normal: z.number(),
  long: z.number(),
});

export type WeaponDamage = z.infer<typeof WeaponDamageSchema>;
export type WeaponRange = z.infer<typeof WeaponRangeSchema>;
export const WeaponTypeSchema = z.enum(
  Object.values(WeaponType) as [string, ...string[]],
);
export const WeaponPropertySchema = z.enum(WeaponProperty);

const BaseWeaponFields = BaseCardSchema.extend({
  type: z.literal(CardType.Item),
  rarity: z.enum(ItemRarity),
  attunement: z.boolean(),
  subtype: z.literal(ItemSubtype.Weapon),
  weaponType: WeaponTypeSchema,
  category: z.enum(WeaponCategory),
  damage: WeaponDamageSchema,
  properties: z.array(WeaponPropertySchema),
});

export const WeaponItemSchema = z
  .discriminatedUnion("attackType", [
    // Melee: Range is Optional (only if Thrown)
    BaseWeaponFields.extend({
      attackType: z.literal(WeaponAttackType.Melee),
      range: WeaponRangeSchema.optional(),
    }),
    // Ranged: Range is Required
    BaseWeaponFields.extend({
      attackType: z.literal(WeaponAttackType.Ranged),
      range: WeaponRangeSchema,
    }),
  ])
  .superRefine((data, ctx) => {
    const props = data.properties || [];

    // Versatile Check
    if (props.includes(WeaponProperty.Versatile) && !data.damage.versatile) {
      ctx.addIssue({
        code: "custom",
        message: "Versatile damage is required for Versatile weapons",
        path: ["damage", "versatile"],
      });
    }

    // Ranged weapon requires either Thrown or Ammunition property
    if (
      data.attackType === WeaponAttackType.Ranged &&
      !props.includes(WeaponProperty.Thrown) &&
      !props.includes(WeaponProperty.Ammunition)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Ranged weapon requires either Thrown or Ammunition property",
        path: ["properties"],
      });
    }

    // Thrown Check
    if (props.includes(WeaponProperty.Thrown) && !data.range) {
      ctx.addIssue({
        code: "custom",
        message: "Range (Normal/Long) is required for Thrown weapons",
        path: ["range"],
      });
    }

    // Ammunition Check
    if (props.includes(WeaponProperty.Ammunition) && !data.range) {
      ctx.addIssue({
        code: "custom",
        message: "Range (Normal/Long) is required for Ammunition weapons",
        path: ["range"],
      });
    }
  });

export type WeaponItem = z.infer<typeof WeaponItemSchema>;
