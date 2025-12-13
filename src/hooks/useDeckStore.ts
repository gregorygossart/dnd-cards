import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Card } from "@/features/cards/types";
import type { Deck, DeckStyle } from "@/features/decks/types";
import { CardFormat, CardType } from "@/features/cards/constants";
import { DensityPreset } from "@/features/decks/constants";
import { defaultCardValues } from "@/components/RightSidebar/CardEditor/CardEditor";

interface DeckStore {
  decks: Deck[];
  currentDeckIndex: number;
  currentCardIndex: number;
  isHydrated: boolean;
  updateCard: (deckIndex: number, cardIndex: number, card: Card) => void;
  addCard: (deckId: string, type: CardType) => void;
  duplicateCard: (deckIndex: number, cardIndex: number) => void;
  deleteCard: (deckIndex: number, cardIndex: number) => void;
  addDeck: (name: string) => void;
  updateDeckName: (deckId: string, name: string) => void;
  updateDeckStyle: (deckId: string, style: Partial<DeckStyle>) => void;
  deleteDeck: (deckId: string) => void;
  setCurrentCard: (deckIndex: number, cardIndex: number) => void;
}

const DEFAULT_STYLE: DeckStyle = {
  cardFormat: CardFormat.Tarot,
  imageHeightPercent: 40,
  titleFontSize: 24,
  bodyFontSize: 14,
  lineHeight: 1.5,
  paddingMultiplier: 1.0,
  cornerRadius: 1.5,
};

// Base padding values (in pixels) that will be multiplied
export const BASE_PADDING = {
  horizontal: 20,
  vertical: 6,
};

type DensitySettings = Omit<
  DeckStyle,
  "cardFormat" | "imageHeightPercent" | "cornerRadius"
>;

export const DENSITY_PRESETS: Record<DensityPreset, DensitySettings> = {
  [DensityPreset.Compact]: {
    titleFontSize: 20,
    bodyFontSize: 12,
    lineHeight: 1.3,
    paddingMultiplier: 0.75,
  },
  [DensityPreset.Normal]: {
    titleFontSize: 24,
    bodyFontSize: 14,
    lineHeight: 1.5,
    paddingMultiplier: 1.0,
  },
  [DensityPreset.Spacious]: {
    titleFontSize: 28,
    bodyFontSize: 16,
    lineHeight: 1.7,
    paddingMultiplier: 1.25,
  },
};

function getDefaultDecks(): Deck[] {
  return [
    {
      id: crypto.randomUUID(),
      name: "New Deck",
      cards: [defaultCardValues[CardType.Spell]],
      style: DEFAULT_STYLE,
    },
  ];
}

