import { Volume, EQ3, Players, Part } from "tone";
import { converto2Dto1D, translateBinarytoTone } from './lib';

function generateRandom(min, max) {

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

function checklastTrigger(array) {
    if (array[14] === 1) return 1;
    else return 0;
}

function triggerABS(array) {
    const arrayABS = [];
    var x = 0;
    var z = 0;
    var y = new Boolean(false);
    var a = new Boolean(false);

    for (var i = 0; i < 16; i++) {
        if (i === 15) {
            z++;
            arrayABS[x] = z;
        } else if (array[i] === 0) {
            if (y === true) {
                a = true;
                z++;
            }
        } else if (array[i] === 1) {
            y = true;
            if (i > 0 && a === true) {
                z++;
                arrayABS[x] = z;
                x++;
                z = 0;
            }
        }
    }
    return (arrayABS);

}

function shuffle(array) {
    const r = (from = 0, to = 1) => from + Math.random() * (to - from);
    let m = array.length,
        t,
        i;
    while (m) {
        i = Math.floor(r() * m--);
        t = array[m]; // temporary storage
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

/*
1. Rule: every trigger lands on even index incl. 0:             [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0]
2. Rule: every trigger has min 4 tringgers distance:            [1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0]
3. Rule: expertion: last trigger can have 2 trigger dicance:    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0]
4. Rule: if there is a trigger on the 2nd last trigger of the bar before, the trigger cant land on the 2nd trigger becuase of 2. Rule: Bar1: [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], Bar2: [0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0]*/
function kickRhythm(array, flag) {
    //count how much triggers are in array
    let count = 0;
    array.forEach((e, i) => {
        if (e === 1) count++;
    });

    let arrayABS = [];
    while (true) {
        //1. Rule
        while (true) {
            array = shuffle(array);
            if (array.every((e, i) => {
                    if (e === 1) return i % 2 === 0;
                    else return true; // wenns kein schlag ist alles gut, soll weither ggehen
                })) {
                break;
            }
        }


        //2. Rule
        arrayABS = triggerABS(array);

        if (flag === 1) { // 4. Rule
            if (array[0] === 0) {
                if (arrayABS.every((e, i) => {
                        if (e < 4 && i === count - 1) { // 3. Rule
                            return true
                        } else if (e < 4) return false;
                        else return true;
                    })) {
                    break;
                }
            }
        } else if (flag === 0) { // 4. Rule
            if (arrayABS.every((e, i) => {
                    if (e < 4 && i === count - 1) { // 3.Rule
                        return true
                    } else if (e < 4) return false;
                    else return true;
                })) {
                break;
            }
        }



    }

    return array;
}

function kickRhythm2(array, flag) {

    //count how much triggers are in array
    let count = 0;
    array.forEach((e, i) => {
        if (e === 1) count++;
    });

    var arrayABS = [];
    while (true) {
        //1. Rule
        while (true) {
            array = shuffle(array);
            if (array.every((e, i) => {
                    if (e === 1) return i % 2 === 0;
                    else return true; // wenns kein schlag ist alles gut, soll weither ggehen
                })) {
                break;
            }
        }

        //2. Rule
        arrayABS = triggerABS(array);

        if (flag === 1) { // 4. Rule
            if (array[0] === 0) {
                if (arrayABS.every((e, i) => {
                        if (e < 2 && i === count - 1) { // 3. Rule
                            return true
                        } else if (e < 2) return false;
                        else return true;
                    })) {
                    break;
                }
            }
        } else if (flag === 0) { // 4. Rule
            if (arrayABS.every((e, i) => {
                    if (e < 2 && i === count - 1) { // 3.Rule
                        return true
                    } else if (e < 2) return false;
                    else return true;
                })) {
                break;
            }
        }



    }

    return array;
}

function fillKick(size,alternate){
    let flag = 0;
    let array = [[],[]];

    for (var i = 0; i < 9; i++) {
        array[i] = [];
        for (var j = 0; j < 16; j++) {
            if(alternate===0){
                if(j<size)array[i][j] = 1;
                else array[i][j] = 0;
            }
            else{
                if(flag === 0){
                    if(j<size){
                        array[i][j] = 1;
                        flag = 1;
                    }
                    else{
                        array[i][j] = 0;
                        flag = 1;
                    }
                }
                else{
                    if(j<size){
                        array[i][j] = 0;
                        flag = 0;
                    }
                    else{
                        array[i][j] = 0;
                        flag = 0;
                    }

                }
            }
            
        }
    }
    return array;
}

function nonRepeatingRhythmArray(length) {
    let arr = [];
    let iter = 0;
    do {
        let ran = Math.floor(Math.random() * length); 
        arr = arr.indexOf(ran) > -1 ? arr : arr.concat(ran);
        iter++;
     } while (arr.length < length && iter <= 1000)
     
     return arr;
}

export class Kicks {

    out;
    kit;
    loaded;
    kickCounter = 0;
    nonRepeatingArray;

    /** ToneJS Part */
    part;

    /** use this for mutually exclusive bass pattern */
    baserhythm;

    /** the kick pattern */
    pattern;

    /** mapping of numbers to sample slots */
    mapping = [ 'G1', 'A1', 'B1', 'C1', 'D1', 'E1', 'F1' ];

    constructor(volume, rhythmDensity) {

        this.out = new Volume(volume);
        //this.eq = new EQ3(0, 0, 0);
        //this.biquad = new BiquadFilter(10, 'highpass');

        this.loaded = false;

        this.kit = new Players({
            'C1' : "./samples/kick01.mp3",
            'D1': "./samples/kick02.mp3",
            'E1' : "./samples/kick03.mp3",
            'F1': "./samples/kick04.mp3",
            'G1': "./samples/kick05.mp3",
            'A1': "./samples/kick06.mp3",
            'B1': "./samples/kick07.mp3",
        }, () => {
            this.loaded = true;
            //this.kit.chain(this.eq, this.biquad, this.out);
            this.kit.chain(this.out);
        });

        this.generatePattern(rhythmDensity);
        
        this.nonRepeatingArray = nonRepeatingRhythmArray(7);

        this.part = new Part(this.playKick, this.pattern)
        this.part.loopEnd = '9:0:0';
        this.part.loop = true;
    };

    generatePattern(density) {
        this.baserhythm = generateKicks(density);
        this.pattern = translateBinarytoTone(
            converto2Dto1D(this.baserhythm)
        );
    }

    playKick = (time, note) => {
        // randomize sequence of kick samples
        let random;
        this.kickCounter++;
        if (this.kickCounter > 6) {
            this.kickCounter = 0;
            random = this.nonRepeatingArray[this.kickCounter];
            const lastNumberofArray = this.nonRepeatingArray[6]
            while(lastNumberofArray === this.nonRepeatingArray[6]) {
                this.nonRepeatingArray = nonRepeatingRhythmArray(7);
            }
        } else {
            random = this.nonRepeatingArray[this.kickCounter];
        }

        // play the sample
        this.kit.player(this.mapping[random]).start(time);
    }
}

/**
 * ## Generate Rhythm Pattern
 * @param {number} rhythmDensity 
 * @returns Array pattern, length = 144
 */
export function generateKicks(rhythmDensity) {

    let kickInput = [[],[]];
    let generatedKick = [...Array(9)];;
    let flag = 0;

    if (rhythmDensity === 3) {
        let random = Math.floor((Math.random()*3));
        if (random === 0) {
            kickInput = fillKick(3,0);
        } else if (random === 1) {
            kickInput = fillKick(2,1);
        }
        else kickInput = fillKick(1,0);

    } else if (rhythmDensity === 4) {
        let random = Math.floor((Math.random()*3));
        if(random === 0) kickInput = fillKick(4,1);
        if(random === 1) kickInput = fillKick(3,1);
        if(random === 2) kickInput = fillKick(2,1);
        
    } else if (rhythmDensity === 5) {
        kickInput = fillKick(1,0);
    } else if (rhythmDensity === 6) {
        kickInput = fillKick(2,0);
    } else if (rhythmDensity === 7) {
        //random = rfx()
        kickInput = fillKick(2,0);
    } else if (rhythmDensity === 8) {
        kickInput = fillKick(3,0);
    } else if (rhythmDensity === 9) {
        kickInput = fillKick(3,0);
    }

    if (rhythmDensity === 4) {
        generatedKick.map((e,i) =>{
            e = kickRhythm2(kickInput[i],flag)
            flag = checklastTrigger(kickInput[i]);
            return generatedKick[i] = e;
        })
    }
    if (rhythmDensity === 8) {
        generatedKick.forEach((e,i) =>{
            e= kickRhythm2(kickInput[i],flag)
            flag = checklastTrigger(kickInput[i]);
            return generatedKick[i] = e;
        })
    } else {
        generatedKick.map((e,i) =>{
            e = kickRhythm(kickInput[i],flag)
            flag = checklastTrigger(kickInput[i]);
            return generatedKick[i] = e;
        })
    }
    
    return generatedKick;
}
