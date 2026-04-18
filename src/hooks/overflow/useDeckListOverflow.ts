import { useState, useEffect, useRef, useCallback } from "react";
import type { Card } from "@/features/cards/types";
import type { DeckStyle } from "@/features/decks/types";
import { checkCardOverflow } from "@/lib/overflow";
import type { CardOverflowResult, DeckOverflowState, AllDecksOverflowState } from "@/lib/overflow";

const CHUNK_SIZE = 3;

// =============================================================================
// Hashing utilities
// =============================================================================

/** Creates a unique key for a card in a deck */
function getCardKey(deckId: string, cardIndex: number): string {
  return `${deckId}-${cardIndex}`;
}

/** Creates a content hash for a card to detect changes */
function getCardContentHash(card: Card): string {
  return JSON.stringify(card);
}

/** Creates a hash for deck style to detect changes */
function getStyleHash(style: DeckStyle): string {
  return JSON.stringify(style);
}

// =============================================================================
// Change detection
// =============================================================================

/** Finds which card indices have changed content */
function findChangedCardIndices(
  deckId: string,
  cards: Card[],
  prevHashes: Map<string, string>
): number[] {
  const changed: number[] = [];
  
  for (let i = 0; i < cards.length; i++) {
    const key = getCardKey(deckId, i);
    const currentHash = getCardContentHash(cards[i]);
    const prevHash = prevHashes.get(key);
    
    if (prevHash !== currentHash) {
      changed.push(i);
    }
  }
  
  return changed;
}

/** Clears all cached hashes for a specific deck */
function clearDeckHashes(deckId: string, prevHashes: Map<string, string>): void {
  for (const key of prevHashes.keys()) {
    if (key.startsWith(`${deckId}-`)) {
      prevHashes.delete(key);
    }
  }
}

// =============================================================================
// State tracking
// =============================================================================

/** Hook to track previous state for change detection */
function useChangeTracking() {
  const prevCardHashes = useRef<Map<string, string>>(new Map());
  const prevStyleHashes = useRef<Map<string, string>>(new Map());
  const prevCardCounts = useRef<Map<string, number>>(new Map());

  const hasStyleChanged = (deckId: string, style: DeckStyle): boolean => {
    const currentHash = getStyleHash(style);
    const prevHash = prevStyleHashes.current.get(deckId);
    return prevHash !== currentHash;
  };

  const hasCardCountChanged = (deckId: string, count: number): boolean => {
    const prevCount = prevCardCounts.current.get(deckId) ?? 0;
    return prevCount !== count;
  };

  const updateTrackedState = (deckId: string, style: DeckStyle, cards: Card[]): void => {
    prevStyleHashes.current.set(deckId, getStyleHash(style));
    prevCardCounts.current.set(deckId, cards.length);
    
    for (let i = 0; i < cards.length; i++) {
      const key = getCardKey(deckId, i);
      prevCardHashes.current.set(key, getCardContentHash(cards[i]));
    }
  };

  return {
    prevCardHashes: prevCardHashes.current,
    hasStyleChanged,
    hasCardCountChanged,
    updateTrackedState,
  };
}

// =============================================================================
// Deck checking
// =============================================================================

/** Checks a single card for overflow */
async function checkSingleCard(
  card: Card,
  style: DeckStyle
): Promise<boolean> {
  return checkCardOverflow(card, style);
}

/** Checks multiple cards and returns results (does not update state) */
async function checkDeckCards(
  deckId: string,
  cards: Card[],
  style: DeckStyle,
  indicesToCheck: number[],
  getCurrentState: () => Map<string, DeckOverflowState>
): Promise<DeckOverflowState> {
  // Get existing results from current state via ref (always fresh)
  const existingResults = new Map<number, CardOverflowResult>();
  const currentState = getCurrentState();
  const existing = currentState.get(deckId);
  if (existing) {
    existing.results.forEach(r => existingResults.set(r.cardIndex, r));
  }

  const resultsMap = new Map(existingResults);

  for (let i = 0; i < indicesToCheck.length; i++) {
    const cardIndex = indicesToCheck[i];
    const hasOverflow = await checkSingleCard(cards[cardIndex], style);
    resultsMap.set(cardIndex, { cardIndex, hasOverflow });

    // Yield to main thread
    if ((i + 1) % CHUNK_SIZE === 0) {
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  }

  // Build final results array
  const results: CardOverflowResult[] = [];
  for (let i = 0; i < cards.length; i++) {
    const result = resultsMap.get(i);
    if (result) results.push(result);
  }

  return {
    results,
    hasOverflow: results.some(r => r.hasOverflow),
  };
}

/** Gets indices of all cards in a deck */
function getAllCardIndices(cards: Card[]): number[] {
  return cards.map((_, i) => i);
}

// =============================================================================
// Main hook
// =============================================================================

/** Hook that checks overflow for cards only when they change. */
export function useDeckListOverflow(
  decks: { id: string; cards: Card[]; style: DeckStyle }[]
): AllDecksOverflowState {
  const [deckStates, setDeckStates] = useState<Map<string, DeckOverflowState>>(new Map());
  const deckStatesRef = useRef(deckStates);

  // Keep ref in sync with state for async access
  useEffect(() => {
    deckStatesRef.current = deckStates;
  }, [deckStates]);

  const { prevCardHashes, hasStyleChanged, hasCardCountChanged, updateTrackedState } = useChangeTracking();

  // Determine what needs checking for each deck
  const getCardsToCheck = useCallback((deck: { id: string; cards: Card[]; style: DeckStyle }) => {
    if (hasStyleChanged(deck.id, deck.style) || hasCardCountChanged(deck.id, deck.cards.length)) {
      clearDeckHashes(deck.id, prevCardHashes);
      return { indices: getAllCardIndices(deck.cards), needsCheck: true };
    }

    const changedIndices = findChangedCardIndices(deck.id, deck.cards, prevCardHashes);
    if (changedIndices.length > 0) {
      return { indices: changedIndices, needsCheck: true };
    }

    return { indices: [], needsCheck: false };
  }, [hasStyleChanged, hasCardCountChanged, prevCardHashes]);

  // Track generation to skip stale results from overlapping async operations
  const generationRef = useRef(0);

  // Main effect: check changed cards
  useEffect(() => {
    const currentGeneration = ++generationRef.current;

    const checkDecks = async () => {
      for (const deck of decks) {
        const { indices, needsCheck } = getCardsToCheck(deck);
        
        if (!needsCheck) continue;

        const results = await checkDeckCards(
          deck.id,
          deck.cards,
          deck.style,
          indices,
          () => deckStatesRef.current
        );

        // Skip updating if a newer check has started
        if (generationRef.current !== currentGeneration) {
          return; // Stale results, discard
        }

        // Merge with existing state for this deck
        setDeckStates(prev => {
          const next = new Map(prev);
          next.set(deck.id, results);
          return next;
        });

        updateTrackedState(deck.id, deck.style, deck.cards);
      }
    };

    checkDecks();
  }, [decks, getCardsToCheck, updateTrackedState]);

  return { decks: deckStates };
}
