import React from "react";
import { CardRenderer, CardSide } from "@/components/CardRenderer/CardRenderer";
import { AppHeader } from "@/components/MainContent/AppHeader/AppHeader";
import { useDeckStore } from "@/hooks/useDeckStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Skeleton } from "@/components/ui/skeleton";

interface MainContentProps {
  isLoading?: boolean;
}

export const MainContent: React.FC<MainContentProps> = ({
  isLoading = false,
}) => {
  const { decks, currentDeckIndex, currentCardIndex } = useDeckStore();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const currentDeck = decks[currentDeckIndex];
  const currentCard = currentDeck?.cards[currentCardIndex];
  const cardScale = isSmallScreen ? 0.85 : 1.2;

  if (isLoading) {
    return (
      <main className="flex-1 flex flex-col relative min-w-0">
        <AppHeader isLoading />

        {/* Canvas */}
        <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-violet-500/40 to-slate-900">
          {/* Grid pattern background */}
          <div
            className="absolute inset-0 opacity-[0.25] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          ></div>

          {/* Card Skeleton - responsive sizing */}
          <div className="relative z-10 p-4">
            <Skeleton className="h-[500px] w-[340px] md:h-[600px] md:w-[400px] rounded-2xl" />
          </div>
        </div>
      </main>
    );
  }

  if (!currentDeck || !currentCard) return null;

  return (
    <main className="flex-1 flex flex-col relative min-w-0">
      <AppHeader />

      {/* Canvas */}
      <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-violet-500/40 to-slate-900">
        {/* Grid pattern background */}
        <div
          className="absolute inset-0 opacity-[0.25] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        ></div>

        {/* Card Stack */}
        <div className="relative z-10 flex items-center justify-center p-8 w-full">
          <div
            className="relative"
            style={{
              transform: `translate(-${100 * cardScale}px, -${20 * cardScale}px)`,
            }}
          >
            {/* Back Card - positioned behind and offset */}
            <div
              className="absolute shadow-2xl shadow-black/50"
              style={{
                top: `${40 * cardScale}px`,
                left: `${200 * cardScale}px`,
              }}
            >
              <CardRenderer
                data={currentCard}
                scale={cardScale}
                side={CardSide.Back}
              />
            </div>

            {/* Front Card - positioned in front */}
            <div className="relative z-10 shadow-2xl shadow-black/50">
              <CardRenderer
                data={currentCard}
                scale={cardScale}
                side={CardSide.Front}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
