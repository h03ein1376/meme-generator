import { useSidebarSectionContext } from "@/contaxts/sidebar-item-provider";
import clsx from "clsx";

type ImageItemProps = {
  image: string;
  alt: string;
};

export const ImageItem = ({ image, alt }: ImageItemProps) => {
  const { type } = useSidebarSectionContext();

  return (
    <img
      alt={alt}
      src={image}
      className={clsx(
        "cursor-pointer bg-base-100 rounded-lg aspect-[124/68] w-full h-auto ",
        type === "template" ? "object-cover" : "object-contain"
      )}
    />
  );
};
