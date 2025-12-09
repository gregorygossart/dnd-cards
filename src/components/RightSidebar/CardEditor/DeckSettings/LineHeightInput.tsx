import { useDeckStore } from "@/hooks/useDeckStore";
import { Slider } from "@/components/ui/slider";
import { EditorLabel } from "@/components/RightSidebar/CardEditor/EditorLabel/EditorLabel";

interface LineHeightInputProps {
  deckId: string;
}

export const LineHeightInput: React.FC<LineHeightInputProps> = ({ deckId }) => {
  const { decks, updateDeckStyle } = useDeckStore();
  const deck = decks.find((d) => d.id === deckId);
  const lineHeight = deck?.style?.lineHeight ?? 1.5;

  const handleLineHeightChange = (value: number[]) => {
    updateDeckStyle(deckId, { lineHeight: value[0] });
  };

  return (
    <div className="space-y-2">
      <EditorLabel
        htmlFor="line-height"
        className="flex items-center justify-between"
      >
        <span>Line Height</span>
        <span className="font-mono normal-case font-normal text-muted-foreground">
          {lineHeight.toFixed(1)}
        </span>
      </EditorLabel>
      <Slider
        id="line-height"
        min={1.2}
        max={1.8}
        step={0.1}
        value={[lineHeight]}
        onValueChange={handleLineHeightChange}
        className="w-full"
      />
    </div>
  );
};
