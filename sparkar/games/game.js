

// first define variable outside in script
// variables
let gameInterval;
let gamescore = 0;
let gametime = 30;

(async function () {

    const gameScreens = await Promise.all([
        Scene.root.findFirst('gameUIScreen'),
        Scene.root.findFirst('gamePlayScreen'),
        Scene.root.findFirst('gameOverScreen'),

    ]);

    const gamePlayScreenUI = await Promise.all([
        Scene.root.findFirst('gameCounterText'),
        Scene.root.findFirst('gameScoreText'),
        Scene.root.findFirst('gameTimeText'),
        // ui screen backgrounds
        Scene.root.findFirst('gameScoreShow'),
        Scene.root.findFirst('gameTimerShow'),
        Scene.root.findFirst('gameCounterUI'),
    ]);
    const [gameCounterText, gameScoreText, gameTimeText, ...gameplayui] = gamePlayScreenUI;

    // reciever object
    let Robj = ["",
        {
            obj: receiver[0], xLeft: -0.05, xRight: 0.05, yTop: 0.025, yBottom: -0.15,
        },
    ];

    // items to be collect from receiver
    let Tobj = ["",
        {
            obj: item[1],
            child: itemChild[1],
            detectON: false,
            driver: Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1 }),
            xLeft: -0.03, xRight: 0.03, yTop: 0.025, yBottom: -0.05,
            rotationX: 0, rotationY: 0, rotationZ: 0
        },

    ];

    const gameScreenShow = (num) => {
        for (let x = 0; x < gameScreens.length; x++) {
            if (x == num) gameScreens[x].hidden = false;
            gameScreens[x].hidden = true;
        }
    }

    const gameReset = () => {
        gametime = 30;
        gamescore = 0;
        gameScoreText.text = gamescore.toString();
        gameTimeText.text = gametime.toString();
    }

    const gamePlay = () => {
        // game interval for timer running on 100 ms
        gameInterval = Time.setInterval(function (e) {

            if (e % 1000 == 0) {
                if (gametime == 0) {
                    if (gameON) {
                        Time.clearInterval(gameInterval);
                        gameOverScreen();
                    }
                } else {
                    gametime--;
                    if (gametime < 10) {
                        gameTimeText.text = ("0" + gametime.toString());
                    }
                    else {
                        gameTimeText.text = (gametime.toString());
                    }
                }
            }

            if (e % 200 == 100) {
                for (let x = 0; x < Tobj.length; x++) {
                    if (Tobj[x].detectON) {
                        globalCollisionDetectionFunction(x, 1);
                        // localCollisionDetectionFunction(x, 1);
                    }
                }
            };

        }, 100);

    }
    const gameUIScreen = () => {
        gameScreenShow(0);
    }

    const gamePlayScreen = () => {
        gameScreenShow(1);
    }
    const gameOverScreen = () => {
        gameScreenShow(2)
    }

    const gamePlayStart = () => {
        StartUION = false;
        gameON = true;
        INS.bind(false, 'tap_to_start');
        gamePlayScreen();
        gamePlay();
    }

    //counter function for couting 3,2,1 before start playing game
    // const gameCounterText = await Scene.root.findFirst('gameCounterText');
    const gameCounterScreen = () => {
        gameCounterText.hidden = false;
        gameCounterText.text = "3";
        Time.setTimeout(() => {
            gameCounterText.text = "2";
            Time.setTimeout(() => {
                gameCounterText.text = "1";
                Time.setTimeout(() => {
                    gameCounterText.text = "Let's go";
                    Time.setTimeout(() => {
                        gameCounterText.hidden = true;
                        gamePlayStart();
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    }

    const gameStart = () => {
        gameON = false;
        StartUION = true;
        tapON = true;
        gameReset();
        gameUIScreen();

        // comment one of the both 1 or 2
        //1
        // game play start after 4 seconds of UI or instructions
        const startTimeout = Time.setTimeout(() => {
            // gamePlayStart();
            gameCounterScreen();
        }, 4000);

        //either countdown start for game
        //2
        gameCounterScreen();
    }
    gameStart();

})();

// quadrant for throwing arrow 
function quadrant(bangle) {
    let value = ((bangle / pi) * 180);
    let throwobjx; let throwobjy; let angle; let quad;
    let arrobj = [];
    if (value >= 0 && value < 90) {
        angle = value; quad = 2;
        throwobjx = -dis * Math.sin(((angle / 180) * pi));
        throwobjy = dis * Math.cos(((angle / 180) * pi));
    }
    else if (value >= 90 && value < 180) {
        angle = (180 - value); quad = 3;
        throwobjx = -dis * Math.sin(((angle / 180) * pi));
        throwobjy = -dis * Math.cos(((angle / 180) * pi));
    }
    else if (value >= 180 && value < 270) {
        angle = (value - 180); quad = 4;
        throwobjx = dis * Math.sin(((angle / 180) * pi));
        throwobjy = -dis * Math.cos(((angle / 180) * pi));
    }
    else if (value >= 270 && value < 360) {
        angle = (360 - value); quad = 1;
        throwobjx = dis * Math.sin(((angle / 180) * pi));
        throwobjy = dis * Math.cos(((angle / 180) * pi));
    }
    else if (value >= -90 && value < 0) {
        angle = (-1 * value); quad = 1;
        throwobjx = dis * Math.sin(((angle / 180) * pi));
        throwobjy = dis * Math.cos(((angle / 180) * pi));
    }
    else if (value >= -180 && value < -90) {
        angle = (180 - (-1 * value)); quad = 4;
        throwobjx = dis * Math.sin(((angle / 180) * pi));
        throwobjy = -dis * Math.cos(((angle / 180) * pi));
    }
    else if (value >= -270 && value < -180) {
        angle = ((-1 * value) - 180); quad = 3;
        throwobjx = -dis * Math.sin(((angle / 180) * pi));
        throwobjy = -dis * Math.cos(((angle / 180) * pi));
    }
    else if (value >= -360 && value < -270) {
        angle = (360 - (-1 * value)); quad = 2;
        throwobjx = -dis * Math.sin(((angle / 180) * pi));
        throwobjy = dis * Math.cos(((angle / 180) * pi));
    }

    arrobj[0] = throwobjx; arrobj[1] = throwobjy; arrobj[2] = angle; arrobj[3] = quad;
    return arrobj;
}