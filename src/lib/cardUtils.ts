import {
  CardType,
  CastingTimeUnit,
  RangeType,
  RangeDistanceUnit,
  DurationType,
  TimeDurationUnit,
} from "@/types/card";
import type {
  Card,
  SpellCard,
  CastingTime,
  Range,
  Duration,
  Components,
} from "@/types/card";

export function getCardSubtitle(card: Card): string {
  if (card.type === CardType.Spell) {
    return getSpellCardSubtitle(card);
  }

  // For non-spell cards, just return the type
  return card.type;
}

export function getSpellCardSubtitle(card: SpellCard): string {
  // Case 1: Leveled Spell
  if (card.level !== undefined) {
    const levelText = formatSpellLevel(card.level);
    return card.school
      ? `${card.school} · ${levelText}`
      : `Spell · ${levelText}`;
  }

  // Case 2: No Level (fallback)
  return card.school ?? "Spell";
}

/**
 * Formats a spell level number into display text.
 * 0 -> "Cantrip"
 * 1-9 -> "1st", "2nd", "3rd", "4th", etc.
 */
export function formatSpellLevel(level: number): string {
  if (level === 0) return "Cantrip";

  const suffixes = ["th", "st", "nd", "rd"];
  const suffix =
    level >= 11 && level <= 13 ? "th" : suffixes[level % 10] || "th";

  return `${level}${suffix} Level`;
}

/**
 * Formats casting time for display.
 * Examples:
 * - { amount: 1, unit: 'Action' } -> "1 Action"
 * - { amount: 1, unit: 'Minute' } -> "1 Minute"
 * - { amount: 10, unit: 'Minute' } -> "10 Minutes"
 */
export function formatCastingTime(castingTime: CastingTime): string {
  const { amount, unit } = castingTime;

  // For time-based units, pluralize if needed
  const plural = amount > 1 ? "s" : "";
  return `${amount} ${unit}${plural}`;
}

/**
 * Formats range for display.
 * Examples:
 * - { type: 'Self' } → "Self"
 * - { type: 'Ranged', distance: { amount: 60, unit: 'Feet' } } → "60 Feet"
 * - { type: 'Ranged', distance: { amount: 1, unit: 'Miles' } } → "1 Mile"
 */
export function formatRange(range: Range): string {
  const { type } = range;

  if (type === RangeType.Ranged && "distance" in range) {
    const { amount, unit } = range.distance;

    let unitLabel: string = unit;
    if (amount === 1) {
      if (unit === RangeDistanceUnit.Miles) unitLabel = "Mile";
      if (unit === RangeDistanceUnit.Feet) unitLabel = "Foot";
    }

    return `${amount} ${unitLabel}`;
  }

  return type;
}

/**
 * Formats duration for display (without concentration - that's a separate badge).
 * Examples:
 * - { type: 'Instantaneous' } → "Instantaneous"
 * - { type: 'Time', duration: { amount: 1, unit: 'Minute' }, concentration: true } → "up to 1 Minute"
 * - { type: 'Time', duration: { amount: 10, unit: 'Minute' }, concentration: false } → "10 Minutes"
 * - { type: 'Until Dispelled' } → "Until Dispelled"
 */
export function formatDuration(duration: Duration): string {
  const { type } = duration;

  if (type === DurationType.Instantaneous) {
    return "Instantaneous";
  } else if (type === DurationType.UntilDispelled) {
    return "Until Dispelled";
  } else if (type === DurationType.Time) {
    const { amount, unit } = duration.duration;
    const unitLabel = amount === 1 ? unit : `${unit}s`;
    const hasConcentration =
      "concentration" in duration && duration.concentration;
    return `${hasConcentration ? "Up to " : ""} ${amount} ${unitLabel}`;
  }

  return "";
}

/**
 * Formats components for display.
 * Examples:
 * - { verbal: true, somatic: true, material: true } → "V, S, M"
 * - { verbal: true, somatic: false, material: false } → "V"
 * - { verbal: false, somatic: true, material: true } → "S, M"
 */
export function formatComponents(components: Components): string {
  const parts = [];
  if (components.verbal) parts.push("V");
  if (components.somatic) parts.push("S");
  if (components.material) parts.push("M");
  return parts.join(", ");
}
