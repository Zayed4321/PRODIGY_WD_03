const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (boardState[index] !== '' || checkWinner()) {
        return;
    }

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        setTimeout(() => alert(`${currentPlayer} wins!`), 10);
    } else if (boardState.every(cell => cell !== '')) {
        setTimeout(() => alert('It\'s a draw!'), 10);
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return boardState[index] === currentPlayer;
        });
    });
}

function resetGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
}

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

resetButton.addEventListener('click', resetGame);
