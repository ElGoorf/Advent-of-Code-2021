const path = require('path');
const fs = require('fs');

filePath = path.join(__dirname, 'input.txt');

const input = fs.readFileSync(filePath, 'utf8');
const inputLines = input.split('\n');
const drawnNumbers = inputLines[0].split(',');
const boards = [];
for(let line = 1; line < inputLines.length - 5; line+=6){
    boards.push([...inputLines[line+1].split(" "), ...inputLines[line+2].split(" "), ...inputLines[line+3].split(" "), ...inputLines[line+4].split(" "), ...inputLines[line+5].split(" ")].filter(x => x !== "") )
}

drawnNumbers.forEach(dn => {
    boards.forEach((board, boardI) => {
        if(boards[boardI] !== "DONE") {
            board.forEach((bn, bni) => {
                if (bn === dn) {
                    board[bni] = 'X'
                }
            });

            for(let x = 0; x <= 4; x++) {
                if (
                    boards[boardI] !== "DONE" && (
                        // row
                        (board[x*5] === 'X' && board[x*5+1] === 'X' && board[x*5+2] === 'X' && board[x*5+3] === 'X' && board[x*5+4] === 'X') ||
                        // column
                        (board[x] === 'X' && board[x+5] === 'X' && board[x+10] === 'X' && board[x+15] === 'X' && board[x+20] === 'X')
                    )
                ) {
                    if (boards.filter(board => board !== "DONE").length === 1) {
                        console.log(board);
                        const totalRemaining = board.filter(x => x !== "X").reduce((acc, n) => acc + parseInt(n, 10), 0);
                        console.log(totalRemaining * dn);
                        process.exit(0);
                    } else {
                        boards[boardI] = "DONE"
                    }
                }
            }
        }
    })
});

// 17884
