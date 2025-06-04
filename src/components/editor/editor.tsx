"use client";
import { useEffect, useState } from "react";
import { FabricImage } from "fabric";
import { addTemplateToCanvas, TEMPLATE_ID } from "@/utils/fabric-utils";
import clsx from "clsx";
import { useDropzone } from "react-dropzone";
import { UploadDropZone } from "./upload-drop-zone";
import { useCanvas } from "@/hooks/use-canvas";
import { RATIO_ITEMS } from "@/utils/const";
import { Ratio } from "@/types/ratio";

export function Editor() {
  const { canvasRef, containerRef, canvas, ratio, setRatio, isLoading } =
    useCanvas();

  const [fileReaderLoading, setFileReaderLoading] = useState(false);

  const dropzoneState = useDropzone({
    disabled: fileReaderLoading,
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
    reader.onerror = () => {
      setFileReaderLoading(false);
    };
    setFileReaderLoading(true);
    reader.readAsDataURL(acceptedFiles[0]);
  }, [acceptedFiles, canvas]);

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
          onChange={(e) => {
            setRatio(parseFloat(e.target.value) as Ratio);
          }}
        >
          {RATIO_ITEMS.map((ratioItem) => (
            <option key={ratioItem.ratio} value={ratioItem.ratio}>
              {ratioItem.title}
            </option>
          ))}
        </select>
      </div>
      <div
        ref={containerRef}
        className={clsx(
          !isHasTemplate && "invisible",
          "w-full  mx-auto absolute  top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 max-w-3/4 aspect-square h-auto flex items-center justify-center bg-fuchsia-300"
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
