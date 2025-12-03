'use client';

import { useState, useEffect } from 'react';
import { CardRenderer } from '@/components/CardRenderer/CardRenderer';
import { CardEditor } from '@/components/CardEditor/CardEditor';
import { CardImporter } from '@/components/CardImporter/CardImporter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDeckStore } from '@/hooks/useDeckStore';


export default function Home() {
  const { deck, currentCardIndex, updateCard } = useDeckStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentCard = deck.cards[currentCardIndex];


  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Left Sidebar: Templates/Codex Placeholder */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 flex flex-col">
        <div className="h-14 border-b border-slate-800 flex items-center px-4">
          <span className="font-bold text-lg tracking-tight text-amber-500">D&D Cards</span>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold mb-4">Base Templates</div>
          {/* Placeholder items */}
          <div className="space-y-2 opacity-50">
            {['Recovery', 'Bone-Touched', 'Cruel Precision', 'Breaking Blow'].map((item) => (
              <div key={item} className="p-2 rounded hover:bg-slate-800 cursor-pointer text-sm text-slate-300">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-8 text-xs text-slate-600">
            More content coming soon...
          </div>
        </div>
      </aside>

      {/* Main Content Area: Canvas */}
      <main className="flex-1 flex flex-col relative min-w-0">
        {/* Top Header */}
        <header className="h-14 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <h1 className="font-semibold text-slate-200">{currentCard.title || 'Untitled Card'}</h1>
            <span className="text-xs text-slate-500 px-2 py-0.5 rounded bg-slate-800">Draft</span>
          </div>
          <div className="text-xs text-slate-500">
            {mounted && `Last updated: ${new Date().toLocaleTimeString()}`}
          </div>
        </header>

        {/* Canvas */}
        <div className="flex-1 bg-slate-950 relative overflow-hidden flex items-center justify-center p-8">
          {/* Grid pattern background */}
          <div className="absolute inset-0 opacity-[0.25]"
            style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
          </div>

          <div className="relative z-10 shadow-2xl shadow-black/50">
            <CardRenderer data={currentCard} />
          </div>
        </div>
      </main>

      {/* Right Sidebar: Editor */}
      <aside className="w-96 border-l border-slate-800 bg-slate-900 flex flex-col">
        <Tabs defaultValue="edit" className="flex-1 flex flex-col min-h-0">
          <div className="h-14 border-b border-slate-800 flex items-center px-4 shrink-0">
            <TabsList className="grid w-full grid-cols-2 bg-slate-800 text-slate-400">
              <TabsTrigger value="edit" className="data-[state=active]:bg-slate-700 data-[state=active]:text-slate-100">Properties</TabsTrigger>
              <TabsTrigger value="import" className="data-[state=active]:bg-slate-700 data-[state=active]:text-slate-100">Import/Export</TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="edit" className="h-full m-0 border-0">
              <CardEditor
                initialData={currentCard}
                onChange={(card) => updateCard(currentCardIndex, card)}
              />
            </TabsContent>
            <TabsContent value="import" className="h-full m-0 p-4">
              <CardImporter
                onImport={(data) => {
                  updateCard(currentCardIndex, data);
                }}
              />
              <div className="mt-8 p-4 bg-slate-950 rounded border border-slate-800 text-xs text-slate-500 font-mono overflow-auto max-h-60">
                <div className="mb-2 font-bold text-slate-400">Current Data JSON:</div>
                {JSON.stringify(currentCard, null, 2)}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </aside>
    </div>
  );
}
