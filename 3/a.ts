const input = await Deno.readTextFile("./input.txt");
const rucksacks = input.split("\n");

console.log(
  rucksacks
    .map((rucksack) => {
      const len = rucksack.length / 2;
      const a = rucksack.slice(0, len).split("");
      const b = rucksack.slice(len).split("");
      const priority = a.filter((item) => b.includes(item))[0].charCodeAt(0);
      return priority >= 97 ? priority - 96 : priority - 38;
    })
    .reduce((acc, value) => acc + value, 0)
);

Deno.exit();
