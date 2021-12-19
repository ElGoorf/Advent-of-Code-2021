const path = require('path');
const fs = require('fs');

filePath = path.join(__dirname, 'input.txt');

const input = fs.readFileSync(filePath, 'utf8');

let edges = input.split('\r\n').filter(line => line);
let pairs = edges.map(edge => edge.split('-'));

let routes = [];

function findRoutes(routeSoFar, availablePairs) {
    const thisPoint = routeSoFar[routeSoFar.length -1];
    const lastPoint = routeSoFar[routeSoFar.length - 2];

    availablePairs.forEach(pair => {
        if (pair.includes(thisPoint)) {
            const nextPoint = pair.find(x => x !== thisPoint);
            const updatedRouteSoFar = [...routeSoFar, nextPoint];

            if (nextPoint === 'end') {
                routes.push(updatedRouteSoFar);
               // console.log('end', updatedRouteSoFar);
                return;
            }

            const remainingPairs = lastPoint.match(/[a-z]/)
                ? availablePairs.filter(pair2 => {
                    return pair2[0] !== lastPoint && pair2[1] !== lastPoint
                })
                : availablePairs;

            if (remainingPairs.length === 0) {
                return;
            }

            findRoutes(updatedRouteSoFar, remainingPairs);
        }
    })
}

pairs.forEach((pair) => {
    if (pair.includes('start')) {
        const nextPoint = pair.find(x => x !== 'start');
        findRoutes(['start', nextPoint], pairs);
    }
});

console.log(routes.length);
// 3802
