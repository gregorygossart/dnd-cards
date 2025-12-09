import React, { useMemo } from "react";
import type { Card } from "@/types/card";
import { CardFront } from "./CardFront/CardFront";
import { CardBack } from "./CardBack/CardBack";
import { cn } from "@/lib/utils";
import { getCardDimensions } from "@/lib/cardConstants";
import { CardFormat } from "@/types/card";
import { useDeckStore } from "@/hooks/useDeckStore";

export enum CardSide {
  Front = "Front",
  Back = "Back",
}

// Internal resolution multiplier for crisp text/borders
const RESOLUTION = 1.5;

interface CardRendererProps {
  data: Card;
  className?: string;
  scale?: number;
  showShadow?: boolean;
  side?: CardSide;
}

export const CardRenderer: React.FC<CardRendererProps> = ({
  data,
  className,
  scale = 1,
  showShadow = true,
  side = CardSide.Front,
}) => {
  const { visuals } = data;
  const { decks, currentDeckIndex } = useDeckStore();

  // Get card dimensions based on deck's card format
  const cardDimensions = useMemo(() => {
    const deck = decks[currentDeckIndex];
    const format =
      deck?.style?.cardFormat === "Poker" ? CardFormat.Poker : CardFormat.Tarot;
    return getCardDimensions(format);
  }, [decks, currentDeckIndex]);

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        width: `${cardDimensions.width * scale}px`,
        height: `${cardDimensions.height * scale}px`,
      }}
    >
      <div
        className="origin-top-left"
        style={{
          transform: `scale(${scale / RESOLUTION})`,
          width: `${cardDimensions.width * RESOLUTION}px`,
          height: `${cardDimensions.height * RESOLUTION}px`,
        }}
      >
        <div
          className={cn(
            "relative overflow-hidden flex flex-col font-sans text-slate-900 h-full",
            showShadow && "shadow-2xl",
          )}
        >
          {side === CardSide.Back ? (
            <CardBack visuals={visuals} />
          ) : (
            <CardFront data={data} />
          )}
        </div>
      </div>
    </div>
  );
};
