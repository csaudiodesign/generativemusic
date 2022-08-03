export function generateRandom(min, max) {

    // find diff
    let difference = max - min;

    // generate random number 
    let rand = Math.random();

    // multiply with difference 
    rand = Math.round(rand * difference * 100) / 100;

    // add with min value 
    rand = rand + min;

    return rand;
}

export function converto2Dto1D(array){
    let newArr = [];
    for(let i = 0; i < array.length; i++)
    {
        newArr = newArr.concat(array[i]);
    }
    return newArr;
}

/**
 * 
 * @param {144} input array => länge loop 
 * @returns ToneJS part lango
 */
export function translateBinarytoTone(array) {

    let current = 0;
    return array
        .map((e, i) => {
            if (i <= 15) {
                current = i;
                return [e, `0:${Math.floor(current/4)}:${i%4}`]
            } else if (i >= 16 && i < 32) {
                current = i - 16;
                return [e, `1:${Math.floor(current/4)}:${i%4}`]
            } else if (i >= 32 && i < 48) {
                current = i - 32;
                return [e, `2:${Math.floor(current/4)}:${i%4}`]
            } else if (i >= 48 && i < 64) {
                current = i - 48;
                return [e, `3:${Math.floor(current/4)}:${i%4}`]
            } else if (i >= 64 && i < 80) {
                current = i - 64;
                return [e, `4:${Math.floor(current/4)}:${i%4}`]
            } else if (i >= 80 && i < 96) {
                current = i - 80;
                return [e, `5:${Math.floor(current/4)}:${i%4}`]
            } else if (i >= 96 && i < 112) {
                current = i - 96;
                return [e, `6:${Math.floor(current/4)}:${i%4}`]
            } else if (i >= 112 && i < 128) {
                current = i - 112;
                return [e, `7:${Math.floor(current/4)}:${i%4}`]
            } else {
                current = i - 128;
                return [e, `8:${Math.floor(current/4)}:${i%4}`]
            }
        })
        .filter(e => e[0] === 1)
        .map((e, i) => [e[1], `C0`]);

        //1 8:1:3 tone Format
        //0 8:2:1 -->wird gelöscht mit filter
}


// ----------------

let alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
var fxhash = "oo" + Array(49).fill(0).map(_=>alphabet[(Math.random()*alphabet.length)|0]).join('')
let b58dec = str=>[...str].reduce((p,c)=>p*alphabet.length+alphabet.indexOf(c)|0, 0)
let fxhashTrunc = fxhash.slice(2)
let regex = new RegExp(".{" + ((fxhashTrunc.length/4)|0) + "}", 'g')
let hashes = fxhashTrunc.match(regex).map(h => b58dec(h))
let sfc32 = (a, b, c, d) => {
    return () => {
    a |= 0; b |= 0; c |= 0; d |= 0
    var t = (a + b | 0) + d | 0
    d = d + 1 | 0
    a = b ^ b >>> 9
    b = c + (c << 3) | 0
    c = c << 21 | c >>> 11
    c = c + t | 0
    return (t >>> 0) / 4294967296
    }
}
export var fxrand = sfc32(...hashes)
// true if preview mode active, false otherwise
// you can append preview=1 to the URL to simulate preview active
var isFxpreview = new URLSearchParams(window.location.search).get('preview') === "1"
// call this method to trigger the preview
function fxpreview() {
    console.log("fxhash: TRIGGER PREVIEW")
}