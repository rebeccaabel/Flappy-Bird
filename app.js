const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const birdImg = new Image();
birdImg.src = 'pictures/bird (1).png';

//game const
const BIRD_SPEED = -5;
const BIRD_WIDTH = 40;
const BIRD_HEIGHT = 30;
const PIPE_WIDTH = 50;
const PIPE_GAP = 125;

//bird variables
let birdX = 50;
let birdY = 50;
let birdVelocity = 0; 
let birdAcceleration = 0.1; 


//pipe variables
let pipeX = 400;
let pipeY = canvas.height - 200; 

//Score and highscore
let scoreDiv = document.getElementById('score-display');
let score = 0;
let highscore = 0;

document.body.onkeyup = function(e) {
    if (e.code == 'Space') {
        birdVelocity = BIRD_SPEED;
    }
}

function collision () {
    const birdBox = {
        x: birdX,
        y: birdY,
        width: BIRD_WIDTH,
        height: BIRD_HEIGHT
    }

    const topPipe = {
        x: pipeX,
        y: pipeY - PIPE_GAP + BIRD_HEIGHT,
        width: PIPE_WIDTH,
        height: pipeY
    }

    const bottomPipe = {
        x: pipeX,
        y: pipeY + PIPE_GAP + BIRD_HEIGHT,
        width: PIPE_WIDTH,
        height: canvas.height - pipeY - PIPE_GAP
    }

    if (birdBox.x + birdBox.width > topPipe.x &&
        birdBox.x < topPipe.x + topPipe.width &&
        birdBox.y < topPipe.y) {
            return true;
    }

    if (birdBox.x + birdBox.width > bottomPipe.x &&
        birdBox.x < bottomPipe.x + bottomPipe.width &&
        birdBox.y + birdBox.height > bottomPipe.y) {
            return true;
        }

    if(birdY < 0 || birdY + BIRD_HEIGHT > canvas.height) {
        return true;
    }

    return false;

}

function gameOver () {
    showEndMenu();
}

function hideEndMenu () {
    document.getElementById('end-menu').style.display = 'none';
}

function showEndMenu () {
    document.getElementById('end-menu').style.display = 'block';
    document.getElementById('end-score').innerHTML = score; 
    if ( highscore < score) {
        highscore = score; 
    }
}


function resetCtx () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(birdImg, birdX, birdY);

    ctx.fillStyle = '#333';
    ctx.fillRect(pipeX, -100, PIPE_WIDTH, pipeY);
    ctx.fillRect(pipeX, pipeY + PIPE_GAP, PIPE_WIDTH, canvas.width - pipeY);

    //collision 
    if(collision()) {
        gameOver();
        return;
    }

    pipeX -= 1.5;
    if(pipeX < -50) {
        pipeX = 400; 
        pipeY = Math.random() * (canvas.height - PIPE_GAP) + PIPE_WIDTH; 

    }

    //gravity
    birdVelocity += birdAcceleration;
    birdY += birdVelocity;

    requestAnimationFrame(resetCtx);

}


resetCtx();
