const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n\n");

let max = 0;

for (const line of lines) {
  const sum = line
    .split("\n")
    .map((n) => parseInt(n, 10))
    .reduce((acc, val) => acc + val, 0);
  if (sum > max) {
    max = sum;
  }
}
console.log(max);
