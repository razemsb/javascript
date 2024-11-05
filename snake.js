const readline = require('readline');
const { setInterval, clearInterval } = require('timers');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
});

const boardWidth = 20;
const boardHeight = 10;

let snake = [{ x: 5, y: 5 }];
let direction = { x: 1, y: 0 }; // начальное направление вправо
let food = generateFood();
let gameOver = false;

function generateFood() {
    return {
        x: Math.floor(Math.random() * boardWidth),
        y: Math.floor(Math.random() * boardHeight),
    };
}

function drawBoard() {
    console.clear();
    for (let y = 0; y < boardHeight; y++) {
        let row = '';
        for (let x = 0; x < boardWidth; x++) {
            if (snake.some(segment => segment.x === x && segment.y === y)) {
                row += 'O'; // Змейка
            } else if (food.x === x && food.y === y) {
                row += 'X'; // Еда
            } else {
                row += '.'; // Пустое пространство
            }
        }
        console.log(row);
    }
    console.log('Используйте стрелки для управления. Нажмите Ctrl+C для выхода.');
}

function updateSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Проверка на столкновение с границей или самим собой
    if (head.x < 0 || head.x >= boardWidth || head.y < 0 || head.y >= boardHeight ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver = true;
        return;
    }

    snake.unshift(head); // Добавляем голову змеи

    // Проверка на поедание еды
    if (head.x === food.x && head.y === food.y) {
        food = generateFood(); // Генерируем новую еду
    } else {
        snake.pop(); // Убираем последний сегмент
    }
}

function handleInput(input) {
    switch (input) {
        case '\u001B\u005B\u0041': // Вверх
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case '\u001B\u005B\u0043': // Вправо
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
        case '\u001B\u005B\u0042': // Вниз
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case '\u001B\u005B\u0044': // Влево
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
    }
}

rl.input.on('data', handleInput);

const gameLoop = setInterval(() => {
    if (gameOver) {
        clearInterval(gameLoop);
        console.clear();
        console.log('Игра окончена! Змейка столкнулась с границей или собой.');
        rl.close();
        return;
    }

    updateSnake();
    drawBoard();
}, 100);
