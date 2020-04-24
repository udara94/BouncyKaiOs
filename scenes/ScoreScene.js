// playGame scene
class ScoreScene extends Phaser.Scene {
    constructor() {
        super({ key: "ScoreScene", active: false });
    }

    // preloading assets
    preload() {
        this.load.image("background", "assets/img/BestScore.png");
    }

    // method to be executed once, when the scene has been created
    create() {

        this.input.keyboard.on('keyup', function (e) {
            if (e.key == "SoftRight") {
                //console.log("soft right key");
                this.goBackScene()

            }
        }, this);

        var HighScore = localStorage.getItem('Best Score') || 0;
        var ScondHighScore = localStorage.getItem('Second Best Score') || 0;
        var ThirdHighScore = localStorage.getItem('Third Best Score') || 0;

        //console.log(HighScore +"  "+ScondHighScore+"  "+ThirdHighScore);

        //background
        this.image = this.add.image(game.config.width / 2, game.config.height / 2, 'background');
        this.image.displayHeight = game.config.height;
        this.image.displayWidth = game.config.width;
        //this.gameOver = this.add.text(game.config.width / 5, 50, 'BEST SCORE', { fontSize: '80px', fill: '#FFF' });

        if (HighScore === "null") {
            this.BEST = this.add.text(game.config.width / 2.1, game.config.height / 4 * 1.77, '0', { fontSize: '80px', fill: '#FFF' });
            //console.log(HighScore);
        } else {
            this.BEST = this.add.text(game.config.width / 2.1, game.config.height / 4 * 1.77, HighScore, { fontSize: '80px', fill: '#FFF' });
        }

        if (ScondHighScore === "null") {
            this.SECOND = this.add.text(game.config.width / 2.1, game.config.height / 4 * 2.35, '0', { fontSize: '80px', fill: '#FFF' });
            //console.log(ScondHighScore);
        } else {
            this.SECOND = this.add.text(game.config.width / 2.1, game.config.height / 4 * 2.35, ScondHighScore, { fontSize: '80px', fill: '#FFF' });
        }

        if (ThirdHighScore === "null") {
            this.THIRD = this.add.text(game.config.width / 2.1, game.config.height / 4 * 2.9, '0', { fontSize: '80px', fill: '#FFF' });
        } else {
            this.THIRD = this.add.text(game.config.width / 2.1, game.config.height / 4 * 2.9, ThirdHighScore, { fontSize: '80px', fill: '#FFF' });
        }
        this.about = this.add.text(game.config.width - game.config.width * 10 / 100, game.config.height - game.config.height * 5 / 100, "Back").setFontSize(60).setFontFamily("Arial").setOrigin(0.5);
        this.back_space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);
    }

    // method to be called at each frame
    update() {
        if (Phaser.Input.Keyboard.JustDown(this.back_space)) {
            //console.log("back CLICK");
            this.goBackScene();
        }
    }

    goBackScene() {
        //console.log("clicked")
        this.scene.start("Menu");
    }
};
