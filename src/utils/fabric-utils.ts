import { Canvas, FabricImage } from "fabric";
export const TEMPLATE_ID = "template-image";

export function addTemplateToCanvas(canvas: Canvas, image: FabricImage) {
  const canvasWidth = canvas.getWidth();
  const canvasHeight = canvas.getHeight();

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
    evented: true,
  });
  const existing = canvas
    .getObjects()
    .find((obj) => (obj as any).id === TEMPLATE_ID);
  if (existing) canvas.remove(existing);

  canvas.add(image);
  canvas.sendObjectToBack(image);

  canvas.preserveObjectStacking = true;

  image.on("mouseup", () => {
    image.selectable = true;
    canvas.setActiveObject(image);
    canvas.renderAll();
  });

  image.on("deselected", () => {
    image.selectable = false;
    canvas.discardActiveObject();
    canvas.renderAll();
  });

  canvas.renderAll();
}
export function addStickerToCanvas(canvas: Canvas, image: FabricImage) {
  const canvasWidth = canvas.getWidth();
  const canvasHeight = canvas.getHeight();
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

  canvas.add(image);
  canvas.renderAll();
}
