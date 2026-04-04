import type { Deck } from "@/features/decks/types";
import { resolveCardForExport } from "@/lib/share/cardImages";

export type ExportedDeck = Omit<Deck, "id"> & {
  exportedAt: string;
};

export async function exportDeck(deck: Deck): Promise<void> {
  // Convert local image refs to data URLs for portability
  const cardsWithEmbeddedImages = await Promise.all(
    deck.cards.map((card) => resolveCardForExport(card))
  );

  const exportData: ExportedDeck = {
    name: deck.name,
    cards: cardsWithEmbeddedImages,
    style: deck.style,
    exportedAt: new Date().toISOString(),
  };

  const jsonString = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const timestamp = new Date().toISOString().split("T")[0];
  const filename = `${deck.name.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_${timestamp}.json`;

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
