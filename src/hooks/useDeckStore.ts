import { useState, useEffect } from 'react';
import { Deck, Card, CardType } from '@/types/card';
import { defaultCardValues } from '@/components/CardEditor/CardEditor';

const STORAGE_KEY = 'dnd-cards-deck';

interface DeckStore {
    deck: Deck;
    currentCardIndex: number;
    updateCard: (index: number, card: Card) => void;
    addCard: (type: CardType) => void;
    setCurrentCardIndex: (index: number) => void;
}

function getDefaultDeck(): Deck {
    return {
        id: crypto.randomUUID(),
        name: 'My Deck',
        cards: [defaultCardValues[CardType.Spell]],
    };
}

function loadDeckFromStorage(): Deck | null {
    if (typeof window === 'undefined') return null;

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return null;

        const parsed = JSON.parse(stored);
        // Basic validation
        if (!parsed.id || !parsed.name || !Array.isArray(parsed.cards)) {
            console.warn('Invalid deck data in localStorage, using default');
            return null;
        }

        return parsed as Deck;
    } catch (error) {
        console.error('Failed to load deck from localStorage:', error);
        return null;
    }
}

function saveDeckToStorage(deck: Deck): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(deck));
    } catch (error) {
        console.error('Failed to save deck to localStorage:', error);
    }
}

export function useDeckStore(): DeckStore {
    // Always start with default deck (same on server and client)
    const [deck, setDeck] = useState<Deck>(getDefaultDeck);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load from localStorage after mount (client-only)
    useEffect(() => {
        const stored = loadDeckFromStorage();
        if (stored) {
            setDeck(stored);
        }
        setIsHydrated(true);
    }, []);

    // Save to localStorage whenever deck changes (but only after hydration)
    useEffect(() => {
        if (isHydrated) {
            saveDeckToStorage(deck);
        }
    }, [deck, isHydrated]);

    const updateCard = (index: number, updatedCard: Card) => {
        setDeck((prevDeck) => ({
            ...prevDeck,
            cards: prevDeck.cards.map((card, i) =>
                i === index ? updatedCard : card
            ),
        }));
    };

    const addCard = (type: CardType) => {
        const newCard = defaultCardValues[type];
        setDeck((prevDeck) => ({
            ...prevDeck,
            cards: [...prevDeck.cards, newCard],
        }));
        // Switch to the newly created card
        setCurrentCardIndex(deck.cards.length);
    };

    return {
        deck,
        currentCardIndex,
        updateCard,
        addCard,
        setCurrentCardIndex,
    };
}
