"use client";

import { useSidebarSectionContext } from "@/hooks/use-sidebar-section-context";
import { ImageItem } from "./image-item";
import { useMemes } from "@/hooks/use-memes";
import { Template } from "@/types/template";
import { Sticker } from "@/types/sticker";

export const SidebarImageList = ({ isHome = true }) => {
  const { type, homeUrl, url } = useSidebarSectionContext();
  const { data: items } = useMemes(homeUrl, !isHome ? url : undefined);

  return items.map((item) => (
    <ImageItem
      key={item.id}
      image={
        type === "template"
          ? (item as Template).thumbnail
          : (item as Sticker).sticker
      }
      alt={item.library_type}
    />
  ));
};
