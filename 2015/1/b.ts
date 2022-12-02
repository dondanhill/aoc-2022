const input = await Deno.readTextFile("./input.txt");
let floor = 0;
let index = 0;
while (index <= input.length) {
  floor += input[index] === "(" ? 1 : -1;

  if (floor === -1) {
    console.log(index + 1);
    break;
  }
  index++;
}

Deno.exit();
