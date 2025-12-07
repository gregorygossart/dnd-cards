import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { EditorLabel } from "@/components/CardEditor/EditorLabel/EditorLabel";
import type { Card } from "@/types/card";

export const AccentColorInput: React.FC = () => {
  const { watch, setValue } = useFormContext<Card>();
  const value = watch("visuals.accentColor");

  return (
    <div>
      <EditorLabel htmlFor="accentColor">Accent Color</EditorLabel>
      <div className="flex items-center gap-2">
        <div className="relative w-8 h-8 shrink-0">
          <Input
            type="color"
            value={value || "#000000"}
            onChange={(e) => setValue("visuals.accentColor", e.target.value)}
            className="absolute inset-0 w-full h-full p-0 border-0 overflow-hidden rounded-md cursor-pointer opacity-0"
          />
          <div
            className="w-full h-full rounded-md border border-slate-700 shadow-sm"
            style={{ backgroundColor: value }}
          />
        </div>
        <Input
          id="accentColor"
          value={value || ""}
          onChange={(e) => setValue("visuals.accentColor", e.target.value)}
          placeholder="#000000"
          className="flex-1 bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 h-9 font-mono"
        />
      </div>
    </div>
  );
};
