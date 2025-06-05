"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { UploadDropZone } from "./upload-drop-zone";
import { useCanvas } from "@/hooks/use-canvas";
import { Toolbar } from "./toolbar";
import { ZoomPanController } from "./zoom-pan-controller";
import { useEditorStore } from "@/store/editor-store";

export function Editor() {
  const canvas = useEditorStore((state) => state.canvas);
  const isHasTemplate = useEditorStore((state) => state.isHasTemplate);
  const isLoading = useEditorStore((state) => state.isLoading);

  const { canvasRef, containerRef } = useCanvas();

  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isPanning) canvas?.lock();
    else canvas?.unlock();
  }, [isPanning, canvas]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (!isPanning) return;
      dragging.current = true;
      lastPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging.current || !isPanning) return;
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      setTranslate((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      lastPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      dragging.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.05 : 0.05;
      setScale((prev) => Math.min(Math.max(prev + delta, 0.5), 2));
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (!isPanning || e.touches.length !== 1) return;
      lastPos.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      dragging.current = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!dragging.current || !isPanning || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - lastPos.current.x;
      const dy = e.touches[0].clientY - lastPos.current.y;
      setTranslate((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      lastPos.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const handleTouchEnd = () => {
      dragging.current = false;
    };

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mouseleave", handleMouseUp);
    container.addEventListener("wheel", handleWheel, { passive: false });

    container.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mouseleave", handleMouseUp);
      container.removeEventListener("wheel", handleWheel);

      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isPanning]);

  return (
    <div className="w-full relative flex flex-col gap-4 pb-4">
      <Toolbar />
      <ZoomPanController
        scale={scale}
        setScale={setScale}
        setTranslate={setTranslate}
        isPanning={isPanning}
        setIsPanning={setIsPanning}
      />
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
