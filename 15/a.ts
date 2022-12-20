const input = await Deno.readTextFile("./input.test.txt");
const data = input.split("\n").map((s) => s.match(/[-]?\d+/g)?.map(Number));
// console.log(data);

const row = 10;
// const row = 2000000;
let minX = Infinity;
let minY = Infinity;
let maxX = -Infinity;
let maxY = -Infinity;

function getDistance(sx: number, sy: number, bx: number, by: number) {
  return Math.abs(sx - bx) + Math.abs(sy - by);
}

function getBeacon(x: number, y: number) {
  return beacons.get(`${x}-${y}`);
}

function getNextClosestBeaconsOnRowY(sensor) {
  const dy = Math.abs(sensor.y - sensor.by) - sensor.distanceToRow;
  const dx = Math.abs(sensor.bx - dy);

  console.log(dx, dy)
  return [dx, -dx]

}

function setBeacon(x: number, y: number) {
  const key = `${x}-${y}`;
  let beacon;
  if (beacons.has(key)) {
    beacon = beacons.get(key);
    beacon.sensors++;
    return beacon;
  } else {
    beacons.set(key, { x, y, sensors: 1 });
    return beacons.get(key);
  }
}

const beacons = new Map();
const sensors = [];

data.forEach((line) => {
  const [sx, sy, bx, by] = line;
  const beacon = setBeacon(bx, by);
  minX = Math.min(minX, sx, bx);
  minY = Math.min(minY, sy, by);
  maxX = Math.max(maxX, sx, bx);
  maxY = Math.max(maxY, sy, by);
  sensors.push({
    pos: [sx, sy],
    x: sx,
    y: sy,
    bx,
    by,
    beacon,
    distanceToBeacon: getDistance(sx, sy, bx, by),
    distanceToRow: getDistance(sx, sy, sx, row),
  });
});
// console.log(sensors);

// console.log(beacons);
// console.log({ minX, minY, maxX, maxY });

const impossibleBeaconXValues = new Set();

sensors
  .filter((sensor) => sensor.distanceToBeacon > sensor.distanceToRow)
  .forEach((sensor) => console.log(getNextClosestBeaconsOnRowY(sensor)))
  .forEach((sensor) => {
    const dx = getDistance(sensor.x, 0, sensor.beacon.x, 0);
    for (let x = -dx; x <= dx; x++) {
      // no possible beacon at (x, row), unless it's already a beacon
      if (!getBeacon(sensor.x + x, row)) {
        // check extremes
        if (x === -dx || x === dx) {
          if (
            getDistance(sensor.x + x, row, sensor.bx, sensor.by) >
            sensor.distanceToBeacon
          ) {
            impossibleBeaconXValues.add(sensor.x + x);
          }
        } else {
          impossibleBeaconXValues.add(sensor.x + x);
        }
      }
      console.log(Array.from(impossibleBeaconXValues).sort((a, b) => a - b));
    }
  });

console.log(Array.from(impossibleBeaconXValues).sort((a, b) => a - b).length);
console.log(impossibleBeaconXValues.size);
