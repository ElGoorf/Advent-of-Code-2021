const input = require('./input');

const solution = input.reduce((acc, val, i) => {
    return i > 0 && acc + (val > input[i-1])
}, 0);

console.log(solution);
// 1446
