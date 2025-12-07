import React from "react";
import { useDeckStore, BASE_PADDING } from "@/hooks/useDeckStore";

interface CardBodyProps {
  description: string;
  accentColor: string;
}

export const CardBody: React.FC<CardBodyProps> = ({
  description,
  accentColor,
}) => {
  // Get typography settings from current deck
  const { decks, currentDeckIndex } = useDeckStore();
  const bodyFontSize = decks[currentDeckIndex]?.style?.bodyFontSize ?? 14;
  const lineHeight = decks[currentDeckIndex]?.style?.lineHeight ?? 1.5;
  const paddingMultiplier =
    decks[currentDeckIndex]?.style?.paddingMultiplier ?? 1.0;

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
