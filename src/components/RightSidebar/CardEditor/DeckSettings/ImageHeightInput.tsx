import { useDeckStore } from "@/hooks/useDeckStore";
import { useT } from "next-i18next/client";
import { Slider } from "@/components/ui/slider";
import { EditorLabel } from "@/components/RightSidebar/CardEditor/EditorLabel/EditorLabel";

interface ImageHeightInputProps {
  deckId: string;
}

export const ImageHeightInput: React.FC<ImageHeightInputProps> = ({
  deckId,
}) => {
  const { decks, updateDeckStyle } = useDeckStore();
  const { t } = useT();
  const deck = decks.find((d) => d.id === deckId);
  const imageHeightPercent = deck?.style?.imageHeightPercent ?? 40;

  const handleImageHeightChange = (value: number[]) => {
    updateDeckStyle(deckId, { imageHeightPercent: value[0] });
  };

  return (
    <div className="space-y-2">
      <EditorLabel
        htmlFor="image-height"
        className="flex items-center justify-between"
      >
        <span>{t("editor.deckSettings.imageHeight.title")}</span>
        <span className="font-mono normal-case font-normal text-muted-foreground">
          {imageHeightPercent}%
        </span>
      </EditorLabel>
      <Slider
        id="image-height"
        min={0}
        max={100}
        step={1}
        value={[imageHeightPercent]}
        onValueChange={handleImageHeightChange}
        className="w-full"
      />
    </div>
  );
};
