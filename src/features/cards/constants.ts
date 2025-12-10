/**
 * Card Format Types
 */
export enum CardFormat {
  Poker = "Poker",
  Tarot = "Tarot",
}

export enum CardType {
  Item = "Item",
  Spell = "Spell",
  Ability = "Ability",
}

// Casting time units
export enum CastingTimeUnit {
  Action = "Action",
  BonusAction = "Bonus Action",
  Reaction = "Reaction",
  Minute = "Minute",
  Hour = "Hour",
}

export enum DurationType {
  Instantaneous = "Instantaneous",
  Time = "Time", // Covers Round, Minute, Hour, Day
  UntilDispelled = "Until Dispelled",
}

export enum TimeDurationUnit {
  Round = "Round",
  Minute = "Minute",
  Hour = "Hour",
  Day = "Day",
}

// Range types
export enum RangeType {
  Self = "Self",
  Touch = "Touch",
  Ranged = "Ranged",
  Sight = "Sight",
  Unlimited = "Unlimited",
}

// Range distance units
export enum RangeDistanceUnit {
  Feet = "Feet",
  Miles = "Miles",
}

export enum DensityPreset {
  Compact = "Compact",
  Normal = "Normal",
  Spacious = "Spacious",
}
