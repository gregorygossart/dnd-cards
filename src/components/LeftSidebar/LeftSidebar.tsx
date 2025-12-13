import React from "react";
import Image from "next/image";
import { useUIStore } from "@/hooks/useUIStore";
import { DeckList } from "@/components/LeftSidebar/DeckList/DeckList";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { Skeleton } from "@/components/ui/skeleton";

interface LeftSidebarProps {
  isLoading?: boolean;
}

const LeftSidebarContent: React.FC<{ isLoading?: boolean }> = ({
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="h-14 flex items-center px-4 shrink-0 bg-slate-900 border-b border-slate-800">
          <Skeleton className="h-8 w-32" />
        </div>

        {/* Deck List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="h-14 flex items-center px-4 shrink-0 bg-slate-900 border-b border-slate-800">
        <span className="font-bold text-2xl tracking-tight font-serif text-white">
          Grimoire.
        </span>
      </div>

      <div className="flex-1 overflow-y-auto">
        <DeckList />
      </div>
    </div>
  );
};

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  isLoading = false,
}) => {
  const { leftDrawerOpen, setLeftDrawerOpen } = useUIStore();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Sheet open={leftDrawerOpen} onOpenChange={setLeftDrawerOpen}>
        <SheetContent
          side="left"
          className="w-full max-w-80 bg-slate-900 border-r border-slate-800"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Deck List</SheetTitle>
          </SheetHeader>
          <LeftSidebarContent isLoading={isLoading} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className="z-30 w-80 border-r border-slate-800 bg-slate-900 flex flex-col overflow-y-auto">
      <LeftSidebarContent isLoading={isLoading} />
    </aside>
  );
};
