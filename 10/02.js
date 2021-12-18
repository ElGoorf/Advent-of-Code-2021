const path = require('path');
const fs = require('fs');

filePath = path.join(__dirname, 'input.txt');

const input = fs.readFileSync(filePath, 'utf8');

const lines = input.split('\n').filter(line => line);

function recursiveRemovePairs(str) {
    const newStr = str.replace('()', '').replace('[]', '').replace('{}', '').replace('<>', '');

    // console.log(str, newStr);

    if (newStr === str) {
        return newStr;
    } else {
        return recursiveRemovePairs(newStr)
    }
}

let scores = [];
let incomplete = [];
lines.forEach(line => {
    const depairedLine = recursiveRemovePairs(line);

    const firstCloser = depairedLine.match(/[)\]}>)]/);

    if (!firstCloser) {
        incomplete.push({line, depairedLine})
    }
});

incomplete.forEach(({depairedLine}) => {
    let lineTotal = 0;
    let reversedChars = depairedLine.split("").reverse();

    reversedChars.forEach(char => {
        lineTotal *= 5;
        if(char === "(") { lineTotal += 1}
        if(char === "[") { lineTotal += 2}
        if(char === "{") { lineTotal += 3}
        if(char === "<") { lineTotal += 4}
    });

    scores.push(lineTotal);
});

scores = scores.sort((a, b) => a - b);
console.log(scores[(scores.length - 1)/2]);
