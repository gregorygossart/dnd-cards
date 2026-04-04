import type { Deck } from "@/features/decks/types";
import type { Card, CardVisuals } from "@/features/cards/types";
import { CardSchema } from "@/features/cards/types";
import { CardFormat } from "@/features/cards/constants";
import { putImageBlob, LOCAL_IMAGE_PREFIX } from "@/lib/share/cardImages";
import { z } from "zod";

const ExportedDeckSchema = z.object({
  name: z.string(),
  cards: z.array(CardSchema),
  style: z.object({
    cardFormat: z.enum(CardFormat),
    imageHeightPercent: z.number(),
    titleFontSize: z.number(),
    bodyFontSize: z.number(),
    lineHeight: z.number(),
    paddingMultiplier: z.number(),
    cornerRadius: z.number(),
  }),
  exportedAt: z.string().optional(),
});

export type ExportedDeck = z.infer<typeof ExportedDeckSchema>;

export class ImportError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ImportError";
  }
}

/** Checks if a string is a base64 data URL */
function isDataUrl(value: string | undefined): value is string {
  return typeof value === "string" && value.startsWith("data:");
}

/** Converts a base64 data URL to a Blob */
function dataUrlToBlob(dataUrl: string): Blob {
  const arr = dataUrl.split(",");
  const mime = arr[0]?.match(/:(.*?);/)?.[1] || "image/jpeg";
  const bstr = atob(arr[1] || "");
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

/** Converts data URLs in visuals to local IndexedDB refs */
async function resolveVisualsForImport(visuals: CardVisuals): Promise<CardVisuals> {
  let headerImage = visuals.headerImage;
  let backImage = visuals.backImage;

  if (isDataUrl(headerImage)) {
    const blob = dataUrlToBlob(headerImage);
    const id = crypto.randomUUID();
    await putImageBlob(id, blob);
    headerImage = `${LOCAL_IMAGE_PREFIX}${id}`;
  }

  if (isDataUrl(backImage)) {
    const blob = dataUrlToBlob(backImage);
    const id = crypto.randomUUID();
    await putImageBlob(id, blob);
    backImage = `${LOCAL_IMAGE_PREFIX}${id}`;
  }

  return { ...visuals, headerImage, backImage };
}

/** Converts data URLs in card to local IndexedDB refs */
async function resolveCardForImport(card: Card): Promise<Card> {
  const visuals = await resolveVisualsForImport(card.visuals);
  return { ...card, visuals };
}

export async function importDeckFromFile(file: File): Promise<Omit<Deck, "id">> {
  const content = await file.text();

  try {
    const parsed = JSON.parse(content);
    const result = ExportedDeckSchema.safeParse(parsed);

    if (!result.success) {
      const firstError = result.error.issues[0];
      const fieldPath = firstError.path.length > 0 ? firstError.path.join(".") : "root";
      throw new ImportError(`Invalid deck file: ${fieldPath} - ${firstError.message}`);
    }

    const exportedDeck = result.data;

    // Convert data URLs to local IndexedDB refs
    const cardsWithLocalImages = await Promise.all(
      exportedDeck.cards.map((card) => resolveCardForImport(card))
    );

    return {
      name: exportedDeck.name,
      cards: cardsWithLocalImages,
      style: exportedDeck.style,
    };
  } catch (e) {
    if (e instanceof ImportError) {
      throw e;
    } else if (e instanceof SyntaxError) {
      throw new ImportError("Invalid JSON file");
    } else {
      throw new ImportError("Unknown error importing deck");
    }
  }
}
