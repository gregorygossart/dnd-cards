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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <PageHeader />

      <main className="max-w-4xl mx-auto px-4 py-6">
        {decks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400 mb-4">{t("deck.noDeckFound")}</p>
            <AddDeckButton />
          </div>
        ) : (
          <DeckList />
        )}
      </main>
    </div>
  );
}
