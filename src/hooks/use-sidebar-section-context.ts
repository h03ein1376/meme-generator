import { SidebarSectionContext } from "@/contaxts/sidebar-section-provider";
import { useContext } from "react";

export const useSidebarSectionContext = () => {
  const sidebarSectionContext = useContext(SidebarSectionContext);
  if (!sidebarSectionContext)
    throw new Error(
      "useSidebarSectionContext must be used within SidebarSectionProvider"
    );
  return sidebarSectionContext;
};
