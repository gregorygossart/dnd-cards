import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { EditorLabel } from "@/components/RightSidebar/CardEditor/EditorLabel/EditorLabel";

export const WeaponDamageInput: React.FC = () => {
  const { register } = useFormContext();

  return (
    <div className="space-y-1">
      <EditorLabel>Damage</EditorLabel>
      <Input
        {...register("damage")}
        placeholder="e.g. 1d8 slashing"
        className="bg-slate-800 border-slate-700 text-slate-100 h-9"
      />
    </div>
  );
};
