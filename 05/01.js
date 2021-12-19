const path = require('path');
const fs = require('fs');

filePath = path.join(__dirname, 'input.txt');

const input = fs.readFileSync(filePath, 'utf8');
const lines = input.split('\n').map(l => {
    const parts = [...l.match(/(\d*)/g)].filter(x => x !== '').map(n => parseInt(n, 10));
    return {x1: parts[0], y1: parts[1], x2: parts[2], y2: parts[3]}
});

let grid = [];

lines.forEach(line => {
    if (line.x1 === line.x2) {
        if (!Array.isArray(grid[line.x1])) {
            grid[line.x1] = [];
        }

        for (let y = Math.min(line.y1, line.y2); y <= Math.max(line.y1, line.y2); y++) {
            grid[line.x1][y] = grid[line.x1][y] ? grid[line.x1][y] + 1 : 1
        }
    }

    else if (line.y1 === line.y2) {
        for (let x = Math.min(line.x1, line.x2); x <= Math.max(line.x1, line.x2); x++) {

            if (!grid[x]) {
                grid[x] = [];
            }

            grid[x][line.y1] = grid[x][line.y1] ? grid[x][line.y1] + 1 : 1
        }
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

console.log(count);
// 8350
