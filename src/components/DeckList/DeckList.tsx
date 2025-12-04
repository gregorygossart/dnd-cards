import React, { useState } from 'react';
import { Deck } from '@/types/card';
import { cn } from '@/lib/utils';

interface DeckListProps {
    decks: Deck[];
    currentDeckIndex: number;
    currentCardIndex: number;
    onCardSelect: (deckIndex: number, cardIndex: number) => void;
}

export const DeckList: React.FC<DeckListProps> = ({
    decks,
    currentDeckIndex,
    currentCardIndex,
    onCardSelect,
}) => {
    const [expandedDeckIndex, setExpandedDeckIndex] = useState<number>(currentDeckIndex);

    const toggleDeck = (deckIndex: number) => {
        setExpandedDeckIndex(expandedDeckIndex === deckIndex ? -1 : deckIndex);
    };

    return (
        <div className="flex-1 overflow-y-auto p-4">
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-3">
                My Decks
            </div>

            <div className="space-y-1">
                {decks.map((deck, deckIndex) => {
                    const isExpanded = expandedDeckIndex === deckIndex;
                    const isCurrentDeck = deckIndex === currentDeckIndex;

                    return (
                        <div key={deck.id}>
                            {/* Deck Header */}
                            <button
                                onClick={() => toggleDeck(deckIndex)}
                                className={cn(
                                    "w-full px-3 py-2 flex items-center justify-between rounded-lg transition-colors text-left group",
                                    isCurrentDeck
                                        ? "bg-slate-800 text-slate-100"
                                        : "hover:bg-slate-800/50 text-slate-300"
                                )}
                            >
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                    {/* Deck Icon */}
                                    <div className={cn(
                                        "w-5 h-5 rounded flex items-center justify-center shrink-0",
                                        isCurrentDeck ? "bg-violet-600" : "bg-slate-700"
                                    )}>
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                        </svg>
                                    </div>

                                    <span className="font-medium truncate text-sm">
                                        {deck.name}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    {/* Card count badge */}
                                    <span className="text-xs bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded">
                                        {deck.cards.length}
                                    </span>

                                    {/* Chevron */}
                                    <svg
                                        className={cn(
                                            "w-4 h-4 text-slate-400 transition-transform",
                                            isExpanded && "rotate-90"
                                        )}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </div>
                            </button>

                            {/* Card List */}
                            {isExpanded && (
                                <div className="mt-1 ml-3 space-y-0.5">
                                    {deck.cards.map((card, cardIndex) => {
                                        const isActive =
                                            deckIndex === currentDeckIndex &&
                                            cardIndex === currentCardIndex;

                                        return (
                                            <button
                                                key={cardIndex}
                                                onClick={() => onCardSelect(deckIndex, cardIndex)}
                                                className={cn(
                                                    "w-full px-3 py-2 text-left text-sm rounded-lg transition-colors flex items-center gap-2 group",
                                                    isActive
                                                        ? "bg-violet-600/20 text-violet-300"
                                                        : "hover:bg-slate-800/50 text-slate-400"
                                                )}
                                            >
                                                {/* Card type icon */}
                                                <div className={cn(
                                                    "w-4 h-4 rounded shrink-0",
                                                    isActive ? "bg-violet-600" : "bg-slate-700"
                                                )}>
                                                    <svg className="w-full h-full p-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm6 6H7v2h6v-2z" clipRule="evenodd" />
                                                    </svg>
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="truncate">
                                                        {card.title || 'Untitled Card'}
                                                    </div>
                                                </div>

                                                {/* Level/Type badge */}
                                                <span className={cn(
                                                    "text-xs px-1.5 py-0.5 rounded shrink-0",
                                                    isActive
                                                        ? "bg-violet-600/30 text-violet-200"
                                                        : "bg-slate-700 text-slate-400"
                                                )}>
                                                    {card.type === 'Spell' && card.level !== undefined
                                                        ? `Lvl ${card.level}`
                                                        : card.type}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
