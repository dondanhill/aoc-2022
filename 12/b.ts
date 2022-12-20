const input = await Deno.readTextFile("./input.txt");
const S = [0, 0];
const E = [0, 0];

type TPos = {
  x: number;
  y: number;
};

type TNode = {
  char: string;
  code: number;
  start: boolean;
  end: boolean;
  row: number;
  col: number;
  visited: boolean;
  cost: number;
  f: number;
  g: number;
  h: number;
  neighbours: TNode[];
  prevNode: TNode | null;
};

function heuristic(a: TNode, b: TNode) {
  return Math.abs(b.col - a.col) + Math.abs(b.row - a.row);
}

const data = input
  .split("\n")
  .map((row) => row.split(""))
  .map((row, rowindex) => {
    return row.map((char, colindex) => {
      const code = char.charCodeAt(0);
      const start = code === 83;
      const end = code === 69;
      if (start) {
        S[0] = colindex;
        S[1] = rowindex;
      }
      if (end) {
        E[0] = colindex;
        E[1] = rowindex;
      }
      return {
        char: start ? "a" : end ? "z" : char,
        code: start ? 97 : end ? 122 : code,
        start,
        end,
        row: rowindex,
        col: colindex,
        visited: false,
        cost: 0,
        f: 0,
        g: 0,
        h: 0,
        neighbours: [],
        prevNode: null,
      } as TNode;
    });
  });
const gridWidth = data[0].length;
const gridHeight = data.length;
const endNode = data[E[1]][E[0]];
const startNodes: TNode[] = [];
const shortPaths: number[] = [];

data.forEach((row, rowindex) => {
  row.forEach((node, colindex) => {
    node.neighbours = setNeighbours(colindex, rowindex, node.code);
    node.h = heuristic(node, endNode);
    if (node.char === "a") {
      startNodes.push(node);
    }
  });
});

startNodes.forEach((node) => {
  let path: TNode[] = [];
  let openSet: TNode[] = [];
  const closedSet: TNode[] = [];
  data.forEach((row) => {
    row.forEach((node) => {
      node.prevNode = null;
    });
  });
  openSet.push(node);

  while (openSet.length > 0) {
    let winner = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    const currentNode = openSet[winner];
    if (currentNode === endNode) {
      let tempNode = currentNode;
      path.push(tempNode);
      while (tempNode.prevNode) {
        path = [...path, tempNode.prevNode];
        tempNode = tempNode.prevNode;
      }
      shortPaths.push(path.length - 1);
    }

    openSet = [...openSet.filter((node) => node !== currentNode)];
    closedSet.push(currentNode);

    const neighbours = currentNode.neighbours;
    for (let i = 0; i < neighbours.length; i++) {
      const neighbour = neighbours[i];
      if (!closedSet.includes(neighbour)) {
        const tempG = currentNode.g + 1;
        if (!openSet.includes(neighbour)) {
          openSet.push(neighbour);
        } else if (tempG >= neighbour.g) {
          continue;
        }
        neighbour.g = tempG;
        neighbour.f = neighbour.g + neighbour.h;
        neighbour.prevNode = currentNode;
      }
    }
  }
});

console.log(
  shortPaths.reduce((min, pathLen) => Math.min(min, pathLen), Infinity)
);

Deno.exit();

function setNeighbours(x: number, y: number, code: number): TNode[] {
  const neighbours: TNode[] = [];
  const neighbourIndices = [
    [x, y - 1],
    [x + 1, y],
    [x, y + 1],
    [x - 1, y],
  ];
  neighbourIndices.forEach((dir) => {
    if (
      dir[0] < 0 ||
      dir[0] >= gridWidth ||
      dir[1] < 0 ||
      dir[1] >= gridHeight
    ) {
      return;
    }
    if (
      code >= data[dir[1]][dir[0]].code ||
      code === data[dir[1]][dir[0]].code - 1
    ) {
      return neighbours.push(data[dir[1]][dir[0]]);
    }
    return;
  });
  return neighbours;
}
