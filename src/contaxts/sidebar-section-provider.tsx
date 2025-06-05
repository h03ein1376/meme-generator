"use client";

import { SidebrSection } from "@/types/sidebar-section";
import { createContext } from "react";

type SidebarSectionPovider = {
  value: SidebrSection;
  children: React.ReactNode;
};
export const SidebarSectionContext = createContext<SidebrSection | undefined>(
  undefined
);

export const SidebarSectionProvider = ({
  children,
  value,
}: SidebarSectionPovider) => {
  return (
    <SidebarSectionContext.Provider value={value}>
      {children}
    </SidebarSectionContext.Provider>
  );
};
