const input = await Deno.readTextFile("./input.txt");
const data = input.split("\n\n").map((pair) => pair.split("\n"));
const compare = ([left, right]) => {
  if ([left, right].every(Number.isInteger)) {
    if (left < right) return true;
    if (left > right) return false;
    return;
  }

  if ([left, right].every(Array.isArray)) {
    for (let i = 0; i < Math.min(left.length, right.length); i++) {
      const res = compare([left[i], right[i]]);
      if (res != null) return res;
    }

    return compare([left.length, right.length]);
  }

  return compare([[left].flat(), [right].flat()]);
};

console.log(
  data.reduce((acc, pair, index) => {
    const [lhs, rhs] = pair;

    const left: [] = JSON.parse(lhs);
    const right: [] = JSON.parse(rhs);
    if (compare([left, right])) {
      // console.log(lhs);
      // console.log(rhs);
      // console.log(index, true);
      return acc + index + 1;
    }
    // console.log(lhs);
    // console.log(rhs);
    // console.log(index, false);
    return acc;
  }, 0)

  // data.map((pair, index) => {
  //   const [lhs, rhs] = pair;
  //   const left: [] = JSON.parse(lhs);
  //   const right: [] = JSON.parse(rhs);
  //   return [index + 1, compare(left, right)];
  // })
);

function isNumber(n: number | Array<number>) {
  return typeof n === "number";
}

function compare2(
  a: number | Array<number>,
  b: number | Array<number>
): boolean {
  if (isNumber(a) && isNumber(b)) {
    if (a < b) return true;
    if (b > a) return false;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      return compare(a[i], b[i]);
    }
  }

  console.log("unexpected exit");
  return true;
}

function compare1(a: [], b: []): boolean {
  const len = Math.max(a.length, b.length);
  console.log(a);
  console.log(b);

  for (let i = 0; i < len; i++) {
    if (Array.isArray(a[i]) && Array.isArray(b[i])) {
      if (a[i].length === 0 && b[i].length === 0) return true;
      if (a[i].length > 0 && b[i].length === 0) return false;
      if (a[i].length === 0 && b[i].length > 0) return true;
      return compare(a[i], b[i]);
    }
    if (Array.isArray(a[i]) && !Array.isArray(b[i])) {
      return compare(a[i], [b[i]]);
    }
    if (!Array.isArray(a[i]) && Array.isArray(b[i])) {
      return compare([a[i]], b[i]);
    }
    if (!Array.isArray(a[i]) && !Array.isArray(b[i])) {
      if (a[i] === undefined) return true;
      if (b[i] === undefined) return false;
      if (a[i] < b[i]) return true;
      if (a[i] > b[i]) return false;
    }
  }
  return true;
}
Deno.exit();
