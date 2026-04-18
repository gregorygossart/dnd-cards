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
      className="absolute bottom-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 bg-amber-500 text-white px-3 py-1.5 rounded-full shadow-xl text-sm font-semibold animate-in fade-in border-2 border-white"
      style={{
        animationDuration: "200ms",
      }}
    >
      <AlertTriangle className="w-4 h-4" />
      <span>Overflow</span>
    </div>
  );
};
