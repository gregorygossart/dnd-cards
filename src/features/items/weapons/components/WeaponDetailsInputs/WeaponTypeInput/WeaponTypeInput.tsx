import React from "react";
import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import {
  SimpleMeleeWeaponType,
  SimpleRangedWeaponType,
  MartialMeleeWeaponType,
  MartialRangedWeaponType,
  OtherWeaponType,
} from "@/features/items/weapons/constants";
import { EditorLabel } from "@/components/RightSidebar/CardEditor/EditorLabel/EditorLabel";

export const WeaponTypeInput: React.FC = () => {
  const { control } = useFormContext();

  return (
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
              <SelectContent className="bg-slate-800 border-slate-700 text-slate-100 max-h-[300px]">
                <SelectGroup>
                  <SelectLabel className="text-slate-400 pl-2 text-xs uppercase font-bold tracking-wider">
                    Simple Melee
                  </SelectLabel>
                  {Object.values(SimpleMeleeWeaponType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel className="text-slate-400 pl-2 text-xs uppercase font-bold tracking-wider mt-2">
                    Simple Ranged
                  </SelectLabel>
                  {Object.values(SimpleRangedWeaponType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel className="text-slate-400 pl-2 text-xs uppercase font-bold tracking-wider mt-2">
                    Martial Melee
                  </SelectLabel>
                  {Object.values(MartialMeleeWeaponType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel className="text-slate-400 pl-2 text-xs uppercase font-bold tracking-wider mt-2">
                    Martial Ranged
                  </SelectLabel>
                  {Object.values(MartialRangedWeaponType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel className="text-slate-400 pl-2 text-xs uppercase font-bold tracking-wider mt-2">
                    Other
                  </SelectLabel>
                  {Object.values(OtherWeaponType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </div>
  );
};
