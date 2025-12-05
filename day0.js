function inputTest() {
  return `A test for AOC2025.
This has two lines!`;
  }

function solve(input) {
  const lines = input.trim().split("\n");
  return `Number of lines: ${lines.length}`;
}

function solve2(input) {
  const lines = input.trim();
  return `Number of characters: ${lines.length}`;
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