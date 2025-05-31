"use client";

import { createContext, useContext } from "react";

export type SidebarSectionContextType = {
  title: string;
  url: string;
  type: "template" | "sticker";
};

type SidebarSectionPoviderType = {
  value: SidebarSectionContextType;
  children: React.ReactNode;
};
export const SidebarSectionContext = createContext<
  SidebarSectionContextType | undefined
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
