import { DndContext } from "@dnd-kit/core";
import { useState } from "react";
import DraggableElement from "./DraggableElement";

export default function DraggableWrapper({
  children,
  id,
  onDragStartEvent = (delta) => {
  },
  onDragEndEvent = (newPosition) => {
  },
  onDragMoveEvent = (delta) => {

  },
  modifiers = [], 
}) {
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  return (
    <DndContext
    modifiers={modifiers}
      onDragEnd={({ delta }) => {
        setDragPosition((prev) => ({
          x: prev.x + delta.x,
          y: prev.y + delta.y,
        }))
        onDragEndEvent(delta);
      }}
      onDragMove={({delta}) => {
        onDragMoveEvent(delta);
      }}
      onDragStart={({ delta }) => {
        onDragStartEvent(delta);
      }}
    >
      <DraggableElement dragPosition={dragPosition} id={id}>
        {children}
      </DraggableElement>
    </DndContext>
  );
}
