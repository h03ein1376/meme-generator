import { Ratio } from "@/types/ratio";
import { Sticker } from "@/types/sticker";
import { Template } from "@/types/template";
import { BASE_URL } from "@/utils/const";
import { END_POINTS } from "@/utils/end-points";
import { MyCanvas } from "@/utils/my-canvas";
import { FabricImage } from "fabric";
import { create } from "zustand";
type EditorStore = {
  canvas?: MyCanvas;
  setCanvas: (canvas: MyCanvas) => void;
  ratio: Ratio;
  setRatio: (ratio: Ratio) => void;
  isHasTemplate: boolean;
  setIsHasTemplate: (isHasTemplate: boolean) => void;
  isHasSelection: boolean;
  setIsHasSelection: (isHasSelection: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  showTemplate: (template: Template) => Promise<void>;
  addSticker: (sticker: Sticker) => Promise<void>;
};
export const useEditorStore = create<EditorStore>((set, get) => ({
  canvas: undefined,
  setCanvas: (canvas) => set({ canvas }),
  ratio: Ratio["16:9"],
  setRatio: (ratio) => set({ ratio }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  isHasTemplate: false,
  setIsHasTemplate: (isHasTemplate) => set({ isHasTemplate }),
  isHasSelection: false,
  setIsHasSelection: (isHasSelection) => set({ isHasSelection }),
  showTemplate: async (template) => {
    const canvas = get().canvas;
    if (!canvas) return;

    set({ isLoading: true });

    try {
      const url = BASE_URL + END_POINTS.GET_ONE_TEMPLATE(template.id);
      const img = await FabricImage.fromURL(url, { crossOrigin: "anonymous" });
      canvas.addTemplate(img);
      set({ isHasTemplate: true });
    } catch (error) {
      //todo: toast error if there is an error fetching the template
      console.error("Error loading template:", error);
    } finally {
      set({ isLoading: false });
    }
  },
  addSticker: async (sticker) => {
    const canvas = get().canvas;
    if (!canvas) return;

    set({ isLoading: true });
    try {
      const img = await FabricImage.fromURL(sticker.sticker, {
        crossOrigin: "anonymous",
      });
      canvas.addSticker(img);
    } catch (error) {
      //todo: toast error if there is an error fetching the template
      console.error("Error loading Sticker:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
