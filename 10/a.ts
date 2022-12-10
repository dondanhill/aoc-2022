const input = await Deno.readTextFile("./input.txt");
const data = input.split("\n");

let cycle = 0;
let x = 1;
let sum = 0;

function checkSignal() {
  cycle++;
  if (cycle % 40 === 20) {
    sum += cycle * x;
  }
}

data.forEach((item) => {
  const [instruction, value] = item.split(" ");
  switch (instruction) {
    case "noop":
      checkSignal();
      break;
    case "addx":
      checkSignal();
      checkSignal();
      x += Number(value);
      break;
  }
});
console.log(sum);
Deno.exit();
