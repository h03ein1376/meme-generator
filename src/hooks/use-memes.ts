import { ApiResponse } from "@/types/api-response";
import { Sticker } from "@/types/sticker";
import { Template } from "@/types/template";
import { api } from "@/utils/axios";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useMemes(url: string, secondUrl?: string) {
  return useSuspenseQuery<(Template | Sticker)[]>({
    queryKey: [url, secondUrl],
    queryFn: async (): Promise<(Template | Sticker)[]> => {
      const response = await api.get<ApiResponse>(url);
      let response2;
      if (secondUrl) response2 = await api.get<ApiResponse>(secondUrl);

      return [...response.data.data, ...(response2?.data?.data ?? [])];
    },
  });
}
