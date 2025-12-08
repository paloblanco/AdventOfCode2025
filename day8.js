function inputTest() {
  return `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`;
  }

function distance(a,b) {
    return Math.sqrt(Math.pow(a[0]-b[0],2)+Math.pow(a[1]-b[1],2)+Math.pow(a[2]-b[2],2)).toFixed(4);
}

function solve(input, connectionCount=1000) {
  const lines = input.trim().split("\n");
  let boxes = [];
  for (const ix in lines) {
    let tuple = [];
    lines[ix].split(',').forEach(e => tuple.push(parseInt(e)));
    boxes.push(tuple);
  };
  // store all distances
  let distances = {};
  let dArray = [];
  for (ix0=0; ix0<boxes.length-1; ix0++) {
    for (ix1=ix0+1; ix1<boxes.length; ix1++) {
        let d = distance(boxes[ix0],boxes[ix1]);
        distances[d] = [ix0,ix1];
        dArray.push(d);
    };
  };
  dArray.sort((a,b) => a-b);
  let circuits = [];
  for (let ix=0; ix < connectionCount; ix++) {
    let newCircuits = [];
    let nodes = distances[dArray[ix]];
    let newC = new Set(nodes);
    for (const cix in circuits) {
        thisC = circuits[cix];
        if (newC.intersection(thisC).size>0) {
            newC = newC.union(thisC);
        } else {
            newCircuits.push(thisC);
        };
    }
    newCircuits.push(newC);
    circuits=newCircuits;    
  };
  let sizes = [];
  circuits.forEach(a => sizes.push(a.size));
  return sizes.sort((a,b) => b-a).slice(0,3).reduce((a,c) => a*c,1);
}

function solve2(input) {
  const lines = input.trim().split("\n");
  let boxes = [];
  for (const ix in lines) {
    let tuple = [];
    lines[ix].split(',').forEach(e => tuple.push(parseInt(e)));
    boxes.push(tuple);
  };
  // store all distances
  let distances = {};
  let dArray = [];
  for (ix0=0; ix0<boxes.length-1; ix0++) {
    for (ix1=ix0+1; ix1<boxes.length; ix1++) {
        let d = distance(boxes[ix0],boxes[ix1]);
        distances[d] = [ix0,ix1];
        dArray.push(d);
    };
  };
  dArray.sort((a,b) => a-b);
  let circuits = [];
  for (let ix=0; ix < dArray.length; ix++) {
    let newCircuits = [];
    let nodes = distances[dArray[ix]];
    let newC = new Set(nodes);
    for (const cix in circuits) {
        thisC = circuits[cix];
        if (newC.intersection(thisC).size>0) {
            newC = newC.union(thisC);
        } else {
            newCircuits.push(thisC);
        };
    }
    newCircuits.push(newC);
    circuits=newCircuits;
    if (circuits[0].size == boxes.length) {
        let x0 = boxes[nodes[0]][0];
        let x1 = boxes[nodes[1]][0];
        // console.log(`${x0}, ${x1}`);
        return x0*x1;
    }
  };
}

// Node mode
if (typeof require !== "undefined" && require.main === module) {
  const fs = require("fs");
  const filePath = process.argv[2] || "input.txt";
  const input = fs.readFileSync(filePath, "utf8");
  console.log(solve(inputTest(),10));
  console.log(solve(input));
  console.log(solve2(inputTest()));
  console.log(solve2(input));
}