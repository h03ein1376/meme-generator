"use client";

import { useRouter, usePathname } from "next/navigation";
import { useSidebarSectionContext } from "@/hooks/use-sidebar-section-context";
import { ImageItem } from "./image-item";
import { useMemes } from "@/hooks/use-memes";
import { Template } from "@/types/template";
import { Sticker } from "@/types/sticker";
import { useEditorContext } from "@/hooks/use-editor-context";

export const SidebarImageList = ({ isHome = true }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { type, homeUrl, url } = useSidebarSectionContext();
  const { data: items } = useMemes(homeUrl, !isHome ? url : undefined);
  const { onStickerClick, onTemplateClick } = useEditorContext();

  return items.map((item) => (
    <ImageItem
      key={item.id}
      onClick={() => {
        if (type === "template") onTemplateClick?.(item as Template);
        else if (type === "sticker") onStickerClick?.(item as Sticker);

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
