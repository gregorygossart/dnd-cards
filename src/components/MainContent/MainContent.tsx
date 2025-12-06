import React from 'react';
import { CardRenderer, CardSide } from '@/components/CardRenderer/CardRenderer';
import { AppHeader } from '@/components/AppHeader/AppHeader';
import { useDeckStore } from '@/hooks/useDeckStore';

export const MainContent: React.FC = () => {
    const { decks, currentDeckIndex, currentCardIndex } = useDeckStore();
    const currentDeck = decks[currentDeckIndex];
    const currentCard = currentDeck?.cards[currentCardIndex];

    if (!currentDeck || !currentCard) return null;

    return (
        <main className="flex-1 flex flex-col relative min-w-0">
            <AppHeader />

            {/* Canvas */}
            <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-slate-900 via-violet-500/40 to-slate-900">
                {/* Grid pattern background */}
                <div className="absolute inset-0 opacity-[0.25]"
                    style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
                </div>

                {/* Card and Button */}
                <div className="relative z-10 flex items-center gap-8 overflow-x-auto p-8 w-full justify-center">
                    {/* Front */}
                    <div className="flex flex-col items-center gap-4">
                        <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Front</span>
                        <div className="shadow-2xl shadow-black/50">
                            <CardRenderer data={currentCard} scale={1.2} side={CardSide.Front} />
                        </div>
                    </div>

                    {/* Back */}
                    <div className="flex flex-col items-center gap-4">
                        <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Back</span>
                        <div className="shadow-2xl shadow-black/50">
                            <CardRenderer data={currentCard} scale={1.2} side={CardSide.Back} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
