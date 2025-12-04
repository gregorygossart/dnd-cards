/**
 * Card Dimensions Constants
 * 
 * PHYSICAL DIMENSIONS (Print Output)
 * Standard TCG size: 2.5" x 3.5" (63.5mm x 88.9mm)
 * At 96 DPI (Web Standard), this converts to pixels.
 */
export const CARD_WIDTH_MM = 63.5;
export const CARD_HEIGHT_MM = 88.9;

export const PIXELS_PER_MM = 96 / 25.4; // ~3.7795

// The actual display size of the card (Physical Size)
export const CARD_WIDTH = CARD_WIDTH_MM * PIXELS_PER_MM;   // ~240px
export const CARD_HEIGHT = CARD_HEIGHT_MM * PIXELS_PER_MM; // ~336px

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
