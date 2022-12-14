const input = await Deno.readTextFile("./input.txt");
const data = input.split("\n");
const moves = data.map((move) => move.split(" "));

type TPos = {
  x: number;
  y: number;
};
const H: TPos = {
  x: 0,
  y: 0,
};
const T: TPos = {
  x: 0,
  y: 0,
};

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
      throw new Error(`unexpected direction: ${dir}`);
  }
});

console.log(visits.size);

function moveHead(key: string, steps: number) {
  const absSteps = Math.abs(steps);
  for (let i = 1; i <= absSteps; i++) {
    H[key as keyof TPos] += (1 * steps) / absSteps;

    moveTail();
    visits.set(`${T.x}-${T.y}`, (visits.get(`${T.x}-${T.y}`) || 0) + 1);
  }
}

function moveTail() {
  const diff = {
    x: H.x - T.x,
    absX: Math.abs(H.x - T.x),
    y: H.y - T.y,
    absY: Math.abs(H.y - T.y),
  };

  if (diff.absX === 1 && diff.absY === 1) {
    return;
  }
  if (diff.y === 0) {
    if (diff.x > 0) {
      while (T.x < H.x - 1) {
        T.x++;
      }
    } else if (diff.x < 0) {
      while (T.x > H.x + 1) {
        T.x--;
      }
    }
    return;
  }

  if (diff.x === 0) {
    if (diff.y > 0) {
      while (T.y < H.y - 1) {
        T.y++;
      }
    } else if (diff.y < 0) {
      while (T.y > H.y + 1) {
        T.y--;
      }
    }
    return;
  }

  if (diff.absX === 1 && diff.absY === 2) {
    T.x = H.x;
    T.y = H.y > T.y ? H.y - 1 : H.y + 1;
    return;
  }

  if (diff.absY === 1 && diff.absX === 2) {
    T.x = H.x > T.x ? H.x - 1 : H.x + 1;
    T.y = H.y;
    return;
  }

  new Error(`unexpected move: ${diff}`);
}
