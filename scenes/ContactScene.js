class ContactScene extends Phaser.Scene {

    constructor() {
        super({key: "ContactScene", active: false});
    }

    preload(){
        this.load.image("bgcontact", "assets/img/Contact.png");
    }

    create(){
        this.image = this.add.image(game.config.width/2, game.config.height/2, 'bgcontact');
        this.image.displayHeight = game.config.height;
        this.image.displayWidth = game.config.width;

        //this.contact = this.add.text(game.config.width/2, game.config.height/4, "Contact").setFontSize(80).setFontFamily("Arial").setOrigin(0.5);
        //this.contact.setOrigin(0.5);

        //this.description1 = this.add.text(game.config.width/2, game.config.height/2, "Game Produced by").setFontSize(45).setFontFamily("Arial").setOrigin(0.5);
        //this.description1.setOrigin(0.5);

        //this.description2 = this.add.text(game.config.width/2, game.config.height/1.5, "Team Apptology in 2020 ").setFontSize(45).setFontFamily("Arial").setOrigin(0.5);
        //this.description2.setOrigin(0.5);

        //let text = this.add.text(150, 100, 'Phaser 3').setFontSize(30).setFontFamily("Arial").setOrigin(0.5);

        //this.kaios = this.add.text(game.config.width/2, game.config.height/1.2, "KaiOS ", {font: "80px Impact", color: "#ffffff"});
        //this.kaios.setOrigin(0.5);

        this.goBack = this.add.text(game.config.width - game.config.width*8/100, game.config.height - game.config.height*5/100, "Back").setFontSize(60).setFontFamily("Arial").setOrigin(0.5);

        this.input.keyboard.on('keyup', function (e) {
            if (e.key == "SoftRight") {
                //console.log("soft right key");
                this.goBackScene();
            }
        }, this);


        this.back_space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);
       // this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.back_space)) {
            //console.log("back CLICK");
            this.goBackScene();
        }

        // if (Phaser.Input.Keyboard.JustDown(this.enter)) {
        //     console.log("ENTER CLICK");
        // }
    }


    goBackScene(){
        //console.log("clicked")
        this.scene.start("Menu");
    }
}