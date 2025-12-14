import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { EditorLabel } from "@/components/RightSidebar/CardEditor/EditorLabel/EditorLabel";

export const ArmorACInput: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-1">
      <EditorLabel>Armor Class</EditorLabel>
      <Controller
        control={control}
        name="ac"
        render={({ field }) => (
          <Input
            placeholder="e.g. 12 + Dex"
            className="w-full bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
            {...field}
            value={field.value ?? ""}
          />
        )}
      />
    </div>
  );
};
