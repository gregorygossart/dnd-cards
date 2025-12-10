"use client";

import { Fragment, useEffect, useState } from "react";
import { CardRenderer, CardSide } from "@/components/CardRenderer/CardRenderer";
import { PRINT_CONFIG } from "@/lib/cardConstants";
import { useDeckStore } from "@/hooks/useDeckStore";

export default function PrintPage() {
  const { decks, currentDeckIndex } = useDeckStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const currentDeck = decks[currentDeckIndex];

  if (!currentDeck) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No deck found.
      </div>
    );
  }

  // Calculate available space
  const contentWidth =
    PRINT_CONFIG.PAPER.WIDTH_MM - 2 * PRINT_CONFIG.PAPER.MARGIN_MM;
  const contentHeight =
    PRINT_CONFIG.PAPER.HEIGHT_MM - 2 * PRINT_CONFIG.PAPER.MARGIN_MM;

  // Calculate grid dimensions
  const cols = Math.floor(contentWidth / PRINT_CONFIG.CARD.WIDTH_MM);
  const rows = Math.floor(contentHeight / PRINT_CONFIG.CARD.HEIGHT_MM);
  const cardsPerPage = cols * rows;

  // Chunk cards into pages
  const pages = [];
  for (let i = 0; i < currentDeck.cards.length; i += cardsPerPage) {
    pages.push(currentDeck.cards.slice(i, i + cardsPerPage));
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8 print:p-0 print:bg-white font-sans">
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

      {/* Toolbar (hidden on print) */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-slate-900 text-white flex items-center justify-between px-8 shadow-lg print:hidden z-50">
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-lg">Print Preview</h1>
          <span className="text-slate-400">|</span>
          <span className="text-slate-300">
            {currentDeck.name} ({currentDeck.cards.length} cards)
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.print()}
            className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded font-medium transition-colors flex items-center gap-2"
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
            Print
          </button>
          <button
            onClick={() => window.history.back()}
            className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded font-medium transition-colors"
          >
            Back
          </button>
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
                  gridTemplateColumns: `repeat(${cols}, ${PRINT_CONFIG.CARD.WIDTH_MM}mm)`,
                  gridTemplateRows: `repeat(${rows}, ${PRINT_CONFIG.CARD.HEIGHT_MM}mm)`,
                  justifyContent: "space-between",
                  alignContent: "space-between",
                }}
              >
                {pageCards.map((card, index) => (
                  <CardRenderer
                    key={`front-${index}`}
                    data={card}
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
                  gridTemplateColumns: `repeat(${cols}, ${PRINT_CONFIG.CARD.WIDTH_MM}mm)`,
                  gridTemplateRows: `repeat(${rows}, ${PRINT_CONFIG.CARD.HEIGHT_MM}mm)`,
                  justifyContent: "space-between",
                  alignContent: "space-between",
                  direction: "rtl", // This mirrors the grid layout horizontally
                }}
              >
                {pageCards.map((card, index) => (
                  <div key={`back-${index}`} style={{ direction: "ltr" }}>
                    {/* Reset direction for content so text isn't backwards */}
                    <CardRenderer
                      data={card}
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
