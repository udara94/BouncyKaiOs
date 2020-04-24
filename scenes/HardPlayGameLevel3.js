// playGame scene
class HardPlayGameLevel3 extends Phaser.Scene{
    constructor(){
        super({ key: "HardPlayGameLevel3", active: false });
    }

    // preloading assets
    preload(){
        this.load.image("wall", "assets/img/wall.png");
        this.load.image("ball", "assets/img/ball.png");
        this.load.image("coin", "assets/img/coin.png");

        // Animated coin
        this.load.spritesheet('coins', 'assets/spritesheet/coin.png', { frameWidth: 400, frameHeight: 400 });
    }

    // method to be executed once, when the scene has been created
    create(){

        // arrays where to store left and right walls
        this.leftWalls = [];
        this.rightWalls = [];

        this.createBackground();

        // each wall is made by "gameOptions.bars" pieces, so we actually have "gameOptions.bars" walls each side
        for(var i = 0; i < gameOptions.bars; i++){

            // adding left and right walls
            this.leftWalls[i] = this.addWall(i, LEFT);
            this.rightWalls[i] = this.addWall(i, RIGHT);
        }

        // adding the ball
        this.ball = this.matter.add.image(game.config.width / 4, game.config.height / 2, "ball");
        this.ball.displayWidth = 50;
        this.ball.displayHeight = 50;

        // setting ball body as circular
        this.ball.setCircle();

        this.matter.world.setGravity(0,5);

        //coin group
        this.coinGroup = this.add.group();


        this.coins = this.matter.add.sprite(160, 150, 'coins');
        // this.coins2 = this.matter.add.sprite(160, 150, 'coins');


        //coinframe
        this.anims.create({
            key: 'coinRotate',
            repeat: -1,
            frameRate: 7,
            frames: this.anims.generateFrameNames('coins', { start: 1, end: 10 })
        });

        this.coins.play('coinRotate');
        this.coins.displayWidth = 100;
        this.coins.displayHeight = 100;
        this.coins.body.label = "coins";
        this.coins.setStatic(true);


        // this method will randomly place the coin
        this.placeCoin();

        // setting ball velocity (horizontal, vertical)
        this.ball.setVelocity(gameOptions.ballSpeed, 0);

        // waiting for pointer down input to call "jump" method
        // this.input.on("pointerdown", this.jump, this);
        this.keEnter = this.input.keyboard.on("keyup_ENTER", this.jump, this);

        // waiting for a "collisionstart" event. "e" is the event, "b1" and "b2" the bodies
        this.matter.world.on("collisionstart", function (e, b1, b2) {

            // checking b1 and b2 labels to be "leftwall"
            if(b1.label == "leftwall" || b2.label == "leftwall"){
                this.wallHitScore();
                // handling collisions on the LEFT side
                this.handleWallCollision(LEFT, b1, b2);
            }

            // checking b1 and b2 labels to be "rightwall"
            if(b1.label == "rightwall" || b2.label == "rightwall"){
                this.wallHitScore();
                // handling collisions on the RIGHT side
                this.handleWallCollision(RIGHT, b1, b2);
            }

            // checking b1 and b2 labels to be "coin"
            if (b1.label == "coins" || b2.label == "coins") {
                this.coinCollectScore();
                // calling the method to move the coin elsewhere
                this.placeCoin();
            }
        }, this);

        scoreText = this.add.text(36, 16, 'SCORE: ' + score , { fontSize: '60px', fill: '#FFF' });

        //paser pause
        this.input.once('pointerup', function () {
            this.scene.pause();
            this.scene.launch('score');
        }, this);
    }

