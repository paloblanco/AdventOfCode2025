function solve(input) {
  const grid = input.trim().split("\n");
  const height = grid.length;
  const width = grid[0].length;
  let canGet = 0;
  for (let y=0; y<height; y++) {
    for (let x=0; x<width; x++) {
      if (grid[y][x] != `@`) {continue};
      let neighbors = 0;
      for (let yy=y-1; yy<y+2; yy++) {
        for (let xx=x-1; xx<x+2; xx++) {
          if (yy<0 || yy>=height || xx<0 || xx>=width) {continue};
          if (yy==y & xx==x) {continue};
          if (grid[yy][xx] == `@`) {neighbors++};
        };
      };
      if (neighbors<4) {canGet ++};
    };
  };
  return `Accessible: ${canGet}`;
}

function solve2(input) {
  const gridString = input.trim().split("\n");
  let grid = [];
  gridString.forEach(line => {
    grid.push(line.split(''));
  });
  const height = grid.length;
  const width = grid[0].length;
  let canGet = 0;
  let noChange = false;
  while (!noChange) {
    noChange = true;
    for (let y=0; y<height; y++) {
        for (let x=0; x<width; x++) {
        if (grid[y][x] != `@`) {continue};
        let neighbors = 0;
        for (let yy=y-1; yy<y+2; yy++) {
            for (let xx=x-1; xx<x+2; xx++) {
            if (yy<0 || yy>=height || xx<0 || xx>=width) {continue};
            if (yy==y & xx==x) {continue};
            if (grid[yy][xx] == `@`) {neighbors++};
            };
        };
        if (neighbors<4) {
            canGet ++;
            noChange=false;
            grid[y][x]=`.`;
        };
        };
    };
  };
  return `Accessible: ${canGet}`;
}

// Node mode
if (typeof require !== "undefined" && require.main === module) {
  const fs = require("fs");
  const filePath = process.argv[2] || "input.txt";
  const input = fs.readFileSync(filePath, "utf8");
  const inputTest = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`
  console.log(solve(inputTest));
  console.log(solve(input));
  console.log(solve2(inputTest));
  console.log(solve2(input));
}