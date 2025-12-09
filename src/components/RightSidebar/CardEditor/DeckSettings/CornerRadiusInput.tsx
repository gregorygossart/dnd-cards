import { useDeckStore } from "@/hooks/useDeckStore";
import { Slider } from "@/components/ui/slider";
import { EditorLabel } from "@/components/RightSidebar/CardEditor/EditorLabel/EditorLabel";

interface CornerRadiusInputProps {
  deckId: string;
}

export const CornerRadiusInput: React.FC<CornerRadiusInputProps> = ({
  deckId,
}) => {
  const { decks, updateDeckStyle } = useDeckStore();
  const deck = decks.find((d) => d.id === deckId);
  const cornerRadius = deck?.style?.cornerRadius ?? 1.5;

  const handleCornerRadiusChange = (value: number[]) => {
    updateDeckStyle(deckId, { cornerRadius: value[0] });
  };

  return (
    <div className="space-y-2">
      <EditorLabel
        htmlFor="corner-radius"
        className="flex items-center justify-between"
      >
        <span>Corner Radius</span>
        <span className="font-mono normal-case font-normal text-muted-foreground">
          {cornerRadius.toFixed(1)}rem
        </span>
      </EditorLabel>
      <Slider
        id="corner-radius"
        min={0.0}
        max={3.0}
        step={0.1}
        value={[cornerRadius]}
        onValueChange={handleCornerRadiusChange}
        className="w-full"
      />
    </div>
  );
};
