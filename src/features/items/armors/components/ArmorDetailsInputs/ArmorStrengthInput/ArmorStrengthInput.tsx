import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { EditorLabel } from "@/components/RightSidebar/CardEditor/EditorLabel/EditorLabel";

export const ArmorStrengthInput: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-1">
      <EditorLabel>Str Requirement</EditorLabel>
      <Controller
        control={control}
        name="strengthRequirement"
        render={({ field }) => (
          <Input
            type="number"
            placeholder="None"
            className="w-full bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
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
  );
};
