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

function loadDecksFromStorage(): Deck[] | null {
    if (typeof window === 'undefined') return null;

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return null;

        const parsed = JSON.parse(stored);
        // Basic validation
        if (!Array.isArray(parsed)) {
            console.warn('Invalid decks data in localStorage, using default');
            return null;
        }

        return parsed as Deck[];
    } catch (error) {
        console.error('Failed to load decks from localStorage:', error);
        return null;
    }
}

function saveDecksToStorage(decks: Deck[]): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
    } catch (error) {
        console.error('Failed to save decks to localStorage:', error);
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
        const stored = loadDecksFromStorage();
        if (stored && stored.length > 0) {
            setDecks(stored);
        }
        setIsHydrated(true);
    }, []);

    // Save to localStorage whenever decks change (but only after hydration)
    useEffect(() => {
        if (isHydrated) {
            saveDecksToStorage(decks);
        }
    }, [decks, isHydrated]);

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
