
const Scene = require('Scene');
const d = require('Diagnostics');
const MS = require('Materials');
const TS = require('Textures');
const Time = require('Time');
const TG = require('TouchGestures');
const FT = require('FaceTracking');
const Animation = require('Animation');
const FG = require('FaceGestures');
const Instruction = require('Instruction');
const CameraInfo = require('CameraInfo');
const Reactive = require('Reactive');
const NativeUI = require('NativeUI');
const fd = Scene.root.child('Device').child('Camera').child('Focal Distance');

const plane = Scene.root.find("plane0");
const face = FT.face(0);
ambientLight.intensity = 1;

// How to Write dynamically a Text in 
Scene.root.find("score").text = ("score"+ score).toString();

// How to put texture on Material
Materials.get('Material').diffuse = Textures.get("Textures");

// Tap function
TG.onTap().subscribe(function (gesture) {

});

//Plane Appear on touch
let i =1;
plane.hidden=i;
TG.onTap().subscribe(function (gesture) {
i--;
plane.hidden = i;
i=1;
});

//Change Things on Tap
var i = 1;
TG.onTap().subscribe(function (gesture) {
// TouchGestures.onTap().subscribe(function () {
    if (i > 2) {
        i = 1;
        Materials.get("Material").diffuse = Textures.get("Texture" + i);
        i++;
    }
});



// Face Tracking & Moving Object with Reference to Face
var face = FT.face(0);
var faceValue = face.cameraTransform.x.mul(1500);
Scene.root.find('receiver').transform.x = face.cameraTransform.x.mul(1500);

//Pan
TG.onPan().subscribe(function(gesture) {
    planeTracker.trackPoint(gesture.location, gesture.state);
});

//Pinch
TG.onPinch().subscribe(function(gesture) {
const planeTransform = plane.transform;
planeTracker.trackPoint(gesture.location, gesture.state);
const lastScaleX = planeTransform.scale.x.pinLastValue();
const lastScaleY = planeTransform.scale.y.pinLastValue();
planeTransform.scaleX = gesture.scale.mul(lastScaleX);
planeTransform.scaleY = gesture.scale.mul(lastScaleY);
});

//Face Track action on a plane
 TG.onTap().subscribe(function (gesture) {
    const face = FaceTracking.face(0);
    const planeTransform = plane.transform;
    const faceTransform = face.cameraTransform;
    planeTransform.rotationX = faceTransform.rotationX;
    planeTransform.rotationY = faceTransform.rotationY;
    planeTransform.rotationZ = faceTransform.rotationZ;
    const mouthOpenness = face.mouth.openness.mul(3).add(1);
    planeTransform.scaleX = mouthOpenness;
    planeTransform.scaleY = mouthOpenness;
    });

//Eye tracking Movement tracker
    var leftIris = Scene.root.find("left iris");
    var rightIris = Scene.root.find("right iris");
        
    var leftEyeballInfo = IrisTracking.leftEyeball(FaceTracking.face(0));
    var rightEyeballInfo = IrisTracking.rightEyeball(FaceTracking.face(0));
        
    leftIris.transform.position = leftEyeballInfo.iris;
    rightIris.transform.position = rightEyeballInfo.iris;
        
    leftIris.transform.rotation = leftEyeballInfo.rotation;
    rightIris.transform.rotation = rightEyeballInfo.rotation;

//Material Change Code
// Tap to change Material
const material = Materials.get('material1');
const material2 = Materials.get('material2');
const material3 = Materials.get('material3');

TG.onTap().subscribe(function (gesture) {
    if (plane.materialIdentifier === material1.identifier) {
        plane.material = material2;
    }
    else if (plane.materialIdentifier === material2.identifier) {
        plane.material = material3;
    }
    else {
        plane.material = material1;
    }
});


FaceGestures.onBlink(face).subscribe(function () {

    // Store the last known z-axis rotation value
    const lastRotationZ = plane.transform.rotationZ.pinLastValue();

    // Add 45 degrees (0.7853981634 radians = 45 degrees)
    const newRotationZ = Reactive.add(lastRotationZ, 0.7853981634);

    // Bind the new z-axis rotation signal to the plane's Z-axis rotation signal
    plane.transform.rotationZ = newRotationZ;

});


// mouth openess event once
// Tracking live Events 

const mouthOpenness = FT.face(0).mouth.openness;
let eyebrowraised= FG.hasEyebrowsRaised(face);
let mouthopen = FG.hasMouthOpen(face);
let i = eyebrowraised.or(mouthopen);

var mouthOpenedOnce = false;

i.monitor().subscribe(function (e) {
    if (!mouthOpenedOnce) {

    }
});

// Eye Bro Raised
FG.hasEyebrowsRaised(FT.face(0)).monitor().subscribe(function (e) {

});

FaceTracking.face(0).mouth.openness.monitor().subscribe(function(event) {
    if(event.newValue > 0.5) {
      plane.hidden = true;
    } else {
      plane.hidden = false;
    }
  });


