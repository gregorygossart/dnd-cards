import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  MultiSelect,
  type MultiSelectOption,
} from "@/components/ui/multi-select";
import { EditorLabel } from "@/components/RightSidebar/CardEditor/EditorLabel/EditorLabel";
import { WeaponProperty } from "@/features/items/weapons/constants";
import type { WeaponItem } from "@/features/items/weapons/schemas";

export const WeaponPropertiesInput: React.FC = () => {
  const { control } = useFormContext<WeaponItem>();

  // Sort properties alphabetically and map to MultiSelectOption
  const options: MultiSelectOption[] = Object.values(WeaponProperty)
    .sort((a, b) => a.localeCompare(b))
    .map((prop) => ({
      label: prop,
      value: prop,
    }));

  return (
    <div className="space-y-1">
      <EditorLabel>Properties</EditorLabel>
      <Controller
        control={control}
        name="properties"
        render={({ field }) => (
          <MultiSelect
            options={options}
            value={field.value || []}
            onValueChange={field.onChange}
            placeholder="Select properties"
            className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 hover:bg-slate-800"
            popoverClassName="bg-slate-800 border-slate-700"
          />
        )}
      />
    </div>
  );
};
