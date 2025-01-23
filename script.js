let car = document.getElementById('car');
let obstacle = document.getElementById('obstacle');
let scoreDisplay = document.getElementById('score');
let score = 0;
let speed = 5;

function startGame() {
    obstacle.style.top = '-100px';
    obstacle.style.left = Math.random() * (document.querySelector('.game-area').offsetWidth - 50) + 'px';
    
    setInterval(() => {
        let obstacleTop = parseInt(obstacle.style.top);
        if (obstacleTop < 400) {
            obstacle.style.top = obstacleTop + speed + 'px';
            score++;
            scoreDisplay.innerText = score;
        } else {
            obstacle.style.top = '-100px';
            obstacle.style.left = Math.random() * (document.querySelector('.game-area').offsetWidth - 50) + 'px';
        }
        
        checkCollision();
    }, 100);
}

function checkCollision() {
    let carRect = car.getBoundingClientRect();
    let obstacleRect = obstacle.getBoundingClientRect();
    
    if (
        carRect.x < obstacleRect.x + obstacleRect.width &&
        carRect.x + carRect.width > obstacleRect.x &&
        carRect.y < obstacleRect.y + obstacleRect.height &&
        carRect.y + carRect.height > obstacleRect.y
    ) {
        alert('بازی تمام شد! امتیاز شما: ' + score);
        score = 0;
        scoreDisplay.innerText = score;
        startGame();
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && car.offsetLeft > 0) {
        car.style.left = car.offsetLeft - 20 + 'px';
    } else if (e.key === 'ArrowRight' && car.offsetLeft < (document.querySelector('.game-area').offsetWidth - 50)) {
        car.style.left = car.offsetLeft + 20 + 'px';
    }
});

startGame();
