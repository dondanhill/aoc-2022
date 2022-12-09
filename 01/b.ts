const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n\n");
const amounts = [];

for (const line of lines) {
  const sum = line
    .split("\n")
    .map((n) => parseInt(n, 10))
    .reduce((acc, val) => acc + val, 0);
  amounts.push(sum);
}

console.log(
  amounts
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, val) => acc + val, 0)
);
