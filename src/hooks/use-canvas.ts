"use client";

import { useEffect, useRef, useCallback } from "react";
import { MyCanvas } from "@/utils/my-canvas";
import { useEditorStore } from "@/store/editor-store";

export const useCanvas = () => {
  const ratio = useEditorStore((state) => state.ratio);
  const canvas = useEditorStore((state) => state.canvas);
  const setCanvas = useEditorStore((state) => state.setCanvas);
  const setIsHasSelection = useEditorStore((state) => state.setIsHasSelection);
  const setIsHasTemplate = useEditorStore((state) => state.setIsHasTemplate);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new MyCanvas(canvasRef.current, {
      backgroundColor: "#ebeaed",
      selection: true,
    });

    const checkTemplate = () =>
      setIsHasTemplate(fabricCanvas?.isHasTemplate() ?? false);

    const handleSelection = () =>
      setIsHasSelection(fabricCanvas?.isHasSelection() ?? false);

    checkTemplate();
    handleSelection();

    fabricCanvas.on("object:added", checkTemplate);
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
