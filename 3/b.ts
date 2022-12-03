const input = await Deno.readTextFile("./input.txt");
const rucksacks = input.split("\n");

console.log(
  rucksacks
    .reduce((group, item, index) => {
      const chunkIndex = Math.floor(index / 3);
      if (!group[chunkIndex]) {
        group[chunkIndex] = [];
      }
      group[chunkIndex].push(item);
      return group;
    }, [] as string[][])
    .map((group) => {
      const a = group[0].split("");
      const b = group[1].split("");
      const c = group[2].split("");
      const priority = a
        .filter((item) => b.includes(item))
        .filter((item) => c.includes(item))[0]
        .charCodeAt(0);
      return priority >= 97 ? priority - 96 : priority - 38;
    })
    .reduce((acc, val) => acc + val, 0)
);

Deno.exit();
