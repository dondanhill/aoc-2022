const input = await Deno.readTextFile("./input.txt");
const pairs = input.split("\n");

console.log(
  pairs
    .map((pair) => {
      return pair
        .split(",")
        .map((value) => value.split("-").map((s) => Number(s)));
    })
    .reduce(
      (acc, [a, b]) =>
        acc +
        ((a[0] >= b[0] && a[0] <= b[1]) ||
        (b[0] >= a[0] && b[0] <= a[1]) ||
        (a[1] >= b[0] && a[1] <= b[1]) ||
        (b[1] >= a[0] && b[1] <= a[1])
          ? 1
          : 0),
      0
    )
);
