import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext, Controller } from "react-hook-form";
import { EditorLabel } from "@/components/RightSidebar/CardEditor/EditorLabel/EditorLabel";
import {
  PhysicalDamageType,
  ElementalDamageType,
  WeaponProperty,
} from "@/features/items/weapons/constants";
import type { WeaponItem } from "@/features/items/weapons/schemas";

export const WeaponDamageInput = () => {
  const { control, watch } = useFormContext<WeaponItem>();
  const properties = watch("properties");

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex-1 space-y-1">
          <EditorLabel>Damage Dice</EditorLabel>
          <Controller
            control={control}
            name="damage.amount"
            render={({ field }) => (
              <Input
                placeholder="e.g. 1d8"
                className="w-full bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
                {...field}
              />
            )}
          />
        </div>

        <div className="flex-1 space-y-1">
          <EditorLabel>Type</EditorLabel>
          <Controller
            control={control}
            name="damage.type"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full bg-slate-800 border-slate-700 text-slate-100">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                  <div className="px-2 py-1.5 text-xs font-semibold text-slate-400">
                    Physical
                  </div>
                  {Object.values(PhysicalDamageType).map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                  <div className="px-2 py-1.5 text-xs font-semibold text-slate-400 border-t border-slate-700 mt-1 pt-2">
                    Elemental
                  </div>
                  {Object.values(ElementalDamageType).map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      {properties?.includes(WeaponProperty.Versatile) && (
        <div className="space-y-1">
          <EditorLabel>Versatile Damage</EditorLabel>
          <Controller
            control={control}
            name="damage.versatile"
            render={({ field }) => (
              <Input
                placeholder="e.g. 1d10"
                className="w-full bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
                {...field}
                value={field.value || ""}
              />
            )}
          />
        </div>
      )}
    </div>
  );
};
