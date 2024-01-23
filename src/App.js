import {useState} from 'react';

function Square({value, onClick}) {
    console.log(value);
    return <button className="square" onClick={onClick}>{value}</button>;
}


export default function App() {
    let [board, setBoard] = useState([[null,null,null],[null,null,null],[null,null,null]]);
    let [nextIsSquare, setNextIsSquare] = useState(true);

    const getNextSymbol = () => nextIsSquare ? 'X' : 'O';
    const toggle = () => setNextIsSquare(!nextIsSquare);

    const onClick = (i, j) => {
        return function() {
            if (!board[i][j] && !getWinner(board)) {
                board[i][j] = getNextSymbol();
                toggle();
                setBoard(board);
            }
        };
    };

    const shownBoard = board.map((row, i) => {
        let shownRow = row.map((value, j) => {
            return <Square value={value} onClick={onClick(i,j)} />;
        });
        return <div className="board-row">{shownRow}</div>;
    });

    let status;
    const winner = getWinner(board);
    if (winner) {
        status = `Winner: ${winner}`;
    } else {
        status = `Next bad Larry: ${getNextSymbol()}`;
    }

    return (
        <>
            <p>{status}</p>
            {shownBoard}
        </>
    );
}


function getWinner(board) {
    for (let i = 0; i < board.length; i++) {
        const rowIsEq = board[i].every((val, j, arr) => val === arr[0]);
        if (rowIsEq) {
            return board[i][0];
        }
    }
    for (let j = 0; j < board[0].length; j++) {
        let col = [];
        for (let i = 0; i < board.length; i++) {
            col.push(board[i][j]);
        }
        const colIsEq = col.every(val => val === col[0]);
        if (colIsEq) {
            return col[0];
        }
    }

    if (true) {
        let backSlash = [];
        for (let k = 0; k < board.length; k++) {
            backSlash.push(board[k][k]);
        }
        const backSlashIsEq = backSlash.every(val => val === backSlash[0]);
        if (backSlashIsEq) {
            return backSlash[0];
        }
    }

    if (true) {
        let slash = [];
        for (let k = 0; k < board.length; k++) {
            slash.push(board[(board.length - 1) - k][k]);
        }
        const slashIsEq = slash.every(val => val === slash[0]);
        if (slashIsEq) {
            return slash[0];
        }
    }

    return null;
}
