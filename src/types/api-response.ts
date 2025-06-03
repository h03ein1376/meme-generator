import { Sticker } from "./sticker";
import { Template } from "./template";

export type ApiResponse = {
  data: Template[] | Sticker[];
  paging: boolean;
  message: string;
  statusCode: number;
  hasAnyData: boolean;
};
