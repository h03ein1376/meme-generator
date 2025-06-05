import { Canvas, FabricImage } from "fabric";
import { CANVAS_BG_COLOR } from "./const";

export const TEMPLATE_ID = "template-image";
const TEMPLATE_SCALE_FACTOR = 0.1;
const EXPORT_WIDTH = 1080;
const EXPORT_HEIGHT = 1080;

export class MyCanvas extends Canvas {
  constructor(...args: ConstructorParameters<typeof Canvas>) {
    super(...args);
    this.preserveObjectStacking = true;
  }

  setRatio(containerWidth: number, containerHeight: number, ratio: number) {
    let width = containerWidth;
    let height = width / ratio;

    if (height > containerHeight) {
      height = containerHeight;
      width = height * ratio;
    }

    this.setDimensions({ width, height });
    this.renderAll();
  }

  removeAll() {
    this.clear();
    this.renderAll();
  }

  removeCurrentSelect() {
    const activeObject = this.getActiveObject();
    if (activeObject) {
      this.remove(activeObject);
      this.renderAll();
    }
  }

  lock() {
    this.skipTargetFind = true;
    this.selection = false;
    this.discardActiveObject();
    this.defaultCursor = "grab";
    this.requestRenderAll();
  }

  unlock() {
    this.skipTargetFind = false;
    this.selection = true;
    this.defaultCursor = "default";
    this.requestRenderAll();
  }

  isHasTemplate() {
    console.log(this.getObjects());

    return this.getObjects().some((obj) => (obj as any).id === TEMPLATE_ID);
  }

  isHasSelection() {
    const active = this.getActiveObject();
    return !!active && (active as any)?.id !== TEMPLATE_ID;
  }

  addTemplate(image: FabricImage) {
    const canvasWidth = this.getWidth();
    const canvasHeight = this.getHeight();
    const imgWidth = image.width ?? 1;
    const imgHeight = image.height ?? 1;

    const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    image.scale(scale);

    image.set({
      id: TEMPLATE_ID,
      left: canvasWidth / 2,
      top: canvasHeight / 2,
      originX: "center",
      originY: "center",
      selectable: false,
      hasControls: false,
      hoverCursor: "pointer",
      evented: true,
    });

    const existing = this.getObjects().find(
      (obj) => (obj as any).id === TEMPLATE_ID
    );
    if (existing) this.remove(existing);

    this.set({ backgroundColor: CANVAS_BG_COLOR });
    this.add(image);
    this.sendObjectToBack(image);

    image.on("mouseup", () => {
      image.selectable = true;
      image.set({ hoverCursor: "move" });
      this.setActiveObject(image);
      this.renderAll();
    });

    image.on("deselected", () => {
      image.selectable = false;
      image.set({ hoverCursor: "pointer" });
      this.discardActiveObject();
      this.renderAll();
    });

    this.renderAll();
  }

  addSticker(image: FabricImage) {
    const canvasWidth = this.getWidth();
    const canvasHeight = this.getHeight();
    const imgWidth = image.width ?? 1;
    const imgHeight = image.height ?? 1;

    const scale = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight);
    image.scale(scale / 2);

    image.set({
      left: canvasWidth / 2,
      top: canvasHeight / 2,
      originX: "center",
      originY: "center",
    });

    this.add(image);
    this.setActiveObject(image);
    this.renderAll();
  }

  flipXActiveObject() {
    const activeObject = this.getActiveObject();
    if (activeObject) {
      activeObject.set("flipX", !activeObject.flipX);
      this.renderAll();
    }
  }

  flipYActiveObject() {
    const activeObject = this.getActiveObject();
    if (activeObject) {
      activeObject.set("flipY", !activeObject.flipY);
      this.renderAll();
    }
  }

  scaleTemplate(direction: "up" | "down") {
    const templateObj = this.getObjects().find(
      (obj) => (obj as any).id === TEMPLATE_ID
    );
    if (!templateObj) return;

    const newScaleX =
      direction === "up"
        ? templateObj.scaleX! + TEMPLATE_SCALE_FACTOR
        : templateObj.scaleX! - TEMPLATE_SCALE_FACTOR;

    const newScaleY =
      direction === "up"
        ? templateObj.scaleY! + TEMPLATE_SCALE_FACTOR
        : templateObj.scaleY! - TEMPLATE_SCALE_FACTOR;

    const clamp = (val: number, min = 0.1, max = 10) =>
      Math.max(min, Math.min(max, val));

    templateObj.set({
      scaleX: clamp(newScaleX),
      scaleY: clamp(newScaleY),
    });

    templateObj.setCoords();
    this.renderAll();
  }

  export() {
    const scaleX = EXPORT_WIDTH / this.getWidth();
    const scaleY = EXPORT_HEIGHT / this.getHeight();
    const multiplier = Math.min(scaleX, scaleY);

    const dataURL = this.toDataURL({
      format: "jpeg",
      quality: 1,
      multiplier: multiplier,
    });

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "canvas.jpg";
    link.click();
  }
}
