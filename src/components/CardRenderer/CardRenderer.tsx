import React, { useRef } from "react";
import type { Card } from "@/features/cards/types";
import type { DeckStyle } from "@/features/decks/types";
import { CardFormat } from "@/features/cards/constants";
import { CardFront } from "./CardFront/CardFront";
import { CardBack } from "./CardBack/CardBack";
import { OverflowWarning } from "./OverflowWarning/OverflowWarning";
import { cn } from "@/lib/utils";
import { getCardDimensions } from "@/lib/cardConstants";
import { useVisibleCardOverflow } from "@/hooks/overflow/useVisibleCardOverflow";

export enum CardSide {
  Front = "Front",
  Back = "Back",
}

// Internal resolution multiplier for crisp text/borders
const RESOLUTION = 1.5;

interface CardRendererProps {
  data: Card;
  deckStyle: DeckStyle;
  className?: string;
  scale?: number;
  showShadow?: boolean;
  side?: CardSide;
}

export const CardRenderer: React.FC<CardRendererProps> = ({
  data,
  deckStyle,
  className,
  scale = 1,
  showShadow = true,
  side = CardSide.Front,
}) => {
  const { visuals } = data;
  const cardContainerRef = useRef<HTMLDivElement>(null);

  // Get card dimensions based on deck's card format
  const cardDimensions = getCardDimensions(
    deckStyle.cardFormat === "Poker" ? CardFormat.Poker : CardFormat.Tarot
  );

  // Track overflow state
  const [contentElement, setContentElement] = React.useState<HTMLElement | null>(null);

  const hasOverflow = useVisibleCardOverflow(
    contentElement,
    cardContainerRef.current,
    [data, scale, side, deckStyle]
  );

  // Capture the content element from CardFront
  const handleContentRef = React.useCallback((el: HTMLElement | null) => {
    setContentElement(el);
  }, []);

  return (
    <div
      className={cn("relative", className)}
      style={{
        width: `${cardDimensions.width * scale}px`,
        height: `${cardDimensions.height * scale}px`,
      }}
    >
      <div
        className="origin-top-left overflow-hidden"
        style={{
          transform: `scale(${scale / RESOLUTION})`,
          width: `${cardDimensions.width * RESOLUTION}px`,
          height: `${cardDimensions.height * RESOLUTION}px`,
        }}
      >
        <div
          ref={cardContainerRef}
          className={cn(
            "relative flex flex-col font-sans text-slate-900 h-full",
            showShadow && "shadow-2xl",
          )}
        >
          {side === CardSide.Back ? (
            <CardBack visuals={visuals} deckStyle={deckStyle} />
          ) : (
            <CardFront data={data} deckStyle={deckStyle} onContentRef={handleContentRef} />
          )}
        </div>
      </div>
      {/* Overflow warning - only show for front side, outside overflow-hidden */}
      {side === CardSide.Front && <OverflowWarning hasOverflow={hasOverflow} />}
    </div>
  );
};
