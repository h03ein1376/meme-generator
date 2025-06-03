import { TemplateContext } from "@/contaxts/template-provider";
import { useContext } from "react";

export const useTemplateContext = () => {
  const templateContext = useContext(TemplateContext);
  if (!templateContext)
    throw new Error("useTemplateContext must be used within TemplateProvider");
  return templateContext;
};
