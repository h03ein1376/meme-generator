"use client";

import { Sticker } from "@/types/sticker";
import { Template } from "@/types/template";
import {
  createContext,
  Dispatch,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type EditorContext = {
  onTemplateClick?: (template: Template) => void;
  setOnTemplateClick: Dispatch<
    SetStateAction<((template: Template) => void) | undefined>
  >;
  onStickerClick?: (sticker: Sticker) => void;
  setOnStikerClick: Dispatch<
    SetStateAction<((sticker: Sticker) => void) | undefined>
  >;
};

export const EditorContext = createContext<EditorContext | undefined>(
  undefined
);

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [onTemplateClick, setOnTemplateClick] =
    useState<(template: Template) => void | undefined>();

  const [onStickerClick, setOnStikerClick] =
    useState<(sticker: Sticker) => void | undefined>();
  return (
    <EditorContext.Provider
      value={{
        onTemplateClick,
        setOnTemplateClick,
        onStickerClick,
        setOnStikerClick,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
