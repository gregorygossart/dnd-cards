import { useMemo } from "react";
import { Card } from "@/features/cards/types";
import { CardMainBadge } from "./CardMainBadge/CardMainBadge";
import { CardSeparatorSvg } from "@/components/svg/CardSeparatorSvg";

interface CardSeparatorProps {
  card: Card;
}

export const CardSeparator: React.FC<CardSeparatorProps> = ({ card }) => {
  const badgeContent = useMemo(() => {
    if (card.type === "Spell") {
      return card.level;
    }

    return undefined;
  }, [card]);

  return (
    <div className="relative">
      <CardSeparatorSvg color={card.visuals.accentColor} className="w-full" />

      {badgeContent !== undefined && (
        <div className="absolute left-8 -bottom-2 z-40">
          <CardMainBadge card={card}>{badgeContent}</CardMainBadge>
        </div>
      )}
    </div>
  );
};
