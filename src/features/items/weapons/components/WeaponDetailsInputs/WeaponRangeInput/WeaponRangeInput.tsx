import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { EditorLabel } from "@/components/RightSidebar/CardEditor/EditorLabel/EditorLabel";
import type { WeaponItem } from "@/features/items/weapons/schemas";

export const WeaponRangeInput: React.FC = () => {
  const { control, watch } = useFormContext<WeaponItem>();
  const properties = watch("properties") || [];

  const showRange = properties.some((p) =>
    ["Thrown", "Ammunition"].includes(p),
  );

  if (!showRange) return null;

  return (
    <div className="space-y-1">
      <EditorLabel>Range (Feet)</EditorLabel>

      <div className="flex gap-2">
        <div className="flex-1">
          <Controller
            control={control}
            name="range.normal"
            render={({ field }) => (
              <Input
                type="number"
                placeholder="Normal"
                className="bg-slate-800 border-slate-700 text-slate-100 h-9 placeholder:text-slate-500"
                {...field}
                value={field.value ?? ""}
                onChange={(e) => {
                  const val = e.target.valueAsNumber;
                  field.onChange(Number.isNaN(val) ? undefined : val);
                }}
              />
            )}
          />
        </div>
        <div className="flex-1">
          <Controller
            control={control}
            name="range.long"
            render={({ field }) => (
              <Input
                type="number"
                placeholder="Long"
                className="bg-slate-800 border-slate-700 text-slate-100 h-9 placeholder:text-slate-500"
                {...field}
                value={field.value ?? ""}
                onChange={(e) => {
                  const val = e.target.valueAsNumber;
                  field.onChange(Number.isNaN(val) ? undefined : val);
                }}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};
