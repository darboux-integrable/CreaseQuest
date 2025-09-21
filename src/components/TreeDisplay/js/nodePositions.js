// Basic Rules.//
/***************/
// 1. parents of a node must be from a previous level
// 2. sibling nodes have the same exact parents

function arrayEquals(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  arr1.sort();
  arr2.sort();

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
}

// JUST DONT ASK...
// When I wrote this code only me and God knew how it worked
// Now only God knows.
// Its from my previous repo attempt at this project
// The only thing it does differently now is calculate x and y positions seperately

// THERE IS MORE DETAILED COMMENTS IN THE OLD REPO.
// but the basic idea is that it gets the sibling nodes and then places them nodes around
// based on the maximum distance of its parents nodes
export default function calculateNodePositions(treeData, maxWidth) {
  const rootLevel = treeData.levels[0];
  const nodes = treeData.nodes;

  console.log("running");

  let rootNodeGap = maxWidth / rootLevel.length;
  for (let i = 0; i < rootLevel.length; i++) {
    const nodeId = rootLevel[i];
    nodes[nodeId].positionX = rootNodeGap * i;
    nodes[nodeId].positionY = 50;
    nodes[nodeId].positioned = true;
  }

  const defaultNodeGap = 200;

  // Calculate X positions for each node
  for (let i = 1; i < treeData.levels.length; i++) {
    let level = treeData.levels[i];

    for (let j = 0; j < level.length; j++) {
      const nodeId = level[j];
      const currentNode = nodes[nodeId];

      let siblingNodes = [];

      // Get all sibling nodes including the current node
      for (let k = 0; k < nodes.length; k++) {
        const otherNode = nodes[k];
        if (arrayEquals(currentNode.parents, otherNode.parents)) {
          siblingNodes.push(otherNode);
        }
      }

      let parentXMax = nodes[currentNode.parents[0].positionX] || 0;
      let parentXMin = nodes[currentNode.parents[0].positionX] || 0;

      for (let k = 0; k < currentNode.parents.length; k++) {
        const parentNode = nodes[currentNode.parents[k]];
        if (parentNode.positionX < parentXMin)
          parentXMin = parentNode.positionX;
        if (parentNode.positionX > parentXMax)
          parentXMax = parentNode.positionX;
      }

      let distance =
        parentXMax - parentXMin || defaultNodeGap * (siblingNodes.length - 1);

      for (let k = 0; k < siblingNodes.length; k++) {
        let node = siblingNodes[k];

        if (node.positioned) continue;

        let x;
        // Must check for the edge case of a node have only itself as a sibling.
        // So we must conditionally check to make sure not to divide by zero
        if (siblingNodes.length > 1) {
          x =
            parentXMax +
            (distance / (siblingNodes.length - 1)) * k -
            distance / 2;
        } else {
          x = parentXMax + (distance / siblingNodes.length) * k - distance / 2;
        }

        node.positionX = x;
        node.defaultX = x;
        node.positioned = true;
      }
    }
  }

  // Calculate y positions for each node
  for (let i = 1; i < treeData.levels.length; i++) {
    const level = treeData.levels[i];

    for (let j = 0; j < level.length; j++) {
      const nodeId = level[j];
      const node = nodes[nodeId];

      node.positionY = (i + 1) * 75;
      node.defaultY = node.positionY;

    }
  }
}
