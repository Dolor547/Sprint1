'use strict'

const BOARD_SIZE = 14;
const ALIENS_ROW_LENGTH = 8
const ALIENS_ROW_COUNT = 3
const HERO = '♆';
const ALIEN = '👽';
const LASER = '⤊';
const FLOOR = '#';
const SKY = ' ';
// Matrix of cell objects. e.g.: {type: SKY, gameObject: ALIEN}
var gBoard;
var gGame = {
    isOn: true,
    aliensCount: (ALIENS_ROW_LENGTH * ALIENS_ROW_COUNT),
    laserInterval: 'none',
    score: 0,
}

// Called when game loads

function init() {
    gBoard = createBoard()

    createHero(gBoard)
    createAliens(gBoard)
    console.table(gBoard);
    renderBoard(gBoard, '.board-container');
}

// Create and returns the board with aliens on top, ground at bottom
// use the functions: createCell, createHero, createAliens
function createBoard() {
    const SIZE = 14
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            // if (i === (SIZE - 1)) board[i][j] = FLOOR
            // else board[i][j] = SKY

            if (i === (SIZE - 1)) board[i][j] = createCell(FLOOR)
            else board[i][j] = createCell(SKY)
        }
    }

    return board
}

// Render the board as a <table> to the page
function renderBoard(board, selector) {
    var strHTML = '<table border="1"><tbody>'

    for (var i = 0; i < board.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < board.length; j++) {

            const cell = board[i][j].gameObject
            const className = 'cell cell-' + i + '-' + j
            strHTML += `<td class="${className}" data-i="${i}" data-j="${j}">${cell}</td>`
        }
        strHTML += '</tr>'

    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN}
function createCell(gameObject = null) {
    return {
        type: SKY,
        gameObject: gameObject
    }
}

// position such as: {i: 2, j: 7}
function updateCell(pos, gameObject = null) {
    checkStatus()

    gBoard[pos.i][pos.j].gameObject = gameObject;
    var elCell = getElCell(pos);
    elCell.innerHTML = gameObject || ' ';
}

function victory() {
    var elBtn = document.querySelector('restart')
    elBtn.classList.remove('hide')
    gGame.isOn = false
    alert('game over you won')
    console.log('Game End');
}

function checkStatus() {
    if (gGame.aliensCount === 0) {
        victory()
    }
}