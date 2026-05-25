"use client";

import { useRouter, useParams } from "next/navigation";
import { useT } from "next-i18next/client";
import { Button } from "@/components/ui/button";
import { useDeckStore } from "@/hooks/useDeckStore";
import { DeckSettingsPanel } from "./_components/DeckSettingsPanel";
import { DeckHeader } from "./_components/DeckHeader";
import { DeckInfoPanel } from "./_components/DeckInfoPanel";
import { CardGrid } from "./_components/CardGrid";
import { useState, useEffect } from "react";
import { checkCardOverflow } from "@/lib/overflow";

export default function DeckDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { t } = useT();
  const { decks } = useDeckStore();
  const [cardsWithOverflow, setCardsWithOverflow] = useState<Set<number>>(new Set());
  const [isCheckingOverflow, setIsCheckingOverflow] = useState(true);

  const deckId = params?.deckId as string;
  const deck = decks.find((d) => d.id === deckId);

  // Check overflow for all cards
  useEffect(() => {
    if (!deck) return;
    
    setIsCheckingOverflow(true);
    const checkAll = async () => {
      const overflowSet = new Set<number>();
      
      for (let i = 0; i < deck.cards.length; i++) {
        const hasOverflow = await checkCardOverflow(deck.cards[i], deck.style);
        if (hasOverflow) overflowSet.add(i);
        if (i % 3 === 0) await new Promise(r => setTimeout(r, 0));
      }
      
      setCardsWithOverflow(overflowSet);
      setIsCheckingOverflow(false);
    };
    
    checkAll();
  }, [deck?.id, deck?.style, deck?.cards.length]);

  if (!deck) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">{t("deck.noDeckFound")}</p>
          <Button onClick={() => router.push("/decks")}>
            {t("common.back")}
          </Button>
        </div>
      </div>
    );
  }

  const overflowCount = cardsWithOverflow.size;

  return (
    <div className="w-full h-full flex bg-slate-950 text-slate-100 overflow-hidden">
      {/* Main Content */}
      <main className="flex-1 relative bg-gradient-to-br from-slate-900 via-violet-500/40 to-slate-900 overflow-y-auto">
          {/* Grid pattern background */}
          <div
            className="absolute inset-0 opacity-[0.25] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative">
            <DeckHeader deckId={deckId} deckName={deck.name} />

            <div className="space-y-6">
              <DeckInfoPanel
                deckId={deckId}
                deckName={deck.name}
                cardCount={deck.cards.length}
                overflowCount={overflowCount}
                isCheckingOverflow={isCheckingOverflow}
              />

              <CardGrid
                deckId={deckId}
                cards={deck.cards}
                deckStyle={deck.style}
              />
            </div>
          </div>
        </main>

        {/* Right Sidebar - matching RightSidebar style */}
        <aside className="z-30 w-96 border-l border-slate-800 bg-slate-900 flex flex-col overflow-y-auto">
          <div className="px-8 py-5">
            <h2 className="text-sm font-semibold text-slate-200 mb-6">
              {t("editor.deckSettings.title")}
            </h2>
            <DeckSettingsPanel deckId={deckId} />
          </div>
        </aside>
    </div>
  );
}
