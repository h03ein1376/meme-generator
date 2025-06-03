"use client";

import clsx from "clsx";
import Image from "next/image";

type ImageItemProps = {
  image: string;
  alt: string;
};

export const ImageItem = ({ image, alt }: ImageItemProps) => {
  const { type } = useSidebarSectionContext();

  return (
    <Image
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
