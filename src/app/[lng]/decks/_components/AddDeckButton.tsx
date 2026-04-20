import { useT } from "next-i18next/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useDeckStore } from "@/hooks/useDeckStore";
import { Plus } from "lucide-react";

export function AddDeckButton() {
  const { t } = useT();
  const router = useRouter();
  const { addDeck } = useDeckStore();

  const handleCreateDeck = () => {
    const newDeckId = addDeck(t("deck.add.placeholder"));
    router.push(`/decks/${newDeckId}`);
  };

  return (
    <Button
      onClick={handleCreateDeck}
      className="bg-violet-600 hover:bg-violet-700 text-white"
    >
      <Plus className="w-4 h-4 mr-2" />
      {t("deck.add.buttonLabel")}
    </Button>
  );
}
