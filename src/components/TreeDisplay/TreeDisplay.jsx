import styles from "./TreeDisplay.module.css";
import { useRef, useEffect, useState } from "react";
import calculateNodePositions from "./js/nodePositions";
import createConnections from "./js/createConnections";
import TreeNode from "../TreeNode/TreeNode";
import DraggableWrapper from "../DraggableWrapper/DraggableWrapper";

export default function TreeDisplay({
  treeData,
  setSelectedNode,
  iconColor,
  backgroundColor,
}) {
  let canvasRef = useRef(null);

  const [nodeElements, setNodeElements] = useState([]);

  const generateNodes = () => {
    const nodes = treeData.nodes;
    let nodeElementsTemp = [];

    calculateNodePositions(treeData, canvasRef.current.width);

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.completed) {
        nodeElementsTemp.push(
          <TreeNode
            key={i}
            color1={backgroundColor}
            color2={iconColor}
            node={node}
            onClickEvent={() => {
              setSelectedNode(i);
            }}
          />
        );
      } else if (!node.completed) {
        nodeElementsTemp.push(
          <TreeNode
            key={i}
            color1={treeData.uncompletedColor1}
            color2={treeData.uncompletedColor2}
            node={node}
            onClickEvent={() => {
              setSelectedNode(i);
            }}
          />
        );
      }
    }
    setNodeElements(nodeElementsTemp);

    let connections = createConnections(
      treeData,
      backgroundColor,
      treeData.uncompletedColor1
    );

    const canvas = canvasRef.current;
    const canvasDimensions = canvas.getBoundingClientRect();
    canvas.width = canvasDimensions.width;
    // On each rerender the canvas tried to grow 4 extra pixels of height
    // IDFK why that is. But it is. So subtract the height by the rate of
    // growth so the net growth is zero and the canvas does not move or grow
    canvas.height = canvasDimensions.height - 4;
    let ctx = canvas.getContext("2d");

    ctx.clearRect(-canvas.width / 2, canvas.width / 2, 0, canvas.heigth);
    ctx.translate(canvas.width / 2, 0);
    connections.forEach((connection) => {
      connection.draw(ctx);
    });
  };

  useEffect(() => {
    generateNodes();
  }, [backgroundColor, iconColor]);

  return (
      <div className={styles.treeDisplay}>
        <DraggableWrapper>
          <div
            className={styles.dragContainer}
          >
            <canvas ref={canvasRef} className={styles.treeCanvas}></canvas>
            <div className={styles.nodesContainer}>
              {nodeElements.map((element) => {
                return element;
              })}
            </div>
          </div>
        </DraggableWrapper>
      </div>
  );
}
