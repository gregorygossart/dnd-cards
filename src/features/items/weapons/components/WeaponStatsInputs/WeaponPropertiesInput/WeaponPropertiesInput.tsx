import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { EditorLabel } from "@/components/RightSidebar/CardEditor/EditorLabel/EditorLabel";

export const WeaponPropertiesInput: React.FC = () => {
  const { register } = useFormContext();

  return (
    <div className="space-y-1">
      <EditorLabel>Properties</EditorLabel>
      <Input
        {...register("properties")}
        placeholder="e.g. Finesse, Light, Thrown"
        className="bg-slate-800 border-slate-700 text-slate-100 h-9"
      />
    </div>
  );
};
