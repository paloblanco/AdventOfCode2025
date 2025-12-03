function solve(input) {
  const banks = input.trim().split("\n");
  let jolts = [];
  let joltmax = 0;
  banks.forEach(bank => {
    let joltBank = bank.split('');
    let joltIntBank = [];
    joltBank.forEach(battery => {
        joltIntBank.push(parseInt(battery))
    })
    let leftBat = Math.max(...joltIntBank.slice(0,-1));
    let leftIX = joltIntBank.indexOf(leftBat);
    let rightBat = Math.max(...joltIntBank.slice(leftIX+1));
    let joltCombo = parseInt(leftBat.toString() + rightBat.toString());
    jolts.push(joltCombo);
    joltmax += joltCombo;
  });
  return `Joltage = ${joltmax}`;
}

function solve2(input) {
  const banks = input.trim().split("\n");
  let jolts = [];
  let joltmax = 0;
  banks.forEach(bank => {
    let joltBank = bank.split('');
    let joltIntBank = [];
    joltBank.forEach(battery => {
        joltIntBank.push(parseInt(battery));
    });
    let myBatteries = [];
    const batteryNeeded = 12;
    let startIX = 0;
    while (myBatteries.length < batteryNeeded) {
        let endIx = (-batteryNeeded)+myBatteries.length+1;
        let newBat;
        if (endIx < 0) {
            newBat = Math.max(...joltIntBank.slice(startIX,endIx));
        } else {
            newBat = Math.max(...joltIntBank.slice(startIX));
        };
        let newIX = joltIntBank.indexOf(newBat,startIX)+1;
        myBatteries.push(newBat);
        startIX = newIX;
    };
    let newBattery = parseInt(myBatteries.join(''));
    jolts.push(newBattery);
    joltmax += newBattery;
    });
//   return `${jolts}, Total = ${joltmax}`;
  return `Total = ${joltmax}`;
}

// Node mode
if (typeof require !== "undefined" && require.main === module) {
  const fs = require("fs");
  const filePath = process.argv[2] || "input.txt";
  const input = fs.readFileSync(filePath, "utf8");
  const inputTest = `987654321111111
811111111111119
234234234234278
818181911112111`
console.log(solve(inputTest));  
console.log(solve(input));
console.log(solve2(inputTest));
console.log(solve2(input));
}
