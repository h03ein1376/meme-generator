import { ActionBtn } from "../action-btn";
import { useEditorStore } from "@/store/editor-store";

export const Flip = () => {
  const canvas = useEditorStore((state) => state.canvas);
  const isHasTemplate = useEditorStore((state) => state.isHasTemplate);
  const isHasSelection = useEditorStore((state) => state.isHasSelection);
  const active = isHasTemplate && isHasSelection;
  return (
    <div className="flex items-center gap-2">
      <ActionBtn
        disabled={!active}
        title="Flip X"
        onClick={() => canvas?.flipXActiveObject()}
        icon="icon-[iconoir--flip]"
      />
      <ActionBtn
        disabled={!active}
        onClick={() => canvas?.flipYActiveObject()}
        title="Flip Y"
        className="rotate-90"
        icon="icon-[iconoir--flip]"
      />
    </div>
  );
};
