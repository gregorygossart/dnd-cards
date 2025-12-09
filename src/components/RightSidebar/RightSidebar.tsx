import React, { useLayoutEffect, useState } from "react";
import { useUIStore } from "@/hooks/useUIStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardEditor } from "@/components/RightSidebar/CardEditor/CardEditor";
import { ImportExportEditor } from "@/components/RightSidebar/ImportExportEditor/ImportExportEditor";
import { useDeckStore } from "@/hooks/useDeckStore";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/useMediaQuery";

enum ActiveTab {
  Edit = "Edit",
  ImportExport = "ImportExport",
}

const RightSidebarContent = () => {
  const { decks, currentDeckIndex, currentCardIndex, updateCard } =
    useDeckStore();

  const currentDeck = decks[currentDeckIndex];
  const currentCard = currentDeck?.cards[currentCardIndex];

  const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.Edit);

  useLayoutEffect(() => {
    // Reset the tab when changing current deck or card
    setActiveTab(ActiveTab.Edit);
  }, [currentDeckIndex, currentCardIndex]);

  const onTabChange = (value: string) => {
    setActiveTab(value as ActiveTab);
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={onTabChange}
      className="flex-1 flex flex-col min-h-0"
    >
      <div className="h-14 border-b border-slate-800 flex items-center px-4 shrink-0">
        <TabsList className="grid w-full grid-cols-2 bg-slate-800">
          <TabsTrigger
            value={ActiveTab.Edit}
            className="text-slate-400 data-[state=active]:bg-slate-700 data-[state=active]:text-slate-100 hover:text-slate-200 transition-colors"
          >
            Properties
          </TabsTrigger>
          <TabsTrigger
            value={ActiveTab.ImportExport}
            className="text-slate-400 data-[state=active]:bg-slate-700 data-[state=active]:text-slate-100 hover:text-slate-200 transition-colors"
          >
            Import / Export
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="flex-1 overflow-y-auto">
        <TabsContent value={ActiveTab.Edit} className="h-full m-0 border-0">
          <CardEditor
            initialData={currentCard}
            onChange={(card) =>
              updateCard(currentDeckIndex, currentCardIndex, card)
            }
          />
        </TabsContent>
        <TabsContent value={ActiveTab.ImportExport} className="h-full m-0 p-4">
          <ImportExportEditor
            key={`${currentDeckIndex}-${currentCardIndex}`} /* Needed to re-render the component when the current card changes */
            data={currentCard}
            onChange={(card) =>
              updateCard(currentDeckIndex, currentCardIndex, card)
            }
          />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export const RightSidebar: React.FC = () => {
  const { rightDrawerOpen, setRightDrawerOpen } = useUIStore();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Sheet open={rightDrawerOpen} onOpenChange={setRightDrawerOpen}>
        <SheetContent className="w-full max-w-96 bg-slate-900 border-l border-slate-800">
          <SheetHeader className="sr-only">
            <SheetTitle>Card Editor</SheetTitle>
          </SheetHeader>
          <RightSidebarContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className="w-96 border-l border-slate-800 bg-slate-900 flex flex-col">
      <RightSidebarContent />
    </aside>
  );
};
