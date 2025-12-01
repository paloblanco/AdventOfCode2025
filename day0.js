function solve(input) {
  const lines = input.trim().split("\n");
  return `Number of lines: ${lines.length}`;
}

// Node mode
if (typeof require !== "undefined" && require.main === module) {
  const fs = require("fs");
  const filePath = process.argv[2] || "input.txt";
  const input = fs.readFileSync(filePath, "utf8");
  console.log(solve(input));
}

// Browser mode
// if (typeof window !== "undefined") {
//   window.solve = solve;
// }