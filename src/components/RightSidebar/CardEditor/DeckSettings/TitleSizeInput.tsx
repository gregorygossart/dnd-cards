import { useDeckStore } from "@/hooks/useDeckStore";
import { Slider } from "@/components/ui/slider";
import { EditorLabel } from "@/components/RightSidebar/CardEditor/EditorLabel/EditorLabel";

interface TitleSizeInputProps {
  deckId: string;
}

export const TitleSizeInput: React.FC<TitleSizeInputProps> = ({ deckId }) => {
  const { decks, updateDeckStyle } = useDeckStore();
  const deck = decks.find((d) => d.id === deckId);
  const titleFontSize = deck?.style?.titleFontSize ?? 24;

  const handleTitleSizeChange = (value: number[]) => {
    updateDeckStyle(deckId, { titleFontSize: value[0] });
  };

  return (
    <div className="space-y-2">
      <EditorLabel
        htmlFor="title-size"
        className="flex items-center justify-between"
      >
        <span>Title Size</span>
        <span className="font-mono normal-case font-normal text-muted-foreground">
          {titleFontSize}px
        </span>
      </EditorLabel>
      <Slider
        id="title-size"
        min={12}
        max={36}
        step={1}
        value={[titleFontSize]}
        onValueChange={handleTitleSizeChange}
        className="w-full"
      />
    </div>
  );
};
