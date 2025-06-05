"use client";

import { useRouter } from "next/navigation";
import { useSidebarSectionContext } from "@/hooks/use-sidebar-section-context";
import { ImageItem } from "./image-item";
import { useMemes } from "@/hooks/use-memes";
import { Template } from "@/types/template";
import { Sticker } from "@/types/sticker";
import { useEditorStore } from "@/store/editor-store";

export const SidebarImageList = ({ isHome = true }) => {
  const router = useRouter();
  const { type, homeUrl, url } = useSidebarSectionContext();
  const { data: items } = useMemes(homeUrl, !isHome ? url : undefined);
  const showTemplate = useEditorStore((state) => state.showTemplate);
  const addSticker = useEditorStore((state) => state.addSticker);

  return items.map((item) => (
    <ImageItem
      key={item.id}
      onClick={() => {
        if (type === "template") showTemplate(item as Template);
        else if (type === "sticker") addSticker(item as Sticker);

        router.replace("/");
      }}
      image={
        type === "template"
          ? (item as Template).thumbnail
          : (item as Sticker).sticker
      }
      alt={item.library_type}
    />
  ));
};
