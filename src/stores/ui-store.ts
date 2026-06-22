import { create } from "zustand";
import { persist } from "zustand/middleware";
import { dexieStorage } from "./dexie-storage-adapter";
import type { DensityPreset } from "@/types/deck.types";

export interface UiState {
  view: "grid" | "editor" | "print";
  selectedCardId: string | null;
  theme: string;
  density: DensityPreset;
}

export interface UiActions {
  setView: (view: "grid" | "editor" | "print") => void;
  setSelectedCardId: (id: string | null) => void;
  setTheme: (theme: string) => void;
  setDensity: (density: DensityPreset) => void;
}

export type UiStore = UiState & UiActions;

export const useUiStore = create<UiStore>()(
  persist(
    (set) => ({
      view: "grid",
      selectedCardId: null,
      theme: "default",
      density: "standard",

      setView: (view) => set({ view }),
      setSelectedCardId: (id) => set({ selectedCardId: id }),
      setTheme: (theme) => set({ theme }),
      setDensity: (density) => set({ density }),
    }),
    {
      name: "ui-store",
      storage: dexieStorage as unknown as Parameters<typeof persist>[1]["storage"],
      partialize: (state) =>
        ({
          view: state.view,
          theme: state.theme,
          density: state.density,
        }) as Partial<UiStore>,
    },
  ),
);