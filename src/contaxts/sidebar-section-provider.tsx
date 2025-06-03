"use client";

import { SidebrSectionType } from "@/types/sidebar-section";
import { createContext, useContext } from "react";

type SidebarSectionPovider = {
  value: SidebrSectionType;
  children: React.ReactNode;
};
export const SidebarSectionContext = createContext<
  SidebrSectionType | undefined
>(undefined);

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
