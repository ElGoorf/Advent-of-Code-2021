const path = require('path');
const fs = require('fs');

filePath = path.join(__dirname, 'input.txt');

const input = fs.readFileSync(filePath, 'utf8');

const [coordsX, instructionsX] = input.split('\r\n\r\n');

const coords = coordsX.split('\r\n').map(row => row.split(',').map(n => parseInt(n, 10)));

let biggestX = 0;
let biggestY = 0;
coords.forEach(coord => {
    if (coord[0] > biggestX) {biggestX = coord[0]}
    if (coord[1] > biggestY) {biggestY = coord[1]}
});

const instructions = instructionsX.split('\r\n').filter(row => row).map(row => row.replace('fold along ', '').split('='));

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

let rows = [];
foldedCoords.forEach(coords => {
    const [x, y] = coords;
    if (!rows[y]) {
        rows[y] = [];
    }

    rows[y][x] = '#'
});


for(let row = 0; row < rows.length; row++) {
    if (!rows[row]) {
        rows[row] = [];
    }
    for(let col = 0; col < rows[row].length; col++) {
        if (!rows[row][col]) {
            rows[row][col] = ' '
        }
    }
    console.log(rows[row].join(''))
}
/*

#### ####   ## #  # #### #    ###  #
#    #       # # #     # #    #  # #
###  ###     # ##     #  #    ###  #
#    #       # # #   #   #    #  # #
#    #    #  # # #  #    #    #  # #
#### #     ##  #  # #### #### ###  ####

 */
