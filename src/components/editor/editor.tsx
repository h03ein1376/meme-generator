"use client";

import clsx from "clsx";
import { UploadDropZone } from "./upload-drop-zone";
import { useCanvas } from "@/hooks/use-canvas";
import { Toolbar } from "./toolbar";
import { ZoomPanController } from "./zoom-pan-controller";
import { useEditorStore } from "@/store/editor-store";
import { useZoomPanStore } from "@/store/zoom-pan-store";

export function Editor() {
  const isHasTemplate = useEditorStore((state) => state.isHasTemplate);
  const isLoading = useEditorStore((state) => state.isLoading);

  const { canvasRef, containerRef } = useCanvas();
  const scale = useZoomPanStore((state) => state.scale);

  const translate = useZoomPanStore((state) => state.translate);

  const isPanning = useZoomPanStore((state) => state.isPanning);

  return (
    <div className="w-full relative flex flex-col gap-4 pb-4">
      <Toolbar />
      <ZoomPanController className="hidden lg:flex" />
      <div
        className={clsx(
          isPanning && "cursor-grab",
          "w-full flex rounded-2xl relative flex-1 overflow-hidden"
        )}
      >
        <div
          ref={containerRef}
          className={clsx(
            !isHasTemplate && "invisible",
            "w-full mx-auto absolute top-1/2 left-1/2 max-w-3/4 aspect-square h-auto flex items-center justify-center"
          )}
          style={{
            transform: `translate(-50%, -50%)  scale(${scale}) translate(${translate.x}px, ${translate.y}px)`,
            transformOrigin: "center center",
            touchAction: "none",
          }}
        >
          <canvas ref={canvasRef} />
        </div>

        {!isHasTemplate && (
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full sm:w-2/3 lg:w-1/2 aspect-square bg-base-100 dark:bg-base-300 shadow-2xl">
            <UploadDropZone />
          </div>
        )}
        {isLoading && (
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
            <span className="loading loading-ring w-12 md:w-24 text-primary" />
          </div>
        )}
      </div>
    </div>
  );
}
