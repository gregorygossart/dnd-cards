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
import { DurationType, TimeDurationUnit } from "@/features/spells/constants";
import type { Card } from "@/features/cards/types";
import { assertUnreachable } from "@/lib/utils";

export const SpellDurationInputs: React.FC = () => {
  const { control, watch, setValue, getValues, register } =
    useFormContext<Card>();
  const { t } = useT();

  const getDurationTypeKey = (type: DurationType): string => {
    switch (type) {
      case DurationType.Instantaneous:
        return "instantaneous";
      case DurationType.Time:
        return "time";
      case DurationType.UntilDispelled:
        return "untilDispelled";
    }
  };

  return (
    <div>
      <div className="flex items-start justify-between">
        <EditorLabel>{t("editor.spellDetails.duration.label")}</EditorLabel>

        <div className="flex items-center gap-2">
          <Controller
            control={control}
            name="duration.concentration"
            render={({ field }) => (
              <Checkbox
                id="concentration"
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={watch("duration.type") === DurationType.Instantaneous}
                className="border-slate-700 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground h-4 w-4"
              />
            )}
          />
          <Label
            htmlFor="concentration"
            className={`text-xs font-normal cursor-pointer ${watch("duration.type") === DurationType.Instantaneous
              ? "text-slate-600"
              : "text-slate-400"
              }`}
          >
            {t("card.spell.concentration")}
          </Label>
        </div>
      </div>
      <div className="flex gap-2">
        <Select
          value={watch("duration.type")}
          onValueChange={(value) => {
            const type = value as DurationType;
            switch (type) {
              case DurationType.Time:
                setValue("duration", {
                  type,
                  duration: { amount: 1, unit: TimeDurationUnit.Minute },
                  concentration: getValues("duration.concentration") ?? false,
                });
                break;
              case DurationType.Instantaneous:
                setValue("duration", { type });
                // Instantaneous can't have concentration. Explicitly uncheck the concentration checkbox
                setValue("duration.concentration", false);
                break;
              case DurationType.UntilDispelled:
                setValue("duration", {
                  type,
                  concentration: getValues("duration.concentration") ?? false,
                });
                break;
              default:
                assertUnreachable(type);
            }
          }}
        >
          <SelectTrigger className="flex-1 bg-slate-800 border-slate-700 text-slate-100 h-9">
            <SelectValue placeholder={t("editor.spellDetails.duration.typePlaceholder")} />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
            {Object.values(DurationType).map((type) => (
              <SelectItem key={type} value={type}>
                {t(`card.spell.durationTypes.${getDurationTypeKey(type)}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {watch("duration.type") === DurationType.Time && (
          <>
            <Input
              type="number"
              min={1}
              className="w-20 bg-slate-800 border-slate-700 text-slate-100 h-9"
              {...register("duration.duration.amount", {
                valueAsNumber: true,
              })}
            />
            <Select
              value={watch("duration.duration.unit")}
              onValueChange={(value) =>
                setValue("duration.duration.unit", value as TimeDurationUnit)
              }
            >
              <SelectTrigger className="w-[100px] bg-slate-800 border-slate-700 text-slate-100 h-9">
                <SelectValue placeholder={t("editor.spellDetails.duration.unitPlaceholder")} />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                {Object.values(TimeDurationUnit).map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {t(`common.units.time.${unit.toLowerCase()}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        )}
      </div>
    </div>
  );
};

