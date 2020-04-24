class Menu extends Phaser.Scene {
    constructor() {

        super({ key: 'Menu', active: false });

    }

    init() {
        this.CONFIG = this.sys.game.CONFIG;

    }


    preload() {


        this.load.image("btn_play", "assets/img/btn_play_new.png");
        this.load.image("btn_score", "assets/img/btn_score_new.png");
        this.load.image("btn_help", "assets/img/btn_help_new.png");
        this.load.image("btn_exit", "assets/img/btn_exit_new.png");
        this.load.image("btn_score_hover", "assets/img/btn_score_hover_new.png");
        this.load.image("btn_help_hover", "assets/img/btn_help_hover_new.png");

        this.load.image("bgMenu", "assets/img/Bouncy-manu-bg.png");
        this.load.image("btn_play_hover", "assets/img/btn_play_hover_new.png");

        // this.load.audio('bgMusic', ['assets/Game_Menu.mp3']);
        //this.load.audio('bgMusic', ['assets/TownTheme.mp3']);

    }

    create() {

        this.image = this.add.image(game.config.width / 2, game.config.height / 2, 'bgMenu');
        this.image.displayHeight = game.config.height;
        this.image.displayWidth = game.config.width;

        // this.logo = this.add.image(game.config.width / 2, this.CONFIG.centerY / 2.5, 'logo');
        // this.logo.displayHeight = game.config.height / 4;
        // this.logo.displayWidth = game.config.width / 3;


        this.selected_button = 'Play';

        this.upArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.downArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.back_space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        this.key_home = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.HOME);


        this.input.keyboard.on('keyup', function (e) {
            if (e.key == "SoftRight") {
                //console.log("soft right key");
                this.goToContactScene();

            }
        }, this);

        this.input.keyboard.on('keyup', function (e) {
            if (e.key == "Enter") {
                //console.log("soft left key");
                this.callMenuButton();
            }
        }, this);

        // Game title

        //this.text_title = this.add.text(this.CONFIG.centerX / 3, this.CONFIG.centerY - 600, 'Color Jump');
        //this.text_title.setColor('#FFF');
        //this.text_title.setFontSize('80px');


        // Click to play text
        // this.text_click_to_play = this.add.text(this.CONFIG.centerX/4, this.CONFIG.centerY+80, 'Click to Play');
        // this.text_click_to_play.setColor('#FFF');
        // this.text_click_to_play.setFontSize('80px');

        // Button PLay
        this.btn_play = this.add.sprite(game.config.width / 2, (game.config.height / 6) * 2.8, 'btn_play_hover', 0).setInteractive();
        this.btn_play.displayHeight = game.config.height / 8.9;
        this.btn_play.displayWidth = game.config.width / 2.8;

        // Button Score
        this.btn_score = this.add.sprite(game.config.width / 2, (game.config.height / 6) * 3.7, 'btn_score', 0).setInteractive();
        this.btn_score.displayHeight = game.config.height / 8.9;
        this.btn_score.displayWidth = game.config.width / 2.8;


        //Button Help
        this.btn_help = this.add.sprite(game.config.width / 2, (game.config.height / 6) * 4.7, 'btn_help', 0).setInteractive();
        this.btn_help.displayHeight = game.config.height / 8.9;
        this.btn_help.displayWidth = game.config.width / 2.8;

        // Button exit
        // this.btn_exit = this.add.sprite(game.config.width / 2, (game.config.height / 6) * 5, 'btn_exit', 0).setInteractive();
        // this.btn_exit.displayHeight = game.config.height / 9;
        // this.btn_exit.displayWidth = game.config.width / 2;


        this.about = this.add.text(game.config.width - game.config.width * 10 / 100, game.config.height - game.config.height * 5 / 100, "About").setFontSize(60).setFontFamily("Arial").setOrigin(0.5);

        //this.option = this.add.text(game.config.width - game.config.width * 90 / 100, game.config.height - game.config.height * 5 / 100, "Option").setFontSize(50).setFontFamily("Arial").setOrigin(0.5);

        // create mouse input
        // this.createMouseInput();

        // create keyboard input
        // this.createKeyboardInput();

        // press the enter button on the keyboard then play the game
        // then we can move to the "menu scene" to the "play scene"

        // this.model = this.game.globals.model;
        // if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
        //     this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
        //     this.bgMusic.play();
        //     this.model.bgMusicPlaying = true;
        //     this.game.globals.bgMusic = this.bgMusic;
        // }

        // this.input.keyboard.on('keydown', function (event) {
        //     console.log(event.code);
        // });

    }



    update() {

        if (Phaser.Input.Keyboard.JustDown(this.upArrow)) {
            // console.log("UP CLICK");
            this.changeMenuButtonWithArrowUp();
        }

        if (Phaser.Input.Keyboard.JustDown(this.downArrow)) {
            // console.log("DOWN CLICK");
            this.changeMenuButtonWithArrowDown();
        }
        // if (Phaser.Input.Keyboard.JustDown(this.key_home)) {
        //     console.log("home CLICK");
        //      this.goToOptionScene();
        // }

    }

    goToContactScene() {
        this.scene.start('ContactScene');
    }


    goToOptionScene() {
        this.scene.start('OptionScene');
    }

    changeMenuButtonWithArrowDown() {

        switch (this.selected_button) {
            case "Play":
                this.btn_play.destroy();
                this.btn_play = this.add.sprite(game.config.width / 2, (game.config.height / 6) * 2.8, 'btn_play', 0).setInteractive();
                this.btn_play.displayHeight = game.config.height / 8.9;
                this.btn_play.displayWidth = game.config.width / 2.8;

                this.btn_score.destroy();
                this.btn_score = this.add.sprite(game.config.width / 2, (game.config.height / 6) * 3.7, 'btn_score_hover', 0).setInteractive();
                this.btn_score.displayHeight = game.config.height / 8.9;
                this.btn_score.displayWidth = game.config.width / 2.8;

                this.selected_button = "ScoreScene"
                break;
            case "ScoreScene":
                this.btn_score.destroy();
                this.btn_score = this.add.sprite(game.config.width / 2, (game.config.height / 6) * 3.7, 'btn_score', 0).setInteractive();
                this.btn_score.displayHeight = game.config.height / 8.9;
                this.btn_score.displayWidth = game.config.width / 2.8;

                this.btn_help.destroy();
                this.btn_help = this.add.sprite(game.config.width / 2, (game.config.height / 6) * 4.7, 'btn_help_hover', 0).setInteractive();
                this.btn_help.displayHeight = game.config.height / 8.9;
                this.btn_help.displayWidth = game.config.width / 2.8;

                this.selected_button = "Help"
                break;
            case "Help":
                this.btn_help.destroy();
                this.btn_help = this.add.sprite(game.config.width / 2, (game.config.height / 6) * 4.7, 'btn_help', 0).setInteractive();
                this.btn_help.displayHeight = game.config.height / 8.9;
                this.btn_help.displayWidth = game.config.width / 2.8;

                this.btn_play.destroy();
                this.btn_play = this.add.sprite(game.config.width / 2, (game.config.height / 6) * 2.7, 'btn_play_hover', 0).setInteractive();
                this.btn_play.displayHeight = game.config.height / 8.9;
                this.btn_play.displayWidth = game.config.width / 2.8;
                // this.btn_exit.destroy();
                // this.btn_exit = this.add.sprite(game.config.width / 2, (game.config.height / 6) * 5, 'btn_exit_hover', 0).setInteractive();
                // this.btn_exit.displayHeight = game.config.height / 9;
                // this.btn_exit.displayWidth = game.config.width / 2;

                this.selected_button = "Play"
                break;
            // case "Exit":
            //
            //     this.btn_exit.destroy();
            //     this.btn_exit = this.add.sprite(game.config.width / 2, (game.config.height / 6) * 5, 'btn_exit', 0).setInteractive();
            //     this.btn_exit.displayHeight = game.config.height / 9;
            //     this.btn_exit.displayWidth = game.config.width / 2;
            //
            //     this.btn_play.destroy();
            //     this.btn_play = this.add.sprite(game.config.width / 2, (game.config.height / 6) * 2.5, 'btn_play_hover', 0).setInteractive();
            //     this.btn_play.displayHeight = game.config.height / 9;
            //     this.btn_play.displayWidth = game.config.width / 2;
            //
            //     this.selected_button = "Play"
            //     break;
            // default:

        }
    }


    changeMenuButtonWithArrowUp() {

        switch (this.selected_button) {
            case "Play":
                this.btn_play.destroy();
                this.btn_play = this.add.sprite(game.config.width / 2, (game.config.height / 6) * 2.8, 'btn_play', 0).setInteractive();
                this.btn_play.displayHeight = game.config.height / 8.9;
                this.btn_play.displayWidth = game.config.width / 2.8;

                // this.btn_exit.destroy();
                // this.btn_exit = this.add.sprite(game.config.width / 2, (game.config.height / 6) * 5, 'btn_exit_hover', 0).setInteractive();
                // this.btn_exit.displayHeight = game.config.height / 9;
                // this.btn_exit.displayWidth = game.config.width / 2;
                this.btn_help.destroy();
                this.btn_help = this.add.sprite(game.config.width / 2, (game.config.height / 6) * 4.7, 'btn_help_hover', 0).setInteractive();
                this.btn_help.displayHeight = game.config.height / 8.9;
                this.btn_help.displayWidth = game.config.width / 2.8;

                this.selected_button = "Help"
                break;
            case "ScoreScene":
                this.btn_score.destroy();
                this.btn_score = this.add.sprite(game.config.width / 2, (game.config.height / 6) * 3.7, 'btn_score', 0).setInteractive();
                this.btn_score.displayHeight = game.config.height / 8.9;
                this.btn_score.displayWidth = game.config.width / 2.8;

                this.btn_play.destroy();
                this.btn_play = this.add.sprite(game.config.width / 2, (game.config.height / 6) * 2.8, 'btn_play_hover', 0).setInteractive();
                this.btn_play.displayHeight = game.config.height / 8.9;
                this.btn_play.displayWidth = game.config.width / 2.8;

                this.selected_button = "Play"
                break;
            case "Help":
                this.btn_help.destroy();
                this.btn_help = this.add.sprite(game.config.width / 2, (game.config.height / 6) * 4.7, 'btn_help', 0).setInteractive();
                this.btn_help.displayHeight = game.config.height / 8.9;
                this.btn_help.displayWidth = game.config.width / 2.8;

                this.btn_score.destroy();
                this.btn_score = this.add.sprite(game.config.width / 2, (game.config.height / 6) * 3.7, 'btn_score_hover', 0).setInteractive();
                this.btn_score.displayHeight = game.config.height / 8.9;
                this.btn_score.displayWidth = game.config.width / 2.8;

                this.selected_button = "ScoreScene"
                break;
            // case "Exit":
            //     this.btn_exit.destroy();
            //     this.btn_exit = this.add.sprite(game.config.width / 2, (game.config.height / 6) * 5, 'btn_exit', 0).setInteractive();
            //     this.btn_exit.displayHeight = game.config.height / 9;
            //     this.btn_exit.displayWidth = game.config.width / 2;
            //
            //     this.btn_help.destroy();
            //     this.btn_help = this.add.sprite(game.config.width / 2, (game.config.height / 6) * 4.2, 'btn_help_hover', 0).setInteractive();
            //     this.btn_help.displayHeight = game.config.height / 9;
            //     this.btn_help.displayWidth = game.config.width / 2;
            //     this.selected_button = "Help"
            //     break;
            // default:

        }
    }

    callMenuButton() {
        switch (this.selected_button) {
            case "Play":
                //console.log("Play SELECT");
                this.scene.start("Level1")
                break;
            case "ScoreScene":
                //console.log("ScoreScene SELECT");
                this.scene.start("ScoreScene")
                break;
            case "Help":
                //console.log("Option SELECT");
                this.scene.start("HelpScene")
                break;
            // case "Exit":
            //     //console.log("Exit SELECT");
            //     //this.scene.stop();
            //     this.game.destroy();
            //     break;
            // default:

        }
    }
}
