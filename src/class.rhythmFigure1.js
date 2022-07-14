import { Volume, EQ3, AmplitudeEnvelope,Gain, Oscillator,MidiClass,Noise,Distortion,BitCrusher,Compressor} from "tone";

let frequenciesRF1 = [...Array(32)];
let frequenciesRF13 = [...Array(5)];
let oscillatorRhythmFigure1 = [...Array(32)];
let gainsRythmFigure1 = [...Array(32)];
const rfx = fxrand;

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

/*
1. Rule: every trigger lands on even index incl. 0:             [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0]
2. Rule: every trigger has min 4 tringgers distance:            [1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0]
3. Rule: expertion: last trigger can have 2 trigger dicance:    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0]
4. Rule: if there is a trigger on the 2nd last trigger of the bar before, the trigger cant land on the 2nd trigger becuase of 2. Rule: Bar1: [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], Bar2: [0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0]*/
function RhythmFigures(array, flag) {

    //CHECK IF ARRAY EVEN HAVE TRIGGER

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

        } {
            break;
        }

    }
    return array;
}

function converto2Dto1D(array){
    var newArr = [];
    for(var i = 0; i < array.length; i++)
    {
        newArr = newArr.concat(array[i]);
    }
    return newArr;
}


function exponentialGain(index, dropgains, loudnessControl) {
    const scaledIndex = index / 32;
    const random = Math.ceil(rfx() * 32);
    let exponentialGainValue = Math.round(Math.pow(scaledIndex - 1, 2) * 100) / loudnessControl;
    exponentialGainValue *= Math.round(rfx() * 10) / 10;

    if (random <= dropgains) return (exponentialGainValue);
    else return 0;
}

function fillRF1(size){
    let RF1InputTriggers = [[],[]];

    for (var i = 0; i < 9; i++) {
        RF1InputTriggers[i] = [];
        for (var j = 0; j < 16; j++) {
            if(j<size)RF1InputTriggers[i][j] = 1;
            else RF1InputTriggers[i][j] = 0;  
        }
    }
    return RF1InputTriggers;
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

function checklastTrigger(array) {
    if (array[14] === 1) return 1;
    else return 0;
}


frequenciesRF1.forEach((item, index) => {
    frequenciesRF1[index] = MidiClass.mtof(MidiClass.ftom(Math.pow(index + 2, 2)));
});

frequenciesRF13.forEach((item, index) => {
    frequenciesRF13[index] = MidiClass.mtof(MidiClass.ftom(Math.pow(index + 2, 3)));
});


export class rhythmFigure1 {

    out;
    env;

    constructor(volume) {

        this.out = new Volume(volume);
        this.eq = new EQ3(0, 0, 0);

        this.env = new AmplitudeEnvelope({
            attack: 0.01,
            decay: 0.5,
            sustain: 0.0,
            release: 0.0,
        });

        gainsRythmFigure1 = gainsRythmFigure1.map((item, index) => {
            return (new Gain({
                gain: exponentialGain(index, 15, 200)
            }).connect(this.env));
        });

        this.oscillatorRhythmFigure1 = oscillatorRhythmFigure1.map((item, index) => {
            return (new Oscillator({
                frequency: frequenciesRF1[index],
                type: "sine"
            })).connect(gainsRythmFigure1[index]);
        });

        console.log('RhyhtmFigure1 ready');
        this.env.chain(this.eq, this.out);

    };   
}

export class rhythmFigure1Noise {

    env;
    out;
    noise;

    constructor(volume){

        this.out = new Volume(volume);
        this.eq = new EQ3(0, 0, 0);
        this.bitcrusher = new BitCrusher(4);
        this.bitcrusher.wet.value = 0;
        this.distortion = new Distortion(0.5);
        this.distortion.wet.value = 0;
        this.compressor = new Compressor({
            threshold:-1,
            ratio: 1,
            attack: 0.01,
            release: 0.1
        });

        this.env = new AmplitudeEnvelope({
            attack: 0.01,
            decay: 0.3,
            sustain: 0.0,
            release: 0.0,
        })

        this.noise = new Noise("pink");
        this.noise.chain(this.env,this.bitcrusher,this.distortion,this.eq,this.compressor,this.out);
    }

}

export function generateRF1(rhythmDensity) {

    let flag = 0;
    let rf1InputTriggers = [[],[]];
    let generatedRF1 = [...Array(9)];;

    rf1InputTriggers = fillRF1(1);

    generatedRF1.map((e,i) =>{
        e = RhythmFigures(rf1InputTriggers[i],flag);
        flag = checklastTrigger(rf1InputTriggers[i]);
        return generatedRF1[i] = e;
    })
    
    return converto2Dto1D(generatedRF1);

}