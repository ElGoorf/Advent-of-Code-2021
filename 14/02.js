const path = require('path');
const fs = require('fs');

const steps = 40;

filePath = path.join(__dirname, 'input.txt');

const input = fs.readFileSync(filePath, 'utf8');
const [polymer, rulesX] = input.split('\n\n');

// create index of rules and store of state, indexed by pair
const rules = rulesX.split(`\n`).filter(x => x).reduce((allRules, rule) => {
  const [pair, insert] = rule.split(' -> ');
  return {
    ...allRules,
    [pair]: {
      // index of rules
      insert, // Letter to be inserted in this pair
      child0: pair.charAt(0)+insert, // first of two descendant pairs generated
      child1: insert+pair.charAt(1), // second of two descendant pairs generated
      // store of state, appended with each step
      steps: [0], // eg [0, 5, 7]  = this pair occurred 0 times at step 0, 5 times at step 1, 7 times at step 2, etc
    }
  }
}, {});

// initial state from given polymer
for(let i = 0; i < polymer.length - 1; i++) {
  const pair = polymer.charAt(i)+polymer.charAt(i+1);
  rules[pair].steps[0]++;
}

for(let step = 0; step < steps; step++){
  Object.values(rules).forEach(rule => {
    // for each pair, get the current number of occurrences, and then
    // apply that quantity to it's to descendant pairs.
    const occurrences = rule.steps[step] || 0;
    const {child0, child1} = rule;
    if(!rules[child0].steps[step+1]) {
      rules[child0].steps[step+1] = 0;
    }
    if(!rules[child1].steps[step+1]) {
      rules[child1].steps[step+1] = 0;
    }
    rules[child0].steps[step+1] += occurrences;
    rules[child1].steps[step+1] += occurrences;
  });
}

// for each pair, count the first letter
const letterCount = {};
Object.entries(rules).forEach(([pair, data]) => {
  const letter = pair.charAt(0);
  const occurrences = data.steps[steps];
  if(occurrences) {
    if (!letterCount[letter]) {
      letterCount[letter] = 0
    }
    letterCount[letter] += occurrences;
  }
});

// don't forget the final element of the polymer
const lastLetter = polymer.charAt(polymer.length -1);
if (!letterCount[lastLetter]){
  letterCount[lastLetter] = 0;
}
letterCount[lastLetter] += 1;

// sort by occurrence
const sortedElements = Object.entries(letterCount).sort(([e1, q1], [e2, q2]) => q2 - q1);

console.log(sortedElements[0][1] - sortedElements[sortedElements.length-1][1]);
// 3459174981021
