function solve0(input) {
  const lines = input.trim().split("\n");
  return `Number of lines: ${lines.length}`;
}

function mod(top, bottom) {
    return ((top%bottom) + bottom) % bottom;
}

function solve(input) {
  const entries = input.trim().split("\n");
  let pos = 50;
  let zeros = 0;
  entries.forEach(element => {
    const direction = (element.slice(0,1) == "R") ? 1 : -1;
    const steps = parseInt(element.slice(1));
    pos = mod((pos + (steps*direction)),100);
    if (pos == 0) {zeros += 1};
  });
  return `Number of 0 hits: ${zeros}`
}

function solve2(input) {
  const entries = input.trim().split("\n");
  let pos = 50;
  let zeros = 0;
  entries.forEach(element => {
    let oldPos = pos;
    const direction = (element.slice(0,1) == "R") ? 1 : -1;
    const steps = parseInt(element.slice(1));
    let newPos = (pos + (steps*direction));
    pos = mod(newPos,100);
    if (direction > 0) {
      zeros += Math.abs(Math.floor(newPos/100));
    } else {
      let extraZeros = Math.abs(Math.floor(newPos/100));
      if (oldPos==0) {extraZeros -= 1};
      if (pos==0) {extraZeros += 1};
      zeros += extraZeros;
    };
    // console.log(`${element}, ${zeros}, resting = ${pos}`)
  });
  return `Number of 0 clicks: ${zeros}`
}

// Node mode
if (typeof require !== "undefined" && require.main === module) {
  const fs = require("fs");
  const filePath = process.argv[2] || "input.txt";
  const input = fs.readFileSync(filePath, "utf8");
  const input_test = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`
//   const input_test = `L50
// R1
// L1
// R1`
  console.log(solve(input_test));
  console.log(solve(input));
  console.log(solve2(input_test));
  console.log(solve2(input)); // 6694 too high
}