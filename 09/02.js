const path = require('path');
const fs = require('fs');

filePath = path.join(__dirname, 'input.txt');

const input = fs.readFileSync(filePath, 'utf8');

const lines = input.split('\n').filter(line => line).map(line => line.split('').map(n => parseInt(n, 10)));

let basins = {};

function findBottom(x, y) {
    let isBottom = true;
    let lowest = lines[y][x];
    let lowestX;
    let lowestY;

    if (x > 0 && lines[y][x - 1] < lowest) {
        lowest = lines[y][x - 1];
        lowestX = x - 1;
        lowestY = y;
        isBottom = false;
    }

    if (x < lines[0].length - 1 && lines[y][x + 1] < lowest) {
        lowest = lines[y][x + 1];
        lowestX = x + 1;
        lowestY = y;
        isBottom = false;
    }

    if (y > 0 && lines[y - 1][x] < lowest) {
        lowest = lines[y - 1][x];
        lowestX = x;
        lowestY = y - 1;
        isBottom = false;
    }

    if (y < lines.length - 1 && lines[y + 1][x] < lowest) {
        lowest = lines[y + 1][x];
        lowestX = x;
        lowestY = y + 1;
        isBottom = false;
    }

    return isBottom ? {x, y} : findBottom(lowestX, lowestY);
}

for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[0].length; x++) {
        if (lines[y][x] < 9) {

            const bottom = findBottom(x, y);
            const id = JSON.stringify(bottom);

            if (!basins[id]) {
                basins[id] = [];
            }

            basins[id].push({x, y})
        }
    }
}

const basinsSorted = Object.values(basins).sort((a, b) => b.length - a.length);

result = basinsSorted[0].length * basinsSorted[1].length * basinsSorted[2].length;

console.log(result);
// 1123524
