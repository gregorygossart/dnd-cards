import React from "react";
import { useT } from "next-i18next/client";
import { CollapsibleGroup } from "@/components/ui/collapsible-group";
import { CardFormatSelector } from "./CardFormatSelector";
import { CornerRadiusInput } from "./CornerRadiusInput";
import { ImageHeightInput } from "./ImageHeightInput";
import { DensityPresets } from "./DensityPresets";
import { TitleSizeInput } from "./TitleSizeInput";
import { BodySizeInput } from "./BodySizeInput";
import { LineHeightInput } from "./LineHeightInput";
import { PaddingInput } from "./PaddingInput";

interface DeckSettingsProps {
  deckId: string;
}

export const DeckSettings: React.FC<DeckSettingsProps> = ({ deckId }) => {
  const { t } = useT();
  return (
    <CollapsibleGroup title={t("editor.deckSettings.title")} defaultOpen={false}>
      <div className="space-y-6">
        {/* Card Format */}
        <CardFormatSelector deckId={deckId} />

        {/* Corner Radius */}
        <CornerRadiusInput deckId={deckId} />

        {/* Image Height */}
        <ImageHeightInput deckId={deckId} />

        {/* Density Presets */}
        <DensityPresets deckId={deckId} />

        {/* Title Font Size */}
        <TitleSizeInput deckId={deckId} />

        {/* Body Font Size */}
        <BodySizeInput deckId={deckId} />

        {/* Line Height */}
        <LineHeightInput deckId={deckId} />

        {/* Padding */}
        <PaddingInput deckId={deckId} />
      </div>
    </CollapsibleGroup>
  );
};
