// thanks to https://stackoverflow.com/a/33034768/7310247

const path = require('path');
const fs = require('fs');

filePath = path.join(__dirname, 'input.txt');

const input = fs.readFileSync(filePath, 'utf8');

const lines = input.split('\n').filter(line => line).map(line => {
    const [unique, output] = line.split(' | ').map(p => p.split(' '));
    return { unique, output };
});

let count = 0;
lines.forEach(({unique, output}) => {
    let top, tl, tr, mid, bl, br, bot;
    let d0, d1, d2, d3, d4, d5, d6, d7, d8, d9;

    d1 = unique.find(n => n.length === 2);
    d4 = unique.find(n => n.length === 4);
    d7 = unique.find(n => n.length === 3);
    d8 = unique.find(n => n.length === 7);

    let d1chars = d1.split('');
    let d4chars = d4.split('');
    let d7chars = d7.split('');
    let d8chars = d8.split('');

    top = d7chars.filter(x => !d1chars.includes(x))[0];

    d6 = unique.find(n => n.length === 6 && d7chars.filter(x => n.split('').includes(x)).length === 2);
    let d6chars = d6.split('');

    tr = d8chars.filter(x => !d6chars.includes(x))[0];
    br = d1chars.filter(x => d6chars.includes(x))[0];

    d2 = unique.find(n => n.length === 5 && n.split('').includes(tr) && !n.split('').includes(br));
    d3 = unique.find(n => n.length === 5 && n.split('').includes(tr) && n.split('').includes(br));
    d5 = unique.find(n => n.length === 5 && !n.split('').includes(tr) && n.split('').includes(br));

    let occurrences = unique.reduce((acc, x) => {
        const newAcc = {...acc};
        const chars = x.split('');
        chars.forEach(c => {
            if (!newAcc[c]) { newAcc[c] = 0; }
            newAcc[c]++;
        });

        return newAcc;
    }, {});

    bl = Object.entries(occurrences).find(([c, count]) => count === 4)[0];

    d0 = unique.find(n => n.length === 6 && n.split('').includes(tr) && n.split('').includes(bl));
    d9 = unique.find(n => n.length === 6 && !n.split('').includes(bl));

    let magnitude = 1000;
    let final = 0;

    output.forEach(n => {
        const finalD = [d0, d1, d2, d3, d4, d5, d6, d7, d8, d9].findIndex(d => {
            return d.split('').sort().join() === n.split('').sort().join();
        });

        final = final + magnitude * finalD;
        magnitude = magnitude / 10;
    });

    count += final;
});

console.log(count);
// 1063760
