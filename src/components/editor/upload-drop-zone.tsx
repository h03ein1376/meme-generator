"use client";

import clsx from "clsx";
import { DropzoneState, useDropzone } from "react-dropzone";

export const UploadDropZone = ({
  open,
  getRootProps,
  getInputProps,
  isDragAccept,
  isDragReject,
  className,
}: DropzoneState & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...getRootProps({
        className: clsx(
          "dropzone w-full h-full flex justify-center items-center ",
          isDragAccept && "border-dashed border-2 border-success ",
          isDragReject && "border-dashed border-2 border-error ",
          className
        ),
      })}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col justify-center items-center gap-8 lg:py-44 px-7 bg-bg_Light_secondary dark:bg-bg_dark_third shadow-upload_box_shadow dark:shadow-upload_box_shadow_dark ">
        <p className="font-black text-2xl text-center uppercase tracking-[2.4px]">
          Choose a template <br />{" "}
          <span className="font-medium italic">or upload yours</span>
          <br /> to start
        </p>
        <button
          onClick={open}
          className="flex justify-center items-center gap-2  py-2 px-4 rounded-lg btn btn-primary"
        >
          <span className="icon-[iconoir--share-ios] w-6 h-6" />
          Upload an image
        </button>
      </div>
    </div>
  );
};
