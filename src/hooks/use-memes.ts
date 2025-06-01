import { api } from "@/utils/axios";
import { useSuspenseQuery } from "@tanstack/react-query";

interface DataType {
  id: number;
  mime_type: string;
  library_type: string;
}

export interface TemplateType extends DataType {
  thumbnail: string;
}

export interface StickerType extends DataType {
  sticker: string;
}

export type ApiResponse = {
  data: TemplateType[] | StickerType[];
  paging: boolean;
  message: string;
  statusCode: number;
  hasAnyData: boolean;
};
export function useMemes(url: string, secondUrl?: string) {
  return useSuspenseQuery<(TemplateType | StickerType)[]>({
    queryKey: [url, secondUrl],
    queryFn: async (): Promise<(TemplateType | StickerType)[]> => {
      const response = await api.get<ApiResponse>(url);
      let response2;
      if (secondUrl) response2 = await api.get<ApiResponse>(secondUrl);

      return [...response.data.data, ...(response2?.data?.data ?? [])];
    },
  });
}
