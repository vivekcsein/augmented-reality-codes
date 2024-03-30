//import required
const Animation = require('Animation');

const pi = Math.PI;
const pie = 3.141592653589793;
const π = Math.PI;

//driver
const driver = Animation.timeDriver({ durationMilliseconds: 1000, loopCount: 1, mirror: false });

//Different types of Sampler in Animation
const samplerLinear = Animation.samplers.linear(0, 2);
const samplerRotate = Animation.samplers.linear(0, 2 * pi);
const samplerBezier = Animation.samplers.bezier(0, 100, -100, 0);
const samplerPolyBezier = Animation.samplers.polybezier({ keyframes: [100, 0, -100] });

// animate
// basic asynchronus function
(async function () {
    const item = await Scene.root.findFirst('item');
    const ItemMat = await MS.findFirst("ItemMaterial");
    const ItemTexture = await TS.findFirst("ItemTexture");
    const ItemTextureSeq = await TS.findFirst("ItemTextureSeq");

    // animate position in x direction
    item.transform.x = Animation.animate(driver, samplerBezier);

    // animate rotation in x direction
    item.transform.rotationX = Animation.animate(driver, samplerRotate);

    // zoom scale in x direction
    item.transform.scaleX = Animation.animate(driver, samplerRotate);

})();

// Animation Sequence
// Single Animation of Textures in One Group

const singleAnimation = () => {
    ItemMat.diffuse = ItemTextureSeq; // applying base material or texture
    let frame = 1;        // define first sequence
    let timer = Time.setInterval(() => {
        ItemTextureSeq.currentFrame = frame;
        frame++;
        if (frame === 0)  // Number of animation in sequence is 10
        {
            ItemTextureSeq.currentFrame = 0; // GET BACK TO ORIGINAL
            ItemMat.diffuse = ItemTexture;
            Time.clearInterval(timer)
        }
    }, 200)  // Every Sequence will Run only 50 seconds 
}