import { useDeckStore } from "@/hooks/useDeckStore";
import { Button } from "@/components/ui/button";
import { EditorLabel } from "@/components/RightSidebar/CardEditor/EditorLabel/EditorLabel";
import { CardFormat } from "@/types/card";

interface CardFormatSelectorProps {
  deckId: string;
}

export const CardFormatSelector: React.FC<CardFormatSelectorProps> = ({
  deckId,
}) => {
  const { decks, updateDeckStyle } = useDeckStore();
  const deck = decks.find((d) => d.id === deckId);
  const cardFormat = deck?.style?.cardFormat ?? CardFormat.Tarot;

  const handleCardFormatChange = (format: CardFormat) => {
    updateDeckStyle(deckId, { cardFormat: format });
  };

  return (
    <div className="space-y-2">
      <EditorLabel>Card Format</EditorLabel>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant={cardFormat === CardFormat.Tarot ? "default" : "outline"}
          size="sm"
          onClick={() => handleCardFormatChange(CardFormat.Tarot)}
          className="text-xs"
        >
          Tarot
        </Button>
        <Button
          variant={cardFormat === CardFormat.Poker ? "default" : "outline"}
          size="sm"
          onClick={() => handleCardFormatChange(CardFormat.Poker)}
          className="text-xs"
        >
          Poker
        </Button>
      </div>
    </div>
  );
};
