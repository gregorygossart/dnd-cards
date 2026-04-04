import { useDeckStore } from "@/hooks/useDeckStore";
import { useT } from "next-i18next/client";
import { Slider } from "@/components/ui/slider";
import { EditorLabel } from "@/components/RightSidebar/CardEditor/EditorLabel/EditorLabel";

interface PaddingInputProps {
  deckId: string;
}

export const PaddingInput: React.FC<PaddingInputProps> = ({ deckId }) => {
  const { decks, updateDeckStyle } = useDeckStore();
  const { t } = useT();
  const deck = decks.find((d) => d.id === deckId);
  const paddingMultiplier = deck?.style?.paddingMultiplier ?? 1.0;

  const handlePaddingChange = (value: number[]) => {
    updateDeckStyle(deckId, { paddingMultiplier: value[0] });
  };

  return (
    <div className="space-y-2">
      <EditorLabel
        htmlFor="padding"
        className="flex items-center justify-between"
      >
        <span>{t("editor.deckSettings.padding.title")}</span>
        <span className="font-mono normal-case font-normal text-muted-foreground">
          {(paddingMultiplier * 100).toFixed(0)}%
        </span>
      </EditorLabel>
      <Slider
        id="padding"
        min={0.5}
        max={1.5}
        step={0.1}
        value={[paddingMultiplier]}
        onValueChange={handlePaddingChange}
        className="w-full"
      />
    </div>
  );
};
