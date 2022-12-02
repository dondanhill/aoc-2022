const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");

console.log(
  lines
    .map((line) => {
      const [x, y, z] = line.split("x").map((n) => Number(n));
      const a = x * y;
      const b = x * z;
      const c = y * z;
      const min = Math.min(a, b, c);
      return 2 * a + 2 * b + 2 * c + min;
    })
    .reduce((acc, val) => acc + val, 0)
);
