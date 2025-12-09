import React from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { CARD_BACK_PRESETS } from "@/lib/cardConstants";
import { ImageInput } from "@/components/RightSidebar/CardEditor/ImageInput/ImageInput";
import { EditorLabel } from "@/components/RightSidebar/CardEditor/EditorLabel/EditorLabel";
import type { Card } from "@/types/card";

export const CardBackSelector: React.FC = () => {
  const { watch, setValue } = useFormContext<Card>();
  const currentBackImage = watch("visuals.backImage");

  // Check if the current image matches one of the presets
  const selectedPresetId =
    CARD_BACK_PRESETS.find((preset) => preset.src === currentBackImage)?.id ||
    "custom";

  const handlePresetSelect = (presetId: string) => {
    if (presetId === "custom") {
      if (selectedPresetId !== "custom") {
        setValue("visuals.backImage", undefined);
      }
    } else {
      const preset = CARD_BACK_PRESETS.find((p) => p.id === presetId);
      if (preset) {
        setValue("visuals.backImage", preset.src);
      }
    }
  };

  return (
    <div className="space-y-6">
      <EditorLabel>Card Back Design</EditorLabel>

      <div className="grid grid-cols-4 gap-2">
        {CARD_BACK_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => handlePresetSelect(preset.id)}
            className={cn(
              "relative aspect-[2.5/3.5] rounded-md overflow-hidden border-2 transition-all group",
              selectedPresetId === preset.id
                ? "border-violet-500 ring-2 ring-violet-500/20"
                : "border-slate-700 hover:border-slate-500",
            )}
            title={preset.name}
          >
            <img
              src={preset.src}
              alt={preset.name}
              className="w-full h-full object-cover"
            />
            {selectedPresetId === preset.id && (
              <div className="absolute inset-0 bg-violet-500/20 flex items-center justify-center">
                <div className="bg-violet-600 rounded-full p-1">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            )}
          </button>
        ))}

        {/* Custom Option */}
        <button
          type="button"
          onClick={() => handlePresetSelect("custom")}
          className={cn(
            "relative aspect-[2.5/3.5] rounded-md overflow-hidden border-2 transition-all flex flex-col items-center justify-center gap-2 bg-slate-800",
            selectedPresetId === "custom"
              ? "border-violet-500 ring-2 ring-violet-500/20"
              : "border-slate-700 hover:border-slate-500",
          )}
          title="Custom Image"
        >
          <svg
            className="w-6 h-6 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-[10px] font-medium text-slate-400">Custom</span>
        </button>
      </div>

      {/* Show ImageInput only if Custom is selected */}
      {selectedPresetId === "custom" && (
        <div className="pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <ImageInput
            fieldName="visuals.backImage"
            label="Custom Back Image URL"
          />
        </div>
      )}

      {/* Back Tint Picker */}
      <div>
        <EditorLabel htmlFor="backTint">Tint Color</EditorLabel>
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 shrink-0">
            <input
              type="color"
              value={watch("visuals.backTint") || "#000000"}
              onChange={(e) => setValue("visuals.backTint", e.target.value)}
              className="absolute inset-0 w-full h-full p-0 border-0 overflow-hidden rounded-md cursor-pointer opacity-0"
            />
            <div
              className="w-full h-full rounded-md border border-slate-700 shadow-sm"
              style={{
                backgroundColor: watch("visuals.backTint") || "transparent",
              }}
            />
          </div>
          <div className="flex-1 flex gap-2">
            <input
              id="backTint"
              value={watch("visuals.backTint") || ""}
              onChange={(e) => setValue("visuals.backTint", e.target.value)}
              placeholder="No Tint"
              className="flex-1 bg-slate-800 border border-slate-700 rounded-md text-slate-100 placeholder:text-slate-500 px-3 h-9 font-mono text-sm"
            />
            {watch("visuals.backTint") && (
              <button
                type="button"
                onClick={() => setValue("visuals.backTint", undefined)}
                className="px-3 py-1 text-xs text-slate-400 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>
        <p className="text-[10px] text-slate-500 mt-1 pl-1">
          Apply a color tint to modify the texture appearance.
        </p>
      </div>
    </div>
  );
};
