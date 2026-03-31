import { useDeckStore, DENSITY_PRESETS } from "@/hooks/useDeckStore";
import { useT } from "next-i18next/client";
import { DensityPreset } from "@/features/decks/constants";
import { Button } from "@/components/ui/button";
import { EditorLabel } from "@/components/RightSidebar/CardEditor/EditorLabel/EditorLabel";

interface DensityPresetsProps {
  deckId: string;
}

export const DensityPresets: React.FC<DensityPresetsProps> = ({ deckId }) => {
  const { updateDeckStyle } = useDeckStore();
  const { t } = useT();

  const applyPreset = (presetName: DensityPreset) => {
    const preset = DENSITY_PRESETS[presetName];
    updateDeckStyle(deckId, preset);
  };

  return (
    <div className="space-y-2">
      <EditorLabel>{t("deck.settings.density")}</EditorLabel>
      <div className="grid grid-cols-3 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => applyPreset(DensityPreset.Compact)}
          className="text-xs"
        >
          {t("deck.settings.densityLevels.compact")}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => applyPreset(DensityPreset.Normal)}
          className="text-xs"
        >
          {t("deck.settings.densityLevels.normal")}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => applyPreset(DensityPreset.Spacious)}
          className="text-xs"
        >
          {t("deck.settings.densityLevels.spacious")}
        </Button>
      </div>
    </div>
  );
};
