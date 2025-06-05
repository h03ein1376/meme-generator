import { useEditorStore } from "@/store/editor-store";
import { getRatioKey } from "@/types/ratio";
import { RATIO_ITEMS } from "@/utils/const";
import clsx from "clsx";
import { useId, useRef } from "react";

export const CanvasSize = () => {
  const isHasTemplate = useEditorStore((state) => state.isHasTemplate);
  const ratio = useEditorStore((state) => state.ratio);
  const setRatio = useEditorStore((state) => state.setRatio);

  const id = useId();
  const popoverId = `popover-${id}`;
  const anchorVar = `--anchor-${id}`;
  const currentItem = RATIO_ITEMS.find((item) => item.ratio === ratio);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative inline-block">
      <div
        className="sm:tooltip sm:tooltip-bottom"
        data-tip={"Select Canvas Size"}
      >
        <button
          className="btn btn-ghost flex items-center gap-2 font-normal text-sm  p-1 text-secondary dark:text-base-content disabled:opacity-50"
          popoverTarget={popoverId}
          disabled={!isHasTemplate}
          style={{ anchorName: anchorVar } as React.CSSProperties}
        >
          {!currentItem ? (
            "Select Size"
          ) : (
            <>
              <span className={clsx(currentItem.icon, "h-6 w-6")} />{" "}
              {currentItem.shortTitle}
            </>
          )}
        </button>
      </div>

      <div
        className="dropdown dropdown-center flex flex-col gap-2 bg-primary-light dark:bg-base-200 rounded-lg p-4 text-secondary"
        popover="auto"
        id={popoverId}
        ref={dropdownRef}
        style={{ positionAnchor: anchorVar } as React.CSSProperties}
      >
        <div className="flex items-center justify-between">
          <p className="uppercase text-lg font-black ">choose canvas size</p>
          <button
            onClick={() => dropdownRef.current?.hidePopover?.()}
            className="btn btn-ghost btn-circle p-0 "
          >
            ✕
          </button>
        </div>
        {RATIO_ITEMS.map((ratioItem) => (
          <button
            key={ratioItem.ratio}
            onClick={() => {
              setRatio(ratioItem.ratio);
              dropdownRef.current?.hidePopover?.();
            }}
            className={clsx(
              ratioItem.ratio === ratio
                ? "btn-secondary bg-[#63697b]"
                : "btn-ghost ",
              "btn  flex justify-between items-center font-normal  min-w-72"
            )}
          >
            <div className="flex  items-center gap-2">
              <div
                className={clsx(
                  ratioItem.ratio === ratio ? "bg-primary" : "bg-secondary/70",
                  "h-6 w-6 p-1  rounded-md text-secondary-content"
                )}
              >
                <span className={clsx(ratioItem.icon)} />
              </div>
              {ratioItem.title}
            </div>
            <p>{getRatioKey(ratioItem.ratio)}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
