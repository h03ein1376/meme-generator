"use client";

import { useEffect, useRef, useCallback } from "react";
import { MyCanvas } from "@/utils/my-canvas";
import { useEditorStore } from "@/store/editor-store";
import { useZoomPanStore } from "@/store/zoom-pan-store";
import { useHistoryStore } from "@/store/history-store";

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const saveState = useHistoryStore((state) => state.saveState);

  const ratio = useEditorStore((state) => state.ratio);
  const canvas = useEditorStore((state) => state.canvas);
  const setCanvas = useEditorStore((state) => state.setCanvas);
  const setIsHasSelection = useEditorStore((state) => state.setIsHasSelection);
  const setIsHasTemplate = useEditorStore((state) => state.setIsHasTemplate);

  const changeScale = useZoomPanStore((state) => state.changeScale);
  const moveTranslate = useZoomPanStore((state) => state.moveTranslate);
  const isPanning = useZoomPanStore((state) => state.isPanning);

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
      moveTranslate(dx, dy);
      lastPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      dragging.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.05 : 0.05;
      changeScale(delta);
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
      moveTranslate(dx, dy);
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

  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new MyCanvas(canvasRef.current, {
      backgroundColor: "#ebeaed",
      selection: true,
    });

    const checkTemplate = () => {
      saveState(fabricCanvas.toObject(["id"]));
      setIsHasTemplate(fabricCanvas?.isHasTemplate() ?? false);
    };
    const handleSelection = () =>
      setIsHasSelection(fabricCanvas?.isHasSelection() ?? false);

    checkTemplate();
    handleSelection();

    fabricCanvas.on("object:added", checkTemplate);
    fabricCanvas.on("object:modified", () =>
      saveState(fabricCanvas.toObject(["id"]))
    );
    fabricCanvas.on("object:removed", checkTemplate);
    fabricCanvas.on("selection:created", handleSelection);
    fabricCanvas.on("selection:updated", handleSelection);
    fabricCanvas.on("selection:cleared", handleSelection);

    fabricCanvas.renderAll();
    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  const resizeCanvas = useCallback(() => {
    if (!containerRef.current || !canvas) return;

    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;
    const prevWidth = canvas.getWidth() || 1;
    const prevHeight = canvas.getHeight() || 1;

    const aspect = prevWidth / prevHeight;
    let width = containerWidth;
    let height = width / aspect;

    if (height > containerHeight) {
      height = containerHeight;
      width = height * aspect;
    }

    canvas.setDimensions({ width, height });

    const scaleX = width / prevWidth;
    const scaleY = height / prevHeight;

    canvas.getObjects().forEach((obj) => {
      obj.scaleX = (obj.scaleX ?? 1) * scaleX;
      obj.scaleY = (obj.scaleY ?? 1) * scaleY;
      obj.left = (obj.left ?? 0) * scaleX;
      obj.top = (obj.top ?? 0) * scaleY;
      obj.setCoords();
    });

    canvas.renderAll();
  }, [canvas]);

  useEffect(() => {
    if (!containerRef.current || !canvas) return;

    const observer = new ResizeObserver(() => resizeCanvas());
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [canvas, resizeCanvas]);

  useEffect(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;
    canvas?.setRatio(containerWidth, containerHeight, ratio);
  }, [canvas, ratio]);

  return {
    canvasRef,
    containerRef,
  };
};
