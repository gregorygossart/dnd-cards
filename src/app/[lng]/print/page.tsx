"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { CardRenderer, CardSide } from "@/components/CardRenderer/CardRenderer";
import { PRINT_CONFIG, getCardDimensions } from "@/lib/cardConstants";
import { useT } from "next-i18next/client";
import { useDeckStore } from "@/hooks/useDeckStore";
import { useDeckListOverflow } from "@/hooks/overflow/useDeckListOverflow";

export default function PrintPage() {
  const { decks, currentDeckIndex } = useDeckStore();
  const { t, i18n } = useT();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check for overflow in all decks - MUST be called before any conditional returns
  const overflowState = useDeckListOverflow(decks.map(d => ({ id: d.id, cards: d.cards, style: d.style })));

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {t("common.loading")}
      </div>
    );
  }

  const currentDeck = decks[currentDeckIndex];
  
  // Check if current deck has overflow
  const currentDeckOverflow = currentDeck ? overflowState.decks.get(currentDeck.id) : null;
  const hasOverflow = currentDeckOverflow?.hasOverflow ?? false;
  const overflowCount = currentDeckOverflow?.results.filter(r => r.hasOverflow).length ?? 0;

  if (!currentDeck) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {t("deck.noDeckFound")}
      </div>
    );
  }

  // Get card dimensions
  const cardFormat = currentDeck.style.cardFormat;
  const cardDims = getCardDimensions(cardFormat);
  const cardWidthMm = cardDims.widthMm;
  const cardHeightMm = cardDims.heightMm;

  // Calculate available space
  const contentWidth =
    PRINT_CONFIG.PAPER.WIDTH_MM - 2 * PRINT_CONFIG.PAPER.MARGIN_MM;
  const contentHeight =
    PRINT_CONFIG.PAPER.HEIGHT_MM - 2 * PRINT_CONFIG.PAPER.MARGIN_MM;

  // Calculate grid dimensions
  const cols = cardWidthMm > 0 ? Math.floor(contentWidth / cardWidthMm) : 0;
  const rows = cardHeightMm > 0 ? Math.floor(contentHeight / cardHeightMm) : 0;
  const cardsPerPage = cols * rows;

  // Chunk cards into pages
  const pages = [];
  for (let i = 0; i < currentDeck.cards.length; i += cardsPerPage) {
    pages.push(currentDeck.cards.slice(i, i + cardsPerPage));
  }

  return (
    <div className="h-screen overflow-y-auto bg-slate-100 p-8 print:h-auto print:overflow-visible print:p-0 print:bg-white font-sans">
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .print-page-break {
            break-after: page;
            page-break-after: always;
          }
        }
      `}</style>

      {/* Overflow warning banner */}
      {hasOverflow && (
        <div className="fixed top-0 left-0 right-0 bg-orange-500 text-white px-8 py-2 print:hidden z-50">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="font-medium">
              Fix required: {overflowCount} card{overflowCount !== 1 ? 's' : ''} exceed the available space. Printing is disabled until resolved.
            </span>
          </div>
        </div>
      )}

      {/* Toolbar (hidden on print) */}
      <div className={`fixed left-0 right-0 bg-slate-900 text-white flex items-center justify-between px-8 shadow-lg print:hidden z-40 ${hasOverflow ? 'top-10 h-14' : 'top-0 h-16'}`}>
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-lg">{t("printPage.printPreview")}</h1>
          <span className="text-slate-400">|</span>
          <span className="text-slate-300">
            {currentDeck.name} ({currentDeck.cards.length} cards)
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.print()}
            disabled={hasOverflow}
            className="bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded font-medium transition-colors flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            {t("printPage.print")}
          </button>
          <Link
            href={`/${i18n.language}`}
            className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded font-medium transition-colors"
          >
            {t("common.back")}
          </Link>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-16 print:hidden"></div>

      <div className="flex flex-col gap-8 print:block print:gap-0">
        {pages.map((pageCards, pageIndex) => (
          <Fragment key={pageIndex}>
            {/* Front Page */}
            <div
              className="mx-auto bg-white shadow-xl print:shadow-none overflow-hidden relative print-page-break flex flex-col"
              style={{
                width: `${PRINT_CONFIG.PAPER.WIDTH_MM}mm`,
                height: `${PRINT_CONFIG.PAPER.HEIGHT_MM}mm`,
                padding: `${PRINT_CONFIG.PAPER.MARGIN_MM}mm`,
              }}
            >
              <div
                className="flex-1 grid"
                style={{
                  gridTemplateColumns: `repeat(${cols}, ${cardWidthMm}mm)`,
                  gridTemplateRows: `repeat(${rows}, ${cardHeightMm}mm)`,
                  justifyContent: "space-between",
                  alignContent: "space-between",
                }}
              >
                {pageCards.map((card, index) => (
                  <CardRenderer
                    key={`front - ${index} `}
                    data={card}
                    deckStyle={currentDeck.style}
                    className="page-break-inside-avoid break-inside-avoid"
                    showShadow={false}
                    side={CardSide.Front}
                  />
                ))}
              </div>
            </div>

            {/* Back Page */}
            <div
              className="mx-auto bg-white shadow-xl print:shadow-none overflow-hidden relative print-page-break flex flex-col"
              style={{
                width: `${PRINT_CONFIG.PAPER.WIDTH_MM}mm`,
                height: `${PRINT_CONFIG.PAPER.HEIGHT_MM}mm`,
                padding: `${PRINT_CONFIG.PAPER.MARGIN_MM}mm`,
              }}
            >
              <div
                className="flex-1 grid"
                style={{
                  gridTemplateColumns: `repeat(${cols}, ${cardWidthMm}mm)`,
                  gridTemplateRows: `repeat(${rows}, ${cardHeightMm}mm)`,
                  justifyContent: "space-between",
                  alignContent: "space-between",
                  direction: "rtl", // This mirrors the grid layout horizontally
                }}
              >
                {pageCards.map((card, index) => (
                  <div key={`back - ${index} `} style={{ direction: "ltr" }}>
                    {/* Reset direction for content so text isn't backwards */}
                    <CardRenderer
                      data={card}
                      deckStyle={currentDeck.style}
                      className="page-break-inside-avoid break-inside-avoid"
                      showShadow={false}
                      side={CardSide.Back}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
