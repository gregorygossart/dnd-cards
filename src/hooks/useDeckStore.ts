import { useState, useEffect } from 'react';
import { Deck, Card, CardType } from '@/types/card';
import { defaultCardValues } from '@/components/CardEditor/CardEditor';

const STORAGE_KEY = 'dnd-cards-decks';

interface DeckStore {
    decks: Deck[];
    currentDeckIndex: number;
    currentCardIndex: number;
    updateCard: (deckIndex: number, cardIndex: number, card: Card) => void;
    addCard: (type: CardType) => void;
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

interface StorageData {
    decks: Deck[];
    currentDeckIndex: number;
    currentCardIndex: number;
}

function loadFromStorage(): StorageData | null {
    if (typeof window === 'undefined') return null;

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return null;

        const parsed = JSON.parse(stored);

        // Handle legacy format (array of decks)
        if (Array.isArray(parsed)) {
            return {
                decks: parsed as Deck[],
                currentDeckIndex: 0,
                currentCardIndex: 0
            };
        }

        return parsed as StorageData;
    } catch (error) {
        console.error('Failed to load data from localStorage:', error);
        return null;
    }
}

function saveToStorage(data: StorageData): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('Failed to save data to localStorage:', error);
    }
}

export function useDeckStore(): DeckStore {
    // Always start with default decks (same on server and client)
    const [decks, setDecks] = useState<Deck[]>(getDefaultDecks);
    const [currentDeckIndex, setCurrentDeckIndex] = useState(0);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load from localStorage after mount (client-only)
    useEffect(() => {
        const stored = loadFromStorage();
        if (stored) {
            setDecks(stored.decks);
            setCurrentDeckIndex(stored.currentDeckIndex);
            setCurrentCardIndex(stored.currentCardIndex);
        }
        setIsHydrated(true);
    }, []);

    // Save to localStorage whenever state changes (but only after hydration)
    useEffect(() => {
        if (isHydrated) {
            saveToStorage({
                decks,
                currentDeckIndex,
                currentCardIndex
            });
        }
    }, [decks, currentDeckIndex, currentCardIndex, isHydrated]);

    const updateCard = (deckIndex: number, cardIndex: number, updatedCard: Card) => {
        setDecks((prevDecks) =>
            prevDecks.map((deck, dIdx) =>
                dIdx === deckIndex
                    ? {
                        ...deck,
                        cards: deck.cards.map((card, cIdx) =>
                            cIdx === cardIndex ? updatedCard : card
                        ),
                    }
                    : deck
            )
        );
    };

    const addCard = (type: CardType) => {
        const newCard = defaultCardValues[type];
        setDecks((prevDecks) =>
            prevDecks.map((deck, idx) =>
                idx === currentDeckIndex
                    ? {
                        ...deck,
                        cards: [...deck.cards, newCard],
                    }
                    : deck
            )
        );
        // Switch to the newly created card
        setCurrentCardIndex(decks[currentDeckIndex].cards.length);
    };

    const setCurrentCard = (deckIndex: number, cardIndex: number) => {
        setCurrentDeckIndex(deckIndex);
        setCurrentCardIndex(cardIndex);
    };

    return {
        decks,
        currentDeckIndex,
        currentCardIndex,
        updateCard,
        addCard,
        setCurrentCard,
    };
}
