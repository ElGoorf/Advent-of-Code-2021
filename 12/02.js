const path = require('path');
const fs = require('fs');

filePath = path.join(__dirname, 'input.txt');

const input = fs.readFileSync(filePath, 'utf8');

let edges = input.split('\n').filter(line => line);
let pairs = edges.map(edge => edge.split('-'));
let smallCaves = ['nope'];

pairs.forEach(([a, b]) => {
    if(!smallCaves.includes(a) && a.match(/^[a-z]{1,2}$/)) {
        smallCaves.push(a);
    }
    if(!smallCaves.includes(b) && b.match(/^[a-z]{1,2}$/)) {
        smallCaves.push(b);
    }
});

let routes = [];

function findRoutes(routeSoFar, availablePairs, smallCave) {
    const thisPoint = routeSoFar[routeSoFar.length -1];
    const lastPoint = routeSoFar[routeSoFar.length - 2];

    availablePairs.forEach(pair => {
        if (pair.includes(thisPoint)) {
            const nextPoint = pair.find(x => x !== thisPoint);
            const updatedRouteSoFar = [...routeSoFar, nextPoint];

            if (nextPoint === 'end') {
                routes.push(updatedRouteSoFar);
                return;
            }

            const remainingPairs = (lastPoint.match(/[a-z]/) && lastPoint !== smallCave) || (lastPoint.match(/[a-z]/) && lastPoint === smallCave && routeSoFar.reduce((count, n) => n === smallCave ? count + 1 : count, 0) === 2)
                ? availablePairs.filter(pair2 => {
                    return pair2[0] !== lastPoint && pair2[1] !== lastPoint
                })
                : availablePairs;

            if (remainingPairs.length === 0) {
                return;
            }

            findRoutes(updatedRouteSoFar, remainingPairs, smallCave);
        }
    })
}

smallCaves.forEach(smallCave => {
    pairs.forEach((pair) => {
        if (pair.includes('start')) {
            const nextPoint = pair.find(x => x !== 'start');
            findRoutes(['start', nextPoint], pairs, smallCave);
        }
    });
});

const set = new Set(routes.map(route => route.join()));
console.log(set.size);
// 99448
