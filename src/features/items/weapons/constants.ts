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
