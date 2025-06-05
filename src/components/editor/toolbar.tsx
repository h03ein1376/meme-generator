import { CanvasSize } from "../tools/canvas-size";
import { Flip } from "../tools/flip";
import { OtherController } from "../tools/other-controller";
import { TextController } from "../tools/text-controller";
import { UndoRedo } from "../tools/undo-redo";
import { ZoomInZoomOut } from "../tools/zoom-in-zoom-out";
import { Divider } from "../divider";
import { SecondLineTools } from "./second-line-toolbar";

export const Toolbar = () => {
  return (
    <menu className=" bg-base-200 dark:bg-base-300 sm:rounded-b-lg flex items-center ">
      <div className="min-h-14 lg:flex items-center justify-between hidden w-full px-4">
        <div className="flex items-center gap-3">
          <UndoRedo />
          <Divider />
          <ZoomInZoomOut />
          <Divider />
          <TextController />
          <Divider />
          <Flip />
          <CanvasSize />
        </div>
        <div className="flex items-center gap-3">
          <Divider />
          <OtherController />
        </div>
      </div>
      <div className="lg:hidden flex flex-col items-center  w-full">
        <div className="min-h-14 w-full justify-between md:justify-center flex items-center gap-3 px-4">
          <UndoRedo />
          <Divider />
          <CanvasSize />
          <Divider />
          <OtherController />
        </div>
        <SecondLineTools className="hidden sm:flex" />
        <div className="collapse collapse-reverse rounded-none bg-[#DFDEDF] dark:bg-[#c3c1c85e] grid-rows-[0fr_max-content] sm:hidden">
          <input type="checkbox" className="peer !p-0 !row-start-2 sm:hidden" />
          <div className="collapse-content !p-0 row-start-1  sm:hidden">
            <SecondLineTools />
          </div>
          <div className="collapse-title row-start-2 w-full flex flex-col items-center justify-center p-0 peer-checked:rotate-180 transition-all duration-500  sm:hidden">
            <span className="collapse-arrow icon-[iconoir--nav-arrow-up] h-6 w-6 text-secondary dark:text-base-content" />
          </div>
        </div>
      </div>
    </menu>
  );
};
