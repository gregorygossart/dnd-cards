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

export enum RangeType {
  Self = "Self",
  Touch = "Touch",
  Ranged = "Ranged",
  Sight = "Sight",
  Unlimited = "Unlimited",
}

export enum RangeDistanceUnit {
  Feet = "Feet",
  Miles = "Miles",
}

export enum SpellSchool {
  Abjuration = "Abjuration",
  Conjuration = "Conjuration",
  Divination = "Divination",
  Enchantment = "Enchantment",
  Evocation = "Evocation",
  Illusion = "Illusion",
  Necromancy = "Necromancy",
  Transmutation = "Transmutation",
}
