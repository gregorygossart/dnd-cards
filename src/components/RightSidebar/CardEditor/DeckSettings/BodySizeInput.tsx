import { useDeckStore } from "@/hooks/useDeckStore";
import { Slider } from "@/components/ui/slider";
import { EditorLabel } from "@/components/RightSidebar/CardEditor/EditorLabel/EditorLabel";

interface BodySizeInputProps {
  deckId: string;
}

export const BodySizeInput: React.FC<BodySizeInputProps> = ({ deckId }) => {
  const { decks, updateDeckStyle } = useDeckStore();
  const deck = decks.find((d) => d.id === deckId);
  const bodyFontSize = deck?.style?.bodyFontSize ?? 14;

  const handleBodySizeChange = (value: number[]) => {
    updateDeckStyle(deckId, { bodyFontSize: value[0] });
  };

  return (
    <div className="space-y-2">
      <EditorLabel
        htmlFor="body-size"
        className="flex items-center justify-between"
      >
        <span>Body Size</span>
        <span className="font-mono normal-case font-normal text-muted-foreground">
          {bodyFontSize}px
        </span>
      </EditorLabel>
      <Slider
        id="body-size"
        min={10}
        max={18}
        step={1}
        value={[bodyFontSize]}
        onValueChange={handleBodySizeChange}
        className="w-full"
      />
    </div>
  );
};
