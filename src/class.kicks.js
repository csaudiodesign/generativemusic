import { Volume, EQ3, Sampler,Players, BiquadFilter,Transport} from "tone";

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

/*
1. Rule: every trigger lands on even index incl. 0:             [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0]
2. Rule: every trigger has min 4 tringgers distance:            [1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0]
3. Rule: expertion: last trigger can have 2 trigger dicance:    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0]
4. Rule: if there is a trigger on the 2nd last trigger of the bar before, the trigger cant land on the 2nd trigger becuase of 2. Rule: Bar1: [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], Bar2: [0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0]*/
function kickRhythm(array, flag) {

    //count how much triggers are in array
    var count = 0;
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

export class Kicks {

    out;
    kit;

    constructor(volume) {

        this.out = new Volume(volume);
        this.eq = new EQ3(0, 0, 0);
        this.biquad = new BiquadFilter(0, 'highpass');

        this.kit = new Players({
            'C1' : "./samples/kick01.mp3",
            'D1': "./samples/kick02.mp3",
            'E1' : "./samples/kick03.mp3",
            'F1': "./samples/kick04.mp3",
        }, () => {
            console.log('Kicks loaded');
            this.kit.chain(this.eq, this.biquad, this.out);
        });
    };   
}

export function generateKicks(rhythmDensity) {

    let kickInputTriggers = [[],[]];
    let generatedKick = [...Array(9)];;
    let flag = 0;

    if (rhythmDensity === 3) {
        Transport.bpm.value = generateRandom(130, 160);
        random = Math.random()
        //---->>>>
        random = 5;


        if (random >= 0.3) {
            let fill = 3;
            kickInputTriggers = fillKick(3,0);

        } else {
            kickInputTriggers = fillKick(2,1);
        }

    } else if (rhythmDensity === 4) {
        Transport.bpm.value = generateRandom(120, 150);
        kickInputTriggers = fillKick(4,0);
    } else if (rhythmDensity === 5) {
        Transport.bpm.value = generateRandom(120, 150);
        kickInputTriggers = fillKick(1,0);
    } else if (rhythmDensity === 6) {
        Transport.bpm.value = generateRandom(120, 150);
        kickInputTriggers = fillKick(2,0);
    } else if (rhythmDensity === 7) {
        Transport.bpm.value = generateRandom(150, 180);
        random = Math.random()
        kickInputTriggers = fillKick(2,0);
    } else if (rhythmDensity === 8) {
        Transport.bpm.value = generateRandom(160, 185);
        kickInputTriggers = fillKick(3,0);
    } else if (rhythmDensity === 9) {
        Transport.bpm.value = generateRandom(160, 185);
        kickInputTriggers = fillKick(3,0);
    }

    if (rhythmDensity === 4) {
        generatedBar1Kick = kickRhythm2(kickInputTriggers[0], flag);
        flag = checklastTrigger(generatedBar1Kick);
        generatedBar2Kick = kickRhythm2(kickInputTriggers[0], flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar3Kick = kickRhythm2(kickInputTriggers[0], flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar4Kick = kickRhythm2(kickInputTriggers[0], flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar5Kick = kickRhythm2(kickInputTriggers[0], flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar6Kick = kickRhythm2(kickInputTriggers[0], flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar7Kick = kickRhythm2(kickInputTriggers[0], flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar8Kick = kickRhythm2(kickInputTriggers[0], flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar9Kick = kickRhythm2(kickInputTriggers[0], flag);
        flag = checklastTrigger(generatedBar2Kick);
    }
    if (rhythmDensity === 8) {
        generatedBar1Kick = kickRhythm2(bar1Kick, flag);
        flag = checklastTrigger(generatedBar1Kick);
        generatedBar2Kick = kickRhythm2(bar2Kick, flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar3Kick = kickRhythm2(bar3Kick, flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar4Kick = kickRhythm2(bar4Kick, flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar5Kick = kickRhythm2(bar5Kick, flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar6Kick = kickRhythm2(bar6Kick, flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar7Kick = kickRhythm2(bar7Kick, flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar8Kick = kickRhythm2(bar8Kick, flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar9Kick = kickRhythm2(bar9Kick, flag);
        flag = checklastTrigger(generatedBar2Kick);
    } else {
        
        generatedKick.map((e,i) =>{
            
            kickRhythm(kickInputTriggers[i],flag)
            flag = checklastTrigger(kickInputTriggers[i]);
            return kickRhythm;
        })
        console.log(generatedKick);
/* 
        generatedBar1Kick = kickRhythm(kickInputTriggers[0], flag);
        flag = checklastTrigger(generatedBar1Kick);
        generatedBar2Kick = kickRhythm(kickInputTriggers[1], flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar3Kick = kickRhythm(kickInputTriggers[2], flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar4Kick = kickRhythm(kickInputTriggers[3], flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar5Kick = kickRhythm(kickInputTriggers[4], flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar6Kick = kickRhythm(kickInputTriggers[5], flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar7Kick = kickRhythm(kickInputTriggers[6], flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar8Kick = kickRhythm(kickInputTriggers[7], flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar9Kick = kickRhythm(kickInputTriggers[8], flag);
        flag = checklastTrigger(generatedBar2Kick); */
    }

    return kickInputTriggers;
}
