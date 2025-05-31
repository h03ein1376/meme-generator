"use client";
import { useSidebarSectionContext } from "@/contaxts/sidebar-item-provider";
import { ImageItem } from "./image-item";
import { useMemes, TemplateType, StickerType } from "@/hooks/use-memes";
import { SidebarSectionWrapper } from "./sidebar-section-wrapper";

export const SidebarImageList = () => {
  const { type, url } = useSidebarSectionContext();
  const { data } = useMemes(url);

  return (
    <SidebarSectionWrapper hideViewAll={data.data.length < 6}>
      {data.data.map((item) => (
        <ImageItem
          key={item.id}
          image={
            type === "template"
              ? (item as TemplateType).thumbnail
              : (item as StickerType).sticker
          }
          alt={item.library_type}
        />
      ))}
    </SidebarSectionWrapper>
  );
};
