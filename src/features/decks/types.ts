import { CardFormat } from "@/features/cards/constants";
import { type Card } from "@/features/cards/types";

export interface DeckStyle {
  cardFormat: CardFormat;
  imageHeightPercent: number; // Image height as percentage of card height, default: 40 (range: 0-100)
  titleFontSize: number; // Font size in pixels, default: 24
  bodyFontSize: number; // Font size in pixels, default: 14
  lineHeight: number; // Line height multiplier, default: 1.5
  paddingMultiplier: number; // Padding multiplier, default: 1.0 (range: 0.5-1.5)
  cornerRadius: number; // Corner radius in rem, default: 1.5 (range: 0.0-3.0)
}

export interface Deck {
  id: string;
  name: string;
  cards: Card[];
  style: DeckStyle;
}
