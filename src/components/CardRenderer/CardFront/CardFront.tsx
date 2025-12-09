import React from "react";
import type { Card } from "@/types/card";
import { CardHeader } from "../CardHeader/CardHeader";
import { CardBody } from "../CardBody/CardBody";
import { SpellStats } from "../SpellStats/SpellStats";
import { CardArtArea } from "../CardArtArea/CardArtArea";
import { getCardRadii } from "@/lib/cardConstants";
import { useDeckStore } from "@/hooks/useDeckStore";
import { CardSeparator } from "./CardSeparator/CardSeparator";
import { CardSubheader } from "../CardSubheader/CardSubheader";

interface CardFrontProps {
  data: Card;
}

export const CardFront: React.FC<CardFrontProps> = ({ data }) => {
  const { title, description, visuals } = data;

  // Get typography settings from current deck
  const { decks, currentDeckIndex } = useDeckStore();
  const cornerRadius = decks[currentDeckIndex]?.style?.cornerRadius ?? 1.5;

  const { outerRadius, padding, innerRadius } = getCardRadii(cornerRadius);

  return (
    <div
      className={`w-full h-full bg-black flex items-center justify-center`}
      style={{ padding, borderRadius: outerRadius }}
    >
      <div
        className={`w-full h-full flex flex-col overflow-hidden`}
        style={{ borderRadius: innerRadius }}
      >
        {/* 1. IMAGE AREA */}
        <div className="relative">
          <CardArtArea image={visuals.headerImage} />

          {/* SEPARATOR - Centered vertically on the boundary line */}
          <div
            className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-10"
            style={{ marginLeft: `-${padding}`, marginRight: `-${padding}` }}
          >
            <CardSeparator card={data} />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-h-0 flex flex-col relative bg-white pt-2">
          <div className="mb-2">
            <CardSubheader card={data} />
            <CardHeader title={title} />
          </div>

          {data.type === "Spell" &&
            data.castingTime &&
            data.range &&
            data.duration &&
            data.components && (
              <SpellStats
                castingTime={data.castingTime}
                range={data.range}
                duration={data.duration}
                ritual={data.ritual}
                components={data.components}
              />
            )}

          <CardBody
            description={description}
            accentColor={visuals.accentColor}
          />
        </div>
      </div>
    </div>
  );
};
