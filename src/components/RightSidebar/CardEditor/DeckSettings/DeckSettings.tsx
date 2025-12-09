import { CollapsibleGroup } from "@/components/ui/collapsible-group";
import { CardFormatSelector } from "./CardFormatSelector";
import { CornerRadiusInput } from "./CornerRadiusInput";
import { DensityPresets } from "./DensityPresets";
import { TitleSizeInput } from "./TitleSizeInput";
import { BodySizeInput } from "./BodySizeInput";
import { LineHeightInput } from "./LineHeightInput";
import { PaddingInput } from "./PaddingInput";

interface DeckSettingsProps {
  deckId: string;
}

export const DeckSettings: React.FC<DeckSettingsProps> = ({ deckId }) => {
  return (
    <CollapsibleGroup title="Deck Settings" defaultOpen={false}>
      <div className="space-y-6">
        {/* Card Format */}
        <CardFormatSelector deckId={deckId} />

        {/* Corner Radius */}
        <CornerRadiusInput deckId={deckId} />

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
