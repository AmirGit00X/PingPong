let bird = document.getElementById('bird');
let obstacle = document.getElementById('obstacle');
let scoreDisplay = document.getElementById('score');
let score = 0;
let gravity = 2;
let isJumping = false;

function startGame() {
    obstacle.style.right = '0px';
    setInterval(() => {
        let obstacleLeft = parseInt(obstacle.style.right);
        obstacle.style.right = obstacleLeft + 5 + 'px';
        
        if (obstacleLeft > 600) {
            obstacle.style.right = '0px';
            score++;
            scoreDisplay.innerText = score;
        }
        
        checkCollision();
    }, 100);
}

function checkCollision() {
    let birdRect = bird.getBoundingClientRect();
    let obstacleRect = obstacle.getBoundingClientRect();
    
    if (
        birdRect.x < obstacleRect.x + obstacleRect.width &&
        birdRect.x + birdRect.width > obstacleRect.x &&
        birdRect.y < obstacleRect.y + obstacleRect.height &&
        birdRect.y + birdRect.height > obstacleRect.y
    ) {
        alert('بازی تمام شد! امتیاز شما: ' + score);
        score = 0;
        scoreDisplay.innerText = score;
        startGame();
    }
}

document.addEventListener('click', () => {
    isJumping = true;
    let jumpHeight = 0;
    
    let jumpInterval = setInterval(() => {
        if (jumpHeight < 100) {
            bird.style.bottom = bird.offsetTop + 10 + 'px';
            jumpHeight += 10;
        } else {
            clearInterval(jumpInterval);
            fall();
        }
    }, 50);
});

function fall() {
    let fallInterval = setInterval(() => {
        if (bird.offsetTop > 0) {
            bird.style.bottom = bird.offsetTop - 10 + 'px';
        } else {
            clearInterval(fallInterval);
        }
    }, 50);
}

startGame();
