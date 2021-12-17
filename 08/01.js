const path = require('path');
const fs = require('fs');

filePath = path.join(__dirname, 'input.txt');

const input = fs.readFileSync(filePath, 'utf8');

const lines = input.split('\r\n').filter(line => line).map(line => {
    const [unique, output] = line.split(' | ').map(p => p.split(' '));
    return { unique, output };
});

let count = 0;
lines.forEach(line => {
    line.output.forEach(n => {
        if ([2, 4, 3, 7].includes(n.length)) {
            count++;
        }
    })
});

console.log(count);
//264
