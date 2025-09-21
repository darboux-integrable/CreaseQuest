import styles from "./CreateCoursePage.module.css";
import HorizontalNavbar from "../../components/HorizontalNavbar/HorizontalNavbar";
import { useState, useEffect } from "react";
import TreeDisplay from "../../components/TreeDisplay/TreeDisplay";
import { Input } from "../../components/Input/Input";

export default function CreateCoursePage() {
  const treeData = {
    completedColor1: "#003049",
    completedColor2: "#669bbc",
    uncompletedColor1: "hsl(0, 1%, 84%)",
    uncompletedColor2: "hsl(0, 1%, 70%)",
    levels: [
      [0],
      [1, 2, 3],
      [4, 5],
      [6],
      [7],
      [8],
      [9],
      [10],
      [11],
      [12],
      [13],
    ],
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
      {
        id: 5,
        parents: [1, 2],
        completed: false,
        icon: "trophy",
      },
      {
        id: 6,
        parents: [5, 4],
        completed: false,
        icon: "trophy",
      },
      {
        id: 7,
        parents: [6],
        completed: false,
        icon: "trophy",
      },
      {
        id: 8,
        parents: [7],
        completed: false,
        icon: "trophy",
      },
      {
        id: 9,
        parents: [8],
        completed: false,
        icon: "trophy",
      },
      {
        id: 10,
        parents: [9],
        completed: false,
        icon: "trophy",
      },
      {
        id: 11,
        parents: [10],
        completed: false,
        icon: "trophy",
      },
      {
        id: 12,
        parents: [11],
        completed: false,
        icon: "trophy",
      },
      {
        id: 13,
        parents: [12],
        completed: false,
        icon: "trophy",
      },
    ],
  };

  const [backgroundColor, setBackgroundColor] = useState(
    treeData.completedColor1
  );
  const [iconColor, setIconColor] = useState(treeData.completedColor2);
  const [selectedNode, setSelectedNode] = useState(null);

  treeData.nodes.forEach((node) => {
    node.positioned = false;
    node.positionX = null;
    node.positionY = null;
    node.defaultX = null;
    node.defaultY = null;
    node.width = 55;
    node.height = 55;
  });

  useEffect(() => {
    console.log(selectedNode);
  }, [selectedNode]);

  return (
    <div className={styles.pageContent}>
      <HorizontalNavbar></HorizontalNavbar>
      <div className={styles.creationToolContainer}>
        <div className={styles.treeDisplay}>
          <TreeDisplay
            setSelectedNode={setSelectedNode}
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

          {selectedNode !== null && <h1>Selected Node {selectedNode.id}</h1>}
        </div>
      </div>
    </div>
  );
}
