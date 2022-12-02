const input = await Deno.readTextFile("./input.txt");
let floor = 0;
let index = 0;
while (index <= input.length) {
  floor += input[index] === "(" ? 1 : -1;
  console.log(floor);

  if (floor === -1) {
    console.log(index);
    break;
  }
  index++;
}
console.log(index - 1);
