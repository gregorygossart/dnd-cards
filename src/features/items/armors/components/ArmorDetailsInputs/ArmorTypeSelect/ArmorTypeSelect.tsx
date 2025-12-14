import React from "react";
import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { EditorLabel } from "@/components/RightSidebar/CardEditor/EditorLabel/EditorLabel";
import {
  ArmorCategory,
  LightArmorType,
  MediumArmorType,
  HeavyArmorType,
  ShieldType,
  ArmorType,
} from "@/features/items/armors/constants";
import { ARMOR_DEFINITIONS } from "@/features/items/armors/data";

export const ArmorTypeSelect: React.FC = () => {
  const { control, setValue } = useFormContext();

  return (
    <div className="space-y-1">
      <EditorLabel>Armor Type</EditorLabel>
      <FormField
        control={control}
        name="armorType"
        render={({ field }) => (
          <FormItem>
            <Select
              onValueChange={(newValue) => {
                field.onChange(newValue);
                // Auto-populate stats from definition
                const definition = ARMOR_DEFINITIONS[newValue as ArmorType];
                if (definition) {
                  setValue("ac", definition.ac);
                  setValue(
                    "strengthRequirement",
                    definition.strengthRequirement,
                  );
                  setValue(
                    "stealthDisadvantage",
                    definition.stealthDisadvantage,
                  );
                }
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100 w-full h-9">
                  <SelectValue placeholder="Select armor type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                <SelectGroup>
                  <SelectLabel>{ArmorCategory.Light}</SelectLabel>
                  {Object.values(LightArmorType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>{ArmorCategory.Medium}</SelectLabel>
                  {Object.values(MediumArmorType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>{ArmorCategory.Heavy}</SelectLabel>
                  {Object.values(HeavyArmorType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>{ArmorCategory.Shield}</SelectLabel>
                  {Object.values(ShieldType).map((type) => (
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
