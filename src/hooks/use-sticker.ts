import { Sticker } from "@/types/sticker";
import { addTemplateToCanvas } from "@/utils/fabric-utils";
import { useMutation } from "@tanstack/react-query";
import { Canvas, FabricImage } from "fabric";

export function useStickerMutation(canvas?: Canvas) {
  return useMutation<FabricImage, Error, Sticker>({
    mutationFn: (sticker: Sticker) => {
      return new Promise<FabricImage>((resolve, reject) => {
        const controller = new AbortController();
        const { signal } = controller;

        const abortHandler = () => {
          reject(new DOMException("aborted", "AbortError"));
        };

        signal.addEventListener("abort", abortHandler);

        FabricImage.fromURL(sticker.sticker, { crossOrigin: "anonymous" })
          .then((img) => {
            if (signal.aborted) {
              reject(new DOMException("aborted", "AbortError"));
              return;
            }
            resolve(img);
          })
          .catch((error) => reject(error));
      });
    },
    onSuccess: (fabricImage) => {
      if (!canvas) return;
      addTemplateToCanvas(canvas, fabricImage);
    },
    onError: (error) => {
      //todo: toast error if there is an error fetching the template
      console.error("Error loading template:", error);
    },
  });
}
