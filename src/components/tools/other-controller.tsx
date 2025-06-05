import { ActionBtn } from "../action-btn";
import { useEditorStore } from "@/store/editor-store";

export const OtherController = () => {
  const canvas = useEditorStore((state) => state.canvas);
  const isHasTemplate = useEditorStore((state) => state.isHasTemplate);
  const isHasSelection = useEditorStore((state) => state.isHasSelection);

  return (
    <div className="flex items-center gap-2">
      <ActionBtn
        disabled={!isHasTemplate}
        title="Download"
        onClick={() => canvas?.export()}
        icon="icon-[iconoir--download]"
      />
      <ActionBtn
        disabled={!isHasTemplate}
        title="Reset All"
        onClick={() => canvas?.removeAll()}
        icon="icon-[iconoir--refresh]"
      />
      <ActionBtn
        disabled={!isHasTemplate || !isHasSelection}
        title="Delete Selected Item"
        onClick={() => canvas?.removeCurrentSelect()}
        icon="icon-[iconoir--trash]"
      />
    </div>
  );
};
