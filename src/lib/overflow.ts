import React from "react";
import { createRoot, type Root } from "react-dom/client";
import type { Card } from "@/features/cards/types";
import type { DeckStyle } from "@/features/decks/types";
import { CardFront } from "@/components/CardRenderer/CardFront/CardFront";
import { getCardDimensions } from "./cardConstants";
import { CardFormat } from "@/features/cards/constants";

// =============================================================================
// TYPES
// =============================================================================

export interface CardOverflowResult {
  cardIndex: number;
  hasOverflow: boolean;
}

export interface DeckOverflowState {
  results: CardOverflowResult[];
  hasOverflow: boolean;
}

export interface AllDecksOverflowState {
  decks: Map<string, DeckOverflowState>;
}

/** Creates an off-screen DOM container with a React root for rendering cards without displaying them to the user. */
function createHiddenContainer(): { container: HTMLDivElement; root: Root } {
  const container = document.createElement("div");
  container.style.cssText = `
    position: fixed;
    top: -9999px;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
    pointer-events: none;
    visibility: hidden;
  `;
  document.body.appendChild(container);
  const root = createRoot(container);
  return { container, root };
}

/** Safely destroys the hidden container and React root to prevent memory leaks after overflow measurement. */
function cleanupContainer(container: HTMLDivElement, root: Root): void {
  // Defer cleanup to avoid "Attempted to synchronously unmount a root while React was already rendering"
  setTimeout(() => {
    try {
      root.unmount();
    } catch { }
    try {
      document.body.removeChild(container);
    } catch { }
  }, 0);
}

/** Renders a card off-screen and measures its DOM to detect if content exceeds the available space. */
export function checkCardOverflow(
  card: Card,
  style: DeckStyle,
): Promise<boolean> {
  return new Promise((resolve) => {
    // Create isolated container for this card (no shared state)
    const { container, root } = createHiddenContainer();
    const format = style.cardFormat === "Poker" ? CardFormat.Poker : CardFormat.Tarot;
    const dimensions = getCardDimensions(format);
    const resolution = 1.5;

    // Set container size to full card dimensions
    container.style.width = `${dimensions.width * resolution}px`;
    container.style.height = `${dimensions.height * resolution}px`;

    let resolved = false;

    // Use a ref callback that measures immediately when called
    const measureOverflow = (contentEl: HTMLElement | null) => {
      if (resolved) return;
      resolved = true;

      if (!contentEl) {
        cleanupContainer(container, root);
        resolve(false);
        return;
      }

      // Force layout calculation
      const scrollHeight = contentEl.scrollHeight;
      const clientHeight = contentEl.clientHeight;
      const hasOverflow = scrollHeight > clientHeight + 2;

      // Clean up immediately after measuring
      cleanupContainer(container, root);
      resolve(hasOverflow);
    };

    // Render CardFront with the provided style
    root.render(
      React.createElement(CardFront, {
        data: card,
        deckStyle: style,
        onContentRef: measureOverflow,
      })
    );

    // Safety timeout in case ref callback never fires
    setTimeout(() => {
      if (!resolved) {
        resolved = true;
        cleanupContainer(container, root);
        resolve(false);
      }
    }, 100);
  });
}
