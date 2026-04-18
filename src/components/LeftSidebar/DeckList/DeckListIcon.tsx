import React from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

interface DeckListIconProps {
  /** If true, shows warning triangle instead of default icon */
  isWarning?: boolean;
  /** If true, applies active/current deck styling */
  isActive?: boolean;
  /** Additional classes */
  className?: string;
  /** Children - default icon to show when not warning */
  children?: React.ReactNode;
}

/**
 * Reusable icon component for deck list items
 * Used for deck icons, card icons, and action buttons
 */
export const DeckListIcon: React.FC<DeckListIconProps> = ({
  isWarning = false,
  isActive = false,
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "w-5 h-5 rounded flex items-center justify-center shrink-0",
        isWarning
          ? "bg-amber-500 text-white"
          : isActive
            ? "bg-violet-600 text-white"
            : "bg-slate-700 text-slate-400",
        className,
      )}
    >
      {isWarning ? (
        <AlertTriangle className="w-3 h-3" />
      ) : (
        children
      )}
    </div>
  );
};
