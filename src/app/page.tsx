'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CardRenderer } from '@/components/CardRenderer/CardRenderer';
import { CardEditor } from '@/components/CardEditor/CardEditor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useDeckStore } from '@/hooks/useDeckStore';
import { DeckList } from '@/components/DeckList/DeckList';
import { ImportExportEditor } from '@/components/ImportExportEditor/ImportExportEditor';


export default function Home() {
  const { decks, currentDeckIndex, currentCardIndex, updateCard, setCurrentCard } = useDeckStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentDeck = decks[currentDeckIndex];
  const currentCard = currentDeck?.cards[currentCardIndex];

  // Safety check
  if (!currentDeck || !currentCard) {
    return <div className="flex h-screen w-full bg-slate-950 text-slate-100 items-center justify-center">
      Loading...
    </div>;
  }

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Left Sidebar: Deck List */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900 flex flex-col">
        <div className="h-14 flex items-center px-4">
          <span className="font-bold text-lg tracking-tight text-amber-500">D&D Cards</span>
        </div>
        <DeckList
          decks={decks}
          currentDeckIndex={currentDeckIndex}
          currentCardIndex={currentCardIndex}
          onCardSelect={setCurrentCard}
        />
      </aside>

      {/* Main Content Area: Canvas */}
      <main className="flex-1 flex flex-col relative min-w-0">
        {/* Top Header */}
        <header className="h-14 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between px-6">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-400">{currentDeck.name}</span>
            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <h1 className="font-semibold text-slate-200">{currentCard.title || 'Untitled Card'}</h1>
          </div>

          <Link href="/print">
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-100 hover:bg-slate-800">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Deck
            </Button>
          </Link>
        </header>

        {/* Canvas */}
        <div className="flex-1 bg-slate-950 relative overflow-hidden flex items-center justify-center p-8">
          {/* Grid pattern background */}
          <div className="absolute inset-0 opacity-[0.25]"
            style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
          </div>

          {/* Card and Button */}
          <div className="relative z-10 flex flex-col items-center gap-32">
            <div className="shadow-2xl shadow-black/50">
              <CardRenderer data={currentCard} scale={1.5} />
            </div>

            {/* Add Card Button */}
            {/* Moved to Header */}
          </div>
        </div>
      </main>

      {/* Right Sidebar: Editor */}
      <aside className="w-96 border-l border-slate-800 bg-slate-900 flex flex-col">
        <Tabs defaultValue="edit" className="flex-1 flex flex-col min-h-0">
          <div className="h-14 border-b border-slate-800 flex items-center px-4 shrink-0">
            <TabsList className="grid w-full grid-cols-2 bg-slate-800">
              <TabsTrigger
                value="edit"
                className="text-slate-400 data-[state=active]:bg-slate-700 data-[state=active]:text-slate-100 hover:text-slate-200 transition-colors"
              >
                Properties
              </TabsTrigger>
              <TabsTrigger
                value="import"
                className="text-slate-400 data-[state=active]:bg-slate-700 data-[state=active]:text-slate-100 hover:text-slate-200 transition-colors"
              >
                Import / Export
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="edit" className="h-full m-0 border-0">
              <CardEditor
                initialData={currentCard}
                onChange={(card) => updateCard(currentDeckIndex, currentCardIndex, card)}
              />
            </TabsContent>
            <TabsContent value="import" className="h-full m-0 p-4">
              <ImportExportEditor
                data={currentCard}
                onChange={(card) => updateCard(currentDeckIndex, currentCardIndex, card)}
              />
            </TabsContent>
          </div>
        </Tabs>
      </aside>
    </div>
  );
}
