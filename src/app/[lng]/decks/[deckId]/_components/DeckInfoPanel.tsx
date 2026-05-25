"use client";

import { useState } from "react";
import { useT } from "next-i18next/client";
import { Pencil, AlertTriangle } from "lucide-react";
import { useDeckStore } from "@/hooks/useDeckStore";
import { AddCardButton } from "./AddCardButton";

interface DeckInfoPanelProps {
  deckId: string;
  deckName: string;
  cardCount: number;
  overflowCount: number;
  isCheckingOverflow: boolean;
}

export function DeckInfoPanel({
  deckId,
  deckName,
  cardCount,
  overflowCount,
  isCheckingOverflow,
}: DeckInfoPanelProps) {
  const { updateDeckName } = useDeckStore();
  const { t } = useT();
  const [isEditingName, setIsEditingName] = useState(false);
  const [editingName, setEditingName] = useState("");

  const handleRename = () => {
    if (editingName.trim()) {
      updateDeckName(deckId, editingName.trim());
    }
    setIsEditingName(false);
  };

  const startEditing = () => {
    setEditingName(deckName);
    setIsEditingName(true);
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {isEditingName ? (
            <input
              type="text"
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              onBlur={handleRename}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRename();
                if (e.key === "Escape") setIsEditingName(false);
              }}
              autoFocus
              className="text-2xl font-bold bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-100 focus:outline-none focus:border-violet-500"
            />
          ) : (
            <>
              <h1 className="text-2xl font-bold text-slate-100">{deckName}</h1>
              <button
                onClick={startEditing}
                className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200"
              >
                <Pencil className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        <AddCardButton deckId={deckId} />
      </div>

      <div className="flex items-center gap-3 text-sm">
        <span className="text-slate-400">
          {t("deck.cardCount", { count: cardCount })}
        </span>
        {!isCheckingOverflow && overflowCount > 0 && (
          <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            {overflowCount} {t("deck.overflow")}
          </span>
        )}
      </div>
    </div>
  );
}
