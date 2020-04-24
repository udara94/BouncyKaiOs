class OptionScene extends Phaser.Scene {

    constructor() {
        super({key: "OptionScene", active: false});
    }

    preload(){
        this.load.image("bgOption", "assets/img/Options.png");
    }

    create(){

        this.input.keyboard.on('keyup', function (e) {
            if (e.key == "SoftRight") {
                //console.log("soft right key");
                this.goBackScene()
            }
        }, this);

        this.input.keyboard.on('keyup', function (e) {
            if (e.key == "Enter") {
                //console.log("enter key");
                this.changeSounds();
            }
        }, this);

        this.model = this.game.globals.model;

        this.image = this.add.image(game.config.width/2, game.config.height/2, 'bgOption');
        this.image.displayHeight = game.config.height;
        this.image.displayWidth = game.config.width;

        this.text = this.add.text(game.config.width/2, game.config.height/10, 'Options', { fontSize: 80 });
        this.text.setOrigin(0.5);

        this.musicButton = this.add.image(game.config.width/3.8, game.config.height/2, 'checkedBox');
        this.musicText = this.add.text(game.config.width/2, game.config.height/2, 'Music Enabled', { fontSize: 40 });
        this.musicText.setOrigin(0.5);

        this.soundButton = this.add.image(game.config.width/3.8, game.config.height/1.4, 'checkedBox');
        this.soundText = this.add.text(game.config.width/2, game.config.height/1.4, 'Sound Enabled', { fontSize: 40 });
        this.soundText.setOrigin(0.5);


        this.currentFocus = "Music";


        this.graphics = this.add.graphics({ fillStyle: { color: 0x0000ff } });
        this.graphics.fillRoundedRect(game.config.width/4.8, game.config.height/2.2,game.config.width/2,game.config.width/8,32);
        this.graphics.setAlpha(0.3);

        this.musicButton.setInteractive();
        this.soundButton.setInteractive();

        this.musicButton.on('pointerdown', function () {
            this.model.musicOn = !this.model.musicOn;
            this.updateAudio();
        }.bind(this));

        this.soundButton.on('pointerdown', function () {
            this.model.soundOn = !this.model.soundOn;
            this.updateAudio();
        }.bind(this));

        //this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'Menu');

        if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
            this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
            this.bgMusic.play();
            this.model.bgMusicPlaying = true;
            this.game.globals.bgMusic = this.bgMusic;
        }

        this.updateAudio();

        this.about = this.add.text(game.config.width - game.config.width * 15 / 100, game.config.height - game.config.height * 5 / 100, "Back").setFontSize(40).setFontFamily("Arial").setOrigin(0.5);

        this.upArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.downArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.key_enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.back_space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);
        //this.selected_button = 'Sounds';


        //
        //
        // this.btn_sounds = this.add.sprite(game.config.width / 2, (game.config.height / 7) * 2, 'btn_sounds_hover', 0).setInteractive();
        // this.btn_sounds.displayHeight = game.config.height / 12;
        // this.btn_sounds.displayWidth = game.config.width / 3;
        //
        // this.btn_difficuly_level = this.add.sprite(game.config.width / 2, game.config.height/2 , 'btn_difficuly_level', 0).setInteractive();
        // this.btn_difficuly_level.displayHeight = game.config.height / 12;
        // this.btn_difficuly_level.displayWidth = game.config.width / 3;
        //
        // this.about = this.add.text(game.config.width - game.config.width * 15 / 100, game.config.height - game.config.height * 5 / 100, "Back").setFontSize(30).setFontFamily("Arial").setOrigin(0.5);
        //
        //
        // this.upArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        // this.downArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        // this.key_enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        // this.back_space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);


    }

    updateAudio() {
        if (this.model.musicOn === false) {
            this.musicButton.setTexture('box');
            this.game.globals.bgMusic.stop();
            this.model.bgMusicPlaying = false;
        } else {
            this.musicButton.setTexture('checkedBox');
            if (this.model.bgMusicPlaying === false) {
                this.game.globals.bgMusic.play();
                this.model.bgMusicPlaying = true;
            }
        }

        if (this.model.soundOn === false) {
            this.soundButton.setTexture('box');
        } else {
            this.soundButton.setTexture('checkedBox');
        }
    }

    moveDown(){
        switch (this.currentFocus) {
            case "Music":
                this.graphics.destroy();
                this.graphics = this.add.graphics({ fillStyle: { color: 0x0000ff } });
                this.graphics.fillRoundedRect(game.config.width/4.8, game.config.height/1.5,game.config.width/2,game.config.width/8,32);
                this.graphics.setAlpha(0.3);

                this.currentFocus = "Sound";

                break;
            case "Sound":
                this.graphics.destroy();
                this.graphics = this.add.graphics({ fillStyle: { color: 0x0000ff } });
                this.graphics.fillRoundedRect(game.config.width/4.8, game.config.height/2.2,game.config.width/2,game.config.width/8,32);
                this.graphics.setAlpha(0.3);

                this.currentFocus = "Music";
                break;

        }
    }

    moveUp(){
        switch (this.currentFocus) {
            case "Music":
                this.graphics.destroy();
                this.graphics = this.add.graphics({ fillStyle: { color: 0x0000ff } });
                this.graphics.fillRoundedRect(game.config.width/4.8, game.config.height/1.5,game.config.width/2,game.config.width/8,32);
                this.graphics.setAlpha(0.3);

                this.currentFocus = "Sound";

                break;
            case "Sound":
                this.graphics.destroy();
                this.graphics = this.add.graphics({ fillStyle: { color: 0x0000ff } });
                this.graphics.fillRoundedRect(game.config.width/4.8, game.config.height/2.2,game.config.width/2,game.config.width/8,32);
                this.graphics.setAlpha(0.3);

                this.currentFocus = "Music";
                break;


        }
    }

    changeSounds(){
        switch (this.currentFocus) {
            case "Music":
                this.model.musicOn = !this.model.musicOn;
                this.updateAudio();
                break;
            case "Sound":
                this.model.soundOn = !this.model.soundOn;
                this.updateAudio();
                break;
        }
    }

    goBackScene(){
        //console.log("clicked")
        this.scene.start("Menu");
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.upArrow)) {
            //console.log("UP CLICK");
            this.moveUp();
        }
        if (Phaser.Input.Keyboard.JustDown(this.downArrow)) {
            //console.log("DOWN CLICK");
            this.moveDown();

        }

        // if (Phaser.Input.Keyboard.JustDown(this.key_enter)) {
        //     console.log("ENTER CLICK");
        //     this.changeSounds();
        //
        // }
        if (Phaser.Input.Keyboard.JustDown(this.back_space)) {
            //console.log("back CLICK");
            this.goBackScene();
        }

    }
}