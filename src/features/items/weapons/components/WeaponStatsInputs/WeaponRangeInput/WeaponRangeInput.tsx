import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { EditorLabel } from "@/components/RightSidebar/CardEditor/EditorLabel/EditorLabel";

export const WeaponRangeInput: React.FC = () => {
  const { register } = useFormContext();

  return (
    <div className="space-y-1">
      <EditorLabel>Range</EditorLabel>
      <Input
        {...register("range")}
        placeholder="e.g. 60/120"
        className="bg-slate-800 border-slate-700 text-slate-100 h-9"
      />
    </div>
  );
};
