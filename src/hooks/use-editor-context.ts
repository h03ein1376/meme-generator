import { EditorContext } from "@/contaxts/editor-provider";
import { useContext } from "react";

export const useEditorContext = () => {
  const editorContext = useContext(EditorContext);
  if (!editorContext)
    throw new Error("useEditorContext must be used within EditorProvider");
  return editorContext;
};
