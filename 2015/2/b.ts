const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");

console.log(
  lines
    .map((line) => {
      const [x, y, z]: number[] = line
        .split("x")
        .map((n) => Number(n))
        .sort((a, b) => a - b);

      return 2 * (x + y) + x * y * z;
    })
    .reduce((acc, val) => acc + val, 0)
);
