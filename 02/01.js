const input = require('./input');

const finalCoords = input.reduce((acc, val) => {
    const [dir, distance] = val.split(' ');
    const distN = parseInt(distance, 10);
    return [
        acc[0] + (dir === 'forward' && distN),
        acc[1] + (dir === 'down' && distN) - (dir === 'up' && distN),
    ]
}, [0, 0]);

console.log(finalCoords, finalCoords[0] * finalCoords[1]);
// [ 2018, 820 ] 1654760
