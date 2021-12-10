const input = require('./input');

let inputRound = input;

for (let i = 0; i < 12; i++) {
    let ones = [];
    let zeros = [];

    [...inputRound].forEach(str => {
        if (parseInt(str[i], 10) === 1) {
            ones.push(str);
        } else {
            zeros.push(str)
        }
    });

    inputRound = ones.length >= zeros.length ? ones : zeros;
}

const oxy = parseInt(inputRound[0], 2);

inputRound = input;
for (let j = 0; j < 12; j++) {
    let ones = [];
    let zeros = [];

    [...inputRound].forEach(str => {
        if (parseInt(str[j], 10) === 1) {
            ones.push(str);
        } else {
            zeros.push(str)
        }
    });

    if (inputRound.length !== 1) {
        inputRound = zeros.length <= ones.length ? zeros : ones;
    }


    console.log(inputRound)
}

const co = parseInt(inputRound[0], 2);

console.log({oxy, co}, oxy * co);
// { oxy: 2539, co: 709 } 1800151
