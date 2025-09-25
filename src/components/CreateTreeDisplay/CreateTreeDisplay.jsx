import styles from "./CreateTreeDisplay.module.css";
import TreeNode from "../TreeNode/TreeNode";
import { useDroppable, useDraggable } from "@dnd-kit/core";

export default function CreateTreeDisplay({
  treeData,
  setSelectedNode,
  iconColor,
  backgroundColor,
  allowedNodeMovement
}) {
  return (
    <div className={styles.treeDisplay}>
      <div className={styles.levels}>
        {treeData.levels.map((level) => {
          const index = treeData.levels.indexOf(level);
          return (
            <Level id={"level:" + index} key={index}>
              {treeData.levels[index].map((nodeIndex) => {
                return (
                  <MoveableTreeNode
                    color1={backgroundColor}
                    color2={iconColor}
                    icon={treeData.nodes[nodeIndex].icon}
                    id={"node:" + nodeIndex}
                    disabled = {!allowedNodeMovement}
                    key={nodeIndex}
                  >
                    {" "}
                  </MoveableTreeNode>
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

function MoveableTreeNode({ color1, color2, icon, id, disabled }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    disabled: disabled
  });

  return (
    <div {...attributes} {...listeners} ref={setNodeRef}>
      <TreeNode color1={color1} color2={color2} icon={icon} completed={true} />
    </div>
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
