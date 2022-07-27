import { Gain, EQ3, Sampler, Players } from "tone";
const rfx = fxrand;

function fillBass(size,alternate){
    let flag = 0;
    let kickInputTriggers = [[],[]];

    for (var i = 0; i < 9; i++) {
        kickInputTriggers[i] = [];
        for (var j = 0; j < 16; j++) {
            if(alternate===0){
                if(j<size)kickInputTriggers[i][j] = 1;
                else kickInputTriggers[i][j] = 0;
            }
            else{
                if(flag === 0){
                    if(j<size){
                        kickInputTriggers[i][j] = 1;
                        flag = 1;
                    }
                    else{
                        kickInputTriggers[i][j] = 0;
                        flag = 1;
                    }
                }
                else{
                    if(j<size){
                        kickInputTriggers[i][j] = 0;
                        flag = 0;
                    }
                    else{
                        kickInputTriggers[i][j] = 0;
                        flag = 0;
                    }

                }
            }
            
        }
    }
    return kickInputTriggers;
}

function converto2Dto1D(array){
    var newArr = [];
    for(var i = 0; i < array.length; i++)
    {
        newArr = newArr.concat(array[i]);
    }
    return newArr;
}

function checklastTrigger(array) {
    if (array[14] === 1) return 1;
    else return 0;
}
function shuffle(array) {
    const r = (from = 0, to = 1) => from + rfx() * (to - from);
    var m = array.length,
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
/*
1. Rule: every trigger lands on even index incl. 0:             [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0]
2. Rule: every trigger has min 4 tringgers distance:            [1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0]
3. Rule: expertion: last trigger can have 2 trigger dicance:    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0]
4. Rule: if there is a trigger on the 2nd last trigger of the bar before, the trigger cant land on the 2nd trigger becuase of 2. Rule: Bar1: [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], Bar2: [0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0]
5. Rule: tirgger can not land on Kick tirgger*/
function bassRhythm(array, fullKickOutput, flag) {

    //count how much triggers are in array
    var count = 0;
    array.forEach((e, i) => {
        if (e === 1) count++;
    });

    var arrayABS = [];

    while (true) {
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
            } else { // 4. Rule
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
        // 5. Rule 
        array.map((e, i) => {

            if (array[i] === 1 && fullKickOutput[i] === 1) {
                return array[i] = 0;
            } else return e;
        }); {
            break;
        }

    }
    return array;

}

function bassRhythm2(array, fullKickOutput, flag) {

    //count how much triggers are in array
    var count = 0;
    array.forEach((e, i) => {
        if (e === 1) count++;
    });

    var arrayABS = [];

    while (true) {
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
            } else { // 4. Rule
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

        // 5. Rule 
        array.map((e, i) => {

            if (array[i] === 1 && fullKickOutput[i] === 1) {
                return array[i] = 0;
            } else return e;
        }); {
            break;
        }

    }

    return array;

}
export class Bass {

    out;
    kit;
    loaded;

    constructor(volume) {

        this.out = new Gain(volume);
        this.eq = new EQ3(0, 0, 0);

        this.loaded = false;

        this.kit = new Players({
            C1: './samples/bass101.mp3',
            D1: './samples/bass102.mp3',
            E1: './samples/bass103.mp3',
            F1: './samples/bass104.mp3',
            G1: './samples/bass105.mp3'
        }, () => {
            console.log('Bass loaded');
            this.loaded = true;
            this.kit.chain(this.eq, this.out);
        });

    };   
}

export function generateBass(rhythmDensity,kicksForBass){

    let bassInputTriggers = [[],[]];
    let generatedBass = [...Array(9)];;
    let flag = 0;
    
    if (rhythmDensity === 3) {
        bassInputTriggers= fillBass(3,0);
    } else if (rhythmDensity === 4) {
        bassInputTriggers= fillBass(2,0);
    } else if (rhythmDensity === 5) {
        bassInputTriggers= fillBass(1,0);
    } else if (rhythmDensity === 6) {
        bassInputTriggers= fillBass(1,0);
    } else if (rhythmDensity === 7) {
        bassInputTriggers= fillBass(1,0);
    } else if (rhythmDensity === 8) {
        bassInputTriggers= fillBass(1,0);
    } else if (rhythmDensity === 9) {
        bassInputTriggers= fillBass(1,0);
    }

    if (rhythmDensity === 8) {
        generatedBass.map((e,i) =>{
            e = bassRhythm2(bassInputTriggers[i],kicksForBass[i],flag)
            flag = checklastTrigger(bassInputTriggers[i]);
            return generatedBass[i] = e;
        })
    } else {
        generatedBass.map((e,i) =>{
            e = bassRhythm(bassInputTriggers[i],kicksForBass[i],flag)
            flag = checklastTrigger(bassInputTriggers[i]);
            return generatedBass[i] = e;
        })
    }
    
    return converto2Dto1D(generatedBass);

}