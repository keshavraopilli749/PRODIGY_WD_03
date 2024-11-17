// task3.js
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset-btn');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(e) {
    const index = e.target.dataset.index;

    if (!gameActive || gameState[index] !== '') return;

    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    e.target.classList.add(currentPlayer === 'X' ? 'clicked-x' : 'clicked-o');

    if (checkWin()) {
        statusText.innerHTML = `<span class="winner">Player ${currentPlayer} Wins!</span>`;
        gameActive = false;
    } else if (gameState.every(cell => cell !== '')) {
        statusText.textContent = 'Draw!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function checkWin() {
    return winConditions.some(combination =>
        combination.every(index => gameState[index] === currentPlayer)
    );
}

function resetGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    statusText.textContent = "Player X's Turn";
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('clicked-x', 'clicked-o');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
