// PlayGame scene
class Level3 extends Phaser.Scene {

    // constructor
    constructor() {
        super("Level3");
    }

    // method to be executed when the scene preloads
    preload() {

        this.load.image("playBG", "assets/img/Bouncy-play-bg.png");
        this.load.image("score", "assets/img/Score.png")
        this.load.image("ground", "assets/img/ground.png");
        this.load.image("ball", "assets/img/ball.png");
        this.load.image("stars", "assets/img/stars.png");
        this.load.image("congrate", "assets/img/congratulation.png");
    }

    // method to be executed once the scene has been created
    create() {

        this.hitCount = -1;
        this.nextPlatform = 1;
        this.arr = [];
        this.iscompleted = false;
        this.gotoNextLevel = false;
        this.isShowPass = true;
        this.isCorrectJump = false;
        this.count = 0;

        this.tween = null;
        //background
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

        levelText = this.add.text(game.config.width / 1.6, game.config.height / 25, 'LEVEL:3', {
            fontSize: '70px',
            fill: '#FFF'
        });

        this.platformGroup = this.physics.add.group();

        //ball
        this.ball = this.physics.add.sprite(game.config.width * gameOptions.ballPosition, game.config.height / 4 * 3 - gameOptions.bounceHeight, "ball");
        this.ball.displayHeight = game.config.height / 10;
        this.ball.displayWidth = game.config.width / 10;

        this.ball.body.gravity.y = gameOptions.ballGravity;
        this.ball.setBounce(1);
        this.ball.body.checkCollision.down = true;
        this.ball.body.checkCollision.up = false;
        this.ball.body.checkCollision.left = false;
        this.ball.body.checkCollision.right = false;
        this.ball.setSize(game.config.height / 20, game.config.width / 4, false)
        let platformX = this.ball.x;
        for (let i = 0; i < 10; i++) {
            let platform = this.platformGroup.create(platformX, game.config.height / 4 * 3 + Phaser.Math.Between(gameOptions.platformHeightRange[0], gameOptions.platformHeightRange[1]), "ground");
            platform.setOrigin(0.5, 1);
            platform.setImmovable(true);
            platform.displayWidth = Phaser.Math.Between(gameOptions.platformLengthRange[0], gameOptions.platformLengthRange[1]);
            platform.displayHeight = game.config.height / 15;
            platformX += Phaser.Math.Between(gameOptions.platformDistanceRangeLevel3[0], gameOptions.platformDistanceRangeLevel3[1]);
        }

        this.input.keyboard.on('keydown', function (e) {
            //console.log(e)
            if (e.key == "Enter") {
                //console.log("soft right key");
                if (this.iscompleted == true) {
                    if (this.gotoNextLevel == true) {
                        this.scene.start("Level4")
                    } else {
                        this.gotoNextLevel = true;

                        this.nextLevel = this.add.image(game.config.width / 2, game.config.height / 4 * 3, 'score');
                        this.nextLevel.displayHeight = game.config.height / 10;
                        this.nextLevel.displayWidth = game.config.width / 2.4;
                        this.nextLevelText = this.add.text(game.config.width / 2, game.config.height / 4 * 3, 'Next Level', {
                            fontSize: '50px',
                            fill: '#FFF'
                        }).setOrigin(0.5);
                    }
                } else {
                    this.tween.pause()
                    this.movePlatforms();
                }

                //this.hitCount = 0;

            }
        }, this);

        this.input.keyboard.on('keyup', function (e) {
            // console.log(e)
            if (e.key == "Enter") {
                //console.log("soft right key");
                this.stopPlatforms();
                this.hitCount = 0;

            }
        }, this);

        this.input.on("pointerdown", this.movePlatforms, this);
        this.input.on("pointerup", this.stopPlatforms, this);
        this.score = score;
        this.topScore = localStorage.getItem(gameOptions.localStorageName) == null ? 0 : localStorage.getItem(gameOptions.localStorageName);
        this.scoreText = this.add.text(game.config.width / 16, game.config.height / 25, this.score, {
            fontSize: '70px',
            fill: '#FFF'
        });
        this.scoreText.setText('SCORE:' + this.score);
        //this.updateScore(this.score);
        this.arr = this.platformGroup.getChildren()
        this.movePlatformHorizontaly(this.platformGroup.getChildren()[1])
    }

