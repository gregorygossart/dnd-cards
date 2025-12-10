import React from "react";
import type { CardVisuals } from "@/features/cards/types";
import { getCardRadii } from "@/lib/cardConstants";
import { useDeckStore } from "@/hooks/useDeckStore";

interface CardBackProps {
  visuals: CardVisuals;
}

export const CardBack: React.FC<CardBackProps> = ({ visuals }) => {
  // Get corner radius from current deck's typography settings
  const { decks, currentDeckIndex } = useDeckStore();
  const cornerRadius = decks[currentDeckIndex]?.style?.cornerRadius ?? 1.5;

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
        {visuals.backImage ? (
          <img
            src={visuals.backImage}
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
