const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let frames = 0;
const rotationDegree = Math.PI/180;

const sprite = new Image();
sprite.src = "./pictures/sprite.png";

const score_sound = new Audio();
score_sound.src = "./audio/audio_sfx_point.wav"

const swoosh_sound = new Audio();
swoosh_sound.src = "./audio/audio_sfx_swooshing.wav"

const hit_sound = new Audio();
hit_sound.src = "./audio/audio_sfx_hit.wav"

const die_sound = new Audio();
die_sound.src = "./audio/audio_sfx_die.wav"

const flap_sound = new Audio();
flap_sound.src = "./audio/audio_sfx_flap.wav"

const gameState = {
    current : 0,
    getReady : 0,
    game : 1,
    gameOver : 2
}

const resetButton = {
    x: 120,
    y: 263,
    w: 83,
    h: 29,
}

canvas.addEventListener("click", function (e) {
    switch(gameState.current){
        case gameState.getReady:
            gameState.current = gameState.game;
            swoosh_sound.play();
            break;
        case gameState.game:
            bird.flap();
            flap_sound.play();
            break;
        case gameState.gameOver:
            let rect = canvas.getBoundingClientRect();
            let clickX = e.clientX - rect.left;
            let clickY = e.clientY - rect.top;

            if( clickX >= resetButton.x && clickX <= resetButton.x + resetButton.w &&
                clickY >= resetButton.y && clickY <= resetButton.y + resetButton.h) {
                    pipes.reset();
                    bird.speedReset();
                    score.reset();
                    gameState.current = gameState.getReady;
                }
            break;
    }

});


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

    dx: 2,

    draw: function () {
        context.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        context.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    },

    update : function () {
       if (gameState.current === gameState.game) {
        this.x = (this.x - this.dx) % (this.w/2);
       }

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

    radius: 12, 

    frame: 0,

    gravity: 0.25,
    jump: 4.6,
    speed: 0,
    rotation: 0,

    draw: function () {
        let birdAnimation = this.animation[this.frame];

        context.save();
        context.translate(this.x, this.y );
        context.rotate(this.rotation);
        context.drawImage(sprite, birdAnimation.sourceX, birdAnimation.sourceY, this.w, this.h,  - this.w/2, - this.h/2, this.w, this.h);

        context.restore();
    },

    flap: function () {
        this.speed =- this.jump;

    },

    update : function () {
        //GAME STATE IS GET READY BIRD FLAP SLOWLY 
        this.period = gameState.current == gameState.getReady ? 10 : 5;
        // FRAME +1 EACH PERIOD
        this.frame += frames % this.period == 0 ? 1 : 0;
        //BACK TO 0 WHEN FRAME = 4
        this.frame = this.frame % this.animation.length;

        if(gameState.current == gameState.getReady){
            this.y = 150; // RESET BIRD POSITION
            this.rotation = 0 * rotationDegree;
        }else {
            this.speed += this.gravity;
            this.y += this.speed;

            if(this.y + this.h/2 >= canvas.height - ground.h) {
                this.y = canvas.height - ground.h - this.h/2;
                if(gameState.current == gameState.game){
                    gameState.current = gameState.gameOver;
                    die_sound.play();
                }
            }

            if(this.speed >= this.jump) {
                this.rotation = 90 * rotationDegree;
                this.frame = 1;
            } else {
                this.rotation = -25 * rotationDegree;
            }
        }
    },

    speedReset: function () {
        this.speed = 0;

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
        if(gameState.current == gameState.getReady) {
            context.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }
}

const gameOverMsg = {
    sX : 175,
    sY : 228,
    w : 225,
    h : 202,
    x : canvas.width/2 - 225/2,
    y : 90,

    draw : function(){
        if(gameState.current == gameState.gameOver) {
            context.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }
}


const pipes = {
    position : [],

    top: {
        sourceX: 553,
        sourceY: 0,
    },

    bottom: {
        sourceX: 502,
        sourceY: 0,
    },

    w: 53,
    h: 400,
    gap: 85,
    maxYPosition: -150,
    dx: 2,

    draw: function () {
        for(let i = 0; i < this.position.length; i++) {
            let p = this.position[i];

            let topYPosition = p.y;
            let bottomYPosition = p.y + this.h + this.gap;

            // TOP PIPE
            context.drawImage(sprite, this.top.sourceX, this.top.sourceY, this.w, this.h, p.x, topYPosition, this.w, this.h);

            // BOTTOM PIPE
            context.drawImage(sprite, this.bottom.sourceX, this.bottom.sourceY, this.w, this.h, p.x, bottomYPosition, this.w, this.h);

        }
    },

    update: function () {
        if(gameState.current !== gameState.game) return;

        if(frames % 100 == 0) {
            this.position.push({
                x: canvas.width,
                y: this.maxYPosition * (Math.random() + 1) ,
            });
        }
        for(let i = 0; i < this.position.length; i++ ) {
            let p = this.position[i];

            let bottomYPosition = p.y + this.h + this.gap;

            // COLLISION TOP PIPE
            if (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && 
                bird.y + bird.radius > p.y && bird.y - bird.radius < p.y + this.h) {
                    gameState.current = gameState.gameOver;
                    hit_sound.play();

                }

            // COLLISON BOTTOM PIPE 
            if (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && 
                bird.y + bird.radius > bottomYPosition && bird.y - bird.radius < bottomYPosition + this.h) {
                    gameState.current = gameState.gameOver;
                    hit_sound.play();
                }

                // MOVING THE PIPES
                p.x -= this.dx;

            if(p.x + this.w <= 0) {
                this.position.shift();
                score.value += 1;
                score_sound.play();
                score.best = Math.max(score.value, score.best);
                localStorage.setItem("best", score.best);
            }
        }
    }, 
    reset: function () {
        this.position = [];
    }
}

const score = {
    best: parseInt(localStorage.getItem("best")) || 0,
    value: 0,

    draw: function () {
        context.fillStyle = "#FFF";
        context.strokeStyle = "#000"

        if(gameState.current == gameState.game) {
            context.lineWidth = 2;
            context.font = "35px Teko";
            context.fillText(this.value, canvas.width/2, 50);
            context.strokeText(this.value, canvas.width/2, 50);

        } else if(gameState.current == gameState.gameOver) {
            // SCORE 
            context.font = "25px Teko";
            context.fillText(this.value, 225, 186);
            context.strokeText(this.value, 225, 186);

            // BEST SCORE
            context.fillText(this.best, 225, 228);
            context.strokeText(this.best, 225, 228); 
        }
    },

    reset: function () {
        this.value = 0; 
    }
}

function draw () {
    context.fillStyle = "#70c5ce";
    context.fillRect(0, 0, canvas.width, canvas.height);
    background.draw();
    pipes.draw();
    ground.draw();
    bird.draw();
    getReady.draw();
    gameOverMsg.draw();
    score.draw();
}

function update () {
    bird.update();
    ground.update();
    pipes.update();
}

function loop () {
    update();
    draw();
    frames++;
    requestAnimationFrame(loop);
}
loop();