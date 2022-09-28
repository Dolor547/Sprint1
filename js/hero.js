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
                shoot(gHero.pos)
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

// Sets an interval for shooting (blinking) the laser up towards aliens
function shoot(pos) {
    gHero.isShoot = true
    var currLaserPos = { i: pos.i - 1, j: pos.j }
    console.log('currLaserPos:', currLaserPos);


    while (currLaserPos.i >= 0) {
        if (gBoard[currLaserPos.i][currLaserPos.j].gameObject != ALIEN) {
            // clearTimeout(gGame.laserInterval)
            // gGame.laserInterval = setTimeout(function () {
            // blinkLaser(currLaserPos)
            // console.log('currLaserPos:', currLaserPos);
            // console.log('-------------------------');
            // }, 500)
            // currLaserPos.i--
            
            if (gBoard[currLaserPos.i - 1][currLaserPos.j].gameObject === ALIEN) updateCell(gBoard[currLaserPos.i - 1][currLaserPos.j], ' ')
            blinkLaser({i: currLaserPos.i--, j: currLaserPos.j})
            
        } else {
            gGame.score += 10
            gHero.isShoot = false
            return
        }
        
    }
        // blinkLaser(currLaserPos)
        
        console.log('currLaserPos:', currLaserPos);
        console.log('-------------------------');
        // clearTimeout(gGame.laserInterval)
        
        if (currLaserPos.i < 0) gHero.isShoot = false
        
    }
    
    var count = 0
    // renders a LASER at specific cell for short time and removes it
    function blinkLaser(pos) { 
        console.log('run number ' + count);
        console.log(pos);
        count++
        
        // if (pos.i >= 0) {
            //modal
            gBoard[pos.i][pos.j].gameObject = LASER
            
            //DOM
            updateCell(pos, LASER)
            
            setTimeout(function () {
                //modal
                gBoard[pos.i][pos.j].gameObject = ' '
                
                //DOM
                updateCell(pos, ' ')
                console.log('interval');
            }, 1000)
            // clearTimeout(gGame.laserInterval)
    // }
}