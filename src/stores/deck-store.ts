import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Deck } from "@/types/deck.types";
import { dexieStorage } from "./dexie-storage-adapter";
import { createDeck, updateDeck, deleteDeck } from "@/lib/db/decks-repo";

export interface DeckState {
  decks: Deck[];
  activeDeckId: string | null;
}

export interface DeckActions {
  addDeck: (name: string) => Promise<void>;
  renameDeck: (id: string, name: string) => Promise<void>;
  deleteDeck: (id: string) => Promise<void>;
  setActiveDeck: (id: string | null) => void;
}

export type DeckStore = DeckState & DeckActions;

const DEFAULT_DECK_SETTINGS = {
  format: "poker" as const,
  density: "standard" as const,
};

export const useDeckStore = create<DeckStore>()(
  persist(
    (set, get) => ({
      decks: [],
      activeDeckId: null,

      addDeck: async (name: string) => {
        const now = Date.now();
        const settings = JSON.stringify({ ...DEFAULT_DECK_SETTINGS });

        const record = await createDeck({
          settings,
          cardFormat: DEFAULT_DECK_SETTINGS.format,
          densityPreset: DEFAULT_DECK_SETTINGS.density,
          name,
        });

        const deck: Deck = {
          id: record.id,
          name: record.name,
          settings: { ...DEFAULT_DECK_SETTINGS },
          createdAt: record.createdAt,
          updatedAt: record.updatedAt,
        };

        set((state) => ({
          decks: [...state.decks, deck],
          activeDeckId: deck.id,
        }));
      },

      renameDeck: async (id: string, name: string) => {
        await updateDeck(id, { name });

        set((state) => ({
          decks: state.decks.map((deck) =>
            deck.id === id ? { ...deck, name, updatedAt: Date.now() } : deck,
          ),
        }));
      },

       deleteDeck: async (id: string) => {
         await deleteDeck(id);

         set((state) => ({
           decks: state.decks.filter((deck) => deck.id !== id),
           activeDeckId: state.activeDeckId === id ? null : state.activeDeckId,
         }));
       },

      setActiveDeck: (id: string | null) => {
        set({ activeDeckId: id });
      },
    }),
    {
      name: "deck-store",
      storage: dexieStorage as unknown as Parameters<typeof persist>[1]["storage"],
      partialize: (state) =>
        ({
          decks: state.decks,
          activeDeckId: state.activeDeckId,
        }) as Partial<DeckStore>,
    },
  ),
);