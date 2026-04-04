import React from "react";
import { useT } from "next-i18next/client";
import { useUIStore } from "@/hooks/useUIStore";
import { CardEditor } from "@/components/RightSidebar/CardEditor/CardEditor";
import { useDeckStore } from "@/hooks/useDeckStore";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { Skeleton } from "@/components/ui/skeleton";

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

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col min-h-0">
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
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 overflow-y-auto">
        <CardEditor
          initialData={currentCard}
          onChange={(card) =>
            updateCard(currentDeckIndex, currentCardIndex, card)
          }
        />
      </div>
    </div>
  );
};

export const RightSidebar: React.FC<RightSidebarProps> = ({
  isLoading = false,
}) => {
  const { rightDrawerOpen, setRightDrawerOpen } = useUIStore();
  const isMobile = useIsMobile();
  const { t } = useT();

  if (isMobile) {
    return (
      <Sheet open={rightDrawerOpen} onOpenChange={setRightDrawerOpen}>
        <SheetContent className="w-full max-w-96 bg-slate-900 border-l border-slate-800">
          <SheetHeader className="sr-only">
            <SheetTitle>{t("editor.title")}</SheetTitle>
          </SheetHeader>
          <RightSidebarContent isLoading={isLoading} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className="z-30 w-96 border-l border-slate-800 bg-slate-900 flex flex-col overflow-y-auto">
      <RightSidebarContent isLoading={isLoading} />
    </aside>
  );
};
