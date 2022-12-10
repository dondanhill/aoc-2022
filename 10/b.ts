const input = await Deno.readTextFile("./input.txt");
const data = input.split("\n");

let cycle = 0;
let x = 1;
const crt: Array<string> = [];

function checkSignal() {
  cycle++;

  setPixel();
}
function setPixel() {
  if (x - 1 <= (cycle - 1) % 40 && x + 1 >= (cycle - 1) % 40) {
    crt[cycle - 1] = "#";
  } else {
    crt[cycle - 1] = ".";
    console.log({ x, cycle, crt: crt.join("") });
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
console.log(crt.slice(0, 40).join(""));
console.log(crt.slice(40, 80).join(""));
console.log(crt.slice(80, 120).join(""));
console.log(crt.slice(120, 160).join(""));
console.log(crt.slice(160, 200).join(""));
console.log(crt.slice(200, 240).join(""));

Deno.exit();
