let userScore = 0;
let botScore = 0;
let level = 'easy';
const boardElement = document.getElementById("board");
const userScoreElement = document.getElementById("userScore");
const botScoreElement = document.getElementById("botScore");
const restartButton = document.getElementById("restartButton");
const levelSelect = document.getElementById("level");

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';

function createBoard() {
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.className = 'cell';
        cellElement.dataset.index = index;
        cellElement.textContent = cell;
        cellElement.addEventListener('click', cellClick);
        boardElement.appendChild(cellElement);
    });
}

function cellClick() {
    const index = this.dataset.index;
    if (board[index] === '' && currentPlayer === 'X') {
        board[index] = currentPlayer;
        currentPlayer = 'O';
        checkWin();
        createBoard();
        if (currentPlayer === 'O') {
            botMove();
        }
    }
}

function botMove() {
    if (currentPlayer === 'O') {
        let availableCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
        const index = selectBotMove(availableCells);
        board[index] = 'O';
        currentPlayer = 'X';
        checkWin();
        createBoard();
    }
}

function selectBotMove(availableCells) {
    // این تابع می‌تواند بر اساس سطح انتخابی شما تغییر کند
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    return availableCells[randomIndex];
}

function checkWin() {
    // شرایط برنده شدن 
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            if (board[a] === 'X') {
                userScore++;
            } else {
                botScore++;
            }
            updateScore();
            resetGame(); 
            return;
        }
    }

    if (!board.includes('')) {
        resetGame();
    }
}

function updateScore() {
    userScoreElement.textContent = userScore;
    botScoreElement.textContent = botScore;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    createBoard();
}

restartButton.addEventListener('click', resetGame);
levelSelect.addEventListener('change', (event) => {
    level = event.target.value;
    resetGame();
});

createBoard();
