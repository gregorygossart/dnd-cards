import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { EditorLabel } from "@/components/RightSidebar/CardEditor/EditorLabel/EditorLabel";
import type { WeaponItem } from "@/features/items/weapons/schemas";

export const WeaponRangeInput: React.FC = () => {
  const { control } = useFormContext<WeaponItem>();

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
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
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
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};
