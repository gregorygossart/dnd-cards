import React from 'react';
import { useDeckStore } from '@/hooks/useDeckStore';
import { CardType } from '@/types/card';

interface AddCardButtonProps {
    deckId: string;
}

export const AddCardButton: React.FC<AddCardButtonProps> = ({ deckId }) => {
    const { addCard } = useDeckStore();

    return (
        <button
            onClick={() => addCard(deckId, CardType.Spell)}
            className="w-full px-3 py-2 text-left text-sm rounded-lg transition-colors flex items-center gap-2 group hover:bg-violet-600/10 text-violet-400 hover:text-violet-300 mt-1"
        >
            <div className="w-4 h-4 rounded shrink-0 bg-violet-600/20 flex items-center justify-center">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            </div>
            <div className="flex-1 min-w-0">
                <div className="truncate font-medium">
                    Add Card
                </div>
            </div>
        </button>
    );
};
