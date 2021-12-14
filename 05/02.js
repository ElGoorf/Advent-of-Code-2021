const path = require('path');
const fs = require('fs');

filePath = path.join(__dirname, 'input.txt');

const input = fs.readFileSync(filePath, 'utf8');
const lines = input.split('\r\n').map(l => {
    const parts = [...l.match(/(\d*)/g)].filter(x => x !== '').map(n => parseInt(n, 10));
    return {x1: parts[0], y1: parts[1], x2: parts[2], y2: parts[3]}
});

let grid = [];

lines.forEach(line => {
    const xStart = line.x1;
    const yStart = line.y1;

    const xDiff = line.x2 - line.x1;
    const yDiff = line.y2 - line.y1;
    let x = xStart;
    let y = yStart;

    for (let i = 0; i <= Math.abs(xDiff) || i <= Math.abs(yDiff); i++) {

        if (!Array.isArray(grid[x])) {
            grid[x] = [];
        }

        grid[x][y] = grid[x][y] ? grid[x][y] + 1 : 1;
        if (xDiff < 0) { x--; }
        if (xDiff > 0) { x++; }
        if (yDiff < 0) { y--; }
        if (yDiff > 0) { y++; }
    }
});

for (let x = 0; x < grid.length; x++) {
    if (!grid[x]) {
        grid[x] = []
    }

    for (let y = 0; y < grid[x].length; y++) {
        if(!grid[x][y]) {
            grid[x][y] = '.';
        }
    }
}

let count = 0;
grid.forEach(x => {
    if(x) {
        x.forEach(y => {
            if (y && y > 1) {
                count++;
            }
        })
    }
});


console.log(count)
// 19374
