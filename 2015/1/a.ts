const input = await Deno.readTextFile("./input.txt");
const up = input.split(")").join("").length;
const down = input.split("(").join("").length;
console.log(up - down);
