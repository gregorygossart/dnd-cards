import React from 'react';
import Image from 'next/image';
import { useUIStore } from '@/hooks/useUIStore';
import { DeckList } from '@/components/DeckList/DeckList';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/useMediaQuery';

const LeftSidebarContent: React.FC = () => {
    return (
        <div className="flex flex-col h-full">
            <div className="h-14 flex items-center px-4 shrink-0 bg-slate-900 border-b border-slate-800">
                <span className="font-bold text-2xl tracking-tight font-serif text-white">Grimoire.</span>
            </div>

            <div className="flex-1 overflow-y-auto">
                <DeckList />
            </div>
        </div>
    );
}

export const LeftSidebar: React.FC = () => {
    const { leftDrawerOpen, setLeftDrawerOpen } = useUIStore();
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <Sheet open={leftDrawerOpen} onOpenChange={setLeftDrawerOpen}>
                <SheetContent side="left" className="w-full max-w-80 bg-slate-900 border-r border-slate-800">
                    <SheetHeader className="sr-only">
                        <SheetTitle>Deck List</SheetTitle>
                    </SheetHeader>
                    <LeftSidebarContent />
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <aside className="w-80 border-r border-slate-800 bg-slate-900 flex flex-col overflow-hidden">
            <LeftSidebarContent />
        </aside>
    );
};
