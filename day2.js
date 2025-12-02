function solve(input) {
  const ranges = input.trim().split(",");
  let badIDs = [];
  let badTotal = 0
  ranges.forEach(element => {
    const first = parseInt(element.split("-")[0]);
    const last = parseInt(element.split("-")[1]);
    for (let id = first; id <= last; id++) {
        let idString = id.toString();
        if (idString.length%2 == 0) {
            let half = idString.length/2;
            if (idString.slice(0,half)==idString.slice(half)) {
                badIDs.push(id);
                badTotal += id;
            };
        };
    };
  });
  return `Total = ${badTotal}`;
}

function solve2(input) {
  const ranges = input.trim().split(",");
  let badIDs = [];
  let badTotal = 0
  ranges.forEach(element => {
    const first = parseInt(element.split("-")[0]);
    const last = parseInt(element.split("-")[1]);
    for (let id = first; id <= last; id++) {
        let idString = id.toString();
        let l = idString.length;
        let badStringFlag = false;
        for (let index = 1; index <= l/2; index++) {
            if (l%index != 0 ) {continue};
            const subString = idString.slice(0,index);
            const splitString = idString.split(subString).join("");
            if (splitString.length == 0) {
                badStringFlag = true;
                break;
            };
        };
        if (badStringFlag) {
            badIDs.push(id);
            badTotal += id;
        };
    };
  });
  return `Total = ${badTotal}`;
}

// Node mode
if (typeof require !== "undefined" && require.main === module) {
  const fs = require("fs");
  const filePath = process.argv[2] || "input.txt";
  const input = fs.readFileSync(filePath, "utf8");
  const inputTest = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`
  console.log(solve(inputTest));
  console.log(solve(input));
  console.log(solve2(inputTest));
  console.log(solve2(input));
}