function inputTest() {
  return `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;
  }

function solve(input) {
  const lines = input.trim().split("\n");
  let problemsT = [];
  for (const ix in lines) {
    let l = lines[ix].trim().split(/\s+/);
    problemsT.push(l);
  };
  let problems = problemsT[0].map((_,colIndex) =>
    problemsT.map(row => row[colIndex])
  );
  let results = [];
  for (const ix in problems) {
    const problem = problems[ix];
    const operation = problem[problem.length-1];
    const nums = problem.slice(0,-1).map(n => parseInt(n));
    if (operation=='*') {results.push(nums.reduce((a,c) => a*c,1))};
    if (operation=='+') {results.push(nums.reduce((a,c) => a+c,0))};
  };
  return `Total = ${results.reduce((a,c) => a+c,0)}`;
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
//   console.log(solve2(inputTest()));
//   console.log(solve2(input));
}