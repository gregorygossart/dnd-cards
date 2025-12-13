import { z } from "zod";
import {
  CastingTimeSchema,
  RangeSchema,
  DurationSchema,
  ComponentsSchema,
  SpellCardSchema,
} from "./schemas";

export type CastingTime = z.infer<typeof CastingTimeSchema>;
export type Range = z.infer<typeof RangeSchema>;
export type Duration = z.infer<typeof DurationSchema>;
export type Components = z.infer<typeof ComponentsSchema>;
export type SpellCard = z.infer<typeof SpellCardSchema>;
