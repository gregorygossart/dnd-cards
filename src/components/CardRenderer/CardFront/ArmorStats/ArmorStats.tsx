import React from "react";
import { Badge } from "@/components/ui/badge";
import { useDeckStore, BASE_PADDING } from "@/hooks/useDeckStore";
import { useT } from "next-i18next/client";

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
  const { t } = useT();
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
        <Badge variant="light" style={{ fontSize: `${badgeFontSize}px` }}>
          {t("card.item.attunement")}
        </Badge>
      )}

      {/* AC Badge */}
      <Badge variant="light" style={{ fontSize: `${badgeFontSize}px` }}>
        {ac} {t("card.armor.ac")}
      </Badge>

      {/* Strength Req Badge */}
      {strengthRequirement && (
        <Badge variant="light" style={{ fontSize: `${badgeFontSize}px` }}>
          {t("card.armor.strengthRequired", { value: strengthRequirement })}
        </Badge>
      )}

      {/* Stealth Disadvantage Badge */}
      {stealthDisadvantage && (
        <Badge variant="light" style={{ fontSize: `${badgeFontSize}px` }}>
          {t("card.armor.stealthDisadvantage")}
        </Badge>
      )}
    </div>
  );
};
