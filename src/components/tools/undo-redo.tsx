import { ActionBtn } from "../action-btn";
import { useEditorStore } from "@/store/editor-store";

export const UndoRedo = () => {
  const isHasTemplate = useEditorStore((state) => state.isHasTemplate);

  return (
    <div className="flex items-center gap-2">
      <ActionBtn
        disabled={!isHasTemplate}
        title="Undo"
        icon="icon-[iconoir--undo]"
      />
      <ActionBtn
        disabled={!isHasTemplate}
        title="Redo"
        icon="icon-[iconoir--redo]"
      />
    </div>
  );
};
