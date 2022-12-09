const input = await Deno.readTextFile("./input.txt");
const data = input.split("\n");

data.forEach((signal) => {
  for (let i = 0; i < signal.length - 14; i++) {
    const arr = signal.slice(i, i + 14);
    if (new Set(arr).size === 14) {
      console.log(i + 14);
      break;
    }
  }
});
