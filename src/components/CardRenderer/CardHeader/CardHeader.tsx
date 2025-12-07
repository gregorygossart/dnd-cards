import React from "react";
import { useDeckStore, BASE_PADDING } from "@/hooks/useDeckStore";

interface CardHeaderProps {
  title: string;
  titleFontSize?: number; // Font size in pixels, default: 24
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  titleFontSize = 24,
}) => {
  const { decks, currentDeckIndex } = useDeckStore();
  const paddingMultiplier =
    decks[currentDeckIndex]?.style?.paddingMultiplier ?? 1.0;

  return (
    <div
      className="text-center"
      style={{
        paddingLeft: `${BASE_PADDING.horizontal * paddingMultiplier}px`,
        paddingRight: `${BASE_PADDING.horizontal * paddingMultiplier}px`,
        paddingTop: `${4 * paddingMultiplier}px`, // Base: pt-1 (4px)
        paddingBottom: `${4 * paddingMultiplier}px`, // Base: pb-1 (4px)
      }}
    >
      <h2
        className="font-black tracking-tight uppercase leading-none"
        style={{ fontSize: `${titleFontSize}px` }}
      >
        {title}
      </h2>
    </div>
  );
};
