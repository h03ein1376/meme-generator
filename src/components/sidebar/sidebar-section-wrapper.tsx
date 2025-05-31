"use client";
import { useSidebarSectionContext } from "@/contaxts/sidebar-item-provider";

import { ReactNode } from "react";

type SidebarSectionWrapperType = {
  disabled?: boolean;
  hideViewAll?: boolean;
  children: ReactNode;
};

export const SidebarSectionWrapper = ({
  disabled = false,
  hideViewAll = true,
  children,
}: SidebarSectionWrapperType) => {
  const { title } = useSidebarSectionContext();

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex justify-between items-center">
        <h4 className=" uppercase font-medium">{title}</h4>
        {!hideViewAll && (
          <button
            disabled={disabled}
            className="cursor-pointer flex items-center gap-2 uppercase text-sm font-medium disabled:opacity-50"
          >
            View All <span className="icon-[iconoir--arrow-right]" />
          </button>
        )}
      </div>
      <div className="grid grid-rows-[68px_68px] grid-cols-[124px_124px_124px] gap-4 ">
        {children}
      </div>
    </div>
  );
};
