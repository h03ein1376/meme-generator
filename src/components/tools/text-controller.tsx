import { ActionBtn } from "../action-btn";
import { useEditorStore } from "@/store/editor-store";

export const TextController = () => {
  const isHasTemplate = useEditorStore((state) => state.isHasTemplate);
  return (
    <div className="flex items-center gap-2">
      <ActionBtn
        disabled={!isHasTemplate}
        title="Add Text"
        icon="icon-[iconoir--text-box]"
      />
      <ActionBtn
        disabled={!isHasTemplate}
        title="Text Style"
        icon="icon-[iconoir--text]"
      />
    </div>
  );
};
