const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let frames = 0;

const sprite = new Image();
sprite.src = "sprite.png";

const background = {
    sX : 0,
    sY : 0,
    w : 275,
    h : 226,
    x : 0,
    y : canvas.height - 226,
    
    draw : function(){
        context.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        
        context.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    }
    
}

const ground = {
    sX : 276,
    sY : 0,
    w : 224,
    h : 112,
    x : 0,
    y : canvas.height - 112,

    draw: function () {
        context.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        context.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    }
}

const bird = {
    animation : [
        {sourceX: 276, sourceY: 112},
        {sourceX: 276, sourceY: 139},
        {sourceX: 276, sourceY: 164},
        {sourceX: 276, sourceY: 139},
    ],
    x: 50,
    y: 150,
    w: 34,
    h: 26,

    frame: 0,

    draw: function () {
        let birdAnimation = this.animation[this.frame];

        context.drawImage(sprite, birdAnimation.sourceX, birdAnimation.sourceY, this.w, this.h, this.x - this.w/2, this.y - this.h/2, this.w, this.h);

    }
}

const getReady = {
    sX : 0,
    sY : 228,
    w : 173,
    h : 152,
    x : canvas.width/2 - 173/2,
    y : 80,

    draw : function(){
        context.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
}


function draw () {
    context.fillStyle = "#70c5ce";
    context.fillRect(0, 0, canvas.width, canvas.height);
    background.draw();
    ground.draw();
    bird.draw();
    getReady.draw();

}

/*function update () {

}*/

function loop () {
   //update();
    draw();
    frames++;
    requestAnimationFrame(loop);
}

loop();













/*const canvas = document.getElementById('game-canvas');
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
let scored = false;



document.body.onkeyup = function(e) {
    if (e.code == 'Space') {
        birdVelocity = BIRD_SPEED;
    }
}

document.getElementById('restart-button').addEventListener('click', () => { // window reload 
    resetGame();
    hideEndMenu();
    resetCtx();
})


function scoreIncrease () {
    if (birdX > pipeX + PIPE_WIDTH && 
        (birdY < pipeY + PIPE_GAP || 
            birdY + BIRD_HEIGHT > pipeY + PIPE_GAP ) && !scored ) {
                score++;
                scoreDiv.innerHTML = score;
                scored = true;
            }


         /*   if (birdX < pipeX + PIPE_WIDTH) {
                scored = false; 
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

    document.getElementById('highscore').innerHTML = highscore;
}

function resetGame () {
    birdX = 50;
    birdY = 50;
    birdVelocity = 0; 
    birdAcceleration = 0.1; 

    pipeX = 400;
    pipeY = canvas.height - 200; 

    score = 0; 

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

    pipeX -= 1.7;
    if(pipeX < -50) {
        pipeX = 400; 
        pipeY = Math.random() * (canvas.height - PIPE_GAP) + PIPE_WIDTH; 

    }

    //gravity
    birdVelocity += birdAcceleration;
    birdY += birdVelocity;

    scoreIncrease();
    requestAnimationFrame(resetCtx);

}

resetCtx();*/ 
