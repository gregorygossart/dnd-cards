import React from 'react';
import { CardRenderer, CardSide } from '@/components/CardRenderer/CardRenderer';
import { AppHeader } from '@/components/AppHeader/AppHeader';
import { useDeckStore } from '@/hooks/useDeckStore';

import { useMediaQuery } from '@/hooks/useMediaQuery';

export const MainContent: React.FC = () => {
    const { decks, currentDeckIndex, currentCardIndex } = useDeckStore();
    const isSmallScreen = useMediaQuery('(max-width: 768px)');
    const currentDeck = decks[currentDeckIndex];
    const currentCard = currentDeck?.cards[currentCardIndex];
    const cardScale = isSmallScreen ? 0.85 : 1.2;

    if (!currentDeck || !currentCard) return null;

    return (
        <main className="flex-1 flex flex-col relative min-w-0">
            <AppHeader />

            {/* Canvas */}
            <div className="flex-1 relative overflow-y-auto md:overflow-hidden flex flex-col items-center md:justify-center bg-gradient-to-br from-slate-900 via-violet-500/40 to-slate-900">
                {/* Grid pattern background */}
                <div className="fixed inset-0 opacity-[0.25] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
                </div>

                {/* Card and Button */}
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-8 w-full justify-center min-h-min">
                    {/* Front */}
                    <div className="flex flex-col items-center gap-4">
                        <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Front</span>
                        <div className="shadow-2xl shadow-black/50">
                            <CardRenderer data={currentCard} scale={cardScale} side={CardSide.Front} />
                        </div>
                    </div>

                    {/* Back */}
                    <div className="flex flex-col items-center gap-4">
                        <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Back</span>
                        <div className="shadow-2xl shadow-black/50">
                            <CardRenderer data={currentCard} scale={cardScale} side={CardSide.Back} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
