import { create } from "zustand";

interface UIStore {
  leftDrawerOpen: boolean;
  rightDrawerOpen: boolean;
  setLeftDrawerOpen: (open: boolean) => void;
  setRightDrawerOpen: (open: boolean) => void;
  closeDrawers: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  leftDrawerOpen: false,
  rightDrawerOpen: false,

  setLeftDrawerOpen: (open) =>
    set((state) => ({
      leftDrawerOpen: open,
      rightDrawerOpen: open ? false : state.rightDrawerOpen,
    })),

  setRightDrawerOpen: (open) =>
    set((state) => ({
      rightDrawerOpen: open,
      leftDrawerOpen: open ? false : state.leftDrawerOpen,
    })),

  closeDrawers: () =>
    set({
      leftDrawerOpen: false,
      rightDrawerOpen: false,
    }),
}));