    // method to be executed at each frame. Please notice the arguments.
    update() {

        this.physics.world.collide(this.platformGroup, this.ball, null, function () {
            if(this.hitCount == 0){

                this.platformGroup.getChildren().forEach(function (platform) {
                    if (platform.getBounds().right < 0) {
                        this.isCorrectJump = true;
                        platform.x = this.getRightmostPlatform() + Phaser.Math.Between(gameOptions.platformDistanceRangeLevel3[0], gameOptions.platformDistanceRangeLevel3[1]);
                        platform.displayWidth = Phaser.Math.Between(gameOptions.platformLengthRange[0], gameOptions.platformLengthRange[1]);
                        this.arr.push(platform);
                    }
                }, this);
                if(this.isCorrectJump == true){
                    this.isBallHitPlatform();
                }
                else {
                    //console.log("================>>"+this.tween.isPlaying())
                    if(!this.tween.isPlaying()){
                        this.tween.resume()
                    }

                }
                this.checkGameWin();
            }
        },this);

        this.checkGameOver();
    }

    checkGameOver() {
        if (this.ball.y > game.config.height) {
            this.performGameOver()
        }
    }

    checkGameWin() {
        if (this.score >= 20 && this.isShowPass == true) {
            this.congrate = this.add.image(game.config.width / 2, game.config.height / 4, 'congrate');
            this.congrate.displayHeight = game.config.height / 4;
            this.congrate.displayWidth = game.config.width / 2;

            this.stars = this.add.image(game.config.width / 2, game.config.height / 2, 'stars');
            this.stars.displayHeight = game.config.height / 4;
            this.stars.displayWidth = game.config.width / 2;

            score = this.score;

            this.iscompleted = true;
            this.isShowPass = false;
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

    // update the score
    updateScore(inc) {
        this.score += inc;
        this.scoreText.text = "Score: " + this.score + "\nBest: " + this.topScore;
        this.scoreText.setText('SCORE:' + this.score);

        console.log("==============>>getLength :"+this.platformGroup.getLength())
        console.log(this.platformGroup.getChildren());
        this.platformGroup.remove(this.platformGroup.getChildren()[0])
        console.log("==============")
        console.log("==============>>getLength :"+this.platformGroup.getLength())
        console.log(this.platformGroup.getChildren());

        this.movePlatformHorizontaly(this.platformGroup.getChildren()[1])
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

    performGameOver() {
        score = this.score;
        localStorage.setItem(gameOptions.localStorageName, Math.max(this.score, this.topScore));
        this.scene.start("GameOver");
    }

    movePlatformHorizontaly(platform) {
        console.log("=============tween")
        this.tween = this.tweens.add({
            targets: platform,
            x: 600,
            ease: 'Linear',
            duration: 1000,
            yoyo: true,
            repeat: -1,
            onStart: function () {
               // console.log('onStart');
               // console.log(arguments);
            },
            // onComplete: function () { console.log('onComplete'); console.log(arguments); },
            // onYoyo: function () { console.log('onYoyo'); console.log(arguments); },
            // onRepeat: function () { console.log('onRepeat'); console.log(arguments); },
        });

    }

    moveForward(platform) {
        var originalX = platform.x
        while (true) {
            platform.setVelocityX(65);
            // console.log("originalX: "+originalX);
            // console.log("platform.x: "+platform.x);
            if (originalX > platform.x + 1000) {
                //  console.log("inside");
                platform.setVelocityX(0)

            }
            originalX++;
        }
        //platform.setVelocityX(0);
    }

    moveBackward(platform) {
        platform.setVelocityX(-65);
    }
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
