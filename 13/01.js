const path = require('path');
const fs = require('fs');

filePath = path.join(__dirname, 'input.txt');

const input = fs.readFileSync(filePath, 'utf8');

const [coordsX, instructionsX] = input.split('\n\n');

const coords = coordsX.split('\n').map(row => row.split(',').map(n => parseInt(n, 10)));

let biggestX = 0;
let biggestY = 0;
coords.forEach(coord => {
    if (coord[0] > biggestX) {biggestX = coord[0]}
    if (coord[1] > biggestY) {biggestY = coord[1]}
});

const instructions = [instructionsX.split('\n').filter(row => row).map(row => row.replace('fold along ', '').split('='))[0]];

const foldedCoords = coords.map(coord => {
    let [ux, uy] = coord;

    instructions.forEach(instruction => {
        if (instruction[0] === 'x') {
            if(ux > instruction[1]) {
                ux = instruction[1] - (ux - instruction[1]);
            }
        }
        if (instruction[0] === 'y') {
            if(uy > instruction[1]) {
                uy = instruction[1] - (uy - instruction[1]);
            }
        }
    });

    return [ux, uy]
});

console.log(new Set(foldedCoords.map(JSON.stringify)).size);
// 664
