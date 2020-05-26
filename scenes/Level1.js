// PlayGame scene
class Level1 extends Phaser.Scene {

    // constructor
    constructor() {
        super("Level1");
    }

    preload() {
        this.load.image("playBG", "assets/img/Bouncy-play-bg.png");
        this.load.image("score", "assets/img/Score.png")
        this.load.image("ground", "assets/img/ground.png");
        this.load.image("ball", "assets/img/ball.png");
        this.load.image("stars", "assets/img/stars.png");
        this.load.image("congrate", "assets/img/congratulation.png");
    }

    create() {
        //background
        this.hitCount = -1;
        this.nextPlatform = 1;
        this.arr = [];
        this.currentPlatform = 0;
        this.iscompleted = false;
        this.gotoNextLevel = false;
        this.isShowPass = true;
        this.isCorrectJump = false;
        this.tween = null;


        this.image = this.add.image(game.config.width / 2, game.config.height / 2, 'playBG');
        this.image.displayHeight = game.config.height;
        this.image.displayWidth = game.config.width;

        //score
        this.score_btn = this.add.image(game.config.width / 4, game.config.height / 15 + 5, 'score');
        this.score_btn.displayHeight = game.config.height / 10;
        this.score_btn.displayWidth = game.config.width / 2.4;

        this.score_btn = this.add.image(game.config.width / 1.3, game.config.height / 15 + 5, 'score');
        this.score_btn.displayHeight = game.config.height / 10;
        this.score_btn.displayWidth = game.config.width / 2.4;

        this.currentLevel = localStorage.getItem(gameOptions.currentLevel) == null ? 0 : localStorage.getItem(gameOptions.currentLevel);

        this.initLevel(this.currentLevel);
        this.arr = this.platformGroup.getChildren()
    }

    refresh(){
       // this.platformGroup.destroy();
        this.physics.world.collide.destroy();
        this.platformGroup.clear(true);
        //this.initLevel(1);
    }

    initLevel(level){
        console.log("=============level:"+ level);
        if(level == 0){
            this.score = this.gameLevels.arr[level].score;
        }else {
            this.score = score;
        }

        this.topScore = localStorage.getItem(gameOptions.localStorageName) == null ? 0 : localStorage.getItem(gameOptions.localStorageName);
        this.scoreText = this.add.text(game.config.width / 16, game.config.height / 25,"SCORE:"+ this.score, { fontSize: '70px', fill: '#FFF' });

        levelText = this.add.text(game.config.width / 1.6, game.config.height / 25, this.gameLevels.arr[level].levelNumber, { fontSize: '70px', fill: '#FFF' });

        this.platformGroup = this.physics.add.group();

        //ball
        this.ball = this.physics.add.sprite(game.config.width * gameOptions.ballPosition, game.config.height / 4 * 3 - gameOptions.bounceHeight, "ball");
        this.ball.displayHeight = game.config.height / 10;
        this.ball.displayWidth = game.config.width / 10;

        this.ball.body.gravity.y = this.gameLevels.arr[level].gravity;
        this.ball.setBounce(1);
        this.ball.body.checkCollision.down = true;
        this.ball.body.checkCollision.up = false;
        this.ball.body.checkCollision.left = true;
        this.ball.body.checkCollision.right = true;
        this.ball.setSize(game.config.height / 20, game.config.width / 4, false)
        let platformX = this.ball.x;
        for (let i = 0; i < 10; i++) {
            let platform = this.platformGroup.create(platformX, game.config.height / 4 * 3 + Phaser.Math.Between(this.gameLevels.arr[level].platformHeightRange[0],this.gameLevels.arr[level].platformHeightRange[1]), "ground");
            platform.setOrigin(0.5, 1);
            platform.setImmovable(true);
            platform.displayWidth = Phaser.Math.Between(this.gameLevels.arr[level].platformLengthRange[0],this.gameLevels.arr[level].platformLengthRange[1]);
            platform.displayHeight = game.config.height / 15;
            platformX += Phaser.Math.Between(this.gameLevels.arr[level].platformDistanceRange[0], this.gameLevels.arr[level].platformDistanceRange[1]);
        }

        this.input.keyboard.on('keydown', function (e) {
            //console.log(e)
            if (e.key == "Enter") {
                // if(this.iscompletde == true){
                //     if(this.gotoNextLevel == true){
                //         //this.scene.start("Level2")
                //         this.initLevel(2)
                //     }
                //     // else {
                //     //     this.gotoNextLevel = true;
                //     //
                //     //     this.nextLevel = this.add.image(game.config.width / 2, game.config.height / 4 * 3, 'score');
                //     //     this.nextLevel.displayHeight =  game.config.height / 10;
                //     //     this.nextLevel.displayWidth = game.config.width / 2.4;
                //     //     this.nextLevelText = this.add.text(game.config.width / 2, game.config.height / 4 * 3, 'Next Level', { fontSize: '50px', fill: '#FFF' }).setOrigin(0.5);
                //     // }
                // }

                this.movePlatforms();

                //console.log("soft right key");

            }
        }, this);

        this.input.keyboard.on('keyup', function (e) {
            // console.log(e)
            if (e.key == "Enter") {
                //console.log("soft right key");
                this.stopPlatforms()
                this.hitCount = 0;
            }
        }, this);

    }

