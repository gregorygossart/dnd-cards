"use client";

import React from "react";
import { useT } from "next-i18next/client";
import { useDeckStore, DENSITY_PRESETS } from "@/hooks/useDeckStore";
import { CardFormat } from "@/features/cards/constants";
import { DensityPreset } from "@/features/decks/constants";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface DeckSettingsPanelProps {
  deckId: string;
}

export const DeckSettingsPanel: React.FC<DeckSettingsPanelProps> = ({
  deckId,
}) => {
  const { t } = useT();
  const { decks, updateDeckStyle } = useDeckStore();
  const deck = decks.find((d) => d.id === deckId);

  if (!deck) return null;

  const { style } = deck;

  // Card Format
  const cardFormat = style?.cardFormat ?? CardFormat.Tarot;
  const handleCardFormatChange = (format: CardFormat) => {
    updateDeckStyle(deckId, { cardFormat: format });
  };

  // Corner Radius
  const cornerRadius = style?.cornerRadius ?? 1.5;
  const handleCornerRadiusChange = (value: number[]) => {
    updateDeckStyle(deckId, { cornerRadius: value[0] });
  };

  // Image Height
  const imageHeightPercent = style?.imageHeightPercent ?? 40;
  const handleImageHeightChange = (value: number[]) => {
    updateDeckStyle(deckId, { imageHeightPercent: value[0] });
  };

  // Density Presets
  const applyPreset = (presetName: DensityPreset) => {
    const preset = DENSITY_PRESETS[presetName];
    updateDeckStyle(deckId, preset);
  };

  // Title Font Size
  const titleFontSize = style?.titleFontSize ?? 24;
  const handleTitleSizeChange = (value: number[]) => {
    updateDeckStyle(deckId, { titleFontSize: value[0] });
  };

  // Body Font Size
  const bodyFontSize = style?.bodyFontSize ?? 14;
  const handleBodySizeChange = (value: number[]) => {
    updateDeckStyle(deckId, { bodyFontSize: value[0] });
  };

  // Line Height
  const lineHeight = style?.lineHeight ?? 1.5;
  const handleLineHeightChange = (value: number[]) => {
    updateDeckStyle(deckId, { lineHeight: value[0] });
  };

  // Padding
  const paddingMultiplier = style?.paddingMultiplier ?? 1.0;
  const handlePaddingChange = (value: number[]) => {
    updateDeckStyle(deckId, { paddingMultiplier: value[0] });
  };

  return (
    <div className="space-y-8">
      {/* Card Format */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {t("editor.deckSettings.format.title")}
        </Label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={cardFormat === CardFormat.Tarot ? "default" : "outline"}
            size="sm"
            onClick={() => handleCardFormatChange(CardFormat.Tarot)}
            className="text-xs"
          >
            {t("editor.deckSettings.format.tarot")}
          </Button>
          <Button
            variant={cardFormat === CardFormat.Poker ? "default" : "outline"}
            size="sm"
            onClick={() => handleCardFormatChange(CardFormat.Poker)}
            className="text-xs"
          >
            {t("editor.deckSettings.format.poker")}
          </Button>
        </div>
      </div>

      {/* Corner Radius */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
          <span>{t("editor.deckSettings.borderRadius.title")}</span>
          <span className="font-mono normal-case font-normal text-slate-500">
            {cornerRadius.toFixed(1)}rem
          </span>
        </Label>
        <Slider
          min={0.0}
          max={3.0}
          step={0.1}
          value={[cornerRadius]}
          onValueChange={handleCornerRadiusChange}
          className="w-full"
        />
      </div>

      {/* Image Height */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
          <span>{t("editor.deckSettings.imageHeight.title")}</span>
          <span className="font-mono normal-case font-normal text-slate-500">
            {imageHeightPercent}%
          </span>
        </Label>
        <Slider
          min={0}
          max={100}
          step={1}
          value={[imageHeightPercent]}
          onValueChange={handleImageHeightChange}
          className="w-full"
        />
      </div>

      {/* Density Presets */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {t("editor.deckSettings.density.title")}
        </Label>
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => applyPreset(DensityPreset.Compact)}
            className="text-xs"
          >
            {t("editor.deckSettings.density.compact")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => applyPreset(DensityPreset.Normal)}
            className="text-xs"
          >
            {t("editor.deckSettings.density.normal")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => applyPreset(DensityPreset.Spacious)}
            className="text-xs"
          >
            {t("editor.deckSettings.density.spacious")}
          </Button>
        </div>
      </div>

      {/* Title Font Size */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
          <span>{t("editor.deckSettings.titleSize.title")}</span>
          <span className="font-mono normal-case font-normal text-slate-500">
            {titleFontSize}px
          </span>
        </Label>
        <Slider
          min={12}
          max={36}
          step={1}
          value={[titleFontSize]}
          onValueChange={handleTitleSizeChange}
          className="w-full"
        />
      </div>

      {/* Body Font Size */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
          <span>{t("editor.deckSettings.bodySize.title")}</span>
          <span className="font-mono normal-case font-normal text-slate-500">
            {bodyFontSize}px
          </span>
        </Label>
        <Slider
          min={10}
          max={18}
          step={1}
          value={[bodyFontSize]}
          onValueChange={handleBodySizeChange}
          className="w-full"
        />
      </div>

      {/* Line Height */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
          <span>{t("editor.deckSettings.lineHeight.title")}</span>
          <span className="font-mono normal-case font-normal text-slate-500">
            {lineHeight.toFixed(1)}
          </span>
        </Label>
        <Slider
          min={1.2}
          max={1.8}
          step={0.1}
          value={[lineHeight]}
          onValueChange={handleLineHeightChange}
          className="w-full"
        />
      </div>

      {/* Padding */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
          <span>{t("editor.deckSettings.padding.title")}</span>
          <span className="font-mono normal-case font-normal text-slate-500">
            {(paddingMultiplier * 100).toFixed(0)}%
          </span>
        </Label>
        <Slider
          min={0.5}
          max={1.5}
          step={0.1}
          value={[paddingMultiplier]}
          onValueChange={handlePaddingChange}
          className="w-full"
        />
      </div>
    </div>
  );
};
