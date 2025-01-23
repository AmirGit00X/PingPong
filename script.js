let ball = document.getElementById('ball');
let player = document.getElementById('player');
let computer = document.getElementById('computer');
let scoreDisplay = document.getElementById('score');
let highscoreDisplay = document.getElementById('highscore');

let ballSpeedX = 4;
let ballSpeedY = 2;
let score = 0;
let highscore = 0;
let paddleSpeed = 20;
let difficultyLevel = 'medium';

document.addEventListener('mousemove', (event) => {
    let rect = document.querySelector('.game').getBoundingClientRect();
    let mouseY = event.clientY - rect.top;
    player.style.top = Math.min(Math.max(mouseY - 40, 0), rect.height - 80) + 'px';
});

function setDifficulty(level) {
    difficultyLevel = level;
    switch (difficultyLevel) {
        case 'easy':
            ballSpeedX = 2;
            ballSpeedY = 1;
            break;
        case 'medium':
            ballSpeedX = 4;
            ballSpeedY = 2;
            break;
        case 'hard':
            ballSpeedX = 6;
            ballSpeedY = 3;
            break;
    }
    resetGame();
}

function resetGame() {
    score = 0;
    scoreDisplay.innerText = score;
    ball.style.top = '50%';
    ball.style.left = '50%';
    ballSpeedX = Math.abs(ballSpeedX); // Reset ball direction
}

function gameLoop() {
    let ballRect = ball.getBoundingClientRect();
    let playerRect = player.getBoundingClientRect();
    let computerRect = computer.getBoundingClientRect();

    // Move the ball
    ball.style.left = ball.offsetLeft + ballSpeedX + 'px';
    ball.style.top = ball.offsetTop + ballSpeedY + 'px';

    // Check for wall collisions
    if (ball.offsetTop <= 0 || ball.offsetTop + ballRect.height >= 400) {
        ballSpeedY *= -1; // Bounce
    }

    // Check for paddle collisions
    if (ball.offsetLeft <= playerRect.right && ball.offsetTop + ballRect.height >= playerRect.top && ball.offsetTop <= playerRect.bottom) {
        ballSpeedX *= -1; // Bounce off player paddle
        score++;
        scoreDisplay.innerText = score;
        if (score > highscore) {
            highscore = score;
            highscoreDisplay.innerText = highscore;
        }
    }

    // Computer AI
    if (ball.offsetLeft >= 290) {
        if (ball.offsetTop + ballRect.height / 2 < computerRect.top + computerRect.height / 2) {
            computer.style.top = computer.offsetTop - paddleSpeed + 'px';
        } else {
            computer.style.top = computer.offsetTop + paddleSpeed + 'px';
        }
    }

    // Check for game over
    if (ball.offsetLeft <= 0) {
        alert('بازی تمام شد! امتیاز شما: ' + score);
        resetGame();
    }

    requestAnimationFrame(gameLoop);
}

resetGame();
gameLoop();
