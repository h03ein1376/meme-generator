import clsx from "clsx";
import { Divider } from "../divider";
import { Flip } from "../tools/flip";
import { TextController } from "../tools/text-controller";
import { ZoomInZoomOut } from "../tools/zoom-in-zoom-out";

export const SecondLineTools = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx(
        className,
        "min-h-14 w-full justify-between md:justify-center flex items-center gap-3 bg-base-200 dark:bg-base-300 px-4 rounded-b-lg"
      )}
    >
      <TextController />
      <Divider />
      <Flip />
      <Divider />
      <ZoomInZoomOut />
    </div>
  );
};
