import styles from "./TreeDisplay.module.css";
import { useRef, useEffect, useState } from "react";
import calculateNodePositions from "./js/nodePositions";
import createConnections from "./js/createConnections";
import TreeNode from "../TreeNode/TreeNode";

export default function TreeDisplay({ treeData }) {
  if (!treeData) treeData = { levels: [] };

  const [nodeElements, setNodeElements] = useState([]);

  let canvasRef = useRef(null);

  useEffect(() => {
    const nodes = treeData.nodes;
    let nodeElementsTemp = [];

    const canvas = canvasRef.current;
    const canvasDimensions = canvas.getBoundingClientRect();
    canvas.width = canvasDimensions.width;
    canvas.height = canvasDimensions.height;

    let ctx = canvas.getContext("2d");

    ctx.translate(canvas.width / 2, 0);

    calculateNodePositions(treeData, canvas.width);
    let connections = createConnections(treeData);

    connections.forEach((connection) => {
      connection.draw(ctx);
    });

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      // ctx.fillRect(node.positionX - node.width / 2, node.positionY - node.height / 2, node.width, node.height);
      if (node.completed) {
        nodeElementsTemp.push(
          <TreeNode
            key={i}
            color1={treeData.completedColor1}
            color2={treeData.completedColor2}
            node={node}
          />
        );
      } else if (!node.completed) {
        nodeElementsTemp.push(
          <TreeNode
            key={i}
            color1={treeData.uncompletedColor1}
            color2={treeData.uncompletedColor2}
            node={node}
          />
        );
      }
    }

    setNodeElements(nodeElementsTemp);
  }, []);
  return (
    <div className={styles.treeDisplay}>
      <canvas ref={canvasRef} className={styles.treeCanvas}></canvas>
      <div className={styles.nodesContainer}>
        {nodeElements.map((element) => {
          return element;
        })}
      </div>
    </div>
  );
}
