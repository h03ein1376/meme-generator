"use client";
import { useEditorStore } from "@/store/editor-store";
import { useZoomPanStore } from "@/store/zoom-pan-store";
import clsx from "clsx";

export const ZoomPanController = ({ className }: { className: string }) => {
  const isHasTemplate = useEditorStore((state) => state.isHasTemplate);
  const scale = useZoomPanStore((state) => state.scale);
  const isPanning = useZoomPanStore((state) => state.isPanning);
  const setScale = useZoomPanStore((state) => state.setScale);
  const setIsPanning = useZoomPanStore((state) => state.setIsPanning);
  const resetZoomPan = useZoomPanStore((state) => state.resetZoomPan);

  return (
    <div
      className={clsx(
        className,
        "flex items-center justify-center flex-wrap gap-2 self-end bg-base-200 dark:bg-base-300 rounded-lg px-2"
      )}
    >
      <button
        disabled={!isHasTemplate}
        className="btn btn-ghost btn-circle"
        onClick={() => resetZoomPan()}
      >
        <span className="icon-[iconoir--refresh] w-5 h-5" />
      </button>
      <div className="flex items-center gap-2">
        <input
          disabled={!isHasTemplate}
          type="range"
          min={0.5}
          max={2}
          step={0.01}
          value={scale}
          onChange={(e) => setScale(parseFloat(e.target.value))}
          className="accent-secondary w-44"
        />
        <span className="text-sm font-mono w-10 text-center">
          {Math.round(scale * 100)}%
        </span>
      </div>
      <button disabled={!isHasTemplate} className="btn btn-ghost btn-circle">
        <label className="swap">
          <input
            disabled={!isHasTemplate}
            type="checkbox"
            checked={isPanning}
            onChange={() => {
              setIsPanning(!isPanning);
            }}
          />
          <span className="swap-on icon-[iconoir--drag-hand-gesture] w-5 h-5" />
          <span className="swap-off icon-[iconoir--cursor-pointer] w-5 h-5" />
        </label>
      </button>
    </div>
  );
};
