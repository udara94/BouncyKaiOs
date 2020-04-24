class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: 'Preloader', active: false });
  }
  // init () {
  //   this.readyCount = 0;
  // }
  preload() {
    // // add logo image
    // this.image = this.add.image(game.config.width/2, game.config.height/3, 'logo');
    // // display progress bar
    // var progressBar = this.add.graphics();
    // var progressBox = this.add.graphics();
    // progressBox.fillStyle(0x222222, 0.8);
    // progressBox.fillRect(240, 270, 320, 50);
    // var width = this.cameras.main.width;
    // var height = this.cameras.main.height;
    // var loadingText = this.make.text({
    //   x: width / 2,
    //   y: height / 2 - 50,
    //   text: 'Loading...',
    //   style: {
    //     font: '40px monospace',
    //     fill: '#ffffff'
    //   }
    // });
    // loadingText.setOrigin(0.5, 0.5);
    // var percentText = this.make.text({
    //   x: width / 2,
    //   y: height / 2 - 5,
    //   text: '0%',
    //   style: {
    //     font: '50px monospace',
    //     fill: '#ffffff'
    //   }
    // });
    // percentText.setOrigin(0.5, 0.5);
    // var assetText = this.make.text({
    //   x: width / 2,
    //   y: height / 2 + 60,
    //   text: '',
    //   style: {
    //     font: '50px monospace',
    //     fill: '#ffffff'
    //   }
    // });
    // assetText.setOrigin(0.5, 0.5);
    // // update progress bar
    // this.load.on('progress', function (value) {
    //   percentText.setText(parseInt(value * 100) + '%');
    //   progressBar.clear();
    //   progressBar.fillStyle(0xffffff, 1);
    //   progressBar.fillRect(250, 280, 300 * value, 30);
    // });
    // // update file progress text
    // this.load.on('fileprogress', function (file) {
    //   assetText.setText('Loading asset: ' + file.key);
    // });
    // // remove progress bar when complete
    // this.load.on('complete', function () {
    //   progressBar.destroy();
    //   progressBox.destroy();
    //   loadingText.destroy();
    //   percentText.destroy();
    //   assetText.destroy();
    //   this.ready();
    // }.bind(this));
    // this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load assets needed in our game
    this.load.image('splash', 'assets/img/splash.png');
  }

  create() {
    this.image = this.add.image(game.config.width / 2, game.config.height / 2, 'splash');
    this.image.displayHeight = game.config.height;
    this.image.displayWidth = game.config.width;

    //this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.time.addEvent({
      delay: 2000,
      callback: () => {
        this.gotoNextScreen();
      },
      loop: true
    })
  }

  update() {

  }


  gotoNextScreen() {
    var isFirst = localStorage.getItem('isFirstTime')
    //console.log("is first"+ isFirst);
    if (isFirst == null) {
      this.scene.start('IntroductionScene');
    } else {
      this.scene.start('Menu');
    }
  }

};