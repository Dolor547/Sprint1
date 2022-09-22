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
    board[gHero.pos.i][gHero.pos.j] = createCell(HERO)
}

// Handle game keys
function onKeyDown(ev) {
    if (gGame.isOn) {
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
            case 'Space':
                shoot({ i: gHero.pos.i - 1, j: gHero.pos.j })
                break;
            default:
                return null;
        }
        return nextLocation;
    }
    return
}

// Move the hero right (1) or left (-1)
function moveHero(dir) {

    const nextCell = onKeyDown(dir)
    //TODO: check validation for the next move
    if (!nextCell || nextCell.i >= gBoard.length || nextCell.j >= gBoard.length || nextCell.i < 0 || nextCell.j < 0) return

    //TODO: return if cannot move
    if (gBoard[nextCell.i][nextCell.j] < 0 || gBoard[nextCell.i][nextCell.j] >= gBoard.length) return

    //TODO: hitting an alien
    if (gBoard[nextCell.i][nextCell.j] === ALIEN) {
        gameOver()
        return
    }
    //TODO: moving from current location
    //TODO: update the modal

    //TODO: update the DOM
    updateCell(gHero.pos, '')

    //TODO: moving the hero to new location
    //TODO: update the modal
    gBoard[gHero.pos.i][gHero.pos.j].gameObject = ' '
    gHero.pos = nextCell
    //TODO: update the DOM
    updateCell(nextCell, HERO)
}

// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot(pos) {
    gHero.isShoot = true
    var currPos = pos
    var nextPos = { i: pos.i - 1, j: pos.j }
    while (true) {
        if (nextPos.i < 0) gHero.isShoot = false
        if (gBoard[nextPos.i][nextPos.j] === ALIEN) gHero.isShoot = false

        updateCell(currPos, '')
        updateCell(nextPos, LASER)
        gGame.laserInterval = setInterval((pos, HERO), 500)
    }

}

// renders a LASER at specific cell for short time and removes it
// function blinkLaser(pos) {
//     updateCell(pos, LASER)


// }