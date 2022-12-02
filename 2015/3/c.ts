const input = await Deno.readTextFile("./input.txt");
const homes = new Map();
const directions = input.split("");

homes.set(`00`, true);
// [0, 1].forEach((santa) => {
const santa = {
  n: 0,
  e: 0,
  t: 0,
  minN: 0,
  maxN: 0,
  minE: 0,
  maxE: 0,
};
const robot = {
  n: 0,
  e: 0,
  t: 0,
  minN: 0,
  maxN: 0,
  minE: 0,
  maxE: 0,
};
directions.forEach((direction, index) => {
  const actor = index % 2 === 0 ? santa : robot;
  actor.t++;
  switch (direction) {
    case "^":
      actor.n++;
      break;
    case "v":
      actor.n--;
      break;
    case ">":
      actor.e++;
      break;
    case "<":
      actor.e--;
      break;
    default:
      new Error("broken");
      break;
  }
  actor.minN = Math.min(actor.n, actor.minN);
  actor.maxN = Math.max(actor.n, actor.maxN);
  actor.minE = Math.min(actor.e, actor.minE);
  actor.maxE = Math.max(actor.e, actor.maxE);
  homes.set(`${actor.n}${actor.e}`, true);
  console.log(homes.size);

  // console.log({ n: actor.n, e: actor.e, direction });
});
console.log(homes.size);
console.log(santa);
console.log(robot);

Deno.exit();
