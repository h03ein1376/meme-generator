"use client";

import { Ratio } from "@/types/ratio";
import { Sticker } from "@/types/sticker";
import { Template } from "@/types/template";
import { addTemplateToCanvas, addStickerToCanvas } from "@/utils/fabric-utils";
import { Canvas } from "fabric";
import { useEffect, useRef, useState } from "react";
import { useEditorContext } from "./use-editor-context";
import { useStickerMutation } from "./use-sticker";
import { useTemplateMutation } from "./use-template";

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const [canvas, setCanvas] = useState<Canvas>();
  const [ratio, setRatio] = useState<Ratio>(Ratio["16:9"]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const fabricCanvas = new Canvas(canvasRef.current, {
      backgroundColor: "#ebeaed",
      selection: true,
    });
    setCanvas(fabricCanvas);
    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || !canvas) return;

    const observer = new ResizeObserver(() => {
      const containerWidth = containerRef.current!.offsetWidth;
      const containerHeight = containerRef.current!.offsetHeight;
      const prevWidth = canvas.getWidth();
      const prevHeight = canvas.getHeight();

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
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [canvas]);

  useEffect(() => {
    if (!containerRef.current || !canvas) return;

    const containerWidth = containerRef.current!.offsetWidth;
    const containerHeight = containerRef.current!.offsetHeight;
    let width = containerWidth;
    let height = width / ratio;

    if (height > containerHeight) {
      height = containerHeight;
      width = height * ratio;
    }

    canvas.setDimensions({ width, height });
    canvas.renderAll();
  }, [ratio]);

  const templateMutation = useTemplateMutation(canvas);
  const stickerMutation = useStickerMutation(canvas);
  const { setOnTemplateClick, setOnStikerClick } = useEditorContext();

  useEffect(() => {
    if (!canvas) return;

    setOnTemplateClick(() => (template: Template) => {
      if (!canvas) return;
      templateMutation.mutate(template);
    });
    setOnStikerClick(() => (sticker: Sticker) => {
      if (!canvas) return;
      stickerMutation.mutate(sticker);
    });
  }, [canvas]);

  return {
    canvasRef,
    containerRef,
    canvas,
    ratio,
    setRatio,
    isLoading: templateMutation.isPending || stickerMutation.isPending,
  };
};
