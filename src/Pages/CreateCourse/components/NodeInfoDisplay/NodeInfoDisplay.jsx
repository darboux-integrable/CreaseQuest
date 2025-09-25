import styles from "./NodeInfoDisplay.module.css";
import { useDroppable, DragOverlay } from "@dnd-kit/core";
import { Input } from "../../../../components/Input/Input";
import Checkbox from "../../../../components/Checkbox/Checkbox";
import TreeNodeButton from "../TreeNodeButton/TreeNodeButton";

export default function NodeInfoDisplay({
  iconColor,
  setIconColor,
  backgroundColor,
  setBackgroundColor,
  setDragIcon,
  selectedNode,
  dragIcon,
}) {
  const { setNodeRef } = useDroppable({ id: "treeDataSidebar" });

  return (
    <div className={styles.nodeInfoDisplay} ref={setNodeRef}>
      <div>
        <h1 className={styles.generalTitle}>Gerenal</h1>
        <div className={styles.generalColorInputs}>
          <div className={styles.inputWrapper}>
            <input
              value={backgroundColor}
              onChange={(e) => {
                setBackgroundColor(e.target.value);
              }}
              className={styles.colorInput}
              type="color"
              name="Background color wrapper"
            />
            <Input
              value={backgroundColor}
              setValue={setBackgroundColor}
              placeholder="Background Color #Hex"
            ></Input>
          </div>
          <div className={styles.inputWrapper}>
            <input
              value={iconColor}
              onChange={(e) => {
                setIconColor(e.target.value);
              }}
              className={styles.colorInput}
              type="color"
              name="Icon color wrapper"
            />
            <Input
              value={iconColor}
              setValue={setIconColor}
              placeholder="Icon Color #Hex"
            ></Input>
          </div>
        </div>
      </div>
      <div>
        <h1 className={styles.nodesTitle}>Quest Nodes</h1>
        <div className={styles.nodesContainer}>
          <TreeNodeButton
            backgroundColor={backgroundColor}
            iconColor={iconColor}
            icon={"star"}
            setDragIcon={setDragIcon}
          ></TreeNodeButton>
          <TreeNodeButton
            backgroundColor={backgroundColor}
            iconColor={iconColor}
            icon={"trophy"}
            setDragIcon={setDragIcon}
          ></TreeNodeButton>

          <DragOverlay>
            <div style={{ opacity: 0.5 }}>
              <TreeNodeButton
                backgroundColor={backgroundColor}
                iconColor={iconColor}
                icon={dragIcon}
                setDragIcon={setDragIcon}
              ></TreeNodeButton>
            </div>
          </DragOverlay>
        </div>
      </div>

      {selectedNode !== null && (
        <div className={styles.selectedNodeContainer}>
          <h1>Selected Node</h1>
          <div className={styles.nodeCheckboxContainer}>
            <Checkbox label="Tweak Positions"></Checkbox>
          </div>
          <div className={styles.nodeCheckboxContainer}>
            <Checkbox label="Add Connections"></Checkbox>
          </div>
        </div>
      )}
    </div>
  );
}
