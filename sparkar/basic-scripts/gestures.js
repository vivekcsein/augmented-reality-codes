
const TG = require('TouchGestures');

// Tap function
TG.onTap().subscribe(function (gesture) {

});

//Pan
TG.onPan().subscribe(function (gesture) {
});


//use cases

TG.onTap().subscribe(function (gesture) {
    planeTracker.trackPoint(gesture.location, gesture.state);
});

FG.onBlink(face).subscribe(function () {


});

// Eye Bro Raised
FG.hasEyebrowsRaised(FT.face(0)).monitor().subscribe(function (e) {

});

FaceTracking.face(0).mouth.openness.monitor().subscribe(function (event) {
    if (event.newValue > 0.5) {
        plane.hidden = true;
    } else {
        plane.hidden = false;
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