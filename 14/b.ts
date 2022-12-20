const input = await Deno.readTextFile("./input.txt");
const data = input.split("\n").map((slice) => slice.split(" -> "));

let maxX = 0;
let maxY = 0;
let minX = Infinity;
let minY = Infinity;
let width = 0;
let height = 0;
const map = new Map();

data.forEach((line) => {
  line.forEach((point) => {
    const [x, y] = point.split(",").map((val) => Number(val));
    minX = Math.min(x, minX);
    minY = Math.min(y, minY);
    maxX = Math.max(x, maxX);
    maxY = Math.max(y, maxY);
  });
});

width = maxX - minX + 1;
height = maxY + 1;

for (let row = 0; row < height; row++) {
  for (let col = 0; col < width; col++) {
    map.set(`${col + minX}-${row}`, ".");
  }
}

data.forEach((line) => {
  // console.log(line);
  for (let i = 0; i < line.length - 1; i++) {
    const [a, b] = line
      .slice(i, i + 2)
      .map((xy) => xy.split(",").map((val) => Number(val)));
    const [x0, y0, x1, y1] = [...a, ...b];
    // console.log("pair", [x0, y0, x1, y1]);
    for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++) {
      for (let y = Math.min(y0, y1); y <= Math.max(y0, y1); y++) {
        map.set(`${x}-${y}`, "#");
      }
    }
  }
});

function getMapPoint(row: number, col: number) {
  const point = map.get(`${col}-${row}`);
  if (point === undefined) {
    if (row === height + 1) return "#";
    return ".";
  }
  return point;
}
function setMapPoint(row: number, col: number, value: string) {
  map.set(`${col}-${row}`, value);
}

function drawMap() {
  for (let row = 0; row < height + 2; row++) {
    let grid = "";
    for (let col = minX; col <= maxX; col++) {
      grid += getMapPoint(row, col);
    }
    console.log(grid);
  }
}

function canDropLeft(row: number, col: number): boolean {
  return getMapPoint(row, col - 1) === ".";
}

function canDropRight(row: number, col: number): boolean {
  return getMapPoint(row, col + 1) === ".";
}

function addSand() {
  let row = 0;
  let col = 500;

  while (true) {
    switch (getMapPoint(row, col)) {
      case "#":
      case "o":
        if (row === 0 && col === 500) return true;
        if (canDropLeft(row, col)) {
          col--;
        } else if (canDropRight(row, col)) {
          col++;
        } else {
          setMapPoint(row - 1, col, "o");
          return;
        }
        break;
    }
    row++;
    // if (col < minX) return;
    if (row > height + 2) return;
  }
}

// for (let i = 0; i < 20000; i++) {
while (!addSand());
// drawMap();
// console.log(
//   Array.from(map.values()).reduce((count, spot) => (count += spot === "o"), 0)
// );

drawMap();

console.log(
  Array.from(map.values()).reduce((count, spot) => (count += spot === "o"), 0)
);

Deno.exit();
