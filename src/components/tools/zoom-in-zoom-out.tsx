import { ActionBtn } from "../action-btn";
import { useEditorStore } from "@/store/editor-store";

export const ZoomInZoomOut = () => {
  const canvas = useEditorStore((state) => state.canvas);
  const isHasTemplate = useEditorStore((state) => state.isHasTemplate);

  return (
    <div className="flex items-center gap-2">
      <ActionBtn
        disabled={!isHasTemplate}
        title="ZoomIn Background Image"
        onClick={() => canvas?.scaleTemplate("up")}
        icon="icon-[iconoir--zoom-in]"
      />
      <ActionBtn
        disabled={!isHasTemplate}
        title="ZoomOut Background Image"
        onClick={() => canvas?.scaleTemplate("down")}
        icon="icon-[iconoir--zoom-out]"
      />
    </div>
  );
};
