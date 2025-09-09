import { DndContext } from "@dnd-kit/core";
import { useState } from "react";
import DraggableElement from "./DraggableElement";

export default function DraggableWrapper({ children }) {
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  return (
        <DndContext
          onDragEnd={({ delta }) => {
            setDragPosition((prev) => ({
              x: prev.x + delta.x,
              y: prev.y + delta.y,
            }));
          }}
        >
        <DraggableElement dragPosition={dragPosition}>
            {children}
        </DraggableElement>
        </DndContext>
  );
}
