import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Deck, Card, CardType } from '@/types/card';
import { defaultCardValues } from '@/components/CardEditor/CardEditor';

interface DeckStore {
    decks: Deck[];
    currentDeckIndex: number;
    currentCardIndex: number;
    updateCard: (deckIndex: number, cardIndex: number, card: Card) => void;
    addCard: (deckId: string, type: CardType) => void;
    setCurrentCard: (deckIndex: number, cardIndex: number) => void;
}

function getDefaultDecks(): Deck[] {
    return [
        {
            id: crypto.randomUUID(),
            name: 'New Deck',
            cards: [defaultCardValues[CardType.Spell]],
        }
    ];
}

export const useDeckStore = create<DeckStore>()(
    persist(
        (set) => ({
            decks: getDefaultDecks(),
            currentDeckIndex: 0,
            currentCardIndex: 0,

            updateCard: (deckIndex, cardIndex, updatedCard) => {
                set((state) => ({
                    decks: state.decks.map((deck, dIdx) =>
                        dIdx === deckIndex
                            ? {
                                ...deck,
                                cards: deck.cards.map((card, cIdx) =>
                                    cIdx === cardIndex ? updatedCard : card
                                ),
                            }
                            : deck
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

                    const newCardIndex = targetDeckIndex !== -1
                        ? state.decks[targetDeckIndex].cards.length
                        : state.currentCardIndex;

                    return {
                        decks: newDecks,
                        currentCardIndex: newCardIndex,
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
            name: 'dnd-cards-decks',
        }
    )
);
