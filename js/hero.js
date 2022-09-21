'use strict'

const LASER_SPEED = 80;
var gHero

// creates the hero and place it on board
function createHero(board) {
    gHero = {
        pos: {
            i: 12, j: 6
        },
        isShoot: false
    }
    board[gHero.pos.i][gHero.pos.j] = HERO
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

    const nextCell = onKeyDown(dir)
    if (!nextCell) return

    console.log('nextCell:', nextCell);

    //TODO: return if cannot move
    if(gBoard[nextCell.i][nextCell.j] < 0 || gBoard[nextCell.i][nextCell.j] >= gBoard.length) return
    
    //TODO: hitting an alien
    if(gBoard[nextCell.i][nextCell.j] === ALIEN) {
        gameOver()
        return
    }
    //TODO: moving from current location
    //TODO: update the modal

    gBoard[gHero.pos.i][gHero.pos.j] = SKY
    //TODO: update the DOM
    updateCell(gHero.pos, SKY)

    //TODO: moving the hero to new location
    //TODO: update the modal
    //TODO: update the DOM
}

// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot() { }

// renders a LASER at specific cell for short time and removes it
function blinkLaser(pos) { }