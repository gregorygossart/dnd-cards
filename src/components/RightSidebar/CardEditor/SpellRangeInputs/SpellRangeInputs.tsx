import { useFormContext } from "react-hook-form";
import { EditorLabel } from "@/components/RightSidebar/CardEditor/EditorLabel/EditorLabel";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RangeType } from "@/features/spells/constants";
import { RangeDistanceUnit } from "@/features/constants";
import type { Card } from "@/features/cards/types";

export const SpellRangeInputs: React.FC = () => {
  const { watch, setValue, register } = useFormContext<Card>();

  return (
    <div>
      <EditorLabel>Range</EditorLabel>
      <div className="flex gap-2">
        <Select
          value={watch("range.type")}
          onValueChange={(value) => {
            const type = value as RangeType;
            if (type === RangeType.Ranged) {
              setValue("range", {
                type,
                distance: { amount: 60, unit: RangeDistanceUnit.Feet },
              });
            } else {
              setValue("range", { type });
            }
          }}
        >
          <SelectTrigger className="flex-1 bg-slate-800 border-slate-700 text-slate-100 h-9">
            <SelectValue placeholder="Range Type" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
            {Object.values(RangeType).map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {watch("range.type") === RangeType.Ranged && (
          <>
            <Input
              type="number"
              min={1}
              className="w-20 bg-slate-800 border-slate-700 text-slate-100 h-9"
              {...register("range.distance.amount", {
                valueAsNumber: true,
              })}
            />
            <Select
              value={watch("range.distance.unit")}
              onValueChange={(value) =>
                setValue("range.distance.unit", value as RangeDistanceUnit)
              }
            >
              <SelectTrigger className="w-[100px] bg-slate-800 border-slate-700 text-slate-100 h-9">
                <SelectValue placeholder="Unit" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                {Object.values(RangeDistanceUnit).map((unit) => (
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
