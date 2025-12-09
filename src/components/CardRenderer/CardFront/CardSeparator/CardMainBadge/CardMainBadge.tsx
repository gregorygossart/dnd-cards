import { CardMainBadgeSvg } from "@/components/svg/CardMainBadgeSvg";
import { Card } from "@/types/card";

interface CardMainBadgeProps {
  card: Card;
  children: React.ReactNode;
}

export const CardMainBadge: React.FC<CardMainBadgeProps> = ({
  children,
  card,
}) => {
  return (
    <div className="relative w-14">
      <CardMainBadgeSvg
        bgColor="#FFFFFF"
        borderColor={card.visuals.accentColor}
        className="w-full h-full"
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-extrabold drop-shadow-md">
          {children}
        </span>
      </div>
    </div>
  );
};
