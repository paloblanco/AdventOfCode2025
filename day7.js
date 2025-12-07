function inputTest() {
  return `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`;
  }

function solve(input) {
  const lines = input.trim().split("\n");
  const startIX = lines[0].indexOf('S');
  let lasers = new Set();
  lasers.add(startIX);
  let splits=0;
  for (const ix in lines) {
    if (ix==0) {continue};
    let line = lines[ix];
    lasers.forEach(ix => {
        if (line[ix]=="^") {
            lasers.delete(ix);
            lasers.add(ix-1);
            lasers.add(ix+1);
            splits++;
        }
    });
  }
//   console.log(lasers);
  return `Count: ${splits}`
}

function solve2(input) {
  const lines = input.trim().split("\n");
  const startIX = lines[0].indexOf('S');
  let lasers = [];
  for (let ix=0; ix<lines[0].length; ix++) {lasers.push(0)};
  lasers[startIX] = 1;
//   console.log(lasers);
  for (const ix in lines) {
    if (ix==0) {continue};
    let line = lines[ix];
    // console.log(line);
    for (let lIx=0; lIx<lasers.length; lIx++) {
        let char = line[lIx];
        if (char!="^") {continue};
        let laserCount = lasers[lIx];
        // console.log(`${char}  ${laserCount}`);
        lasers[lIx-1] = lasers[lIx-1]+laserCount;
        lasers[lIx+1] = lasers[lIx+1]+laserCount;
        lasers[lIx] = 0;
    }
    // console.log(lasers);
  }
  return `Count: ${lasers.reduce((a,c) => a+c,0)}`;
}

// Node mode
if (typeof require !== "undefined" && require.main === module) {
  const fs = require("fs");
  const filePath = process.argv[2] || "input.txt";
  const input = fs.readFileSync(filePath, "utf8");
  console.log(solve(inputTest()));
  console.log(solve(input));
  console.log(solve2(inputTest()));
  console.log(solve2(input));
}