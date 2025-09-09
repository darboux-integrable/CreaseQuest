import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import styles from "./DragElement.module.css";

export default function DraggableElement({ children, dragPosition }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "unique-id",
  });

  const style = {
    transform: CSS.Translate.toString({
      x: (transform?.x ?? 0) + dragPosition.x,
      y: (transform?.y ?? 0) + dragPosition.y,
    }),
  };

  return (
    <div className={styles.dragWrapperElement} ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}
