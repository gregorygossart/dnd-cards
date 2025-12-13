import React from "react";
import Link from "next/link";
import { Menu, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/hooks/useUIStore";
import { useDeckStore } from "@/hooks/useDeckStore";
import { Skeleton } from "@/components/ui/skeleton";

interface AppHeaderProps {
  isLoading?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ isLoading = false }) => {
  const {
    leftDrawerOpen,
    setLeftDrawerOpen,
    rightDrawerOpen,
    setRightDrawerOpen,
  } = useUIStore();
  const { decks, currentDeckIndex, currentCardIndex } = useDeckStore();

  const currentDeck = decks[currentDeckIndex];
  const currentCard = currentDeck?.cards[currentCardIndex];

  if (isLoading) {
    return (
      <header className="h-14 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between px-4 lg:px-6 space-x-4">
        {/* Left: Mobile menu + Breadcrumb */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          {/* Mobile: Deck List Toggle */}
          <Skeleton className="h-8 w-8 rounded lg:hidden shrink-0" />

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 min-w-0">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-4 shrink-0" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 shrink-0">
          <Skeleton className="h-8 w-24 rounded hidden lg:block" />
          <Skeleton className="h-9 w-20 rounded lg:hidden" />
        </div>
      </header>
    );
  }

  if (!currentDeck || !currentCard) return null;

  return (
    <header className="h-14 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between px-4 lg:px-6 space-x-4">
      {/* Left: Mobile menu + Breadcrumb */}
      <div className="flex items-center gap-4 min-w-0 flex-1">
        {/* Mobile: Deck List Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setLeftDrawerOpen(!leftDrawerOpen)}
          className="lg:hidden shrink-0 text-slate-300 hover:text-slate-100 hover:bg-slate-800"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm min-w-0">
          <span className="text-slate-400 truncate">{currentDeck.name}</span>
          <svg
            className="w-4 h-4 text-slate-600 shrink-0"
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
          <h1 className="font-semibold text-slate-200 truncate">
            {currentCard.title || "Untitled Card"}
          </h1>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4 shrink-0">
        {/* Print Button */}
        <Link href="/print">
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-slate-100 hover:bg-slate-800"
          >
            <svg
              className="w-4 h-4 lg:mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            <span className="hidden lg:inline">Print Deck</span>
          </Button>
        </Link>

        {/* Mobile: Edit Toggle */}
        <Button
          variant="default"
          onClick={() => setRightDrawerOpen(!rightDrawerOpen)}
          className="lg:hidden text-slate-300 hover:text-slate-100 hover:bg-slate-800"
        >
          Edit Card
        </Button>
      </div>
    </header>
  );
};
