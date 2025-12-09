import { CardFormat } from "@/types/card";

/**
 * Card Dimensions by Format
 *
 * Poker: Poker card size 2.5" x 3.5" (63.5mm x 88.9mm)
 * Tarot: Tarot card size 2.75" x 4.75" (70mm x 120mm)
 */
export const CARD_FORMATS = {
  [CardFormat.Poker]: {
    WIDTH_MM: 63.5,
    HEIGHT_MM: 88.9,
  },
  [CardFormat.Tarot]: {
    WIDTH_MM: 70.0,
    HEIGHT_MM: 120.0,
  },
} as const;

// Current card format - change this to switch between formats
export const CURRENT_CARD_FORMAT = CardFormat.Tarot;

// Active card dimensions based on current format
export const CARD_WIDTH_MM = CARD_FORMATS[CURRENT_CARD_FORMAT].WIDTH_MM;
export const CARD_HEIGHT_MM = CARD_FORMATS[CURRENT_CARD_FORMAT].HEIGHT_MM;

export const PIXELS_PER_MM = 96 / 25.4; // ~3.7795

// Card border width in millimeters (3mm is industry standard for TCG cards)
export const CARD_BORDER_MM = 3;

// The actual display size of the card (Physical Size)
export const CARD_WIDTH = CARD_WIDTH_MM * PIXELS_PER_MM; // Tarot: ~265px, TCG: ~240px
export const CARD_HEIGHT = CARD_HEIGHT_MM * PIXELS_PER_MM; // Tarot: ~454px, TCG: ~336px

/**
 * Get card dimensions for a specific format
 */
export function getCardDimensions(format: CardFormat) {
  const widthMm = CARD_FORMATS[format].WIDTH_MM;
  const heightMm = CARD_FORMATS[format].HEIGHT_MM;

  return {
    width: widthMm * PIXELS_PER_MM,
    height: heightMm * PIXELS_PER_MM,
    widthMm,
    heightMm,
  };
}

/**
 * Calculate card border radii for perfect inner/outer radius
 * Based on: https://tailtips.dev/blog/perfect-inner-outer-radius/
 * @param cornerRadiusRem - Corner radius in rem units (e.g., 1.5)
 */
export const getCardRadii = (cornerRadiusRem: number) => {
  const borderWidthPx = CARD_BORDER_MM * PIXELS_PER_MM; // ~12px
  const outerRadius = `${cornerRadiusRem}rem`;
  const padding = `${borderWidthPx}px`;
  const innerRadius = `calc(${outerRadius} - ${padding})`;

  return {
    outerRadius,
    padding,
    innerRadius,
  };
};

/**
 * Print Configuration
 * Dimensions in millimeters
 */
export const PRINT_CONFIG = {
  PAPER: {
    WIDTH_MM: 210, // A4
    HEIGHT_MM: 297,
    MARGIN_MM: 5,
  },
  CARD: {
    WIDTH_MM: CARD_WIDTH_MM,
    HEIGHT_MM: CARD_HEIGHT_MM,
  },
} as const;

export const CARD_BACK_PRESETS = [
  {
    id: "shield-sword",
    name: "Shield & Sword",
    src: "/card-backs/shield-sword.png",
  },
] as const;
