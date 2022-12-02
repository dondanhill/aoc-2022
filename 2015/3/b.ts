const input = await Deno.readTextFile("./input.txt");
const homes = new Map();
const directions = input.split("");

homes.set(`00`, true);
[0, 1].forEach((santa) => {
  let n = 0;
  let e = 0;
  directions.forEach((direction, index) => {
    if (index % 2 === santa) {
      switch (direction) {
        case "^":
          n++;
          break;
        case "v":
          n--;
          break;
        case ">":
          e++;
          break;
        case "<":
          e--;
          break;
      }
      homes.set(`${n}${e}`, true);
      console.log({ n, e, direction });
    }
  });
});
console.log(homes.size);
Deno.exit();
