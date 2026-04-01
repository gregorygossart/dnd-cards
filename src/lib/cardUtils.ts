import { type Card } from "@/features/cards/types";
import { CardType } from "@/features/cards/constants";
import {
  type CastingTime,
  type Range,
  type Duration,
  type Components,
} from "@/features/spells/types";
import { RangeType, DurationType } from "@/features/spells/constants";

import { assertUnreachable } from "./utils";

type TFunction = (key: string, options?: Record<string, unknown>) => string;

export function getCardSubtitle(card: Card, t: TFunction): string {
  const type = card.type;
  switch (type) {
    case CardType.Ability:
      throw new Error("Not implemented");

    case CardType.Spell:
      if (card.school) {
        return t(`card.spell.schools.${card.school.toLowerCase()}`);
      }
      return t("card.types.spell");

    case CardType.Armor:
      return `${card.rarity} • ${card.armorType}`;

    case CardType.Weapon:
      return `${card.rarity} • ${card.weaponType}`;

    default:
      return assertUnreachable(type);
  }
}

/**
 * Formats casting time for display.
 * Examples:
 * - { amount: 1, unit: 'Action' } -> "1 Action"
 * - { amount: 1, unit: 'Minute' } -> "1 Minute"
 * - { amount: 10, unit: 'Minute' } -> "10 Minutes"
 */
export function formatCastingTime(castingTime: CastingTime, t: TFunction): string {
  const { amount, unit } = castingTime;
  const unitKey = unit.charAt(0).toLowerCase() + unit.slice(1).replace(/\s+/g, "");
  const unitLabel = t(`card.spell.castingTimeUnits.${unitKey}`);
  const plural = amount > 1 ? "s" : "";
  return `${amount} ${unitLabel}${plural}`;
}

/**
 * Formats range for display.
 * Examples:
 * - { type: 'Self' } -> "Self"
 * - { type: 'Ranged', distance: { amount: 60, unit: 'Feet' } } -> "60 Feet"
 * - { type: 'Ranged', distance: { amount: 1, unit: 'Miles' } } -> "1 Mile"
 */
export function formatRange(range: Range, t: TFunction): string {
  const { type } = range;

  if (type === RangeType.Ranged && "distance" in range) {
    const { amount, unit } = range.distance;
    const pluralKey = unit.toLowerCase(); // "feet" | "miles"
    const singularMap: Record<string, string> = { feet: "foot", miles: "mile" };
    const unitKey = amount === 1 ? (singularMap[pluralKey] ?? pluralKey) : pluralKey;
    const unitLabel = t(`common.units.distance.${unitKey}`);
    return `${amount} ${unitLabel}`;
  }

  const typeKey = type.charAt(0).toLowerCase() + type.slice(1);
  return t(`card.spell.rangeTypes.${typeKey}`);
}

/**
 * Formats duration for display (without concentration - that's a separate badge).
 * Examples:
 * - { type: 'Instantaneous' } -> "Instantaneous"
 * - { type: 'Time', duration: { amount: 1, unit: 'Minute' }, concentration: true } -> "up to 1 Minute"
 * - { type: 'Time', duration: { amount: 10, unit: 'Minute' }, concentration: false } -> "10 Minutes"
 * - { type: 'Until Dispelled' } -> "Until Dispelled"
 */
export function formatDuration(duration: Duration, t: TFunction): string {
  const { type } = duration;

  if (type === DurationType.Instantaneous) {
    return t("card.spell.durationTypes.instantaneous");
  } else if (type === DurationType.UntilDispelled) {
    return t("card.spell.durationTypes.untilDispelled");
  } else if (type === DurationType.Time) {
    const { amount, unit } = duration.duration;
    const unitKey = unit.toLowerCase();
    const unitLabel = t(`common.units.time.${unitKey}`);
    const hasConcentration =
      "concentration" in duration && duration.concentration;
    const upTo = hasConcentration ? `${t("common.upTo")} ` : "";
    return `${upTo}${amount} ${unitLabel}${amount > 1 ? "s" : ""}`;
  }

  return "";
}

/**
 * Formats components for display.
 * Examples:
 * - { verbal: true, somatic: true, material: true } -> "V, S, M"
 * - { verbal: true, somatic: false, material: false } -> "V"
 * - { verbal: false, somatic: true, material: true } -> "S, M"
 */
export function formatComponents(components: Components): string {
  const parts = [];
  if (components.verbal) parts.push("V");
  if (components.somatic) parts.push("S");
  if (components.material) parts.push("M");
  return parts.join(", ");
}
