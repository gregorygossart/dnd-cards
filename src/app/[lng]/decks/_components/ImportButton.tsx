import { useRef } from "react";
import { useT } from "next-i18next/client";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { importDeckFromFile, ImportError } from "@/lib/share/import";
import { toast } from "sonner";
import { useDeckStore } from "@/hooks/useDeckStore";

export function ImportButton() {
  const { t } = useT();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addDeck } = useDeckStore();

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const deckData = await importDeckFromFile(file);
      addDeck(deckData.name, deckData.cards, deckData.style);
      toast.success(`Imported "${deckData.name}"`);
    } catch (error) {
      if (error instanceof ImportError) {
        toast.error(t("share.importError", { message: error.message }));
      } else {
        toast.error(t("share.importError", { message: "Unknown error" }));
      }
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <Button
        onClick={handleClick}
        variant="ghost"
        size="sm"
        className="text-slate-400 hover:text-slate-100 hover:bg-slate-800"
      >
        <Upload className="w-4 h-4 mr-1 lg:mr-2" />
        <span className="hidden lg:inline">{t("share.importDeck")}</span>
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
}
