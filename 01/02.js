const input = require('./input');

const solution = input.reduce((acc, val, i) => {
    return (i < input.length - 3)
        ? acc + ((val + input[i+1] + input[i + 2]) < (input[i+1] + input[i + 2] + input[i + 3]))
        : acc;
    /*
    if (i < input.length - 3) {
        const sumWindowA = (val + input[i+1] + input[i + 2]);
        const sumWindowB = (input[i+1] + input[i + 2] + input[i + 3]);

        return acc + (sumWindowB > sumWindowA)
    }

    return acc
     */
}, 0);

console.log(solution);
// 1486
