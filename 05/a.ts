// TODO - fix ts lint
const input = await Deno.readTextFile("./input.txt");
const [stackData, movesData] = input.split("\n\n");

const stacks =
  stackData
    .split("\n")
    .map((crates) => Array.from(crates.match(/.{1,4}/g) || []))
    .reduce(
      (crates, row) => row.map((_, i) => [...(crates[i] ?? []), row[i]]),
      []
    )
    ?.map((stack) =>
      (stack || []).reverse().filter((stack: string) => stack.trim() !== "")
    ) || [];

const moves = movesData.split("\n").map((_) => {
  const move = _.split(" ");
  return [Number(move[1]), Number(move[3]) - 1, Number(move[5]) - 1];
});

console.log(stacks);
moves.forEach((move) => {
  const [qty, from, to] = move;
  console.log(qty, from, to);
  stacks[to].splice(
    stacks[to].length,
    0,
    ...stacks[from].splice(-qty).reverse()
  );
  console.log(stacks);
});

console.log(
  stacks?.reduce((acc: string, stack) => acc + stack[stack.length - 1], "")
);
