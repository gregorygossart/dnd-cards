export enum SimpleMeleeWeaponType {
  Club = "Club",
  Dagger = "Dagger",
  Greatclub = "Greatclub",
  Handaxe = "Handaxe",
  Javelin = "Javelin",
  LightHammer = "Light Hammer",
  Mace = "Mace",
  Quarterstaff = "Quarterstaff",
  Sickle = "Sickle",
  Spear = "Spear",
}

export enum SimpleRangedWeaponType {
  Dart = "Dart",
  LightCrossbow = "Light Crossbow",
  Shortbow = "Shortbow",
  Sling = "Sling",
}

export enum MartialMeleeWeaponType {
  Battleaxe = "Battleaxe",
  Flail = "Flail",
  Glaive = "Glaive",
  Greataxe = "Greataxe",
  Greatsword = "Greatsword",
  Halberd = "Halberd",
  Lance = "Lance",
  Longsword = "Longsword",
  Maul = "Maul",
  Morningstar = "Morningstar",
  Pike = "Pike",
  Rapier = "Rapier",
  Scimitar = "Scimitar",
  Shortsword = "Shortsword",
  Trident = "Trident",
  Warhammer = "Warhammer",
  WarPick = "War Pick",
  Whip = "Whip",
}

export enum MartialRangedWeaponType {
  Blowgun = "Blowgun",
  HandCrossbow = "Hand Crossbow",
  HeavyCrossbow = "Heavy Crossbow",
  Longbow = "Longbow",
  Net = "Net",
}

export enum OtherWeaponType {
  Other = "Other",
}

export const WeaponType = {
  ...SimpleMeleeWeaponType,
  ...SimpleRangedWeaponType,
  ...MartialMeleeWeaponType,
  ...MartialRangedWeaponType,
  ...OtherWeaponType,
} as const;

export type WeaponType =
  | SimpleMeleeWeaponType
  | SimpleRangedWeaponType
  | MartialMeleeWeaponType
  | MartialRangedWeaponType
  | OtherWeaponType;

export enum WeaponAttackType {
  Melee = "Melee",
  Ranged = "Ranged",
}

export enum WeaponCategory {
  Simple = "Simple",
  Martial = "Martial",
}

export enum PhysicalDamageType {
  Bludgeoning = "Bludgeoning",
  Piercing = "Piercing",
  Slashing = "Slashing",
}

export enum ElementalDamageType {
  Acid = "Acid",
  Cold = "Cold",
  Fire = "Fire",
  Force = "Force",
  Lightning = "Lightning",
  Necrotic = "Necrotic",
  Poison = "Poison",
  Psychic = "Psychic",
  Radiant = "Radiant",
  Thunder = "Thunder",
}

export const DamageType = {
  ...PhysicalDamageType,
  ...ElementalDamageType,
} as const;

export type DamageType = PhysicalDamageType | ElementalDamageType;

export enum WeaponProperty {
  Ammunition = "Ammunition",
  Finesse = "Finesse",
  Heavy = "Heavy",
  Light = "Light",
  Loading = "Loading",
  Range = "Range",
  Reach = "Reach",
  Special = "Special",
  Thrown = "Thrown",
  TwoHanded = "Two-Handed",
  Versatile = "Versatile",
}
