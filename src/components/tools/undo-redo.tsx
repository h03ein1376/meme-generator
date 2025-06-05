import { useHistoryStore } from "@/store/history-store";
import { ActionBtn } from "../action-btn";
import { useEditorStore } from "@/store/editor-store";

export const UndoRedo = () => {
  const canvas = useEditorStore((state) => state.canvas);
  const undo = useHistoryStore((state) => state.undo);
  const redo = useHistoryStore((state) => state.redo);
  const undoStack = useHistoryStore((state) => state.undoStack);
  const redoStack = useHistoryStore((state) => state.redoStack);

  return (
    <div className="flex items-center gap-2">
      <ActionBtn
        disabled={undoStack.length <= 1}
        title="Undo"
        onClick={() => undo(canvas)}
        icon="icon-[iconoir--undo]"
      />
      <ActionBtn
        disabled={redoStack.length == 0}
        onClick={() => redo(canvas)}
        title="Redo"
        icon="icon-[iconoir--redo]"
      />
    </div>
  );
};
