import { DeckListItem } from "./DeckListItem";
import { useDeckStore } from "@/hooks/useDeckStore";

export function DeckList() {
  const { decks } = useDeckStore();

  // Sort decks alphabetically by name
  const sortedDecks = [...decks].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="space-y-2">
      {sortedDecks.map((deck) => (
        <DeckListItem key={deck.id} deck={deck} />
      ))}
    </div>
  );
}
