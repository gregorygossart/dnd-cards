"use client";

import React, { useState } from "react";
import { useT } from "next-i18next/client";
import { BookOpen } from "lucide-react";
import { SpellLibraryDialog } from "@/components/SpellLibrary/SpellLibraryDialog";

interface SpellLibraryButtonProps {
  deckId?: string;
}

export const SpellLibraryButton: React.FC<SpellLibraryButtonProps> = ({ deckId }) => {
  const { t } = useT();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!deckId) return null;

  return (
    <>
      <button
        onClick={() => setDialogOpen(true)}
        className="w-full px-3 py-2 text-left text-sm rounded-lg transition-colors flex items-center gap-2 group hover:bg-slate-800/50 text-slate-400 hover:text-slate-300 border border-dashed border-slate-700"
      >
        <div className="w-4 h-4 rounded shrink-0 bg-slate-700 group-hover:bg-amber-600 flex items-center justify-center">
          <BookOpen className="w-3 h-3" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="truncate font-medium">{t("library.spellLibrary")}</span>
        </div>
      </button>
      <SpellLibraryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        deckId={deckId}
      />
    </>
  );
};
