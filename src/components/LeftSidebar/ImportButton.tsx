import React, { useRef, useCallback } from "react";
import { useDeckStore } from "@/hooks/useDeckStore";
import { importDeckFromFile, ImportError } from "@/lib/share/import";
import { useT } from "next-i18next/client";
import { Button } from "@/components/ui/button";

export const ImportButton: React.FC = () => {
  const { addDeck } = useDeckStore();
  const { t } = useT();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const deckData = await importDeckFromFile(file);
      addDeck(deckData.name, deckData.cards, deckData.style);
    } catch (error) {
      if (error instanceof ImportError) {
        alert(t("share.importError", { message: error.message }));
      } else {
        alert(t("share.importError", { message: "Unknown error" }));
      }
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [addDeck, t]);

  return (
    <>
      <Button
        onClick={handleImportClick}
        variant="outline"
        size="sm"
        className="w-full flex items-center justify-center gap-2 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-100"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L7 8m4-4v12"
          />
        </svg>
        {t("share.importDeck") || "Import Deck"}
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
};
