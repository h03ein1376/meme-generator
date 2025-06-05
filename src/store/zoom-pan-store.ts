import { create } from "zustand";

interface ZoomPanStore {
  scale: number;
  translate: { x: number; y: number };
  isPanning: boolean;
  setScale: (scale: number) => void;
  changeScale: (delta: number) => void;
  moveTranslate: (dx: number, dy: number) => void;
  setIsPanning: (isPanning: boolean) => void;
  resetZoomPan: () => void;
}

export const useZoomPanStore = create<ZoomPanStore>((set) => ({
  scale: 1,
  translate: { x: 0, y: 0 },
  isPanning: false,

  setScale: (scale) => set({ scale }),
  changeScale: (delta) =>
    set((state) => ({
      scale: Math.min(Math.max(state.scale + delta, 0.5), 2),
    })),

  moveTranslate: (dx, dy) =>
    set((state) => ({
      translate: {
        x: state.translate.x + dx,
        y: state.translate.y + dy,
      },
    })),

  setIsPanning: (isPanning) => set({ isPanning }),

  resetZoomPan: () =>
    set({ scale: 1, translate: { x: 0, y: 0 }, isPanning: false }),
}));
