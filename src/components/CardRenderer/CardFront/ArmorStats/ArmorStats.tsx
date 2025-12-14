import React from "react";
import { Badge } from "@/components/ui/badge";
import { useDeckStore, BASE_PADDING } from "@/hooks/useDeckStore";

interface ArmorStatsProps {
  ac: string;
  strengthRequirement?: number;
  stealthDisadvantage: boolean;
  attunement?: boolean;
}

export const ArmorStats: React.FC<ArmorStatsProps> = ({
  ac,
  strengthRequirement,
  stealthDisadvantage,
  attunement,
}) => {
  const { decks, currentDeckIndex } = useDeckStore();
  const bodyFontSize = decks[currentDeckIndex]?.style?.bodyFontSize ?? 14;
  const paddingMultiplier =
    decks[currentDeckIndex]?.style?.paddingMultiplier ?? 1.0;
  const badgeFontSize = bodyFontSize - 2;

  return (
    <div
      className="flex gap-1.5 flex-wrap justify-center w-full"
      style={{
        paddingLeft: `${BASE_PADDING.horizontal * paddingMultiplier}px`,
        paddingRight: `${BASE_PADDING.horizontal * paddingMultiplier}px`,
        paddingTop: `${BASE_PADDING.vertical * paddingMultiplier}px`,
        paddingBottom: `${BASE_PADDING.vertical * paddingMultiplier}px`,
      }}
    >
      {attunement && (
        <Badge variant="secondary" style={{ fontSize: `${badgeFontSize}px` }}>
          Attunement
        </Badge>
      )}

      {/* AC Badge */}
      <Badge variant="secondary" style={{ fontSize: `${badgeFontSize}px` }}>
        {ac} AC
      </Badge>

      {/* Strength Req Badge */}
      {strengthRequirement && (
        <Badge variant="secondary" style={{ fontSize: `${badgeFontSize}px` }}>
          Requires {strengthRequirement} Str
        </Badge>
      )}

      {/* Stealth Disadvantage Badge */}
      {stealthDisadvantage && (
        <Badge variant="secondary" style={{ fontSize: `${badgeFontSize}px` }}>
          Stealth (Disadv)
        </Badge>
      )}
    </div>
  );
};
