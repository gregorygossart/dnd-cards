import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Card, SpellCard } from "@/types/card.types";
import { dexieStorage } from "./dexie-storage-adapter";
import { createCard, updateCard, deleteCard as deleteCardRepo } from "@/lib/db/cards-repo";

export interface CardState {
  cards: Card[];
  selectedCardId: string | null;
}

export interface CardActions {
  addCard: (deckId: string, card: Partial<SpellCard>) => Promise<void>;
  updateCard: (id: string, changes: Partial<SpellCard>) => Promise<void>;
  deleteCard: (id: string) => Promise<void>;
  reorderCards: (deckId: string, startIndex: number, endIndex: number) => Promise<void>;
  setSelectedCardId: (id: string | null) => void;
}

export type CardStore = CardState & CardActions;

const DEFAULT_SPELL: Omit<SpellCard, "id" | "deckId" | "createdAt" | "updatedAt" | "order"> = {
  type: "spell",
  name: "New Spell",
  level: 0,
  school: "Evocation",
  castingTime: "1 action",
  range: "Self",
  components: { verbal: false, somatic: false, material: false },
  duration: "Instantaneous",
  description: "",
  accentColor: "#000000",
};

export const useCardStore = create<CardStore>()(
  persist(
    (set, get) => ({
      cards: [],
      selectedCardId: null,

      addCard: async (deckId: string, card: Partial<SpellCard>) => {
        const now = Date.now();
        const newCard: SpellCard = {
          ...DEFAULT_SPELL,
          id: crypto.randomUUID(),
          deckId,
          ...card,
          createdAt: now,
          updatedAt: now,
          order: 0,
        } as SpellCard;

        await createCard({
          deckId: newCard.deckId,
          type: newCard.type,
          name: newCard.name,
          level: newCard.level,
          school: newCard.school,
          castingTime: newCard.castingTime,
          range: newCard.range,
          components: JSON.stringify(newCard.components),
          duration: newCard.duration,
          description: newCard.description,
          higherLevels: newCard.higherLevels,
          accentColor: newCard.accentColor,
          artwork: newCard.artwork,
          order: newCard.order,
        });

        set((state) => ({
          cards: [...state.cards, newCard],
          selectedCardId: newCard.id,
        }));
      },

      updateCard: async (id: string, changes: Partial<SpellCard>) => {
        await updateCard(id, {
          ...changes,
          order: changes.order,
          components:
            changes.components !== undefined
              ? JSON.stringify(changes.components)
              : undefined,
          updatedAt: Date.now(),
        });

        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === id
              ? ({ ...card, ...changes, updatedAt: Date.now() }) as Card
              : card,
          ),
        }));
      },

      deleteCard: async (id: string) => {
        await deleteCardRepo(id);

        set((state) => {
          const card = state.cards.find((c) => c.id === id);
          if (card) {
            deleteCardLocalImageRefs(card);
          }

          return {
            cards: state.cards.filter((c) => c.id !== id),
            selectedCardId:
              state.selectedCardId === id ? null : state.selectedCardId,
          };
        });
      },

      reorderCards: async (deckId: string, startIndex: number, endIndex: number) => {
        let orderUpdates: Array<{ id: string; order: number }> = [];

        set((state) => {
          const deckCards = state.cards
            .map((c, idx) => ({ card: c, originalIndex: idx }))
            .filter(({ card }) => card.deckId === deckId);

          if (startIndex < 0 || endIndex >= deckCards.length) return state;

          const [moved] = deckCards.splice(startIndex, 1);
          deckCards.splice(endIndex, 0, moved);

          const reordered = [...state.cards];
          let insertIdx = 0;
          orderUpdates = [];
          for (let i = 0; i < reordered.length; i++) {
            if (reordered[i].deckId === deckId) {
              const target = deckCards[insertIdx].card;
              orderUpdates.push({ id: target.id, order: i });
              reordered[i] = { ...target, order: i };
              insertIdx++;
            }
          }

          return { cards: reordered };
        });

        await Promise.all(
          orderUpdates.map(({ id, order }) =>
            updateCard(id, {
              order,
            } as Partial<import("@/lib/db/schema").CardRecord>),
          ),
        );
      },

      setSelectedCardId: (id: string | null) => {
        set({ selectedCardId: id });
      },
    }),
    {
      name: "card-store",
      storage: dexieStorage as unknown as Parameters<typeof persist>[1]["storage"],
      partialize: (state) =>
        ({
          cards: state.cards,
        }) as Partial<CardStore>,
    },
  ),
);

function deleteCardLocalImageRefs(card: Card): void {
  // TODO: implement cleanup logic (currently imported only as placeholder)
}