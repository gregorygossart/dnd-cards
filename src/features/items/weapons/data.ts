import {
  WeaponType,
  PhysicalDamageType,
  WeaponProperty,
  WeaponAttackType,
} from "./constants";
import { WeaponItem } from "@/features/items/weapons/schemas";

type WeaponDefinition = Pick<
  WeaponItem,
  "attackType" | "damage" | "range" | "properties"
>;

export const WEAPON_DEFINITIONS: Record<WeaponType, WeaponDefinition> = {
  // Simple Melee
  [WeaponType.Club]: {
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d4", type: PhysicalDamageType.Bludgeoning },
    properties: [WeaponProperty.Light],
  },
  [WeaponType.Dagger]: {
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
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d8", type: PhysicalDamageType.Bludgeoning },
    properties: [WeaponProperty.TwoHanded],
  },
  [WeaponType.Handaxe]: {
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d6", type: PhysicalDamageType.Slashing },
    range: { normal: 20, long: 60 },
    properties: [WeaponProperty.Light, WeaponProperty.Thrown],
  },
  [WeaponType.Javelin]: {
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d6", type: PhysicalDamageType.Piercing },
    range: { normal: 30, long: 120 },
    properties: [WeaponProperty.Thrown],
  },
  [WeaponType.LightHammer]: {
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d4", type: PhysicalDamageType.Bludgeoning },
    range: { normal: 20, long: 60 },
    properties: [WeaponProperty.Light, WeaponProperty.Thrown],
  },
  [WeaponType.Mace]: {
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d6", type: PhysicalDamageType.Bludgeoning },
    properties: [],
  },
  [WeaponType.Quarterstaff]: {
    attackType: WeaponAttackType.Melee,
    damage: {
      amount: "1d6",
      type: PhysicalDamageType.Bludgeoning,
      versatile: "1d8",
    },
    properties: [WeaponProperty.Versatile],
  },
  [WeaponType.Sickle]: {
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d4", type: PhysicalDamageType.Slashing },
    properties: [WeaponProperty.Light],
  },
  [WeaponType.Spear]: {
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
    attackType: WeaponAttackType.Ranged,
    damage: { amount: "1d4", type: PhysicalDamageType.Piercing },
    range: { normal: 20, long: 60 },
    properties: [WeaponProperty.Finesse, WeaponProperty.Thrown],
  },
  [WeaponType.Shortbow]: {
    attackType: WeaponAttackType.Ranged,
    damage: { amount: "1d6", type: PhysicalDamageType.Piercing },
    range: { normal: 80, long: 320 },
    properties: [WeaponProperty.Ammunition, WeaponProperty.TwoHanded],
  },
  [WeaponType.Sling]: {
    attackType: WeaponAttackType.Ranged,
    damage: { amount: "1d4", type: PhysicalDamageType.Bludgeoning },
    range: { normal: 30, long: 120 },
    properties: [WeaponProperty.Ammunition],
  },
  [WeaponType.LightCrossbow]: {
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
    attackType: WeaponAttackType.Melee,
    damage: {
      amount: "1d8",
      type: PhysicalDamageType.Slashing,
      versatile: "1d10",
    },
    properties: [WeaponProperty.Versatile],
  },
  [WeaponType.Flail]: {
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d8", type: PhysicalDamageType.Bludgeoning },
    properties: [],
  },
  [WeaponType.Glaive]: {
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d10", type: PhysicalDamageType.Slashing },
    properties: [
      WeaponProperty.Heavy,
      WeaponProperty.Reach,
      WeaponProperty.TwoHanded,
    ],
  },
  [WeaponType.Greataxe]: {
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d12", type: PhysicalDamageType.Slashing },
    properties: [WeaponProperty.TwoHanded, WeaponProperty.Heavy],
  },
  [WeaponType.Greatsword]: {
    attackType: WeaponAttackType.Melee,
    damage: { amount: "2d6", type: PhysicalDamageType.Slashing },
    properties: [WeaponProperty.TwoHanded, WeaponProperty.Heavy],
  },
  [WeaponType.Halberd]: {
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d10", type: PhysicalDamageType.Slashing },
    properties: [
      WeaponProperty.Heavy,
      WeaponProperty.Reach,
      WeaponProperty.TwoHanded,
    ],
  },
  [WeaponType.Lance]: {
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d12", type: PhysicalDamageType.Piercing },
    properties: [WeaponProperty.Reach, WeaponProperty.Special],
  },
  [WeaponType.Longsword]: {
    attackType: WeaponAttackType.Melee,
    damage: {
      amount: "1d8",
      type: PhysicalDamageType.Slashing,
      versatile: "1d10",
    },
    properties: [WeaponProperty.Versatile],
  },
  [WeaponType.Maul]: {
    attackType: WeaponAttackType.Melee,
    damage: { amount: "2d6", type: PhysicalDamageType.Bludgeoning },
    properties: [WeaponProperty.TwoHanded, WeaponProperty.Heavy],
  },
  [WeaponType.Morningstar]: {
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d8", type: PhysicalDamageType.Piercing },
    properties: [],
  },
  [WeaponType.Pike]: {
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d10", type: PhysicalDamageType.Piercing },
    properties: [
      WeaponProperty.Heavy,
      WeaponProperty.Reach,
      WeaponProperty.TwoHanded,
    ],
  },
  [WeaponType.Rapier]: {
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d8", type: PhysicalDamageType.Piercing },
    properties: [WeaponProperty.Finesse],
  },
  [WeaponType.Scimitar]: {
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d6", type: PhysicalDamageType.Slashing },
    properties: [WeaponProperty.Finesse, WeaponProperty.Light],
  },
  [WeaponType.Shortsword]: {
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d6", type: PhysicalDamageType.Piercing },
    properties: [WeaponProperty.Finesse, WeaponProperty.Light],
  },
  [WeaponType.Trident]: {
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
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d8", type: PhysicalDamageType.Piercing },
    properties: [],
  },
  [WeaponType.Warhammer]: {
    attackType: WeaponAttackType.Melee,
    damage: {
      amount: "1d8",
      type: PhysicalDamageType.Bludgeoning,
      versatile: "1d10",
    },
    properties: [WeaponProperty.Versatile],
  },
  [WeaponType.Whip]: {
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d4", type: PhysicalDamageType.Slashing },
    properties: [WeaponProperty.Finesse, WeaponProperty.Reach],
  },

  // Martial Ranged
  [WeaponType.Blowgun]: {
    attackType: WeaponAttackType.Ranged,
    damage: { amount: "1", type: PhysicalDamageType.Piercing },
    range: { normal: 25, long: 100 },
    properties: [WeaponProperty.Ammunition, WeaponProperty.Loading],
  },
  [WeaponType.HandCrossbow]: {
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
    attackType: WeaponAttackType.Melee,
    damage: { amount: "1d4", type: PhysicalDamageType.Bludgeoning },
    properties: [],
  },
};
