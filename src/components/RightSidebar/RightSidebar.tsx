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
import { Skeleton } from "@/components/ui/skeleton";

enum ActiveTab {
  Edit = "Edit",
  ImportExport = "ImportExport",
}

interface RightSidebarProps {
  isLoading?: boolean;
}

const RightSidebarContent: React.FC<{ isLoading?: boolean }> = ({
  isLoading = false,
}) => {
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

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col min-h-0">
        {/* Tabs Header */}
        <div className="h-14 border-b border-slate-800 flex items-center px-4 shrink-0">
          <div className="grid w-full grid-cols-2 gap-2">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

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

export const RightSidebar: React.FC<RightSidebarProps> = ({
  isLoading = false,
}) => {
  const { rightDrawerOpen, setRightDrawerOpen } = useUIStore();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Sheet open={rightDrawerOpen} onOpenChange={setRightDrawerOpen}>
        <SheetContent className="w-full max-w-96 bg-slate-900 border-l border-slate-800">
          <SheetHeader className="sr-only">
            <SheetTitle>Card Editor</SheetTitle>
          </SheetHeader>
          <RightSidebarContent isLoading={isLoading} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className="z-30 w-96 border-l border-slate-800 bg-slate-900 flex flex-col overflow-scroll">
      <RightSidebarContent isLoading={isLoading} />
    </aside>
  );
};
