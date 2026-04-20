import { useState } from "react";
import { useRouter } from "next/navigation";
import { useT } from "next-i18next/client";
import { Layers, AlertTriangle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Deck } from "@/features/decks/types";
import { DeckActions } from "./DeckActions";
import { DeleteDeckDialog } from "./DeleteDeckDialog";
import { exportDeck } from "@/lib/share/export";
import { useDeckStore } from "@/hooks/useDeckStore";
import { useDeckOverflow } from "@/hooks/overflow/useDeckOverflow";

interface DeckListItemProps {
  deck: Deck;
}

export function DeckListItem({ deck }: DeckListItemProps) {
  const { t } = useT();
  const router = useRouter();
  
  const { deleteDeck } = useDeckStore();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const overflowCount = useDeckOverflow(deck.id, deck.cards, deck.style);

  return (
    <div
      className={cn(
        "group flex items-center justify-between px-4 py-3 rounded-lg transition-colors",
        "bg-slate-900 hover:bg-slate-800 border border-slate-800"
      )}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Layers className="w-5 h-5 text-slate-400" />

        <button
          onClick={() => router.push(`/decks/${deck.id}`)}
          className="flex-1 min-w-0 text-left font-medium text-slate-200 hover:text-white truncate block"
        >
          {deck.name}
        </button>

        {overflowCount > 0 && (
          <span className="shrink-0 text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            {overflowCount} {t("deck.overflow")}
          </span>
        )}

        <span className="text-sm text-slate-500 shrink-0">
          {t("deck.cardCount", { count: deck.cards.length })}
        </span>
      </div>

      <div className="flex items-center gap-1 ml-4">
        <DeckActions
          onExport={() => exportDeck(deck)}
          onDelete={() => setShowDeleteDialog(true)}
        />

        <button
          onClick={() => router.push(`/decks/${deck.id}`)}
          className="p-2 hover:bg-slate-700 rounded transition-colors text-slate-500 hover:text-slate-300"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <DeleteDeckDialog
        deck={
          showDeleteDialog
            ? { id: deck.id, name: deck.name, cardCount: deck.cards.length }
            : null
        }
        onConfirm={() => {
          deleteDeck(deck.id);
          setShowDeleteDialog(false);
        }}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </div>
  );
}
