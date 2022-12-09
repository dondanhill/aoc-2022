const input = await Deno.readTextFile("./input.txt");
const data = input.split("\n");
const moves = data.map((move) => move.split(" "));

type TPos = {
  x: number;
  y: number;
};

const knots = Array.from(Array(10)).map((_) =>
  Object.assign({
    x: 0,
    y: 0,
  } as TPos)
);

const visits = new Map();
visits.set("0-0", 1);

moves.forEach((move) => {
  const [dir, steps] = [move[0], Number(move[1])];
  switch (dir) {
    case "U":
      moveHead("y", steps);
      break;
    case "D":
      moveHead("y", -steps);
      break;
    case "R":
      moveHead("x", steps);
      break;
    case "L":
      moveHead("x", -steps);
      break;
    default:
      console.log(dir);
      throw new Error(`unexpected direction: ${dir}`);
  }
});

console.log(visits.size);

function moveHead(key: string, steps: number) {
  const absSteps = Math.abs(steps);
  for (let i = 1; i <= absSteps; i++) {
    knots[0][key] += (1 * steps) / absSteps;

    let index = 0;
    while (index < 9 && didMoveTail(knots[index], knots[index + 1])) {
      index++;
    }

    if (index === 9) {
      const T = knots[9];
      visits.set(`${T.x}-${T.y}`, (visits.get(`${T.x}-${T.y}`) || 0) + 1);
    }
  }
}

function didMoveTail(H: TPos, T: TPos) {
  const diff = {
    x: H.x - T.x,
    absX: Math.abs(H.x - T.x),
    y: H.y - T.y,
    absY: Math.abs(H.y - T.y),
  };
  if (diff.absX === 2 && diff.absY === 2) {
    T.x = H.x > T.x ? H.x - 1 : H.x + 1;
    T.y = H.y > T.y ? H.y - 1 : H.y + 1;
    return true;
  }
  if (diff.absY === 2) {
    T.x = H.x;
    T.y = H.y > T.y ? H.y - 1 : H.y + 1;
    return true;
  }

  if (diff.absX === 2) {
    T.x = H.x > T.x ? H.x - 1 : H.x + 1;
    T.y = H.y;
    return true;
  }
  if (diff.absX > 2 || diff.absY > 2) {
    console.log(H, T, diff);
    throw new Error("unexpected diff");
  }

  return false;
}
