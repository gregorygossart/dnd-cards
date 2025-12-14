export enum ArmorCategory {
  Light = "Light Armor",
  Medium = "Medium Armor",
  Heavy = "Heavy Armor",
  Shield = "Shield",
}

export enum LightArmorType {
  Padded = "Padded Armor",
  Leather = "Leather Armor",
  StuddedLeather = "Studded Leather Armor",
}

export enum MediumArmorType {
  Hide = "Hide Armor",
  ChainShirt = "Chain Shirt",
  ScaleMail = "Scale Mail",
  Breastplate = "Breastplate",
  HalfPlate = "Half Plate",
}

export enum HeavyArmorType {
  RingMail = "Ring Mail",
  ChainMail = "Chain Mail",
  Splint = "Splint Armor",
  Plate = "Plate Armor",
}

export enum ShieldType {
  Shield = "Shield",
}

export const ArmorType = {
  ...LightArmorType,
  ...MediumArmorType,
  ...HeavyArmorType,
  ...ShieldType,
} as const;

export type ArmorType =
  | LightArmorType
  | MediumArmorType
  | HeavyArmorType
  | ShieldType;
