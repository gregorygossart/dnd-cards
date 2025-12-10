import { z } from "zod";
import { DensityPreset } from "./constants";

export const DensityPresetSchema = z.enum(DensityPreset);
