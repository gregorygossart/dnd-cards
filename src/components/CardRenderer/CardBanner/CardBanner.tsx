import React from "react";

interface CardBannerProps {
  subtitle?: string;
  accentColor?: string;
}

export const CardBanner: React.FC<CardBannerProps> = ({
  subtitle,
  accentColor,
}) => {
  return (
    <div className="relative z-10 -mt-5 mb-2 flex justify-center shrink-0">
      <div
        className="relative px-6 py-1 flex items-center justify-center shadow-md"
        style={{
          backgroundColor: accentColor,
          clipPath:
            "polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0% 50%)", // Hexagonal-ish banner
        }}
      >
        <span className="text-xs font-black uppercase tracking-widest text-white drop-shadow-sm">
          {subtitle || "Card Type"}
        </span>
      </div>
    </div>
  );
};
