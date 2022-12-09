const input = await Deno.readTextFile("./input.txt");
// const input = `A Y
// B X
// C Z`;

const games = input.split("\n").map((value) => value.split(" ").join(""));
console.log(games);

const scores: { [index: string]: number } = {
  AY: 6 + 2,
  BZ: 6 + 3,
  CX: 6 + 1,
  AZ: 0 + 3,
  BX: 0 + 1,
  CY: 0 + 2,
  AX: 3 + 1,
  BY: 3 + 2,
  CZ: 3 + 3,
};

// function getTotalScore(a: number, b: number): number[] {
//   if (a > b) return [6 + a, b];
//   if (a < b) return [a, 6 + b];
//   return [3 + a, 3 + b];
// }

console.log(
  games
    .map((game) => {
      // const [a, b] = game.split(" ");
      // const [scoreA, scoreB] = getTotalScore(scores[a], scores[b]);
      // return {
      //   a,
      //   aScore: scoreA,
      //   b,
      //   bScore: scoreB,
      // };
      return scores[game];
    })
    .reduce((acc, game) => acc + game, 0)
);

Deno.exit();
