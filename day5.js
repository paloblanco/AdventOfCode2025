function solve(input) {
  const lines = input.trim().split("\n");
  let ranges = [];
  let ids = [];
  let fresh = 0;
  lines.forEach(line => {
    if (line.includes(`-`)) {
        const first = parseInt(line.split(`-`)[0]);
        const last = parseInt(line.split(`-`)[1]);
        ranges.push([first,last]);
    } else if (line.length>0) {
        ids.push(parseInt(line));
    };
  });
  ids.forEach(id => {
    let thisfresh=false;
    ranges.forEach(range => {
        if (id >= range[0] & id <= range[1]) {
            thisfresh=true;
        };
    });
    if (thisfresh) {
        fresh++;
    };
  });
  return `Fresh: ${fresh}`;
}

function merge(r1,r2) {
    if (r1[0]<=r2[1] & r1[1] >= r2[0]) {
        let new0 = Math.min(r1[0],r2[0]);
        let new1 = Math.max(r1[1],r2[1]);
        return [new0,new1];
    } else {
        return false;
    };
}

function collide(r1,r2) {
    if (r1[0]<=r2[1] & r1[1] >= r2[0]) {
        return true;
    } else {
        return false;
    };
}

function solve2(input) {
  const lines = input.trim().split("\n");
  let ranges = {};
  lines.forEach(line => {
    if (line.includes(`-`)) {
        const first = parseInt(line.split(`-`)[0]);
        const last = parseInt(line.split(`-`)[1]);
        ranges[line]=[first,last];
    };
  });
  let reachEnd=false;
  while (!reachEnd) {
    reachEnd=true;
    for (const k0 in ranges) {
        const v0 = ranges[k0];
        for (const k1 in ranges) {
            if (k0==k1) {continue};
            const v1 = ranges[k1];
            if (collide(v0,v1)) {
                const newRange = merge(v0,v1);
                const newK = `${newRange[0]}-${newRange[1]}`
                delete ranges[k0];
                delete ranges[k1];
                ranges[newK]=newRange;
                reachEnd=false;
                break;
            };
        };
        if (!reachEnd) {break};
    };
  };
  let fresh=0;
  for (const k0 in ranges) {
    const span = ranges[k0][1] - ranges[k0][0] + 1
    fresh += span;
  }
  console.log(ranges);
  return `Fresh: ${fresh}`;
}

// Node mode
if (typeof require !== "undefined" && require.main === module) {
  const fs = require("fs");
  const filePath = process.argv[2] || "input.txt";
  const input = fs.readFileSync(filePath, "utf8");
  const inputTest = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;
  console.log(solve(inputTest));
  console.log(solve(input));
  console.log(solve2(inputTest));
  console.log(solve2(input)); //354226555270059 too high
}
