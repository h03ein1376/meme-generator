import { MyCanvas } from "@/utils/my-canvas";
import { create } from "zustand";

type HistoryStore = {
  undoStack: string[];
  redoStack: string[];
  saveState: (json: string) => void;
  undo: (canvas?: MyCanvas) => void;
  redo: (canvas?: MyCanvas) => void;
};

export const useHistoryStore = create<HistoryStore>((set, get) => ({
  undoStack: [],
  redoStack: [],
  saveState: (json) => {
    console.log(json);

    set((state) => ({
      undoStack: [...state.undoStack, json],
      redoStack: [],
    }));
  },
  undo: async (canvas) => {
    if (!canvas) return;
    const { undoStack, redoStack } = get();
    if (undoStack.length > 1) {
      const current = undoStack.pop();
      if (!current) return;
      const prev = undoStack[undoStack.length - 1];
      redoStack.push(current);
      await canvas.loadFromJSON(prev);
      canvas.renderAll();
      set({ undoStack: [...undoStack], redoStack: [...redoStack] });
    }
  },
  redo: async (canvas) => {
    if (!canvas) return;
    const { undoStack, redoStack } = get();
    if (redoStack.length > 0) {
      const next = redoStack.pop();
      if (!next) return;
      undoStack.push(next);
      await canvas.loadFromJSON(next!!);
      canvas.renderAll();
      set({ undoStack: [...undoStack], redoStack: [...redoStack] });
    }
  },
}));
