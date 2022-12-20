const input = await Deno.readTextFile("./input.txt");
const data = input.split("\n\n");

type TMonkey = {
  items: number[];
  applyOperation: (v: number) => (a: number) => number;
  testDivision: number;
  testTrue: number;
  testFalse: number;
  inspectCount: number;
};

function inspectItems(monkey: TMonkey) {
  const items = monkey.items.map((item) => Number(monkey.applyOperation(item)));
  monkey.inspectCount += items.length;
  items.forEach((worrylevel) => {
    // console.log(worrylevel);
    const newlevel = Math.floor(worrylevel / 1) % modulo;
    let newmonkeyid = 0;
    if (newlevel % monkey.testDivision === 0) {
      newmonkeyid = monkey.testTrue;
    } else {
      newmonkeyid = monkey.testFalse;
    }
    monkeys[newmonkeyid].items.push(newlevel as never);
  });
}

const monkeys = data
  .map((monkey) => monkey.split("\n"))
  .map((lines) => {
    return {
      items: lines[1]
        .split(":")[1]
        .split(",")
        .map((item) => Number(item)),
      applyOperation: createOperation(
        lines[2].split(":")[1].split("=")[1].trim()
      ),
      testDivision: Number(lines[3].split("by")[1]),
      testTrue: Number(lines[4].split("monkey")[1]),
      testFalse: Number(lines[5].split("monkey")[1]),
      inspectCount: 0,
    };
  });
console.log(monkeys);

function createOperation(operationText: string): (v: number) => number {
  const [_, operand, value] = operationText.split(" ");

  function applyOperand(old: number, operand: string, value: number): number {
    switch (operand) {
      case "+":
        return old + value;
      case "*":
        return old * value;
      case "-":
        return old - value;
      case "/":
        return old / value;
    }
    return old;
  }
  if (value === "old") {
    return function (old: number): number {
      return applyOperand(old, operand, old);
    };
  }
  return function (old: number): number {
    return applyOperand(old, operand, Number(value));
  };
}

const modulo = monkeys.reduce((acc, monkey) => acc * monkey.testDivision, 1);
for (let i = 0; i < 10000; i++) {
  monkeys.forEach((monkey, index) => {
    // console.log("index", index);
    if (monkey.items.length > 0) inspectItems(monkey);
    monkey.items = [];
  });
  if (i === 0) {
    monkeys.forEach((monkey, index) => {
      console.log(`Monkey ${index} => ${monkey.inspectCount} times.`);
    });
  }
}

monkeys.forEach((monkey, index) => {
  console.log(`Monkey ${index} => ${monkey.inspectCount} times.`);
});

console.log(
  monkeys
    .sort((a, b) => b.inspectCount - a.inspectCount)
    .slice(0, 2)
    .reduce((mult, monkey) => monkey.inspectCount * mult, 1)
);
Deno.exit();
