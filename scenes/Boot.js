class Boot extends Phaser.Scene {
    constructor() {
        super({ key: 'Boot', active: true });
    }

    init() {
        this.URL = this.sys.game.URL;
        this.CONFIG = this.sys.game.CONFIG;
    }

    preload() {
        // Bitmap font for preload scene
        // .... path
        this.load.setPath(this.URL + 'assets/fonts');
        // // .... files
        this.load.bitmapFont('click', 'click.png', 'click.xml');
    }

    create() {
        this.scene.start('Preloader');
    }
}