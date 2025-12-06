import React from 'react';
import { useUIStore } from '@/hooks/useUIStore';
import { DeckList } from '@/components/DeckList/DeckList';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/useMediaQuery';

const LeftSidebarContent: React.FC = () => {
    return (
        <div>
            <div className="h-14 flex items-center px-4">
                <span className="font-bold text-2xl tracking-tight font-serif text-white">Grimoire.</span>
            </div>

            <DeckList />
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
        <aside className="w-80 border-r border-slate-800 bg-slate-900">
            <LeftSidebarContent />
        </aside>
    );
};
