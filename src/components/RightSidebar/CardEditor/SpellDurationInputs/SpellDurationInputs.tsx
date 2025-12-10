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
import { DurationType, TimeDurationUnit } from "@/features/cards/constants";
import type { Card } from "@/features/cards/types";

export const SpellDurationInputs: React.FC = () => {
  const { control, watch, setValue, getValues, register } =
    useFormContext<Card>();

  return (
    <div>
      <div className="flex items-start justify-between">
        <EditorLabel>Duration</EditorLabel>

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
            className={`text-xs font-normal cursor-pointer ${
              watch("duration.type") === DurationType.Instantaneous
                ? "text-slate-600"
                : "text-slate-400"
            }`}
          >
            Concentration
          </Label>
        </div>
      </div>
      <div className="flex gap-2">
        <Select
          value={watch("duration.type")}
          onValueChange={(value) => {
            const type = value as DurationType;
            if (type === DurationType.Time) {
              setValue("duration", {
                type,
                duration: { amount: 1, unit: TimeDurationUnit.Minute },
                concentration: getValues("duration.concentration") ?? false,
              });
            } else if (type === DurationType.Instantaneous) {
              // Instantaneous can't have concentration
              setValue("duration", { type });
              // Explicitly uncheck the concentration checkbox
              setValue("duration.concentration", false);
            } else {
              // UntilDispelled
              setValue("duration", {
                type,
                concentration: getValues("duration.concentration") ?? false,
              });
            }
          }}
        >
          <SelectTrigger className="flex-1 bg-slate-800 border-slate-700 text-slate-100 h-9">
            <SelectValue placeholder="Duration Type" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
            {Object.values(DurationType).map((type) => (
              <SelectItem key={type} value={type}>
                {type}
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
                <SelectValue placeholder="Unit" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                {Object.values(TimeDurationUnit).map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
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
