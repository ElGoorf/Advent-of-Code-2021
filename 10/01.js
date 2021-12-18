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

let total = 0;
lines.forEach(line => {
    const depairedLine = recursiveRemovePairs(line);

    const firstCloser = depairedLine.match(/[)\]}>)]/);

    if (firstCloser) {
        switch (firstCloser[0]){
            case ')': {
                total += 3;
                break;
            }
            case ']': {
                total += 57;
                break;
            }
            case '}': {
                total += 1197;
                break;
            }
            case '>': {
                total += 25137;
                break;
            }
        }

    }
});

console.log(total);
