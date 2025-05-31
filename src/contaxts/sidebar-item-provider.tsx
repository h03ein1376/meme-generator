"use client";

import { SidebrSectionType } from "@/types/sidebar-section";
import { createContext, useContext } from "react";

type SidebarSectionPoviderType = {
  value: SidebrSectionType;
  children: React.ReactNode;
};
export const SidebarSectionContext = createContext<
  SidebrSectionType | undefined
>(undefined);

export const useSidebarSectionContext = () => {
  const sidebarSectionContext = useContext(SidebarSectionContext);
  if (!sidebarSectionContext)
    throw new Error(
      "useSidebarSectionContext must be used within SidebarSectionProvider"
    );
  return sidebarSectionContext;
};

export const SidebarSectionProvider = ({
  children,
  value,
}: SidebarSectionPoviderType) => {
  return (
    <SidebarSectionContext.Provider value={value}>
      {children}
    </SidebarSectionContext.Provider>
  );
};
