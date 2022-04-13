let inputDir = {x: 0, y: 0};
let SNAKE_SPEED = 15;
let lastRenderTime = 0;
let SNAKE_BODY = [
    {x: 15, y: 13},
];
let food = {x: 15, y: 17};
let score = 0;

const gameBoard = document.getElementById('game-board');
const scoreBox = document.querySelectorAll('.score');
const resGameBtn = document.querySelector('.resgame');
const overBox = document.querySelector('.over-box');

function main(currentTime) {
    window.requestAnimationFrame(main);
    const secondRenderTime = (currentTime - lastRenderTime) / 1000;
    if(secondRenderTime < 1 / SNAKE_SPEED) {
        return
    }
    lastRenderTime = currentTime
    gameEngine();
}


function isCollid(snake) {
    //when you bump into yourself
    for(let i = 1; i < SNAKE_BODY.length; i++) {
        if(snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true
        }
    }
    //when you bump into the well
    if(snake[0].x >= 40 || snake[0].x <= 0 || snake[0].y >= 40 || snake[0].y <= 0) {
        return true
    }

    return false
}

function scoreF(scores) {
    scoreBox.forEach(s => {
        s.innerHTML = scores
    })
}

function gameEngine() {
    // when you over game 
    if(isCollid(SNAKE_BODY)) {
        inputDir = {x: 0, y: 0};
        gameBoard.style.display = 'none';
        overBox.style.display = 'flex';
        scoreF(localStorage.getItem('score'));
        resGameBtn.addEventListener('click', () => {
            localStorage.removeItem('score');
            location = 'index.html'
            scoreF(score);
        })
        SNAKE_BODY = [{x: 11, y: 11}]
    }

    //when you eat food and increiment your snake body
    if(SNAKE_BODY[0].x === food.x && SNAKE_BODY[0].y === food.y) {
        SNAKE_BODY.unshift({x: SNAKE_BODY[0].x + inputDir.x, y: SNAKE_BODY[0].y + inputDir.y});
        score += 1;
        localStorage.setItem('score', score);
        scoreF(score);
        let b = 2;
        let a = 16;
        food = {x: Math.round(a + (b + a) * Math.random()), y: Math.round(a + (b + a ) * Math.random())}
    }

    //snake movie
    for (let i = SNAKE_BODY.length -2; i>=0; i--) {
        SNAKE_BODY[i+1] = {...SNAKE_BODY[i]};
    }

    SNAKE_BODY[0].x += inputDir.x
    SNAKE_BODY[0].y += inputDir.y

    //paint snake on display
    gameBoard.innerHTML = '';
    SNAKE_BODY.forEach((e, index) => {
        const snake = document.createElement('div');
        snake.style.gridRowStart = e.y;
        snake.style.gridColumnStart = e.x;
        if(index === 0) {
            snake.classList.add('head');
        } else {
            snake.classList.add('snake');
        }
        gameBoard.appendChild(snake);
    })

    //paint food on display
    const foodEat = document.createElement('div');
    foodEat.style.gridRowStart = food.y;
    foodEat.style.gridColumnStart = food.x;
    foodEat.classList.add('food');
    gameBoard.appendChild(foodEat);
}


window.requestAnimationFrame(main);

// Keydown
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp': 
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case 'ArrowDown': 
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case 'ArrowLeft': 
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case 'ArrowRight': 
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        
        default: 
            break;
    }
})

// Mobile Controller
const upArrow = document.querySelector('.fa-chevron-up');
const downArrow = document.querySelector('.fa-chevron-down');
const leftArrow = document.querySelector('.fa-chevron-left');
const rightArrow = document.querySelector('.fa-chevron-right');


upArrow.addEventListener('click', () => {
    inputDir.x = 0;
    inputDir.y = -1;
})

downArrow.addEventListener('click', () => {
    inputDir.x = 0;
    inputDir.y = 1;
})

leftArrow.addEventListener('click', () => {
    inputDir.x = -1;
    inputDir.y = 0;
})

rightArrow.addEventListener('click', () => {
    inputDir.x = 1;
    inputDir.y = 0;
})