import React from "react";
import type { DeckStyle } from "@/features/decks/types";
import { BASE_PADDING } from "@/hooks/useDeckStore";

interface CardBodyProps {
  description: string;
  accentColor: string;
  deckStyle: DeckStyle;
}

export const CardBody: React.FC<CardBodyProps> = ({
  description,
  accentColor,
  deckStyle,
}) => {
  const bodyFontSize = deckStyle.bodyFontSize ?? 14;
  const lineHeight = deckStyle.lineHeight ?? 1.5;
  const paddingMultiplier = deckStyle.paddingMultiplier ?? 1.0;

  return (
    <div
      className="flex-1 min-h-0 flex flex-col gap-2 text-slate-700"
      style={{
        fontSize: `${bodyFontSize}px`,
        paddingLeft: `${BASE_PADDING.horizontal * paddingMultiplier}px`,
        paddingRight: `${BASE_PADDING.horizontal * paddingMultiplier}px`,
        paddingTop: `${BASE_PADDING.vertical * paddingMultiplier}px`,
        paddingBottom: `${BASE_PADDING.vertical * paddingMultiplier}px`,
      }}
    >
      <style>{`
                .card-body-content * {
                    line-height: ${lineHeight} !important;
                }
            `}</style>
      <div
        className="rich-text-content light card-body-content"
        style={{ "--accent-color": accentColor } as React.CSSProperties}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};
