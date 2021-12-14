const input = require('./input');

const amountForEachDay = input.reduce((acc, n) => {
    let update = {...acc};

    if (!update[`day${n}`]) {
        update[`day${n}`] = 0
    }

    update[`day${n}`]++;

    return update;
}, {});

let startOfDay = amountForEachDay;

for(let day = 0; day < 256; day++) {
    let update = {};

    for(let i = 0; i < 8; i++) {
        update[`day${i}`] = startOfDay[`day${i + 1}`]
    }

    update.day8 = startOfDay.day0;

    update.day6 = (typeof update.day6 !== "undefined" ? update.day6 : 0) + (typeof startOfDay.day0 !== "undefined" ? startOfDay.day0 : 0);

    startOfDay = update;
}

const total = Object.values(startOfDay).reduce((acc, n) => acc+n, 0);

console.log(total);
// after 80 days: 355386
// after 256 day: 1613415325809
