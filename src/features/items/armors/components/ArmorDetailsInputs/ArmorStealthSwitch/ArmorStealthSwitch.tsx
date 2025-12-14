import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const ArmorStealthSwitch: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div className="flex items-center justify-between py-2">
      <Label className="text-xs font-normal text-slate-400">
        Disadvantage on Stealth
      </Label>
      <Controller
        name="stealthDisadvantage"
        control={control}
        render={({ field }) => (
          <Switch
            checked={field.value}
            onCheckedChange={field.onChange}
            className="scale-75"
          />
        )}
      />
    </div>
  );
};
