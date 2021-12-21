const path = require('path');
const fs = require('fs');

filePath = path.join(__dirname, 'input.txt');

const input = fs.readFileSync(filePath, 'utf8');

const [polymer, rulesX] = input.split('\n\n');

const rules = rulesX.split(`\n`).filter(x => x).reduce((allRules, rule) => {
  const [pair, insert] = rule.split(' -> ');
  return {...allRules, [pair]: insert}
}, {});

let currentPolymer = polymer;

// console.log({polymer, rules}, currentPolymer);

for(let step = 1; step <= 40; step++) {
  for(let c = 0; c < currentPolymer.length -1; c += 2) {
    let pair = currentPolymer.charAt(c) + currentPolymer.charAt(c+1);
    currentPolymer = currentPolymer.substring(0,c+1)+rules[pair]+currentPolymer.substring(c+1, currentPolymer.length)
  }
  //console.log({currentPolymer})
}

let elements = currentPolymer.split('').reduce((acc, el) => {
  const newAcc = {...acc};
  if (!newAcc[el]) {
    newAcc[el] = 1
  } else {
    newAcc[el]++
  }

  return newAcc;
}, {});

const sortedElements = Object.entries(elements).sort(([e1, q1], [e2, q2]) => q2 - q1);

// console.log({sortedElements});

console.log(sortedElements[0][1] - sortedElements[sortedElements.length-1][1]);
// 3259
