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

// Card border width in millimeters (3mm is industry standard for TCG cards)
export const CARD_BORDER_MM = 3;

// Card corner radius (matches Tailwind's rounded-3xl)
export const CARD_CORNER_RADIUS = 'var(--radius-3xl)';

// The actual display size of the card (Physical Size)
export const CARD_WIDTH = CARD_WIDTH_MM * PIXELS_PER_MM;   // ~240px
export const CARD_HEIGHT = CARD_HEIGHT_MM * PIXELS_PER_MM; // ~336px

/**
 * Calculate card border radii for perfect inner/outer radius
 * Based on: https://tailtips.dev/blog/perfect-inner-outer-radius/
 */
export const getCardRadii = () => {
    const borderWidthPx = CARD_BORDER_MM * PIXELS_PER_MM; // ~12px
    const outerRadius = CARD_CORNER_RADIUS;
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
    { id: 'arcane-tome', name: 'Arcane Tome', src: '/card-backs/arcane-tome.png' },
    { id: 'dragon-scales', name: 'Dragon Scales', src: '/card-backs/dragon-scales.png' },
    { id: 'celestial-void', name: 'Celestial Void', src: '/card-backs/celestial-void.png' },
    { id: 'shield-sword', name: 'Shield & Sword', src: '/card-backs/shield-sword.png' },
] as const;
