const input = await Deno.readTextFile("./input.txt");
const games = input.split("\n").map((value) => value.split(" ").join(""));
const scores: { [index: string]: number } = {
  AX: 0 + 3,
  BX: 0 + 1,
  CX: 0 + 2,
  AY: 3 + 1,
  BY: 3 + 2,
  CY: 3 + 3,
  AZ: 6 + 2,
  BZ: 6 + 3,
  CZ: 6 + 1,
};

console.log(
  games
    .map((game) => {
      return scores[game];
    })
    .reduce((acc, game) => acc + game, 0)
);

Deno.exit();
