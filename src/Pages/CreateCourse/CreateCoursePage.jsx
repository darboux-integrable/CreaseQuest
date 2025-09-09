import styles from "./CreateCoursePage.module.css";
import HorizontalNavbar from "../../components/HorizontalNavbar/HorizontalNavbar";
import { useState, useEffect } from "react";
import TreeDisplay from "../../components/TreeDisplay/TreeDisplay";
import { Input } from "../../components/Input/Input";
import DraggableWrapper from "../../components/DraggableWrapper/DraggableWrapper";

export default function CreateCoursePage() {
  const [selectedNodeIndex, setSelectedNodeIndex] = useState();
  const treeData = {
    completedColor1: "#003049",
    completedColor2: "#669bbc",
    uncompletedColor1: "hsl(0, 1%, 84%)",
    uncompletedColor2: "hsl(0, 1%, 70%)",
    levels: [[0], [1, 2, 3], [4]],
    nodes: [
      {
        id: 0,
        parents: [],
        completed: true,
        icon: "star",
      },
      {
        id: 1,
        parents: [0],
        completed: true,
        icon: "star",
      },
      {
        id: 2,
        parents: [0],
        completed: false,
        icon: "star",
      },

      {
        id: 3,
        parents: [0],
        completed: false,
        icon: "star",
      },
      {
        id: 4,
        parents: [2, 3],
        completed: false,
        icon: "trophy",
      },
    ],
  };

  const [backgroundColor, setBackgroundColor] = useState(
    treeData.completedColor1
  );
  const [iconColor, setIconColor] = useState(treeData.completedColor2);

  treeData.nodes.forEach((node) => {
    node.positioned = false;
    node.positionX = null;
    node.positionY = null;
    node.width = 55;
    node.height = 55;
  });

  return (
    <div className={styles.pageContent}>
      <HorizontalNavbar></HorizontalNavbar>
      <div className={styles.creationToolContainer}>
        <div className={styles.treeDisplay}>
         
              <TreeDisplay
                setSelectedNode={setSelectedNodeIndex}
                treeData={treeData}
                iconColor={iconColor}
                backgroundColor={backgroundColor}
              />
        </div>
        <div className={styles.nodeInfoDisplay}>
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

          {selectedNodeIndex >= 0 && <h1>Selected Node {selectedNodeIndex}</h1>}
        </div>
      </div>
    </div>
  );
}