// Mouth Open
const mouthOpenness = FT.face(0).mouth.openness;
var mouthOpenedOnce = false;
(FG.hasMouthOpen(FT.face(0))).monitor().subscribe(function (e) {
    if (!mouthOpenedOnce) {

    }
});

//Face turned left
FG.isTurnedLeft(FT.face(0)).monitor().subscribe(function (e) {

});

//Face turned Right
FG.isTurnedRight(FT.face(0)).monitor().subscribe(function (e) {

});
// Mouth Open
FG.hasMouthOpen(FT.face(0)).monitor().subscribe(function (e) {
    if (mouthON) {
        mouthON = false;

    }
});

//Hand Tracking
HandTracking.count.monitor().subscribe(function (e) {
    d.log(e.newValue);
    if (e.newValue) {
        // Hand Visible
        // Hand visible for the first time

        d.log("hand visible");
        if (!handON) {
            // Here if handOnce On then hand is remove then write script

        }
    } else {
        // Hand Disable
        // If hand is not shown for any time
        d.log("hand disable");
    }
})

// Blink function for Blink Command
function blink() {
    if (gameON) {
        Time.setTimeout(() => {
            Scene.root.find("blink").hidden = false;
        }, 500);
        Time.setTimeout(() => {
            Scene.root.find("blink").hidden = true;
        }, 1500);
    }
}


// Audio Module
//Adding Audio to Game
// Play Audio & in Interval
const Audio = require('Audio');
const AudioMusic = Audio.getPlaybackController('Music');

// simply add 
Audio.getPlaybackController("audio").reset();
Audio.getPlaybackController("audio").setPlaying(false);
Scene.root.find('speaker').volume = 0.2;

function Sound() {
    let playAudio = true;
    AudioMusic.setPlaying(playAudio);
    Time.setTimeout(() => { AudioMusic.reset(); }, 0);
}

function gameaudio() {
    let playgame = true;
    ballgame.setPlaying(playgame);
    Time.setTimeout(() => { ballgame.reset(); }, 0); //reset the Audio after zero seconds
    Time.setTimeout(() => {
            let playgame = true;
            ballgame.setPlaying(playgame);  // play again audio after 15 seconds
            Time.setTimeout(() => { ballgame.reset(); }, 0);
    },15000); // seconds Timeout
}

// flip camera
CameraInfo.captureDevicePosition.monitor().subscribe(function (e) {
    if (e.newValue == "BACK") {
        Instruction.bind(true, 'flip_camera');
    } else {
        Instruction.bind(false, 'flip_camera');
    }
})

// Native UI
// Picker will pick icon from  i

const NativeUI = require('NativeUI');
const picker = NativeUI.picker;
const index = 0;
const configuration = {
    selectedIndex: index,
    items: [{
            image_texture: TS.get('Insta-Icon_1')
        },
        {
            image_texture: TS.get('Insta-Icon_2')
        },
        {
            image_texture: TS.get('Insta-Icon_3')
        },
        {
            image_texture: TS.get('Insta-Icon_4')
        },
        {
            image_texture: TS.get('Insta-Icon_5')
        },
        {
            image_texture: TS.get('Insta-Icon_6')
        },
    ]
};

picker.configure(configuration);
picker.visible = true;
picker.selectedIndex.monitor().subscribe(function (index) {
    let i = index.newValue + 1;
    // Normal Code
    if (i == 1) {
    MS.get("material").diffuse =TS.get("texture"+i);
    }
    if (i == 2) {
        MS.get("material").diffuse =TS.get("texture"+i);
    }
});


// Reactive programming in spark ar for Instagram

Patches.setPulseValue("tap_on", Reactive.once());

const tap_to_play=Scene.root.find("playbtn");

Patches.setBooleanValue("playAnimation", true);

// custom instructions
let show = true;
Instruction.bind(show, 'tap_to_advance');

// blink instruction for instagram
function blink() {
    if (gameON) {
        Time.setTimeout(() => {
            Scene.root.find("blink").hidden = false;
        }, 500);
        Time.setTimeout(() => {
            Scene.root.find("blink").hidden = true;
        }, 1500);
    }
}

//instruction for instagram
function Ins(i) {
    if (gameON) {
        Time.setTimeout(() => {
            if (i == 1) { Instruction.bind(true, 'tap_to_advance') }; // tap tp play
            if (i == 2) { Instruction.bind(true, 'turn_head') };
            if (i == 3) { Instruction.bind(true, 'open_mouth') };
            if (i == 4) { Instruction.bind(true, 'tap_try_on') };

        }, 100);
        Time.setTimeout(() => {
            if (i == 1) { Instruction.bind(false, 'tap_to_advance') };
            if (i == 2) { Instruction.bind(false, 'turn_head') };
            if (i == 3) { Instruction.bind(false, 'open_mouth') };
            if (i == 4) { Instruction.bind(false, 'tap_try_on') };
        }, 1500);
    }
}