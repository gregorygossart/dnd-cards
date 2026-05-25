"use client";

import { useT } from "next-i18next/client";
import { useDeckStore } from "@/hooks/useDeckStore";
import { PageHeader } from "./_components/PageHeader";
import { DeckList } from "./_components/DeckList";
import { AddDeckButton } from "./_components/AddDeckButton";

export default function DecksPage() {
  const { t } = useT();
  const { decks } = useDeckStore();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col overflow-hidden">
      {/* Header - matching AppHeader style */}
      <PageHeader />

      {/* Main Content - matching MainContent canvas style */}
      <main className="flex-1 relative bg-gradient-to-br from-slate-900 via-violet-500/40 to-slate-900 overflow-y-auto">
        {/* Grid pattern background */}
        <div
          className="absolute inset-0 opacity-[0.25] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-4 py-6">
          {decks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 mb-4">{t("deck.noDeckFound")}</p>
              <AddDeckButton />
            </div>
          ) : (
            <DeckList />
          )}
        </div>
      </main>
    </div>
  );
}
