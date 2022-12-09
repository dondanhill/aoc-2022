const input = await Deno.readTextFile("./input.txt");
const data = input.split("\n");

data.forEach((signal) => {
  for (let i = 0; i < signal.length - 4; i++) {
    const arr = signal.slice(i, i + 4);
    if (new Set(arr).size === 4) {
      console.log(i + 4);
      break;
    }
  }
});