    updateScore(inc) {
        this.score += inc;
        this.scoreText.text = "Score: " + this.score + "\nBest: " + this.topScore;
        this.scoreText.setText('SCORE:' + this.score);
    }
    movePlatforms() {
        this.platformGroup.setVelocityX(-gameOptions.platformSpeed);
    }
    stopPlatforms() {
        this.platformGroup.setVelocityX(0);
    }
    getRightmostPlatform() {
        let rightmostPlatform = 0;
        this.platformGroup.getChildren().forEach(function (platform) {
            rightmostPlatform = Math.max(rightmostPlatform, platform.x);
        });
        return rightmostPlatform;
    }
    update() {

        this.physics.world.collide(this.platformGroup, this.ball, null, function () {
            if(this.hitCount == 0){

                this.platformGroup.getChildren().forEach(function (platform) {
                    if (platform.getBounds().right < 0) {
                        this.isCorrectJump = true;
                        platform.x = this.getRightmostPlatform() + Phaser.Math.Between(gameOptions.platformDistanceRange[0], gameOptions.platformDistanceRange[1]);
                        platform.displayWidth = Phaser.Math.Between(gameOptions.platformLengthRange[0], gameOptions.platformLengthRange[1]);
                        this.arr.push(platform);
                        console.log(this.arr[1])

                    }
                }, this);
                if(this.isCorrectJump == true){
                    this.isBallHitPlatform();
                }
                this.checkGameWin();
            }
        },this);

        this.checkGameOver();

    }

    checkGameOver(){
        if (this.ball.y > game.config.height) {
            this.performGameOver()
        }
    }

    checkGameWin(){
        if(this.score >= this.gameLevels.arr[this.currentLevel].winingScore){
                // this.congrate = this.add.image(game.config.width / 2, game.config.height / 4, 'congrate');
                // this.congrate.displayHeight = game.config.height/4;
                // this.congrate.displayWidth = game.config.width/2;
                //
                // this.stars = this.add.image(game.config.width / 2, game.config.height / 2, 'stars');
                // this.stars.displayHeight = game.config.height/4;
                // this.stars.displayWidth = game.config.width/2;

                score = this.score;

                //this.refresh()
                //this.platformGroup.destroy();
            this.currentLevel++;
            localStorage.setItem(gameOptions.currentLevel, this.currentLevel);
            this.scene.restart("Level1");
                // this.iscompleted = true;
                // this.isShowPass = false;
                //this.scene.start("Level2")
        }
    }

    isBallHitPlatform() {
        if(this.hitCount == 0){
            if(this.iscompleted == false){
                this.updateScore(1);
            }
            this.arr = this.platformGroup.getChildren()
            this.isCorrectJump = false;
            this.nextPlatform ++;
            this.hitCount ++;
        }
    }

    performGameOver(){
        score = this.score;
        localStorage.setItem(gameOptions.localStorageName, Math.max(this.score, this.topScore));
        this.scene.start("GameOver");
    }

    gameLevels = {arr:[
            {
                score:0,
                levelNumber: 'LEVEL:1',
                gravity: 1200,
                speed:650,
                platformDistanceRange: [250, 450],
                platformHeightRange: [-50, 50],
                platformLengthRange: [120, 150],
                winingScore : 5
            },
            {
                score:0,
                levelNumber: 'LEVEL:2',
                gravity: 2400,
                speed:900,
                platformDistanceRange: [250, 450],
                platformHeightRange: [-50, 50],
                platformLengthRange: [120, 150],
                winingScore : 10
            },
            {
                score:0,
                levelNumber: 'LEVEL:3',
                gravity: 1200,
                speed:650,
                platformDistanceRange: [450, 600],
                platformHeightRange: [-50, 50],
                platformLengthRange: [120, 150],
                winingScore : 15
            },
            {
                score:0,
                levelNumber: 'LEVEL:4',
                gravity: 1200,
                speed:650,
                platformDistanceRange: [250, 450],
                platformHeightRange: [-50, 50],
                platformLengthRange: [120, 150],
                winingScore : 20
            }
            ],

    };

}


// pure javascript to scale the game
function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    } else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}
