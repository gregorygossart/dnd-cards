"use client";

import { useRouter } from "next/navigation";
import { useT } from "next-i18next/client";
import { CardRenderer, CardSide } from "@/components/CardRenderer/CardRenderer";
import { AddCardButton } from "./AddCardButton";
import type { Card } from "@/features/cards/types";
import type { DeckStyle } from "@/features/decks/types";

interface CardGridProps {
  deckId: string;
  cards: Card[];
  deckStyle: DeckStyle;
}

export function CardGrid({ deckId, cards, deckStyle }: CardGridProps) {
  const router = useRouter();
  const { t } = useT();

  if (cards.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-900/30 rounded-lg border border-dashed border-slate-800">
        <p className="text-slate-400 mb-4">{t("card.noCards")}</p>
        <AddCardButton deckId={deckId} />
      </div>
    );
  }

  return (
    <div
      className="p-6 grid gap-6"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}
    >
      {cards.map((card, index) => (
        <div
          key={index}
          className="relative cursor-pointer transition-transform hover:scale-[1.02]"
          onClick={() => {
            router.push(`/decks/${deckId}/cards/${index}`);
          }}
        >
          <CardRenderer
            data={card}
            deckStyle={deckStyle}
            scale={1}
            side={CardSide.Front}
          />
        </div>
      ))}
    </div>
  );
}
