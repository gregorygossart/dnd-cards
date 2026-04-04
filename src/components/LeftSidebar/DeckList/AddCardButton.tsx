import React from "react";
import { useT } from "next-i18next/client";
import { useDeckStore } from "@/hooks/useDeckStore";
import { CardType } from "@/features/cards/constants";

interface AddCardButtonProps {
  deckId: string;
}

export const AddCardButton: React.FC<AddCardButtonProps> = ({ deckId }) => {
  const { addCard } = useDeckStore();
  const { t } = useT();

  return (
    <button
      onClick={() => addCard(deckId, CardType.Spell)}
      className="w-full px-3 py-2 text-left text-sm rounded-lg transition-colors flex items-center gap-2 group hover:bg-slate-800/50 text-slate-400 hover:text-slate-300 border border-dashed border-slate-700 mt-1"
    >
      <div className="w-4 h-4 rounded shrink-0 bg-slate-700 group-hover:bg-violet-600 flex items-center justify-center">
        <svg
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="truncate font-medium">{t("card.add.buttonLabel")}</div>
      </div>
    </button>
  );
};
