import {
  ArmorType,
  LightArmorType,
  MediumArmorType,
  HeavyArmorType,
  ShieldType,
} from "./constants";
import { ArmorItem } from "./schemas";

type ArmorDefinition = Pick<
  ArmorItem,
  "ac" | "strengthRequirement" | "stealthDisadvantage"
>;

export const ARMOR_DEFINITIONS: Record<ArmorType, ArmorDefinition> = {
  // Light Armor
  [LightArmorType.Padded]: {
    ac: "11 + Dex",
    stealthDisadvantage: true,
  },
  [LightArmorType.Leather]: {
    ac: "11 + Dex",
    stealthDisadvantage: false,
  },
  [LightArmorType.StuddedLeather]: {
    ac: "12 + Dex",
    stealthDisadvantage: false,
  },

  // Medium Armor
  [MediumArmorType.Hide]: {
    ac: "12 + Dex (max 2)",
    stealthDisadvantage: false,
  },
  [MediumArmorType.ChainShirt]: {
    ac: "13 + Dex (max 2)",
    stealthDisadvantage: false,
  },
  [MediumArmorType.ScaleMail]: {
    ac: "14 + Dex (max 2)",
    stealthDisadvantage: true,
  },
  [MediumArmorType.Breastplate]: {
    ac: "14 + Dex (max 2)",
    stealthDisadvantage: false,
  },
  [MediumArmorType.HalfPlate]: {
    ac: "15 + Dex (max 2)",
    stealthDisadvantage: true,
  },

  // Heavy Armor
  [HeavyArmorType.RingMail]: {
    ac: "14",
    stealthDisadvantage: true,
  },
  [HeavyArmorType.ChainMail]: {
    ac: "16",
    stealthDisadvantage: true,
    strengthRequirement: 13,
  },
  [HeavyArmorType.Splint]: {
    ac: "17",
    stealthDisadvantage: true,
    strengthRequirement: 15,
  },
  [HeavyArmorType.Plate]: {
    ac: "18",
    stealthDisadvantage: true,
    strengthRequirement: 15,
  },

  // Shield
  [ShieldType.Shield]: {
    ac: "+2",
    stealthDisadvantage: false,
  },
};
