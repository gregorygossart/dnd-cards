import { useFormContext, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { EditorLabel } from "@/components/RightSidebar/CardEditor/EditorLabel/EditorLabel";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useT } from "next-i18next/client";
import { CastingTimeUnit } from "@/features/spells/constants";
import type { Card } from "@/features/cards/types";

export const CastingTimeInputs: React.FC = () => {
  const { control } = useFormContext<Card>();
  const { t } = useT();

  return (
    <div className="col-span-2">
      <div className="flex items-start justify-between">
        <EditorLabel>{t("spell.castingTime.label")}</EditorLabel>
        <div className="flex items-center gap-2">
          <Controller
            control={control}
            name="ritual"
            render={({ field }) => (
              <Checkbox
                id="ritual"
                checked={field.value}
                onCheckedChange={field.onChange}
                className="border-slate-700 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground h-4 w-4"
              />
            )}
          />
          <Label
            htmlFor="ritual"
            className="text-xs font-normal text-slate-400 cursor-pointer"
          >
            {t("spell.castingTime.ritual")}
          </Label>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="w-20">
          <Controller
            control={control}
            name="castingTime.amount"
            render={({ field }) => (
              <Input
                type="number"
                min="1"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                className="bg-slate-800 border-slate-700 text-slate-100 h-9"
                placeholder="#"
              />
            )}
          />
        </div>
        <div className="flex-1">
          <Controller
            control={control}
            name="castingTime.unit"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100 w-full h-9">
                  <SelectValue placeholder={t("spell.castingTime.unitPlaceholder")} />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                  <SelectItem value={CastingTimeUnit.Action}>
                    {t("spell.castingTime.units.action")}
                  </SelectItem>
                  <SelectItem value={CastingTimeUnit.BonusAction}>
                    {t("spell.castingTime.units.bonusAction")}
                  </SelectItem>
                  <SelectItem value={CastingTimeUnit.Reaction}>
                    {t("spell.castingTime.units.reaction")}
                  </SelectItem>
                  <SelectItem value={CastingTimeUnit.Minute}>
                    {t("spell.castingTime.units.minute")}
                  </SelectItem>
                  <SelectItem value={CastingTimeUnit.Hour}>
                    {t("spell.castingTime.units.hour")}
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>
    </div>
  );
};

