// ripped from https://topaz.github.io/paste/#XQAAAQAjBQAAAAAAAAA2GUrqJbXQ+tSbvFTIkpH8qyYUClBl/0zNufM6w0fcl5UbyoY7qbUn9N9iF73DJXQD1dZ93TURCFEEZCYpT70l3d9CnXfcq+VZK9LYClyA2hQAWvZBwWVlFCP9cqtGU6W+IHPltl+Hg2XBG524vF3IeyNTIBjm0hFKzbLpN3vTGNXxAGiJKUMbv9Sbe5fPL2jKhW6whsXGOJLoAnmyfoFg1grqoCiIsAN3XXTkgIXsW7pf2gHEdJgy6PfBfectP/l20k5/1CEDfh8T18ymKnp0NHDd0QxPlUuZMVm8wTfNGtKZ//3rXcSuvxc+xUqxFt+YSrlwBeESZQCa8PtBG1U0EwDZDl1LaYr1oH6ATcJ18pXbEk2HPv0hwEiiIdAcjgXzDSMSU27USYB1rFXnXhnyN8xJYDrwPaxjCKTLMQ9fQHjmMrGRusCeDvk02U1+/msIHt7KSUcA9AMIQssA+u+eyRo8nY4i80XSM+rXh/WjLtQ88H9aAyLxpJqZ3a8VcUfHStqzk2dcBDjwEoHMo0O6QaJIom5BPKBaC2M/KDs908macLLDTW0+5keUSwuV6jIm+kdgotWc+Guj24Egp3MEjyLVZ50ynJgrQ7KcA+qeXN7WvjHbR4yzMulaaRwv4EmwUX49Y/798YdjfO1iIl+7x1nMOm+AvpY3Flzr6s3SI15t68o8BXXoraSAKDPeRT7ZsBNdjxJYnjwjFg6RqufvO3HOEMGgU1qLDneE/PBk85oP1z3X21clDTFZ/T9CKA==
const monkeys = [];
const modulo = 1;

class Monkey {
  constructor(str) {
    str = str.split("\n");
    this.id = Number(str[0].split(" ")[1][0]);
    this.items = str[1].split(": ")[1].split(", ").map(Number);
    this.operation = str[2].split("= ")[1];
    this.test = Number(str[3].match("[0-9]+")[0]);
    this.true = Number(str[4].match("[0-9]+")[0]);
    this.false = Number(str[5].match("[0-9]+")[0]);

    this.count = 0;
  }

  new(item) {
    return eval(`let old = ${item};${this.operation};`);
  }

  inspect() {
    while (this.items.length) {
      this.count++;
      const item = this.items.shift();
      const value = this.new(item) % modulo;
      if (value % this.test == 0) {
        monkeys[this.true].items.push(value);
      } else {
        monkeys[this.false].items.push(value);
      }
    }
  }
}

const input = await Deno.readTextFile("./input.test.txt");
function solve() {
  for (const str of input.split("\n\n")) {
    monkeys.push(new Monkey(str));
  }

  modulo = monkeys.reduce((a, b) => a * b.test, 1);

  for (let i = 0; i < 20; i++) {
    for (const monkey of monkeys) {
      monkey.inspect();
    }
  }

  monkeys.forEach((monkey, index) => {
    console.log(`Monkey ${index} => ${monkey.count} times.`);
  });
  monkeys.sort((a, b) => b.count - a.count);
  console.log(monkeys[0].count * monkeys[1].count);
}
solve();
