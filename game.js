// the game itself
var game;



// global game options
var gameOptions = {

    bounceHeight: 300,
    ballGravity: 1200,
    gravityLevel2:2400,
    ballPosition: 0.2,
    platformSpeed: 650,
    platformSpeedLevel2: 900,
    platformDistanceRange: [250, 450],
    platformDistanceRangeLevel3: [450, 600],
    platformHeightRange: [-50, 50],
    platformLengthRange: [120, 150],
    localStorageName: "bestballscore3",

    // target rotation speed, in degrees per frame
    rotationSpeed: 3,

    // knife throwing duration, in milliseconds
    throwSpeed: 150,

    // minimum angle between two knives
    minAngle: 15,

    // max rotation speed variation, in degrees per frame
    rotationVariation: 2,

    // interval before next rotation speed variation, in milliseconds
    changeTime: 2000,

    // maximum rotation speed, in degrees per frame
    maxRotationSpeed: 6,

    ///////////////////////////////////////////////////////
    // world gravity
    gravity: 4,

    // ball horizontal speed
    ballSpeed: 4,

    // jump force
    jumpForce: 25,

    // amount of bars each wall is divided in
    bars: 2,

    // array with the colors to pick from
    barColors: [0x1abc9c, 0x2980b9, 0x9b59b6, 0xf1c40f, 0xc0392b, 0xecf0f1]
}

// constants used to pass "LEFT" and "RIGHT" as arguments rather than "0" and "1"
const LEFT = 0;
const RIGHT = 1;
var score = 0;
var scoreText;
var isLevelAchieved = false;
var levelText;
var level = 1;

// function to be executed when the windows has loaded
window.onload = function () {

    // object containing configuration options
    var gameConfig = {

        // render type: let the game decide if CANVAS of WEBGL
        type: Phaser.AUTO,

        // width of the game, in pixels
        width: 960,

        // height of the game, in pixels
        height: 1280,

        // background color (black)
        backgroundColor: 0x000000,
        
        // physics settings
        physics: {
            default: 'arcade',
            arcade: {
                debug: true,
                gravity: {
                    y: 0 //the game gravity
                }
            }
        },
        url: '',
        pixelArt: true,

        scene: [Boot,
            ScoreScene,
            Preloader,
            Options,
            Level1,
            Menu,
            GameOver,
            HelpScene,
            ContactScene,
            CountDown,
            Level2,
            Level3,
            Level4,
            Level5,
            Level6,
            IntroductionScene]
    }

    // game creation
    game = new Phaser.Game(gameConfig);

    game.URL = '';

    game.CONFIG = {
        width: gameConfig.width,
        height: gameConfig.height,
        centerX: Math.round(0.5 * gameConfig.width),
        centerY: Math.round(0.5 * gameConfig.height)
    };


    game.globals = {
        model: new Model(),
        bgMusic: null,
        score: null,
        gameDiffculty: null,
        level: 1,
        ballXposition: game.config.width / 4,
        ballYposition: game.config.height / 2
    }

    // giving focus to the frame (if any) where the game is running in
    window.focus();

    // pure javascript to scale the canvas
    resize();
    window.addEventListener("resize", resize, false);
}

