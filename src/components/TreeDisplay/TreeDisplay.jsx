import styles from "./TreeDisplay.module.css";
import { useRef, useEffect, useState } from "react";
import calculateNodePositions from "./js/nodePositions";
import createConnections from "./js/createConnections";
import TreeNode from "../TreeNode/TreeNode";
import DraggableWrapper from "../DraggableWrapper/DraggableWrapper";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
export default function TreeDisplay({
  treeData,
  setSelectedNode,
  iconColor,
  backgroundColor,
}) {
  let canvasRef = useRef(null);

  const [connections, setConnections] = useState([]);
  const [nodeElements, setNodeElements] = useState([]);

  const generateNodes = () => {
    const nodes = treeData.nodes;
    let nodeElementsTemp = [];

    calculateNodePositions(treeData, canvasRef.current.width);

    // Create Node Elements
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const color1 = node.completed
        ? backgroundColor
        : treeData.uncompletedColor1;
      const color2 = node.completed ? iconColor : treeData.uncompletedColor2;
      nodeElementsTemp.push({
        id: node.id,
        element: (
          <TreeNode key={i} color1={color1} color2={color2} node={node} />
        ),
        onClickEvent: () => {
          setSelectedNode(node);
        },
      });
    }
    setNodeElements(nodeElementsTemp);

    setConnections(
      createConnections(treeData, backgroundColor, treeData.uncompletedColor1)
    );
  };

  useEffect(() => {
    generateNodes();
  }, [backgroundColor, iconColor]);

  // Needed to reset the canvas position after all the node positions are calculated
  // At least I think that is why. IDFK.
  useEffect(() => {
    setTimeout(() => {
      generateNodes();
    }); // IDFK WHY I NEED THIS BUT I DO OR STUFF STOPS WORKING.
  }, []);

  // Redraw the connections on the canvas
  useEffect(() => {
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

  }, [connections]);

  const recalculateConnections = (element, delta) => {
    let index;

    for (let i = 0; i < treeData.nodes.length; i++) {
      if (treeData.nodes[i].id === element.id) {
        index = i;
      }
    }


    treeData.nodes[index].positionX = treeData.nodes[index].defaultX + delta.x;
    treeData.nodes[index].positionY = treeData.nodes[index].defaultY + delta.y;

    setConnections(
      createConnections(treeData, backgroundColor, treeData.uncompletedColor1)
    );

  };

  return (
    <div className={styles.treeDisplay}>
        <div className={styles.dragContainer}>
          <canvas ref={canvasRef} className={styles.treeCanvas}></canvas>

          <div className={styles.heightContainer}>
            {nodeElements.map((element) => {
              return (
                <div
                  key={nodeElements.indexOf(element)}
                  className={styles.heightBox}
                ></div>
              );
            })}
          </div>
          <div className={styles.nodesContainer}>
            {nodeElements.map((element) => {
              const id = nodeElements.indexOf(element) + "tree.display.node";
              return (
                <div key={id + ".container"}>
                  <DraggableWrapper
                    onDragStartEvent={() => {
                      element.onClickEvent();
                    }}
                    onDragMoveEvent={(delta) => {
                      recalculateConnections(element.element.props.node, delta);
                    }}
                    onDragEndEvent={(delta) => {
                      element.element.props.node.defaultX += delta.x;
                      element.element.props.node.defaultY += delta.y;
                    }}
                    id={id}
                  >
                    {element.element}
                  </DraggableWrapper>
                </div>
              );
            })}
          </div>
        </div>
    </div>
  );
}
