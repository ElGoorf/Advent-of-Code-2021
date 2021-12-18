const path = require('path');
const fs = require('fs');

filePath = path.join(__dirname, 'input.txt');

const input = fs.readFileSync(filePath, 'utf8');

let currentEnergyLevels = input.split('\n').filter(line => line).map(line => line.split('').map(n => ({n: parseInt(n, 10)})));


function flash(cx, cy, energyLevels) {
    for(let y = Math.max(0, cy - 1); y <= Math.min(9, cy + 1); y++) {
        for(let x = Math.max(0, cx - 1); x <= Math.min(9, cx + 1); x++) {
            if (!(x === cx && y === cy)) {
                energyLevels[y][x].n++;

                if (energyLevels[y][x].n > 9 && !energyLevels[y][x].flashed) {
                    energyLevels[y][x].n = 0;
                    energyLevels[y][x].flashed = true;
                    energyLevels = flash(x, y, energyLevels)
                }
            }
        }
    }

    return energyLevels
}

let totalFlashes = 0;
for(let steps = 0; steps < 100; steps++) {
    console.log({steps});
    // begin each step by increasing all energy levels by 1 and all unflashed
    let newEnergyLevels = currentEnergyLevels.map(y => y.map(x => ({n: x.n+1, flashed: false})));

    // trigger and propagate any flashes
    for(let y = 0; y < 10; y++) {
        for(let x = 0; x < 10; x++) {
            let n = currentEnergyLevels[y][x].n + 1;

            newEnergyLevels.n = n;

            if (n > 9 && !newEnergyLevels[y][x].flashed) {
                newEnergyLevels[y][x].n = 0;
                newEnergyLevels[y][x].flashed = true;
                newEnergyLevels = flash(x, y, newEnergyLevels);
            }
        }
    }

    for(let y = 0; y < 10; y++) {
        for(let x = 0; x < 10; x++) {
            if(newEnergyLevels[y][x].flashed) {
                totalFlashes++;
                newEnergyLevels[y][x] = {
                    n: 0,
                    flashed: false,
                }
            }
        }
    }

    currentEnergyLevels = newEnergyLevels;
}

console.log(totalFlashes);
// 1688
