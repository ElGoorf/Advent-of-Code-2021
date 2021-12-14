const input = require('./input');

let a = Math.min(...input);
let b = Math.max(...input);

while(a !== b) {
    console.log("opening", {a, b});
    let fuelSpentA = 0;
    let fuelSpentB = 0;

    for (const x of input) {
        fuelSpentA += Math.abs(x - a);
        fuelSpentB += Math.abs(b - x);
    }

    console.log({fuelSpentA, fuelSpentB});

    if (fuelSpentA < fuelSpentB) {
        b = Math.round((a+b)/2)
    } else if (fuelSpentA > fuelSpentB) {
        a = Math.round((a+b)/2)
    }
}

// const average = Math.round(input.reduce((acc, n) => acc+n, 0) / input.length);


// opening { a: 357, b: 358 }
// { fuelSpentA: 344140, fuelSpentB: 344138 } (344138 cheaper)
