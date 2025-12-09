import React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface EditorLabelProps extends React.ComponentProps<typeof Label> {
  children: React.ReactNode;
}

export const EditorLabel: React.FC<EditorLabelProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Label
      className={cn(
        "text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block",
        className,
      )}
      {...props}
    >
      {children}
    </Label>
  );
};
