import type { Card } from "@/features/cards/types";
import { CardArtArea } from "@/components/CardRenderer/CardFront/CardArtArea/CardArtArea";
import { CardSeparator } from "@/components/CardRenderer/CardFront/CardSeparator/CardSeparator";
import { CardSubheader } from "@/components/CardRenderer/CardFront/CardSubheader/CardSubheader";
import { CardHeader } from "@/components/CardRenderer/CardFront/CardHeader/CardHeader";
import { SpellStats } from "@/components/CardRenderer/CardFront/SpellStats/SpellStats";
import { CardBody } from "@/components/CardRenderer/CardFront/CardBody/CardBody";
import { getCardRadii } from "@/lib/cardConstants";
import { useDeckStore } from "@/hooks/useDeckStore";

interface CardFrontProps {
  data: Card;
}

export const CardFront: React.FC<CardFrontProps> = ({ data }) => {
  const { title, description, visuals } = data;

  // Get typography settings from current deck
  const { decks, currentDeckIndex } = useDeckStore();
  const cornerRadius = decks[currentDeckIndex]?.style?.cornerRadius ?? 1.5;
  const imageHeightPercent =
    decks[currentDeckIndex]?.style?.imageHeightPercent ?? 40;

  const { outerRadius, padding, innerRadius } = getCardRadii(cornerRadius);

  return (
    <div
      className={`w-full h-full bg-black flex items-center justify-center`}
      style={{ padding, borderRadius: outerRadius }}
    >
      <div
        className={`w-full h-full flex flex-col overflow-hidden relative`}
        style={{ borderRadius: innerRadius }}
      >
        {/* 1. IMAGE AREA */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{ height: `${imageHeightPercent}%` }}
        >
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
        <div
          className="absolute left-0 right-0 bottom-0 flex flex-col bg-white pt-2"
          style={{ top: `${imageHeightPercent}%` }}
        >
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
