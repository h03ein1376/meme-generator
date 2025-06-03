"use client";

import { Template } from "@/types/template";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type TemplateContext = {
  selectedTemplate?: Template;
  setSelectedTemplate: Dispatch<SetStateAction<Template | undefined>>;
};

export const TemplateContext = createContext<TemplateContext | undefined>(
  undefined
);

export const TemplateProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<
    Template | undefined
  >();
  return (
    <TemplateContext.Provider value={{ selectedTemplate, setSelectedTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
};
