"use client";

import { useSidebarSectionContext } from "@/hooks/use-sidebar-section-context";
import clsx from "clsx";
import Image from "next/image";
import { MouseEventHandler } from "react";

type ImageItemProps = {
  image: string;
  alt: string;
  onClick: MouseEventHandler<HTMLImageElement>;
};

export const ImageItem = ({ image, alt, onClick }: ImageItemProps) => {
  const { type } = useSidebarSectionContext();

  return (
    <Image
      onClick={onClick}
      alt={alt}
      src={image}
      width={0}
      height={0}
      className={clsx(
        "cursor-pointer bg-base-100 rounded-lg  w-full h-full",
        type === "template" ? "object-cover" : "object-contain"
      )}
    />
  );
};