    // method to add a wall, given its number (0 = top) and it side
    addWall(wallNumber, side){

        // getting "wall" preloaded image
        var wallTexture = this.textures.get("wall");

        // determining wall height according to game height and the number of bars
        var wallHeight = game.config.height / gameOptions.bars;

        // determining wall x position
        var wallX = side * game.config.width + wallTexture.source[0].width / 2 - wallTexture.source[0].width * side;

        // determining wall y position
        var wallY = wallHeight * wallNumber + wallHeight / 2;

        // adding the wall
        var wall = this.matter.add.image(wallX, wallY, "wall");

        // the wall is static
        wall.setStatic(true);

        // giving the wall the proper label
        wall.body.label = (side == RIGHT) ? "rightwall" : "leftwall"

        // setting wall height
        wall.displayHeight = wallHeight;

        // returning the wall object
        return wall
    }

    // method to place the coin
    placeCoin(){
        this.coins.x = Phaser.Math.Between(game.config.width * 0.2, game.config.width * 0.8);
        this.coins.y = Phaser.Math.Between(game.config.height * 0.2, game.config.height * 0.8);
    }

    // method to handle ball Vs wall collision
    handleWallCollision(side, bodyA, bodyB){

        // if the ball and the wall have different colors...
        if(bodyA.color != bodyB.color){

            this.scene.pause();

            this.scene.start("GameOver");
        }

        // calling a method to paint the walls
        this.paintWalls((side == LEFT) ? this.rightWalls : this.leftWalls);

        // updating ball velocity
        this.ball.setVelocity(gameOptions.ballSpeed, this.ball.body.velocity.y);
    }

    // method to paint the walls, in the argument the array of walls
    paintWalls(walls){

        // looping through all walls
        walls.forEach(function(wall){

            // picking a random color
            var color = Phaser.Math.RND.pick(gameOptions.barColors);

            // tinting the wall
            wall.setTint(color);

            // also assigning the wall body a custom "color" property
            wall.body.color = color;
        });

        // picking a random wall
        var randomWall = Phaser.Math.RND.pick(walls);

        // painting the ball with the same color used by the random wall
        this.ball.setTint(randomWall.body.color);

        // also assigning the ball body a custom "color" property
        this.ball.body.color = randomWall.body.color;
    }

    // method to jump
    jump(){

        // setting new ball velocity
        this.ball.setVelocity((this.ball.body.velocity.x > 0) ? gameOptions.ballSpeed : -1, -12);
    }

    // method to be called at each frame
    update(){

        // updating ball velocity
        this.ball.setVelocity((this.ball.body.velocity.x > 0) ? gameOptions.ballSpeed : -gameOptions.ballSpeed, this.ball.body.velocity.y);

        // if the ball flies off the screen...
        if(this.ball.y < 0 || this.ball.y > game.config.height){

            this.scene.start("GameOver");
        }

        // go to next Level
        // if(score > 20 && !isLevelAchieved){
        //     isLevelAchieved = true;
        //     barCounts = 4;
        //     console.log('========= Updated New Bars : ' + barCounts);
        //
        //     this.scene.start("PlayGame4"); // Not implemented
        // }
    }

    coinCollectScore () {
        score += 10;
        scoreText.setText('SCORE: ' + score);
    }

    wallHitScore () {
        score += 5;
        scoreText.setText('SCORE: ' + score);
    }

    resetScore(){
        score = 0;
    }

    createBackground(){
        this.bg = this.add.graphics({x: 0, y: 0});
        this.bg.fillStyle('0x393B1C', 1);
        this.bg.fillRect(0, 0, game.config.width, game.config.height);
    }

};

// pure javascript to resize the canvas and scale the game
// function resize(){
//     var canvas = document.querySelector("canvas");
//     var windowWidth = window.innerWidth;
//     var windowHeight = window.innerHeight;
//     var windowRatio = windowWidth / windowHeight;
//     var gameRatio = game.config.width / game.config.height;
//     if(windowRatio < gameRatio){
//         canvas.style.width = windowWidth + "px";
//         canvas.style.height = (windowWidth / gameRatio) + "px";
//     }
//     else{
//         canvas.style.width = (windowHeight * gameRatio) + "px";
//         canvas.style.height = windowHeight + "px";
//     }
// }
