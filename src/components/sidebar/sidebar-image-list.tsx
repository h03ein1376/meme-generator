"use client";

import { useSidebarSectionContext } from "@/contaxts/sidebar-item-provider";
import { ImageItem } from "./image-item";
import { useMemes, TemplateType, StickerType } from "@/hooks/use-memes";

export const SidebarImageList = ({ isHome = true }) => {
  const { type, homeUrl, url } = useSidebarSectionContext();
  const items = [];
  const { data } = useMemes(homeUrl);
  items.push(...data.data);
  if (!isHome) {
    const { data: moreData } = useMemes(url);
    items.push(...moreData.data);
  }
  return items.map((item) => (
    <ImageItem
      key={item.id}
      image={
        type === "template"
          ? (item as TemplateType).thumbnail
          : (item as StickerType).sticker
      }
      alt={item.library_type}
    />
  ));
};
