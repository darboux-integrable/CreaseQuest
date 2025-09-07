class Connection {
  constructor(node1, node2, color1, color2) {
    this.node1 = node1;
    this.node2 = node2;
    this.color1 = color1;
    this.color2 = color2;
  }

  draw(ctx) {
    let lastPoint = {
      x: this.node1.positionX,
      y: this.node1.positionY + this.node1.height / 2,
    };

    const gradient = ctx.createLinearGradient(0, 0, 200, 300);
    gradient.addColorStop(0, this.color1);
    gradient.addColorStop(0.6, this.color2);
    gradient.addColorStop(1, this.color2);

    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    // Cosine interpolation as a parametric equation
    let t = 0;
    for (; t < 1; t += 0.01) {
      const x =
        this.node1.positionX +
        (this.node2.positionX - this.node1.positionX) * t;

      const y =
        this.node1.positionY +
        (this.node2.positionY - this.node1.positionY) *
          ((1 - Math.cos(Math.PI * t)) / 2);

      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

export default function createConnections(treeData) {
  const nodes = treeData.nodes;
  const completedColor1 = treeData.completedColor1;
  const uncompletedColor1 = treeData.uncompletedColor1;
  let connections = [];

  for (let i = 0; i < nodes.length; i++) {
    const currentNode = nodes[i];
    for (let j = 0; j < currentNode.parents.length; j++) {
      const parentNode = nodes[currentNode.parents[j]];
      const connection = new Connection(
        parentNode,
        currentNode,
        parentNode.completed ? completedColor1 : uncompletedColor1,
        currentNode.completed ? completedColor1 : uncompletedColor1
      );

      connections.push(connection);
    }
  }

  return connections;
}
