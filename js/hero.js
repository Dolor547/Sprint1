'use strict'

const LASER_SPEED = 80;
var gHero

// creates the hero and place it on board
function createHero(board) {
    const BOARD_SIZE = board.length
    gHero = {
        pos: {
            i: 12, j: 6
        },
        isShoot: false
    }
    board[gHero.pos.i][gHero.pos.j] = '♆'
}

// Handle game keys
function onKeyDown(ev) {
    var nextLocation = {
        i: gHero.pos.i,
        j: gHero.pos.j,
    }
    switch (ev.code) {
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}

// Move the hero right (1) or left (-1)
function moveHero(dir) {
    const nextLocation = onKeyDown(dir)

    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    
}

// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot() { }

// renders a LASER at specific cell for short time and removes it
function blinkLaser(pos) { }