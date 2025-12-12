import {
  WeaponType,
  PhysicalDamageType,
  WeaponProperty,
  WeaponAttackType,
  WeaponCategory,
} from "./constants";
import { WeaponItem } from "@/features/items/weapons/schemas";

type WeaponDefinition = Pick<
  WeaponItem,
  "category" | "attackType" | "damage" | "range" | "properties"
>;

export const WEAPON_DEFINITIONS: Record<WeaponType, WeaponDefinition> = {
  // Simple Melee
  [WeaponType.Club]: {
    category: WeaponCategory.Simple,
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d4", type: PhysicalDamageType.Bludgeoning },
    properties: [WeaponProperty.Light],
  },
  [WeaponType.Dagger]: {
    category: WeaponCategory.Simple,
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d4", type: PhysicalDamageType.Piercing },
    range: { normal: 20, long: 60 },
    properties: [
      WeaponProperty.Finesse,
      WeaponProperty.Light,
      WeaponProperty.Thrown,
    ],
  },
  [WeaponType.Greatclub]: {
    category: WeaponCategory.Simple,
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d8", type: PhysicalDamageType.Bludgeoning },
    properties: [WeaponProperty.TwoHanded],
  },
  [WeaponType.Handaxe]: {
    category: WeaponCategory.Simple,
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d6", type: PhysicalDamageType.Slashing },
    range: { normal: 20, long: 60 },
    properties: [WeaponProperty.Light, WeaponProperty.Thrown],
  },
  [WeaponType.Javelin]: {
    category: WeaponCategory.Simple,
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d6", type: PhysicalDamageType.Piercing },
    range: { normal: 30, long: 120 },
    properties: [WeaponProperty.Thrown],
  },
  [WeaponType.LightHammer]: {
    category: WeaponCategory.Simple,
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d4", type: PhysicalDamageType.Bludgeoning },
    range: { normal: 20, long: 60 },
    properties: [WeaponProperty.Light, WeaponProperty.Thrown],
  },
  [WeaponType.Mace]: {
    category: WeaponCategory.Simple,
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d6", type: PhysicalDamageType.Bludgeoning },
    properties: [],
  },
  [WeaponType.Quarterstaff]: {
    category: WeaponCategory.Simple,
    attackType: WeaponAttackType.Melee,
    damage: {
      amount: "1d6",
      type: PhysicalDamageType.Bludgeoning,
      versatile: "1d8",
    },
    properties: [WeaponProperty.Versatile],
  },
  [WeaponType.Sickle]: {
    category: WeaponCategory.Simple,
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d4", type: PhysicalDamageType.Slashing },
    properties: [WeaponProperty.Light],
  },
  [WeaponType.Spear]: {
    category: WeaponCategory.Simple,
    attackType: WeaponAttackType.Melee,
    damage: {
      amount: "1d6",
      type: PhysicalDamageType.Piercing,
      versatile: "1d8",
    },
    range: { normal: 20, long: 60 },
    properties: [WeaponProperty.Thrown, WeaponProperty.Versatile],
  },

  // Simple Ranged
  [WeaponType.Dart]: {
    category: WeaponCategory.Simple,
    attackType: WeaponAttackType.Ranged,
    damage: { amount: "1d4", type: PhysicalDamageType.Piercing },
    range: { normal: 20, long: 60 },
    properties: [WeaponProperty.Finesse, WeaponProperty.Thrown],
  },
  [WeaponType.Shortbow]: {
    category: WeaponCategory.Simple,
    attackType: WeaponAttackType.Ranged,
    damage: { amount: "1d6", type: PhysicalDamageType.Piercing },
    range: { normal: 80, long: 320 },
    properties: [WeaponProperty.Ammunition, WeaponProperty.TwoHanded],
  },
  [WeaponType.Sling]: {
    category: WeaponCategory.Simple,
    attackType: WeaponAttackType.Ranged,
    damage: { amount: "1d4", type: PhysicalDamageType.Bludgeoning },
    range: { normal: 30, long: 120 },
    properties: [WeaponProperty.Ammunition],
  },
  [WeaponType.LightCrossbow]: {
    category: WeaponCategory.Simple,
    attackType: WeaponAttackType.Ranged,
    damage: { amount: "1d8", type: PhysicalDamageType.Piercing },
    range: { normal: 80, long: 320 },
    properties: [
      WeaponProperty.Ammunition,
      WeaponProperty.Loading,
      WeaponProperty.TwoHanded,
    ],
  },

  // Martial Melee
  [WeaponType.Battleaxe]: {
    category: WeaponCategory.Martial,
    attackType: WeaponAttackType.Melee,
    damage: {
      amount: "1d8",
      type: PhysicalDamageType.Slashing,
      versatile: "1d10",
    },
    properties: [WeaponProperty.Versatile],
  },
  [WeaponType.Flail]: {
    category: WeaponCategory.Martial,
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d8", type: PhysicalDamageType.Bludgeoning },
    properties: [],
  },
  [WeaponType.Glaive]: {
    category: WeaponCategory.Martial,
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d10", type: PhysicalDamageType.Slashing },
    properties: [
      WeaponProperty.Heavy,
      WeaponProperty.Reach,
      WeaponProperty.TwoHanded,
    ],
  },
  [WeaponType.Greataxe]: {
    category: WeaponCategory.Martial,
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d12", type: PhysicalDamageType.Slashing },
    properties: [WeaponProperty.TwoHanded, WeaponProperty.Heavy],
  },
  [WeaponType.Greatsword]: {
    category: WeaponCategory.Martial,
    attackType: WeaponAttackType.Melee,
    damage: { amount: "2d6", type: PhysicalDamageType.Slashing },
    properties: [WeaponProperty.TwoHanded, WeaponProperty.Heavy],
  },
  [WeaponType.Halberd]: {
    category: WeaponCategory.Martial,
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d10", type: PhysicalDamageType.Slashing },
    properties: [
      WeaponProperty.Heavy,
      WeaponProperty.Reach,
      WeaponProperty.TwoHanded,
    ],
  },
  [WeaponType.Lance]: {
    category: WeaponCategory.Martial,
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d12", type: PhysicalDamageType.Piercing },
    properties: [WeaponProperty.Reach, WeaponProperty.Special],
  },
  [WeaponType.Longsword]: {
    category: WeaponCategory.Martial,
    attackType: WeaponAttackType.Melee,
    damage: {
      amount: "1d8",
      type: PhysicalDamageType.Slashing,
      versatile: "1d10",
    },
    properties: [WeaponProperty.Versatile],
  },
  [WeaponType.Maul]: {
    category: WeaponCategory.Martial,
    attackType: WeaponAttackType.Melee,
    damage: { amount: "2d6", type: PhysicalDamageType.Bludgeoning },
    properties: [WeaponProperty.TwoHanded, WeaponProperty.Heavy],
  },
  [WeaponType.Morningstar]: {
    category: WeaponCategory.Martial,
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d8", type: PhysicalDamageType.Piercing },
    properties: [],
  },
  [WeaponType.Pike]: {
    category: WeaponCategory.Martial,
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d10", type: PhysicalDamageType.Piercing },
    properties: [
      WeaponProperty.Heavy,
      WeaponProperty.Reach,
      WeaponProperty.TwoHanded,
    ],
  },
  [WeaponType.Rapier]: {
    category: WeaponCategory.Martial,
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d8", type: PhysicalDamageType.Piercing },
    properties: [WeaponProperty.Finesse],
  },
  [WeaponType.Scimitar]: {
    category: WeaponCategory.Martial,
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d6", type: PhysicalDamageType.Slashing },
    properties: [WeaponProperty.Finesse, WeaponProperty.Light],
  },
  [WeaponType.Shortsword]: {
    category: WeaponCategory.Martial,
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d6", type: PhysicalDamageType.Piercing },
    properties: [WeaponProperty.Finesse, WeaponProperty.Light],
  },
  [WeaponType.Trident]: {
    category: WeaponCategory.Martial,
    attackType: WeaponAttackType.Melee,
    damage: {
      amount: "1d6",
      type: PhysicalDamageType.Piercing,
      versatile: "1d8",
    },
    range: { normal: 20, long: 60 },
    properties: [WeaponProperty.Thrown, WeaponProperty.Versatile],
  },
  [WeaponType.WarPick]: {
    category: WeaponCategory.Martial,
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d8", type: PhysicalDamageType.Piercing },
    properties: [],
  },
  [WeaponType.Warhammer]: {
    category: WeaponCategory.Martial,
    attackType: WeaponAttackType.Melee,
    damage: {
      amount: "1d8",
      type: PhysicalDamageType.Bludgeoning,
      versatile: "1d10",
    },
    properties: [WeaponProperty.Versatile],
  },
  [WeaponType.Whip]: {
    category: WeaponCategory.Martial,
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d4", type: PhysicalDamageType.Slashing },
    properties: [WeaponProperty.Finesse, WeaponProperty.Reach],
  },

  // Martial Ranged
  [WeaponType.Blowgun]: {
    category: WeaponCategory.Martial,
    attackType: WeaponAttackType.Ranged,
    damage: { amount: "1", type: PhysicalDamageType.Piercing },
    range: { normal: 25, long: 100 },
    properties: [WeaponProperty.Ammunition, WeaponProperty.Loading],
  },
  [WeaponType.HandCrossbow]: {
    category: WeaponCategory.Martial,
    attackType: WeaponAttackType.Ranged,
    damage: { amount: "1d6", type: PhysicalDamageType.Piercing },
    range: { normal: 30, long: 120 },
    properties: [
      WeaponProperty.Ammunition,
      WeaponProperty.Light,
      WeaponProperty.Loading,
    ],
  },
  [WeaponType.HeavyCrossbow]: {
    category: WeaponCategory.Martial,
    attackType: WeaponAttackType.Ranged,
    damage: { amount: "1d10", type: PhysicalDamageType.Piercing },
    range: { normal: 100, long: 400 },
    properties: [
      WeaponProperty.Ammunition,
      WeaponProperty.Heavy,
      WeaponProperty.Loading,
      WeaponProperty.TwoHanded,
    ],
  },
  [WeaponType.Longbow]: {
    category: WeaponCategory.Martial,
    attackType: WeaponAttackType.Ranged,
    damage: { amount: "1d8", type: PhysicalDamageType.Piercing },
    range: { normal: 150, long: 600 },
    properties: [
      WeaponProperty.Ammunition,
      WeaponProperty.Heavy,
      WeaponProperty.TwoHanded,
    ],
  },
  [WeaponType.Net]: {
    category: WeaponCategory.Martial,
    attackType: WeaponAttackType.Ranged,
    damage: { amount: "0", type: PhysicalDamageType.Bludgeoning }, // Net does 0 damage but is a weapon.
    // Wait, D&D 5e Net doesn't have damage rolled but it functions as a weapon?
    // The previous implementation had `damage: undefined` for Net.
    // Our schema now requires damage. I will set it to 0 or something safe, or perhaps "0".
    // Or I should make damage optional again? No, strict was requested.
    // "A net has no damage roll".
    // I will use "0" amount for now.
    range: { normal: 5, long: 15 },
    properties: [WeaponProperty.Special, WeaponProperty.Thrown],
  },

  // Other
  [WeaponType.Other]: {
    category: WeaponCategory.Simple,
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d4", type: PhysicalDamageType.Bludgeoning },
    properties: [],
  },
};