export const useDeckStore = create<DeckStore>()(
  persist(
    (set) => ({
      decks: getDefaultDecks(),
      currentDeckIndex: 0,
      currentCardIndex: 0,
      isHydrated: false,

      updateCard: (deckIndex, cardIndex, updatedCard) => {
        set((state) => ({
          decks: state.decks.map((deck, dIdx) =>
            dIdx === deckIndex
              ? {
                  ...deck,
                  cards: deck.cards.map((card, cIdx) =>
                    cIdx === cardIndex ? updatedCard : card,
                  ),
                }
              : deck,
          ),
        }));
      },

      addCard: (deckId, type) => {
        const newCard = defaultCardValues[type];

        set((state) => {
          let targetDeckIndex = -1;
          const newDecks = state.decks.map((deck, idx) => {
            if (deck.id === deckId) {
              targetDeckIndex = idx;
              return {
                ...deck,
                cards: [...deck.cards, newCard],
              };
            }
            return deck;
          });

          const newCardIndex =
            targetDeckIndex !== -1
              ? state.decks[targetDeckIndex].cards.length
              : state.currentCardIndex;

          return {
            decks: newDecks,
            currentDeckIndex:
              targetDeckIndex !== -1 ? targetDeckIndex : state.currentDeckIndex,
            currentCardIndex: newCardIndex,
          };
        });
      },

      duplicateCard: (deckIndex, cardIndex) => {
        set((state) => {
          const deck = state.decks[deckIndex];
          if (!deck) return state;

          const cardToDuplicate = deck.cards[cardIndex];
          if (!cardToDuplicate) return state;

          const newCard = {
            ...JSON.parse(JSON.stringify(cardToDuplicate)),
            title: `${cardToDuplicate.title} (Copy)`,
          };

          const newDecks = state.decks.map((d, idx) => {
            if (idx === deckIndex) {
              return {
                ...d,
                cards: [...d.cards, newCard],
              };
            }
            return d;
          });

          return {
            decks: newDecks,
            currentDeckIndex: deckIndex,
            currentCardIndex: deck.cards.length, // Select the new card (last index)
          };
        });
      },

      deleteCard: (deckIndex, cardIndex) => {
        set((state) => {
          const deck = state.decks[deckIndex];
          if (!deck) return state;

          // Don't delete the last card in a deck
          if (deck.cards.length <= 1) return state;

          const newCards = deck.cards.filter((_, idx) => idx !== cardIndex);

          const newDecks = state.decks.map((d, idx) => {
            if (idx === deckIndex) {
              return {
                ...d,
                cards: newCards,
              };
            }
            return d;
          });

          // Adjust currentCardIndex if necessary
          let newCardIndex = state.currentCardIndex;
          if (cardIndex === state.currentCardIndex) {
            // If we deleted the current card, select the previous one (or 0)
            newCardIndex = Math.max(0, cardIndex - 1);
          } else if (cardIndex < state.currentCardIndex) {
            // If we deleted a card before the current one, shift index down
            newCardIndex = state.currentCardIndex - 1;
          }

          return {
            decks: newDecks,
            currentCardIndex: newCardIndex,
          };
        });
      },

      addDeck: (name) => {
        const newDeck: Deck = {
          id: crypto.randomUUID(),
          name,
          cards: [defaultCardValues[CardType.Spell]],
          style: DEFAULT_STYLE,
        };

        set((state) => ({
          decks: [...state.decks, newDeck],
          currentDeckIndex: state.decks.length,
          currentCardIndex: 0,
        }));
      },

      updateDeckName: (deckId, name) => {
        set((state) => ({
          decks: state.decks.map((deck) =>
            deck.id === deckId ? { ...deck, name } : deck,
          ),
        }));
      },

      updateDeckStyle: (deckId, style) => {
        set((state) => ({
          decks: state.decks.map((deck) =>
            deck.id === deckId
              ? {
                  ...deck,
                  style: { ...DEFAULT_STYLE, ...deck.style, ...style },
                }
              : deck,
          ),
        }));
      },

      deleteDeck: (deckId) => {
        set((state) => {
          const newDecks = state.decks.filter((deck) => deck.id !== deckId);

          // If we deleted all decks, create a new default one
          if (newDecks.length === 0) {
            return {
              decks: getDefaultDecks(),
              currentDeckIndex: 0,
              currentCardIndex: 0,
            };
          }

          // If we deleted the current deck, switch to the first deck
          const deletedIndex = state.decks.findIndex(
            (deck) => deck.id === deckId,
          );
          const newCurrentIndex =
            deletedIndex === state.currentDeckIndex
              ? Math.min(state.currentDeckIndex, newDecks.length - 1)
              : state.currentDeckIndex > deletedIndex
                ? state.currentDeckIndex - 1
                : state.currentDeckIndex;

          return {
            decks: newDecks,
            currentDeckIndex: newCurrentIndex,
            currentCardIndex: 0,
          };
        });
      },

      setCurrentCard: (deckIndex, cardIndex) => {
        set({
          currentDeckIndex: deckIndex,
          currentCardIndex: cardIndex,
        });
      },
    }),
    {
      name: "dnd-cards-decks",
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isHydrated = true;
        }
      },
    },
  ),
);
