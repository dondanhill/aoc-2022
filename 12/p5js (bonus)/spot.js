// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Part 1: https://youtu.be/aKYlikFAV4k
// Part 2: https://youtu.be/EaZxUCWAjb0
// Part 3: https://youtu.be/jwRT4PCT6RU

// An object to describe a spot in the grid
function Spot(i, j, char) {

  // Location
  this.i = i;
  this.j = j;
  this.start = false;
  this.end = false;

  if (char === "S") {
    this.char ="a";
    this.start = true;
  } else if (char === "E") {
    this.char = "z";
    this.end = true;
  } else {
    this.char = char;
    }
  this.code = unchar(this.char)
  
  // f, g, and h values for A*
  this.f = 0;
  this.g = 0;
  this.h = 0;

  // Neighbors
  this.neighbors = [];

  // Where did I come from?
  this.previous = undefined;

  // Display me
  this.show = function(col) {
    if (col) {
      fill(col);
      rect(this.i * w, this.j * h, w, h);
      // text("a", this.i, this.j)
    } else {
      noFill()
      stroke(200)
      strokeWeight(1)
      if (this.end||this.start) {
        fill(color(0, 0, 255))
      }
      rect(this.i * w, this.j * h, w, h);
    }
    textSize(12);
    textAlign(CENTER,TOP);
    strokeWeight(0.25)
    stroke(0)
    text(this.char.toUpperCase(), this.i*w+5, this.j*h)
  }

  this.addNeighbors = function(grid) {
    const neighborIndices = [
    [this.i, this.j - 1],
    [this.i + 1, this.j],
    [this.i, this.j + 1],
    [this.i - 1, this.j],
    ];
    neighborIndices.forEach(([i,j]) => {
      if (
        j < 0 ||
        j >= rows ||
        i < 0 ||
        i >= cols
      ) {
        return;
      }
      if (
        // this.code === grid[i][j].code ||
        this.code >= grid[i][j].code ||
        this.code === grid[i][j].code - 1
      ) {
        // return neighbours.push({ x: dir[0], y: dir[1] });
        return this.neighbors.push(grid[i][j]);
      }
    });
  }
  // // Figure out who my neighbors are
  // this.addNeighbors = function(grid) {
  //   var i = this.i;
  //   var j = this.j;
  //   if (i < cols - 1) {
  //     this.neighbors.push(grid[i + 1][j]);
  //   }
  //   if (i > 0) {
  //     this.neighbors.push(grid[i - 1][j]);
  //   }
  //   if (j < rows - 1) {
  //     this.neighbors.push(grid[i][j + 1]);
  //   }
  //   if (j > 0) {
  //     this.neighbors.push(grid[i][j - 1]);
  //   }
  //   if (i > 0 && j > 0) {
  //     this.neighbors.push(grid[i - 1][j - 1]);
  //   }
  //   if (i < cols - 1 && j > 0) {
  //     this.neighbors.push(grid[i + 1][j - 1]);
  //   }
  //   if (i > 0 && j < rows - 1) {
  //     this.neighbors.push(grid[i - 1][j + 1]);
  //   }
  //   if (i < cols - 1 && j < rows - 1) {
  //     this.neighbors.push(grid[i + 1][j + 1]);
  //   }
  // }
}