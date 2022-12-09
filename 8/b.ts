const input = await Deno.readTextFile("./input.txt");
const data = input
  .split("\n")
  .map((row) => row.split("").map((height) => Number(height)));
const width = data[0].length;
const height = data.length;

function checkNeighbours(r: number, c: number) {
  return checkVertical(r, c) * checkHorizontal(r, c);
}
function checkVertical(r: number, c: number) {
  return checkUp(r, c) * checkDown(r, c);
}
function checkHorizontal(r: number, c: number) {
  return checkLeft(r, c) * checkRight(r, c);
}
function checkLeft(r: number, c: number) {
  let count = 0;
  for (let x = c - 1; x >= 0; x--) {
    count++;
    if (data[r][x] >= data[r][c]) return count;
  }
  return count;
}
function checkRight(r: number, c: number) {
  let count = 0;
  for (let x = c + 1; x < width; x++) {
    count++;
    if (data[r][x] >= data[r][c]) return count;
  }
  return count;
}
function checkUp(r: number, c: number) {
  let count = 0;
  for (let x = r - 1; x >= 0; x--) {
    count++;
    if (data[x][c] >= data[r][c]) return count;
  }
  return count;
}
function checkDown(r: number, c: number) {
  let count = 0;
  for (let x = r + 1; x < height; x++) {
    count++;
    if (data[x][c] >= data[r][c]) return count;
  }
  return count;
}

console.log(data);
console.log(
  data
    .map((row, rowindex) => {
      return row
        .map((_, colindex) => {
          if (
            rowindex === 0 ||
            rowindex === height - 1 ||
            colindex === 0 ||
            colindex === width - 1
          )
            return 1;

          return checkNeighbours(rowindex, colindex);
        })
        .reduce((prev, curr) => Math.max(prev, curr), 0);
    })
    .reduce((prev, curr) => Math.max(prev, curr), 0)
);

Deno.exit();
