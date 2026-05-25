import React from "react";
import { AlertTriangle } from "lucide-react";

interface OverflowWarningProps {
  hasOverflow: boolean;
  show?: boolean;
}

/**
 * Visual indicator when card content overflows visible area
 * Shows an orange warning badge at the bottom of the card
 */
export const OverflowWarning: React.FC<OverflowWarningProps> = ({
  hasOverflow,
  show = true,
}) => {
  if (!hasOverflow || !show) return null;

  return (
    <div
      className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 z-50 flex items-center gap-1 bg-amber-500 text-white px-2 py-1 rounded-full shadow-lg text-xs font-semibold animate-in fade-in border-2 border-amber-400"
      style={{
        animationDuration: "200ms",
      }}
    >
      <AlertTriangle className="w-3 h-3" />
      <span>Overflow</span>
    </div>
  );
};
