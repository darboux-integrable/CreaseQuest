import styles from "./CreateCoursePage.module.css";
import HorizontalNavbar from "../../components/HorizontalNavbar/HorizontalNavbar";
import { useState } from "react";
import TreeDisplay from "../../components/TreeDisplay/TreeDisplay";

export default function CreateCoursePage() {
  const [currentNode, setCurrentNode] = useState();
  const [nodes, setNodes] = useState();

  const treeData = {
    completedColor1: "#003049",
    completedColor2: "#669bbc",
    uncompletedColor1: "hsl(0, 1%, 84%)",
    uncompletedColor2: "hsl(0, 1%, 70%)",
    levels: [
        [0],
        [1, 2, 3],
        [4]
    ],
    nodes: [
        {
            id: 0,
            parents: [],
            completed: true,
            icon: "star"
        },
        {
            id: 1,
            parents: [0],
            completed: true,
            icon: "star"
        },
        {
            id: 2,
            parents: [0],
            completed: false,
            icon: "star"
        },
        
        {
            id: 3,
            parents: [0],
            completed: false,
            icon: "star"
        },
        {
            id: 4,
            parents: [2, 3],
            completed: false,
            icon: "trophy"
        },
    ]
  };

  treeData.nodes.forEach(node => {
    node.positioned = false;
    node.positionX = null;
    node.positionY = null;
    node.width = 55;
    node.height = 55;
  })

  return (
    <div className={styles.pageContent}>
      <HorizontalNavbar></HorizontalNavbar>
      <div className={styles.creationToolContainer}>
        <div className={styles.treeDisplay}>
          <TreeDisplay treeData={treeData} />
        </div>
        <div className={styles.nodeInfoDisplay}></div>
      </div>
    </div>
  );
}
