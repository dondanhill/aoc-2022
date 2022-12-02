const input = await Deno.readTextFile("./input.txt");
const homes = new Map();
const directions = input.split("");
let n = 0;
let e = 0;

directions.forEach((direction) => {
  homes.set(`${n}${e}`, true);
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
});
console.log(homes.size);
