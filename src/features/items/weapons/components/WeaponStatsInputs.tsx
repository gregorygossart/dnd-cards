import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { WeaponType } from "@/features/items/weapons/constants";
import { EditorLabel } from "@/components/RightSidebar/CardEditor/EditorLabel/EditorLabel";

export const WeaponStatsInputs: React.FC = () => {
  const { register, control } = useFormContext();

  return (
    <div className="space-y-4">
      {/* Weapon Type */}
      <div className="space-y-1">
        <EditorLabel>Weapon Type</EditorLabel>
        <FormField
          control={control}
          name="weaponType"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100 w-full h-9">
                    <SelectValue placeholder="Select weapon type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                  {Object.values(WeaponType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Damage */}
        <div className="space-y-1">
          <EditorLabel>Damage</EditorLabel>
          <Input
            {...register("damage")}
            placeholder="e.g. 1d8 slashing"
            className="bg-slate-800 border-slate-700 text-slate-100 h-9"
          />
        </div>

        {/* Range */}
        <div className="space-y-1">
          <EditorLabel>Range</EditorLabel>
          <Input
            {...register("range")}
            placeholder="e.g. 60/120"
            className="bg-slate-800 border-slate-700 text-slate-100 h-9"
          />
        </div>
      </div>

      {/* Properties */}
      <div className="space-y-1">
        <EditorLabel>Properties</EditorLabel>
        <Input
          {...register("properties")}
          placeholder="e.g. Finesse, Light, Thrown"
          className="bg-slate-800 border-slate-700 text-slate-100 h-9"
        />
      </div>
    </div>
  );
};
