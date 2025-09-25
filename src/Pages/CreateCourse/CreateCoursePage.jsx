/**
 * We dont talk about this page
 * Hell created it not me.
 * Super messy IDFK what is happening
 * But it all works and that is what matters
 *
 *
 * TODO
 * CLEAN THIS BITCH
 */

import styles from "./CreateCoursePage.module.css";
import HorizontalNavbar from "../../components/HorizontalNavbar/HorizontalNavbar";
import { useState } from "react";
import CreateTreeDisplay from "../../components/CreateTreeDisplay/CreateTreeDisplay";
import { DndContext } from "@dnd-kit/core";
import InfiniteCanvas from "../../components/InfiniteCanvas/InfiniteCanvas";
import NodeInfoDisplay from "./components/NodeInfoDisplay/NodeInfoDisplay";

export default function CreateCoursePage() {
  const [treeData, setTreeData] = useState({
    completedColor1: "#003049",
    completedColor2: "#669bbc",
    uncompletedColor1: "hsl(0, 1%, 84%)",
    uncompletedColor2: "hsl(0, 1%, 70%)",
    levels: [],
    nodes: [],
    numNodes: 0,
  });

  const [backgroundColor, setBackgroundColor] = useState(
    treeData.completedColor1
  );

  const [iconColor, setIconColor] = useState(treeData.completedColor2);
  const [selectedNode, setSelectedNode] = useState(null);

  const [dragIcon, setDragIcon] = useState("star");

  const [allowMovement, setAllowMovement] = useState(true);

  const onDragStart = (active) => {
    // Create drag preview
    if (active.id === "star" || active.id === "trophy") {
      setDragIcon(active.id);
      return;
    }

    // Select the node
    if (active.id.includes("node:")) {
      const nodeIndex = parseInt(active.id.split(":")[1]);

      setSelectedNode(treeData.nodes[nodeIndex]);
      setDragIcon(treeData.nodes[nodeIndex].icon);
    }
  };

  const onDragEndEvent = (active, over) => {
    if (over == null) return;

    let newNode = {
      x: null,
      y: null,
      parents: [],
      id: treeData.numNodes,
    };

    // Create a new level and add a node
    if (
      over.id == "addLevel" &&
      (active.id === "star" || active.id === "trophy")
    ) {
      newNode.atLevel = treeData.levels.length;
      newNode.icon = active.id;
      setTreeData({
        ...treeData,
        levels: [...treeData.levels, [newNode.id]],
        nodes: [...treeData.nodes, newNode],
        numNodes: treeData.numNodes + 1,
      });

      return;
    }

    // Add new node to a level
    if (
      over.id.includes("level:") &&
      (active.id === "star" || active.id === "trophy")
    ) {
      let levelIndex = parseInt(over.id.split(":")[1]);

      let temp = treeData.levels.map((level) => level);

      newNode.atLevel = levelIndex;
      newNode.icon = active.id;

      temp[levelIndex].push(newNode.id);

      setTreeData({
        ...treeData,
        levels: temp,
        nodes: [...treeData.nodes, newNode],
        numNodes: treeData.numNodes + 1,
      });

      return;
    }

    // Move a node from one level to another
    if (active.id.includes("node:") && over.id.includes("level:")) {
      let levelIndex = parseInt(over.id.split(":")[1]);
      let nodeIndex = parseInt(active.id.split(":")[1]);

      let node = treeData.nodes[nodeIndex];

      if (node.atLevel === levelIndex) {
        return;
      }

      let temp = treeData.levels.map((level) => level);

      temp[node.atLevel].splice(temp[node.atLevel].indexOf(node.id), 1);
      node.atLevel = levelIndex;
      temp[levelIndex].push(node.id);

      setTreeData({ ...treeData, levels: temp });

      return;
    }

    // Move a node from a level to a newly created level
    if (active.id.includes("node:") && over.id === "addLevel") {
      let nodeIndex = parseInt(active.id.split(":")[1]);

      const node = treeData.nodes[nodeIndex];

      let temp = treeData.levels.map((level) => level);

      temp[node.atLevel].splice(temp[node.atLevel].indexOf(nodeIndex), 1);
      node.atLevel = temp.length;
      temp.push([nodeIndex]);

      setTreeData({ ...treeData, levels: temp });

      return;
    }

    // Delete a node by moving it to the side bar.
    if (active.id.includes("node:") && over.id === "treeDataSidebar") {
      let nodeIndex = parseInt(active.id.split(":")[1]);
      let node = treeData.nodes[nodeIndex];
      let tempLevels = treeData.levels.map((level) => level);

      tempLevels[node.atLevel].splice(
        tempLevels[node.atLevel].indexOf(node.id),
        1
      );
      let tempNodes = treeData.nodes.map((node) => node);

      for (let i = nodeIndex + 1; i < tempNodes.length; i++) {
        tempNodes[i].id -= 1;
      }

      tempNodes.splice(nodeIndex, 1);

      setSelectedNode(null);

      setTreeData({
        ...treeData,
        levels: tempLevels,
        nodes: tempNodes,
        numNodes: treeData.numNodes - 1,
      });
    }
  };

  return (
    <div className={styles.pageContent}>
      <HorizontalNavbar></HorizontalNavbar>

      <DndContext
        onDragStart={({ active }) => {
          onDragStart(active);
        }}
        onDragEnd={({ active, over }) => {
          onDragEndEvent(active, over);
        }}
      >
        <div className={styles.creationToolContainer}>
          <div className={styles.treeDisplay}>
            <InfiniteCanvas>
              <CreateTreeDisplay
                setSelectedNode={setSelectedNode}
                treeData={treeData}
                iconColor={iconColor}
                backgroundColor={backgroundColor}
                allowedNodeMovement={allowMovement}
              />
            </InfiniteCanvas>
          </div>
          <NodeInfoDisplay
            iconColor={iconColor}
            setIconColor={setIconColor}
            backgroundColor={backgroundColor}
            setBackgroundColor={setBackgroundColor}
            setDragIcon={setDragIcon}
            selectedNode={selectedNode}
            dragIcon={dragIcon}
          ></NodeInfoDisplay>
        </div>
      </DndContext>
    </div>
  );
}

