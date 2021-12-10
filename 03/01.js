const input = require('./input');

const bits = input.reduce((acc, val) => {
    let newAcc = [];
    for (let i = 0; i < 12; i++) {
        newAcc[i] = acc[i] + parseInt(val[i])
    }
    return newAcc;
}, Array.from({length: 12}, () => 0) );

let gamma = "";
let epsilon = "";
for (let i = 0; i < 12; i++) {
    if (bits[i] < input.length / 2) {
        gamma = `${gamma}1`;
        epsilon = `${epsilon}0`;
    } else {
        gamma = `${gamma}0`;
        epsilon = `${epsilon}1`;
    }
}

console.log(gamma, epsilon, parseInt(gamma, 2), parseInt(epsilon, 2), parseInt(gamma, 2) * parseInt(epsilon, 2));
// 011100011010 100011100101 1818 2277 4139586
