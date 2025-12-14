import { z } from "zod";
import {
  DamageType,
  WeaponProperty,
  WeaponType,
  WeaponAttackType,
} from "./constants";
import { BaseCardSchema } from "@/features/cards/schemas";
import { CardType } from "@/features/cards/constants";
import { ItemRarity } from "../constants";

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
export const WeaponPropertySchema = z.enum(WeaponProperty);

const BaseWeaponFields = BaseCardSchema.extend({
  type: z.literal(CardType.Weapon),
  weaponType: z.enum(WeaponType),
  rarity: z.enum(ItemRarity),
  attunement: z.boolean(),
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
  .refine(
    (data) => {
      // Logic for versatile property checking
      const isVersatile = data.properties.includes(WeaponProperty.Versatile);
      if (isVersatile && !data.damage.versatile) {
        return false;
      }
      return true;
    },
    {
      message: "Versatile weapons must have a versatile damage value",
      path: ["damage", "versatile"],
    },
  )
  .refine(
    ({ attackType, properties }) => {
      // Logic for ranged property checking
      const isRanged = attackType === WeaponAttackType.Ranged;
      const isThrown = properties.includes(WeaponProperty.Thrown);
      const isAmmunition = properties.includes(WeaponProperty.Ammunition);

      if (isRanged && !isThrown && !isAmmunition) {
        return false;
      }
      return true;
    },
    {
      message: "Ranged weapon requires either Thrown or Ammunition property",
      path: ["properties"],
    },
  )
  .refine(
    ({ properties, range }) => {
      // Logic for thrown property checking
      const isThrown = properties.includes(WeaponProperty.Thrown);

      if (isThrown && !range) {
        return false;
      }
      return true;
    },
    {
      message: "Thrown weapon requires Range (Normal/Long)",
      path: ["range"],
    },
  )
  .refine(
    ({ properties, range }) => {
      // Logic for ammunition property checking
      const isAmmunition = properties.includes(WeaponProperty.Ammunition);

      if (isAmmunition && !range) {
        return false;
      }
      return true;
    },
    {
      message: "Ammunition weapon requires Range (Normal/Long)",
      path: ["range"],
    },
  );

export type WeaponItem = z.infer<typeof WeaponItemSchema>;
