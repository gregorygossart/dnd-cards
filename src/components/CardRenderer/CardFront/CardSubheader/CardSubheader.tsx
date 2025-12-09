import React from "react";
import { Card } from "@/types/card";
import { getCardSubtitle } from "@/lib/cardUtils";
import { useDeckStore } from "@/hooks/useDeckStore";

interface CardSubheaderProps {
  card: Card;
}

export const CardSubheader: React.FC<CardSubheaderProps> = ({ card }) => {
  const { decks, currentDeckIndex } = useDeckStore();

  const bodyFontSize = decks[currentDeckIndex]?.style?.bodyFontSize ?? 14;

  return (
    <div className="text-center">
      <span
        className="font-bold uppercase opacity-40"
        style={{ fontSize: `${bodyFontSize}px` }}
      >
        {getCardSubtitle(card)}
      </span>
    </div>
  );
};
