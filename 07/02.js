const input = require('./input');

function totalFuelForMovement(from, to) {
    let init = Math.abs(from - to);
    let total = 0;

    while (init > 0) {
        total = total + init;
        init--;
    }

    return total;
}

let a = Math.min(...input);
let b = Math.max(...input);

while(a !== b) {
    console.log("opening", {a, b});
    let fuelSpentA = 0;
    let fuelSpentB = 0;

    for (const x of input) {
        fuelSpentA += totalFuelForMovement(x, a);
        fuelSpentB += totalFuelForMovement(b, x);
    }

    console.log({fuelSpentA, fuelSpentB});

    if (fuelSpentA < fuelSpentB) {
        b = Math.round((a+b)/2)
    } else if (fuelSpentA > fuelSpentB) {
        a = Math.round((a+b)/2)
    }
}

// opening { a: 482, b: 483 }
// { fuelSpentA: 94862124, fuelSpentB: 94862126 } (94862124 cheaper)
