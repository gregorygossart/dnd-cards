"use client";

import { useState, useEffect } from "react";
import { useDeckStore } from "@/hooks/useDeckStore";
import { LeftSidebar } from "@/components/LeftSidebar/LeftSidebar";
import { RightSidebar } from "@/components/RightSidebar/RightSidebar";
import { MainContent } from "@/components/MainContent/MainContent";

export default function Home() {
  const [_, setMounted] = useState(false);

  const { decks, currentDeckIndex, currentCardIndex } = useDeckStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentDeck = decks[currentDeckIndex];
  const currentCard = currentDeck?.cards[currentCardIndex];

  // Safety check
  if (!currentDeck || !currentCard) {
    return (
      <div className="flex h-screen w-full bg-slate-950 text-slate-100 items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-100 overflow-hidden font-sans">
      <LeftSidebar />

      <MainContent />

      <RightSidebar />
    </div>
  );
}
