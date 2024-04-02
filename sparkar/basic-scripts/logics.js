// basics functions & randoms logics for spakr ar by vivekcse

let charString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*="

const alphabetsCaps = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const alphabetsSmall = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// this will give number from range m to n; m will be start range & n is last range
let num = Math.floor(Math.random() * n + m);

//gives random from 0 to 360 like 10 20 60 for degree
const random360 = Math.floor(Math.random() * 37) * 10;

const random1to2 = ((Math.floor(Math.random() * 10) + 1) / 100) + 0.1;

//Selecting Random Array
function getRandomValue(array) {
    var randomElement = Math.floor(Math.random() * array.length - 1) + 1;
    return array[randomElement];
}

//factorial program
const factorial = function fac(n) { return n < 2 ? 1 : n * fac(n - 1) }
d.log(factorial(3))

// Reverse a String
let str = "123456789"
let reverseStr = str.split('').reverse().join('')
d.log(reverseStr);

// Method 2
let reversingStr = '';
for (let i = str.length - 1; i >= 0; i--) {
    reversingStr += str[i];
}
d.log(reversingStr);

// Get TrignoMetric value from degree
function getTan(degrees) {
    return Math.tan(degrees * Math.PI / 180);
}

function randomShuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function removeStrElement(str, index) {
    let str1 = str.slice(0, index);
    let str2 = str.slice(index + 1, str.length);
    return (str1.concat(str2));
}