"use client";

import { useRouter } from "next/navigation";
import { useT } from "next-i18next/client";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo/Logo";

interface DeckHeaderProps {
  deckId: string;
  deckName: string;
}

export function DeckHeader({ deckId, deckName }: DeckHeaderProps) {
  const router = useRouter();
  const { t } = useT();

  return (
    <div className="h-14 shrink-0 border-b border-slate-800 bg-slate-900 backdrop-blur-sm flex items-center justify-between px-4 lg:px-6 space-x-4">
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <Logo />
        <span className="text-slate-500">/</span>
        <button
          onClick={() => router.push("/decks")}
          className="text-slate-300 hover:text-slate-100 transition-colors truncate"
        >
          {t("navigation.myDecks")}
        </button>
        <span className="text-slate-500">/</span>
        <span className="text-slate-200 truncate">{deckName}</span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push(`/decks/${deckId}/print`)}
          className="text-slate-400 hover:text-slate-100 hover:bg-slate-800"
        >
          <Printer className="w-4 h-4 mr-1 lg:mr-2" />
          <span className="hidden lg:inline">{t("deck.printDeck")}</span>
        </Button>
      </div>
    </div>
  );
}
