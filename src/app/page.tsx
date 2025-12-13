"use client";

import { useState, useEffect } from "react";
import { useDeckStore } from "@/hooks/useDeckStore";
import { LeftSidebar } from "@/components/LeftSidebar/LeftSidebar";
import { RightSidebar } from "@/components/RightSidebar/RightSidebar";
import { MainContent } from "@/components/MainContent/MainContent";
import { Button } from "@/components/ui/button";

const MINIMUM_LOADING_TIME = 300; // ms - prevents jarring blink

export default function Home() {
  const { decks, currentDeckIndex, currentCardIndex, isHydrated, addDeck } =
    useDeckStore();
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  // Ensure skeleton shows for at least MINIMUM_LOADING_TIME
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, MINIMUM_LOADING_TIME);

    return () => clearTimeout(timer);
  }, []);

  const currentDeck = decks[currentDeckIndex];
  const currentCard = currentDeck?.cards[currentCardIndex];

  const isLoading = !isHydrated || !minTimeElapsed;
  const hasError = isHydrated && (!currentDeck || !currentCard);

  if (isLoading) {
    return (
      <div className="w-full h-full flex bg-slate-950 text-slate-100 overflow-hidden font-sans">
        <LeftSidebar isLoading />
        <MainContent isLoading />
        <RightSidebar isLoading />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="w-full h-full flex bg-slate-950 text-slate-100 items-center justify-center">
        <div className="text-center space-y-4 max-w-md px-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-slate-100">No Deck Found</h1>
            <p className="text-slate-400">
              It looks like there's no deck or card available. This might have
              happened if your data was corrupted or cleared.
            </p>
          </div>
          <Button
            onClick={() => addDeck("New Deck")}
            className="bg-violet-600 hover:bg-violet-700 text-white"
          >
            Create New Deck
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex bg-slate-950 text-slate-100 overflow-hidden">
      <LeftSidebar />
      <MainContent />
      <RightSidebar />
    </div>
  );
}
