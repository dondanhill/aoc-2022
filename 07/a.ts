const input = await Deno.readTextFile("./input.txt");
const data = input.split("\n");

const dirs = new Map();
const cwd: string[] = [];

function setFolderSizes(path: string[], size: number) {
  while (path.length > 0) {
    const folder = path.join("");
    dirs.set(folder, (dirs.get(folder) || 0) + size);
    path.splice(path.length - 1, 1);
  }
}

data
  .map((commands) => commands.split(" "))
  .forEach((cmd) => {
    switch (cmd[0]) {
      // deno-lint-ignore no-fallthrough
      case "$":
        switch (cmd[1]) {
          case "cd":
            if (cmd[2] !== "..") {
              cwd.push(cmd[2]);
              dirs.set([...cwd].join(""), 0);
            } else {
              cwd.splice(cwd.length - 1, 1);
            }
            break;
          default:
            break;
        }
      case "dir":
        break;
      default: // filesize
        setFolderSizes([...cwd], Number(cmd[0]));
        break;
    }
  });

let sum = 0;
dirs.forEach((dir) => {
  if (dir <= 100000) {
    sum += dir;
  }
});
console.log(sum);
