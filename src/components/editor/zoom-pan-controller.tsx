type ZoomPanControllerProps = {
  scale: number;
  setScale: (scale: number) => void;
  setTranslate: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  isPanning: boolean;
  setIsPanning: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ZoomPanController = ({
  scale,
  setScale,
  setTranslate,
  isPanning,
  setIsPanning,
}: ZoomPanControllerProps) => {
  return (
    <div className="flex items-center justify-center flex-wrap gap-2 self-end bg-base-200 dark:bg-base-300 rounded-lg px-2">
      <button
        className="btn btn-ghost btn-circle"
        onClick={() => {
          setScale(1);
          setTranslate({ x: 0, y: 0 });
        }}
      >
        <span className="icon-[iconoir--refresh] w-5 h-5" />
      </button>
      <div className="flex items-center gap-2">
        <input
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
      <button className="btn btn-ghost btn-circle">
        <label className="swap">
          <input
            type="checkbox"
            checked={isPanning}
            onChange={() => {
              setIsPanning((prev) => !prev);
            }}
          />
          <span className="swap-on icon-[iconoir--drag-hand-gesture] w-5 h-5" />
          <span className="swap-off icon-[iconoir--cursor-pointer] w-5 h-5" />
        </label>
      </button>
    </div>
  );
};
