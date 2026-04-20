import { useState, useEffect, useRef } from "react";
import type { Card } from "@/features/cards/types";
import type { DeckStyle } from "@/features/decks/types";
import { checkCardOverflow } from "@/lib/overflow";

const CHUNK_SIZE = 3;

/** Hook that checks overflow for a single deck's cards. */
export function useDeckOverflow(
  deckId: string,
  cards: Card[],
  style: DeckStyle
): number {
  const [overflowCount, setOverflowCount] = useState(0);
  const generationRef = useRef(0);

  useEffect(() => {
    const currentGeneration = ++generationRef.current;

    const checkOverflow = async () => {
      let totalOverflow = 0;

      for (let i = 0; i < cards.length; i++) {
        const hasOverflow = await checkCardOverflow(cards[i], style);
        if (hasOverflow) totalOverflow++;

        // Yield to main thread occasionally
        if ((i + 1) % CHUNK_SIZE === 0) {
          await new Promise((resolve) => setTimeout(resolve, 0));
        }

        // Check for cancellation
        if (generationRef.current !== currentGeneration) {
          return;
        }
      }

      setOverflowCount(totalOverflow);
    };

    checkOverflow();
  }, [deckId, cards, style]);

  return overflowCount;
}
