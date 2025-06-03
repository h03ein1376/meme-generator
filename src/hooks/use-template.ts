import { Template } from "@/types/template";
import { api } from "@/utils/axios";
import { BASE_URL } from "@/utils/const";
import { END_POINTS } from "@/utils/end-points";
import { useQuery } from "@tanstack/react-query";
import { FabricImage } from "fabric";

export function useTemplate(selectedTemplate?: Template) {
  return useQuery({
    queryKey: ["template", selectedTemplate?.id],
    enabled: !!selectedTemplate?.id,
    queryFn: ({ signal }) => {
      if (!selectedTemplate?.id) return Promise.resolve(null);

      const url = BASE_URL + END_POINTS.GET_ONE_TEMPLATE(selectedTemplate.id);

      return new Promise<FabricImage>((resolve, reject) => {
        const abortHandler = () => {
          reject(new DOMException("aborted", "AbortError"));
        };

        signal?.addEventListener("abort", abortHandler);

        FabricImage.fromURL(url, { crossOrigin: "anonymous" })
          .then((img) => {
            if (signal?.aborted) {
              reject(new DOMException("aborted", "AbortError"));
              return;
            }
            resolve(img);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  });
}
