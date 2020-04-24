// playGame scene
class CountDown extends Phaser.Scene {
    constructor() {
        super({ key: "CountDown", active: false });
    }

    // preloading assets
    preload() {
        this.load.image("wall", "assets/img/wall.png");
        this.load.image("ball", "assets/img/ball.png");
        this.load.image("coin", "assets/img/coin.png");
        this.load.image("gamePlayBg", "assets/img/gamePlayBg.png");

        //coin
        this.load.spritesheet('coins', 'assets/spritesheet/coin.png', { frameWidth: 400, frameHeight: 400 });
    }

    formatTime(seconds) {
        // Minutes
        var minutes = Math.floor(seconds / 60);
        // Seconds
        var partInSeconds = seconds % 60;
        // Adds left zeros to seconds
        partInSeconds = partInSeconds.toString().padStart(2, '0');
        //console.log(seconds);
        // Returns formated time
        return `${minutes}:${partInSeconds}`;
    }


    onEvent() {
        this.initialTime -= 1; // One second
        this.text.setText(this.initialTime);

        this.keEnter = this.input.keyboard.on("keyup_ENTER", () => {
            this.scene.start(game.globals.gameDiffculty);
        }, this);

        if (this.initialTime == 0) {
            //console.log(game.globals.gameDiffculty);
            this.scene.start(game.globals.gameDiffculty);
        }
    }

    // method to be executed once, when the scene has been created
    create() {
        // 2:30 in seconds
        this.initialTime = 3;

        this.image = this.add.image(game.config.width / 2, game.config.height / 2, 'gamePlayBg');
        this.image.displayHeight = game.config.height;
        this.image.displayWidth = game.config.width;

        this.text = this.add.text(game.config.width / 2 - 50, game.config.height / 2, this.initialTime, { fontSize: '100px', fill: '#FFF' });
        this.levels = this.add.text(game.config.width / 4 + 70, game.config.height / 2 + 200, "Level : " + game.globals.level, { fontSize: '30px', fill: '#FFF' });

        // Each 1000 ms call onEvent
        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });

        // arrays where to store left and right walls
        this.leftWalls = [];
        this.rightWalls = [];

        // each wall is made by "gameOptions.bars" pieces, so we actually have "gameOptions.bars" walls each side
        for (var i = 0; i < gameOptions.bars; i++) {
            // adding left and right walls
            this.leftWalls[i] = this.addWall(i, LEFT);
            this.rightWalls[i] = this.addWall(i, RIGHT);
        }

        // adding the ball
        this.ball = this.matter.add.image(game.config.width / 4, game.config.height / 2, "ball");
        this.ball.displayWidth = 40;
        this.ball.displayHeight = 40;

        // setting ball body as circular
        this.ball.setCircle()

        this.ball.setStatic(true);

        this.coins = this.matter.add.sprite(160, 150, 'coins');
        this.coins2 = this.matter.add.sprite(200, 150, 'coins');


        //coinframe
        this.anims.create({
            key: 'coinRotate',
            repeat: -1,
            frameRate: 7,
            frames: this.anims.generateFrameNames('coins', { start: 1, end: 10 })
        });

        this.coins.play('coinRotate');
        this.coins.displayWidth = 70;
        this.coins.displayHeight = 70;
        this.coins.body.label = "coins";
        this.coins.setStatic(true);

        this.coins2.play('coinRotate');
        this.coins2.displayWidth = 70;
        this.coins2.displayHeight = 70;
        this.coins2.body.label = "coins2";
        this.coins2.setStatic(true);


        scoreText = this.add.text(36, 16, 'SCORE: 0', { fontSize: '35px', fill: '#FFF' });

    }

    // method to add a wall, given its number (0 = top) and it side
    addWall(wallNumber, side) {

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

    // method to be called at each frame
    update() {

    }

}

// pure javascript to resize the canvas and scale the game
// function resize() {
//     var canvas = document.querySelector("canvas");
//     console.log(canvas);
//     var windowWidth = window.innerWidth;
//     var windowHeight = window.innerHeight;
//     var windowRatio = windowWidth / windowHeight;
//     var gameRatio = game.config.width / game.config.height;
//     if (windowRatio < gameRatio) {
//         canvas.style.width = windowWidth + "px";
//         canvas.style.height = (windowWidth / gameRatio) + "px";
//     }
//     else {
//         canvas.style.width = (windowHeight * gameRatio) + "px";
//         canvas.style.height = windowHeight + "px";
//     }
// }
