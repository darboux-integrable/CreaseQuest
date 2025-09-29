import styles from "./CreateTreeDisplay.module.css";
import TreeNode from "../TreeNode/TreeNode";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import { useEffect, useRef, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export default function CreateTreeDisplay({
  treeData,
  setTreeData,
  setSelectedNode,
  iconColor,
  backgroundColor,
  allowedNodeMovement,
}) {
  return (
    <div className={styles.treeDisplay}>
      <div className={styles.levels}>
        {treeData.levels.map((level) => {
          const index = treeData.levels.indexOf(level);
          return (
            <Level id={"level:" + index} key={index}>
              {treeData.levels[index].map((nodeIndex) => {
                const offsetX
                  =treeData.nodes[nodeIndex].xOffset;

                if (allowedNodeMovement)
                  return (
                    <div
                      style={{
                        transform: `translate(${offsetX}px, 0px`,
                      }}
                      key={`container.${nodeIndex}`}
                    >
                      <MoveableTreeNode
                        color1={backgroundColor}
                        color2={iconColor}
                        icon={treeData.nodes[nodeIndex].icon}
                        id={"node:" + nodeIndex}
                        disabled={!allowedNodeMovement}
                        treeData={treeData}
                        setTreeData={setTreeData}
                        key={nodeIndex}
                      ></MoveableTreeNode>
                    </div>
                  );
                else if (!allowedNodeMovement)
                  return (
                    <HorizontalWrapper
                      color1={backgroundColor}
                      color2={iconColor}
                      icon={treeData.nodes[nodeIndex].icon}
                      id={"horizontal.node:" + nodeIndex}
                      treeData={treeData}
                      setTreeData={setTreeData}
                      key={nodeIndex}
                      startX={offsetX}
                    ></HorizontalWrapper>
                  );
              })}
            </Level>
          );
        })}
        <AddLevel />
      </div>
    </div>
  );
}

function MoveableTreeNode({
  color1,
  color2,
  icon,
  id,
  disabled,
  treeData,
  setTreeData,
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    disabled: disabled,
  });

  const nodeRef = useRef(null);

  useEffect(() => {
    const node = nodeRef.current;
    const nodePosition = node.getBoundingClientRect();

    const nodeIndex = id.split(":")[1];

    const tempNodes = treeData.nodes.map((node) => node);

    tempNodes[nodeIndex].x = nodePosition.x;

    setTreeData({ ...treeData, nodes: tempNodes });
  }, []);

  return (
    <div {...attributes} {...listeners} ref={setNodeRef}>
      <span ref={nodeRef}>
        <TreeNode
          color1={color1}
          color2={color2}
          icon={icon}
          completed={true}
        />
      </span>
    </div>
  );
}

function HorizontalShiftingTreeNode({ x, y, id, color1, color2, icon }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  let style = {
    transform: CSS.Translate.toString({
      x: (transform?.x ?? 0) + x,
    }),
  };

  return (
    <div {...attributes} {...listeners} ref={setNodeRef} style={style}>
      <TreeNode color1={color1} color2={color2} icon={icon} completed={true} />
    </div>
  );
}

function HorizontalWrapper({
  id,
  color1,
  color2,
  icon,
  treeData,
  setTreeData,
  startX = 0,
}) {
  const [position, setPosition] = useState({ x: startX, y: 0 });

  return (
    <DndContext
      onDragEnd={({ delta }) => {
        setPosition((prev) => ({
          x: prev.x + delta.x,
        }));

        const tempNodes = treeData.nodes.map((node) => node);
        const nodeIndex = id.split(":")[1];

        tempNodes[nodeIndex].xOffset += delta.x;
        tempNodes[nodeIndex].yOffset += delta.y;

        setTreeData({ ...treeData, nodes: tempNodes });
      }}
    >
      <HorizontalShiftingTreeNode
        id={id}
        color1={color1}
        color2={color2}
        icon={icon}
        x={position.x}
        y={position.y}
        setPosition={setPosition}
      />
    </DndContext>
  );
}

function AddLevel() {
  const { setNodeRef, isOver } = useDroppable({ id: "addLevel" });

  return (
    <div
      ref={setNodeRef}
      className={`${styles.addLevel} ${styles.levelDiv}`}
      style={{ backgroundColor: isOver ? "rgba(0,0,0,0.1)" : "transparent" }}
    >
      <p
        className={styles.addLevelText}
        style={{ color: isOver ? "rgba(0,0,0,0.3)" : "transparent" }}
      >
        Add Level
      </p>
    </div>
  );
}

function Level({ id, children }) {
  const { setNodeRef, isOver } = useDroppable({ id: id });

  return (
    <div
      className={styles.levelDiv}
      ref={setNodeRef}
      style={{ backgroundColor: isOver ? "rgba(0,0,0,0.1)" : "transparent" }}
    >
      {children}
    </div>
  );
}
