import React from "react";
import type { CardVisuals } from "@/features/cards/types";
import type { DeckStyle } from "@/features/decks/types";
import { getCardRadii } from "@/lib/cardConstants";
import { useResolvedImageUrl } from "@/hooks/useResolvedImageUrl";

interface CardBackProps {
  visuals: CardVisuals;
  deckStyle: DeckStyle;
}

export const CardBack: React.FC<CardBackProps> = ({ visuals, deckStyle }) => {
  const cornerRadius = deckStyle.cornerRadius ?? 1.5;
  const backSrc = useResolvedImageUrl(visuals.backImage);

  const { outerRadius, padding, innerRadius } = getCardRadii(cornerRadius);

  return (
    <div
      className="w-full h-full bg-black flex items-center justify-center"
      style={{ padding, borderRadius: outerRadius }}
    >
      <div
        className="w-full h-full relative overflow-hidden"
        style={{
          backgroundColor: visuals.backImage ? undefined : "#000000",
          borderRadius: innerRadius,
        }}
      >
        {backSrc ? (
          <img
            src={backSrc}
            alt="Card back"
            className="w-full h-full object-fill"
            style={{ borderRadius: innerRadius }}
          />
        ) : null}
        {visuals.backTint && (
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: visuals.backTint,
              mixBlendMode: "overlay",
            }}
          />
        )}
      </div>
    </div>
  );
};
