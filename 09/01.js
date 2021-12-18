const path = require('path');
const fs = require('fs');

filePath = path.join(__dirname, 'input.txt');

const input = fs.readFileSync(filePath, 'utf8');

const lines = input.split('\n').filter(line => line).map(line => line.split('').map(n => parseInt(n, 10)));

let total = 0;
for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[0].length; x++) {
        let centreValue = lines[y][x];
        let fail = false;

        for (let b = Math.max(y - 1, 0); b <= Math.min(y + 1, lines.length - 1); b++) {
            for (let a = Math.max(x - 1, 0); a <= Math.min(x + 1, lines[0].length - 1); a++) {
                if (!(a === x && b === y)) {
                    if (lines[b][a] <= centreValue) {
                        fail = true;
                    }
                }
            }
        }

        if (!fail) {
            console.log('adding', {x, y}, centreValue);
            total += centreValue + 1;
        }
    }
}

console.log(total);
// 526
