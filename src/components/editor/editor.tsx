"use client";
import { useEffect, useRef, useState } from "react";
import { Canvas, FabricImage } from "fabric";
import { useTemplateContext } from "@/hooks/use-template-context";
import { useTemplate } from "@/hooks/use-template";
import { addTemplateToCanvas, TEMPLATE_ID } from "@/utils/fabric-utils";
import clsx from "clsx";
import { useDropzone } from "react-dropzone";
import { UploadDropZone } from "./upload-drop-zone";

const RATIO_MAP: Record<string, number> = {
  "1:1": 1,
  "4:3": 4 / 3,
  "16:9": 16 / 9,
  "9:16": 9 / 16,
};

export function Editor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [ratio, setRatio] = useState("16:9");
  const [fileReaderLoading, setFileReaderLoading] = useState(false);

  const dropzoneState = useDropzone({
    noClick: true,
    maxFiles: 1,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
  });

  const { acceptedFiles } = dropzoneState;
  useEffect(() => {
    if (!canvas || !acceptedFiles?.length) return;
    const reader = new FileReader();
    reader.onload = async () => {
      setFileReaderLoading(false);
      const dataURL = reader.result as string;

      try {
        const img = await FabricImage.fromURL(dataURL);
        addTemplateToCanvas(canvas, img);
      } catch (error) {
        console.error("Error loading image:", error);
        return;
      }
    };
    setFileReaderLoading(true);
    reader.readAsDataURL(acceptedFiles[0]);
  }, [acceptedFiles, canvas]);
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

  const { selectedTemplate, setSelectedTemplate } = useTemplateContext();
  const { data, isLoading, error } = useTemplate(selectedTemplate);
  useEffect(() => {
    if (!canvas || !data) return;

    addTemplateToCanvas(canvas, data);
    setSelectedTemplate(undefined);
  }, [data, canvas]);

  useEffect(() => {
    if (error) {
      //todo: toast error if there is an error fetching the template
      console.log("Error fetching template data", error);
      setSelectedTemplate(undefined);
    }
  }, [error]);

  useEffect(() => {
    if (!containerRef.current || !canvas) return;

    const observer = new ResizeObserver(() => {
      console.log("Resizing canvas...");

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
    const aspect = RATIO_MAP[ratio];
    let width = containerWidth;
    let height = width / aspect;

    if (height > containerHeight) {
      height = containerHeight;
      width = height * aspect;
    }
    console.log("Setting canvas dimensions:", width, height);

    canvas.setDimensions({ width, height });
    canvas.renderAll();
  }, [ratio]);

  const isHasTemplate = canvas
    ?.getObjects()
    .some((obj) => (obj as any).id === TEMPLATE_ID);

  return (
    <div className="w-full relative flex flex-col ">
      <div className="mb-4">
        <label className="mr-2 text-gray-700 font-medium">Aspect Ratio:</label>
        <select
          className="p-2 border rounded"
          value={ratio}
          onChange={(e) => setRatio(e.target.value)}
        >
          {Object.keys(RATIO_MAP).map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
      <div
        ref={containerRef}
        className={clsx(
          !isHasTemplate && "invisible",
          "w-full  mx-auto absolute  top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 max-w-3/4 aspect-square h-auto flex items-center justify-center"
        )}
      >
        <canvas ref={canvasRef} />
      </div>
      {(isLoading || fileReaderLoading) && (
        <div className="absolute  top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <span className="loading loading-ring w-12 md:w-24 text-primary"></span>
        </div>
      )}
      {!isHasTemplate && !fileReaderLoading && (
        <div className="absolute  top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full sm:w-2/3 lg:w-1/2 aspect-square bg-base-100 dark:bg-base-300 shadow-2xl">
          <UploadDropZone {...dropzoneState} />
        </div>
      )}
    </div>
  );
}
