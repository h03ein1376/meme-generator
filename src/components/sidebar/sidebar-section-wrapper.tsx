"use client";
import { useSidebarSectionContext } from "@/hooks/use-sidebar-section-context";
import Link from "next/link";

import { ReactNode } from "react";

type SidebarSectionWrapperType = {
  disabled?: boolean;
  hideViewAll?: boolean;
  children: ReactNode;
};

export const SidebarSectionWrapper = ({
  disabled = false,
  hideViewAll = false,
  children,
}: SidebarSectionWrapperType) => {
  const { title } = useSidebarSectionContext();

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex justify-between items-center">
        <h4 className="uppercase font-medium">{title}</h4>
        {!hideViewAll && (
          <Link
            href={`?section=${title}`}
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled}
            className="cursor-pointer flex items-center gap-2 uppercase text-sm font-medium disabled:opacity-50"
          >
            View All <span className="icon-[iconoir--arrow-right]" />
          </Link>
        )}
      </div>
      <div className="grid xl:grid-rows-[68px_68px] xl:grid-cols-[124px_124px_124px] grid-rows-[68px_68px_68px] grid-cols-[124px_124px] gap-4 ">
        {children}
      </div>
    </div>
  );
};
