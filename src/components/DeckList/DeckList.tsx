import React, { useState } from 'react';
import { Deck } from '@/types/card';
import { cn } from '@/lib/utils';
import { useDeckStore } from '@/hooks/useDeckStore';
import { AddCardButton } from './AddCardButton';
import { AddDeckButton } from './AddDeckButton';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface DeckListProps {
    decks: Deck[];
    currentDeckIndex: number;
    currentCardIndex: number;
    onCardSelect: (deckIndex: number, cardIndex: number) => void;
}

export const DeckList: React.FC<DeckListProps> = ({
    decks,
    currentDeckIndex,
    currentCardIndex,
    onCardSelect,
}) => {
    const { updateDeckName, deleteDeck } = useDeckStore();
    const [expandedDeckIndex, setExpandedDeckIndex] = useState<number>(currentDeckIndex);
    const [editingDeckId, setEditingDeckId] = useState<string | null>(null);
    const [editingName, setEditingName] = useState('');
    const [deckToDelete, setDeckToDelete] = useState<{ id: string; name: string } | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Focus and select text when editing starts
    React.useEffect(() => {
        if (editingDeckId && inputRef.current) {
            // Delay to ensure dropdown has closed and released focus
            setTimeout(() => {
                inputRef.current?.focus();
                inputRef.current?.select();
            }, 100);
        }
    }, [editingDeckId]);

    const toggleDeck = (deckIndex: number) => {
        setExpandedDeckIndex(expandedDeckIndex === deckIndex ? -1 : deckIndex);
    };

    const startEditing = (deck: Deck, e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingDeckId(deck.id);
        setEditingName(deck.name);
    };

    const handleRename = (deckId: string) => {
        if (editingName.trim()) {
            updateDeckName(deckId, editingName.trim());
        }
        setEditingDeckId(null);
    };

    const handleDelete = (deck: Deck, e: React.MouseEvent) => {
        e.stopPropagation();
        setDeckToDelete({ id: deck.id, name: deck.name });
    };

    const confirmDelete = () => {
        if (deckToDelete) {
            deleteDeck(deckToDelete.id);
            setDeckToDelete(null);
        }
    };

    return (
        <div className="flex-1 overflow-y-auto p-4">
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-3">
                My Decks
            </div>

            <AddDeckButton />

            <div className="space-y-1 mt-3">
                {decks.map((deck, deckIndex) => {
                    const isExpanded = expandedDeckIndex === deckIndex;
                    const isCurrentDeck = deckIndex === currentDeckIndex;
                    const isEditing = editingDeckId === deck.id;

                    return (
                        <div key={deck.id}>
                            {/* Deck Header */}
                            <div
                                onClick={() => {
                                    if (!isEditing) {
                                        toggleDeck(deckIndex);
                                    }
                                }}
                                className={cn(
                                    "w-full px-3 py-2 flex items-center justify-between rounded-lg transition-colors text-left group cursor-pointer",
                                    isCurrentDeck
                                        ? "bg-slate-800 text-slate-100"
                                        : "hover:bg-slate-800/50 text-slate-300"
                                )}
                            >
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                    {/* Deck Icon */}
                                    <div className={cn(
                                        "w-5 h-5 rounded flex items-center justify-center shrink-0",
                                        isCurrentDeck ? "bg-violet-600" : "bg-slate-700"
                                    )}>
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                        </svg>
                                    </div>

                                    {/* Deck Name */}
                                    <div className="flex-1 min-w-0 pr-2">
                                        {isEditing ? (
                                            <input
                                                ref={inputRef}
                                                type="text"
                                                value={editingName}
                                                onChange={(e) => setEditingName(e.target.value)}
                                                onBlur={() => handleRename(deck.id)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        handleRename(deck.id);
                                                    } else if (e.key === 'Escape') {
                                                        setEditingDeckId(null);
                                                    }
                                                }}
                                                onClick={(e) => e.stopPropagation()}
                                                className="w-full px-1 py-0 text-sm bg-input border border-input rounded text-foreground focus:outline-none focus:border-ring"
                                            />
                                        ) : (
                                            <span className="font-medium truncate text-sm block">
                                                {deck.name}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    {/* Card count badge */}
                                    <span className="text-xs bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded">
                                        {deck.cards.length}
                                    </span>

                                    {/* Three-dot menu */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button
                                                onClick={(e) => e.stopPropagation()}
                                                className="p-1 hover:bg-accent rounded transition-colors"
                                            >
                                                <svg className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 16 16">
                                                    <circle cx="8" cy="3" r="1.5" />
                                                    <circle cx="8" cy="8" r="1.5" />
                                                    <circle cx="8" cy="13" r="1.5" />
                                                </svg>
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            align="end"
                                            onCloseAutoFocus={(e) => {
                                                // Prevent dropdown from auto-focusing trigger when we're editing
                                                if (editingDeckId === deck.id) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            <DropdownMenuItem onClick={(e) => {
                                                e.stopPropagation();
                                                startEditing(deck, e as any);
                                            }}>
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                                Rename
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(deck, e as any);
                                                }}
                                                variant="destructive"
                                            >
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>

                            {/* Card List */}
                            {isExpanded && (
                                <div className="mt-1 ml-3 space-y-0.5">
                                    {deck.cards.map((card, cardIndex) => {
                                        const isActive =
                                            deckIndex === currentDeckIndex &&
                                            cardIndex === currentCardIndex;

                                        return (
                                            <button
                                                key={cardIndex}
                                                onClick={() => onCardSelect(deckIndex, cardIndex)}
                                                className={cn(
                                                    "w-full px-3 py-2 text-left text-sm rounded-lg transition-colors flex items-center gap-2 group",
                                                    isActive
                                                        ? "bg-violet-600/20 text-violet-300"
                                                        : "hover:bg-slate-800/50 text-slate-400"
                                                )}
                                            >
                                                {/* Card type icon */}
                                                <div className={cn(
                                                    "w-4 h-4 rounded shrink-0",
                                                    isActive ? "bg-violet-600" : "bg-slate-700"
                                                )}>
                                                    <svg className="w-full h-full p-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm6 6H7v2h6v-2z" clipRule="evenodd" />
                                                    </svg>
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="truncate">
                                                        {card.title || 'Untitled Card'}
                                                    </div>
                                                </div>

                                                {/* Level/Type badge */}
                                                <span className={cn(
                                                    "text-xs px-1.5 py-0.5 rounded shrink-0",
                                                    isActive
                                                        ? "bg-violet-600/30 text-violet-200"
                                                        : "bg-slate-700 text-slate-400"
                                                )}>
                                                    {card.type === 'Spell' && card.level !== undefined
                                                        ? `Lvl ${card.level}`
                                                        : card.type}
                                                </span>
                                            </button>
                                        );
                                    })}

                                    {/* Add Card Button */}
                                    <AddCardButton deckId={deck.id} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!deckToDelete} onOpenChange={(open) => !open && setDeckToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Deck</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete "{deckToDelete?.name}"? This will also delete all {decks.find(d => d.id === deckToDelete?.id)?.cards.length || 0} card(s) in this deck. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} variant="destructive">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};
