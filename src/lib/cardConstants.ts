/**
 * Card Dimensions Constants
 * 
 * These dimensions maintain the standard Trading Card Game (TCG) aspect ratio of 5:7,
 * which corresponds to the physical size of 2.5" × 3.5" (63.5mm × 88.9mm).
 * 
 * Why 360×504px?
 * - Maintains exact 5:7 ratio (360÷72 = 5, 504÷72 = 7)
 * - Large enough for comfortable editing and viewing on screen
 * - Scales cleanly to print size (360px × 0.694 ≈ 250px = 2.5" at 100dpi)
 * - Similar to the original 320×480px size for familiar UX
 * - Divisible by common scaling factors (2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72)
 */

export const CARD_WIDTH = 360;
export const CARD_HEIGHT = 504;

/**
 * Physical TCG card dimensions in inches
 */
export const CARD_WIDTH_INCHES = 2.5;
export const CARD_HEIGHT_INCHES = 3.5;

/**
 * Aspect ratio (width:height)
 */
export const CARD_ASPECT_RATIO = 5 / 7;
