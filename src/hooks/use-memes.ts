import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";

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
  paging: any;
  message: string;
  statusCode: number;
  hasAnyData: boolean;
};
export function useMemes(url: string) {
  return useSuspenseQuery({
    queryKey: [url],
    queryFn: async (): Promise<ApiResponse> => {
      const response = await axios.get<ApiResponse>(url);
      return response.data;
    },
  });
}
