import React from "react";
import {
  formatCastingTime,
  formatRange,
  formatDuration,
  formatComponents,
} from "@/lib/cardUtils";
import type {
  CastingTime,
  Range,
  Duration,
  Components,
} from "@/features/spells/types";
import { Badge } from "@/components/ui/badge";
import { useDeckStore, BASE_PADDING } from "@/hooks/useDeckStore";
import { useT } from "next-i18next/client";

interface SpellStatsProps {
  castingTime: CastingTime;
  range: Range;
  duration: Duration;
  ritual: boolean;
  components: Components;
}

export const SpellStats: React.FC<SpellStatsProps> = ({
  castingTime,
  range,
  duration,
  ritual,
  components,
}) => {
  const { t } = useT();
  const hasConcentration =
    "concentration" in duration && duration.concentration;

  // Get body font size and calculate badge size (2px smaller to maintain hierarchy)
  const { decks, currentDeckIndex } = useDeckStore();
  const bodyFontSize = decks[currentDeckIndex]?.style?.bodyFontSize ?? 14;
  const paddingMultiplier =
    decks[currentDeckIndex]?.style?.paddingMultiplier ?? 1.0;
  const badgeFontSize = bodyFontSize - 2;

  return (
    <div
      className="flex gap-1.5 flex-wrap justify-center"
      style={{
        paddingLeft: `${BASE_PADDING.horizontal * paddingMultiplier}px`,
        paddingRight: `${BASE_PADDING.horizontal * paddingMultiplier}px`,
        paddingTop: `${BASE_PADDING.vertical * paddingMultiplier}px`,
        paddingBottom: `${BASE_PADDING.vertical * paddingMultiplier}px`,
      }}
    >
      <Badge variant="light" style={{ fontSize: `${badgeFontSize}px` }}>
        {formatCastingTime(castingTime, t)}
      </Badge>
      {ritual && (
        <Badge variant="light" style={{ fontSize: `${badgeFontSize}px` }}>
          {t("card.spell.ritual")}
        </Badge>
      )}
      <Badge variant="light" style={{ fontSize: `${badgeFontSize}px` }}>
        {formatRange(range, t)}
      </Badge>
      {hasConcentration && (
        <Badge variant="light" style={{ fontSize: `${badgeFontSize}px` }}>
          {t("card.spell.concentration")}
        </Badge>
      )}
      <Badge variant="light" style={{ fontSize: `${badgeFontSize}px` }}>
        {formatDuration(duration, t)}
      </Badge>
      {(components.material || components.somatic || components.verbal) && (
        <Badge variant="light" style={{ fontSize: `${badgeFontSize}px` }}>
          {formatComponents(components)}
        </Badge>
      )}
      {components.materialDescription && (
        <span
          className="text-xs italic text-slate-500 w-full text-center"
          style={{ fontSize: `${badgeFontSize}px` }}
        >
          Materials: {components.materialDescription}
        </span>
      )}
    </div>
  );
};
