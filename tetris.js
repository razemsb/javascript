const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
});

const boardWidth = 10;
const boardHeight = 20;
let board = Array.from({ length: boardHeight }, () => Array(boardWidth).fill('.'));
let currentPiece = getRandomPiece();
let currentX = Math.floor(boardWidth / 2) - 1;
let currentY = 0;
let gameOver = false;

const pieces = [
    [['#', '#', '#', '#']], // I
    [['#', '#'], ['#', '#']], // O
    [['.', '#', '.'], ['#', '#', '#']], // T
    [['#', '.', '.'], ['#', '#', '#']], // L
    [['.', '.', '#'], ['#', '#', '#']], // J
    [['#', '#', '.', '.'], ['.', '#', '#']], // S
    [['.', '#', '#'], ['#', '#', '.']] // Z
];

function getRandomPiece() {
    return pieces[Math.floor(Math.random() * pieces.length)];
}

function drawBoard() {
    console.clear();
    for (let y = 0; y < boardHeight; y++) {
        let row = '';
        for (let x = 0; x < boardWidth; x++) {
            row += board[y][x];
        }
        console.log(row);
    }
    console.log('Используйте A (влево), D (вправо), S (вниз), W (поворот) для управления. Нажмите Ctrl+C для выхода.');
}

function isCollision(xOffset, yOffset, piece = currentPiece) {
    for (let y = 0; y < piece.length; y++) {
        for (let x = 0; x < piece[y].length; x++) {
            if (piece[y][x] !== '#') continue;
            const newX = currentX + x + xOffset;
            const newY = currentY + y + yOffset;
            if (newX < 0 || newX >= boardWidth || newY >= boardHeight || (newY >= 0 && board[newY][newX] === '#')) {
                return true;
            }
        }
    }
    return false;
}

function mergePiece() {
    for (let y = 0; y < currentPiece.length; y++) {
        for (let x = 0; x < currentPiece[y].length; x++) {
            if (currentPiece[y][x] === '#') {
                board[currentY + y][currentX + x] = '#';
            }
        }
    }
}

function clearLines() {
    for (let y = boardHeight - 1; y >= 0; y--) {
        if (board[y].every(cell => cell === '#')) {
            board.splice(y, 1);
            board.unshift(Array(boardWidth).fill('.'));
        }
    }
}

function update() {
    if (!gameOver) {
        if (!isCollision(0, 1)) {
            currentY++;
        } else {
            mergePiece();
            clearLines();
            currentPiece = getRandomPiece();
            currentX = Math.floor(boardWidth / 2) - 1;
            currentY = 0;
            if (isCollision(0, 0)) {
                gameOver = true;
            }
        }
        drawBoard();
    }
}

function handleInput(input) {
    switch (input.trim()) { // добавление trim для обработки лишних пробелов
        case 'a':
            if (!isCollision(-1, 0)) currentX--;
            break;
        case 'd':
            if (!isCollision(1, 0)) currentX++;
            break;
        case 's':
            if (!isCollision(0, 1)) currentY++;
            break;
        case 'w':
            const rotatedPiece = rotatePiece(currentPiece);
            if (!isCollision(0, 0, rotatedPiece)) {
                currentPiece = rotatedPiece;
            }
            break;
    }
}

function rotatePiece(piece) {
    return piece[0].map((_, index) => piece.map(row => row[index]).reverse());
}

// Установка слушателя для ввода
rl.input.on('data', handleInput);

// Запуск игрового цикла
const gameLoop = setInterval(() => {
    update();
    if (gameOver) {
        clearInterval(gameLoop);
        console.clear();
        console.log('Игра окончена!');
        rl.close();
    }
}, 500);
