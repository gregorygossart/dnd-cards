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
        <div className="flex-1 relative bg-gradient-to-br from-slate-900 via-violet-500/40 to-slate-900">
          {/* Grid pattern background */}
          <div
            className="absolute inset-0 opacity-[0.25] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          ></div>

          {/* Card Skeleton - matches the main card stack layout */}
          <div className="absolute inset-0 flex items-center justify-center p-8 w-full pointer-events-none">
            <div className="relative">
              {/* Back Card Skeleton */}
              <div
                className="absolute"
                style={{
                  transform: `translate(calc(-50% + ${100 * cardScale}px), calc(-50% + ${20 * cardScale}px))`,
                }}
              >
                <Skeleton
                  className="rounded-[30px]"
                  style={{
                    width: `${264 * cardScale}px`,
                    height: `${453 * cardScale}px`,
                  }}
                />
              </div>

              {/* Front Card Skeleton */}
              <div
                className="absolute"
                style={{
                  transform: `translate(calc(-50% - ${100 * cardScale}px), calc(-50% - ${20 * cardScale}px))`,
                }}
              >
                <Skeleton
                  className="rounded-[30px]"
                  style={{
                    width: `${264 * cardScale}px`,
                    height: `${453 * cardScale}px`,
                  }}
                />
              </div>
            </div>
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
      <div className="flex-1 relative bg-gradient-to-br from-slate-900 via-violet-500/40 to-slate-900">
        {/* Grid pattern background */}
        <div
          className="absolute inset-0 opacity-[0.25] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        ></div>

        {/* Card Stack */}
        {/* Card Stack */}
        <div className="absolute inset-0 flex items-center justify-center p-8 w-full pointer-events-none">
          {/* Relative anchor at center of screen */}
          <div className="relative">
            {/* Back Card - positioned behind and offset */}
            {/* Translate moves it from center anchor. Also translate -50% -50% to center the card itself on that point */}
            <div
              className="absolute pointer-events-auto"
              style={{
                transform: `translate(calc(-50% + ${100 * cardScale}px), calc(-50% + ${20 * cardScale}px))`,
              }}
            >
              <CardRenderer
                data={currentCard}
                scale={cardScale}
                side={CardSide.Back}
              />
            </div>

            {/* Front Card - positioned in front */}
            <div
              className="absolute pointer-events-auto"
              style={{
                transform: `translate(calc(-50% - ${100 * cardScale}px), calc(-50% - ${20 * cardScale}px))`,
              }}
            >
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
