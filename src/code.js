"use strict";
import {
    Players,
    ToneAudioBuffers,
    FeedbackDelay,
    Distortion,
    BitCrusher,
    Delay,
    BiquadFilter,
    Volume,
    EQ3,
    Limiter,
    Destination,
    LFO,
    Waveform,
    Reverb,
    Tremolo,
    Noise,
    start,
    MidiClass,
    Part,
    Oscillator,
    Gain,
    Transport,
    AmplitudeEnvelope,
    Synth,
    Offline,
    ToneAudioBuffer,
    Player,
    connect,
    Chorus
} from 'tone';
import * as Nexus from 'nexusui';
import {
    Kicks,
    generateKicks
} from './class.kicks';
import {
    Klicks
} from './class.klicks';
import {
    Bass,
    generateBass
} from './class.bass';

const kicks = new Kicks(3);
const klicks = new Klicks(0.75);
const bass = new Bass(1);
import {
    running
} from './scope';

running();

function converto2Dto1D(array){
    var newArr = [];
    for(var i = 0; i < array.length; i++)
    {
        newArr = newArr.concat(array[i]);
    }
    return newArr;
}

import {
    rhythmFigure1,
    rhythmFigure1Noise,
    generateRF1
} from './class.rhythmFigure1';
const rF1 = new rhythmFigure1(12);
const rF1Noise = new rhythmFigure1Noise(0);

import {
    Drone,
    DroneNoise
} from './class.drone';
const drone = new Drone(0);
const droneNoise = new DroneNoise(0);

import {
    rhythmFigure2,
    generateRF2
} from './class.rhythmFigure2';
const rf2 = new rhythmFigure2;


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






/*
1. Rule: Klicks düfren überall laden
2. Rule: Klicks werden in zwei Gruppen abwechselnd abgespielt
3. Rule: Wenn Gruppe1(Klicks werde nicht gepielt, Pause) dann wird bis zu 4 Schläge lang keine Klicks abgespielt
4. Rule: Wenn Gruppe2(Klicks werden gepielt) dann werden bis zu 6 Klicks hintereinander abgespielt
5. Rule: Wenn Gruppe2(Klicks werden gepielt) dann werden kommt danach immer Gruppe1 mit einer Pause
6. Rule: Länge von beiden Gruppen sind zufällig
*/
function generateKlicks2() {
    var array = new Array(144).fill(0);
    array = array.map((e, i) => {
        if (i % 2 === 0) return 1;
        else return 0;
    });
    return array;
}

function generateKlicks3() {
    var array = new Array(144).fill(0);
    array = array.map((e, i) => {
        if (i % 6 === 0) return 1;
        else if (i % 6 === 2) {
            const random = Math.random()
            if (random >= 0.5) return 1;
            else return 0;
        } else return 0;
    });
    return array;
}

function generateKlicks5() {
    var array = new Array(144).fill(0);
    array = array.map((e, i) => {
        if (i % 8 === 2) return 1;
        else return 0;
    });
    return array;
}

function generateKlicks1() {
    var array = new Array(144).fill(0);
    array = array.map((e, i) => {
        if (i % 8 === 0) return 1;
        else return 0;
    });
    return array;
}

function generateKlicks4() {
    var array = new Array(144).fill(0);
    array = array.map((e, i) => {
        if (i % 2 === 1) return 1;
        else return 0;
    });
    return array;
}

function generateRF2() {
    var array = new Array(144).fill(0);
    array = array.map((e, i) => {
        if (i % 24 === 4) {
            random = Math.random()
            if (random > 0.5) return 1
            else return 0;
        } else return 0;
    });
    return array;
}

function translateBinarytoTone(array) {

    let current = 0;
    var returnArray = array.map((e, i) => {
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
    });

    returnArray = returnArray.filter(e => e[0] === 1)
    returnArray = returnArray.map((e, i) => [e[1], `C${i}`]);

    return returnArray;
}

function doubleTime(array, amount) {

    for (let i = 0; i < amount; i++) {
        const random = Math.floor(Math.random() * 72) * 2 - 1;
        array[random] = 1;
    }
    return array;
}

const generateButton = document.getElementById('generate');
const hideButton = document.getElementById('hideall');

hideButton.addEventListener("keyup", function (event) {
    if (event.code === 65) {
        event.preventDefault();
        document.getElementById("hideall").click();
    }
});

hideButton.addEventListener('click', async () => {
    var x = document.getElementById("seq");
    var z = document.getElementById("generate");
    var a = document.getElementById("hideall");



    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    if (z.style.display === "none") {
        z.style.display = "block";
    } else {
        z.style.display = "none";
    }
    if (a.style.display === "none") {
        a.style.display = "block";
    } else {
        a.style.display = "none";
    }
});

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

generateButton.addEventListener('click', async () => {

    //////////////////////////////////////////////////////////////////<<DENSITY------------------------------------------------------------------------------
    let rhythmDensity = Math.round(generateRandom(3, 9));
    rhythmDensity = 6;
    console.log(rhythmDensity);

    //////////////////////////////////////////////////////////////////<<MASTER------------------------------------------------------------------------------
    const finalMasterVolume = new Volume(0).toDestination();
    const limiter = new Limiter(0).connect(finalMasterVolume);
    const volMaster = new Volume(10).connect(limiter);
    const eq = new EQ3(-6, -3, 0).connect(volMaster);
    eq.highFrequency = 8600;
    const masterGain = new Gain(1).connect(eq);
    Transport.bpm.value = 150;

    volMaster.volume.value = -100;
    volMaster.volume.rampTo(6, 3);
    let oscillatorDrone = [...Array(32)];

    let frequencies = [...Array(32)];
    let frequenciesDrone = [...Array(32)];
    

    let offsetFRQ1 = 5;
    if (rhythmDensity === 3) offsetFRQ1 = 2;
    let frequenciesRhythmFigure2 = [...Array(32)];
    if (rhythmDensity === 1) var offsetFRQ2 = 2;
    else var offsetFRQ2 = 10;

    function exponentialGain(index, dropgains, loudnessControl) {
        const scaledIndex = index / 32;
        const random = Math.ceil(Math.random() * 32);
        let exponentialGainValue = Math.round(Math.pow(scaledIndex - 1, 2) * 100) / loudnessControl;
        exponentialGainValue *= Math.round(Math.random() * 10) / 10;

        if (random <= dropgains) return (exponentialGainValue);
        else return 0;
    }

    frequencies.forEach((item, index) => {
        frequencies[index] = MidiClass.mtof(MidiClass.ftom(Math.pow(index + offsetFRQ1, 2)));
    });

    frequenciesDrone.forEach((item, index) => {
        frequenciesDrone[index] = MidiClass.mtof(MidiClass.ftom(Math.pow(index + 5, 2.5)));
    });

    frequenciesRhythmFigure2.forEach((item, index) => {
        frequenciesRhythmFigure2[index] = MidiClass.mtof(MidiClass.ftom(Math.pow(index + 10, 2)));
    });

    //////////////////////////////////////////////////////////////////<<KICK------------------------------------------------------------------------------
    const kickMasterGain = new Volume(0).connect(masterGain);
    kicks.out.connect(kickMasterGain);

    const kicksForBass = generateKicks(rhythmDensity);
    const generatedKick = converto2Dto1D(kicksForBass);

    function playKick(time, note) {
        //kicks.kit.triggerAttack('C1');
        const random = Math.ceil(Math.random() * 4);
        if (random === 3) kicks.kit.player('C1').start(time);
        else if (random === 2) kicks.kit.player('D1').start(time);
        else if (random === 1) kicks.kit.player('E1').start(time);
        else kicks.kit.player('F1').start(time);
    };

    const patternKick = translateBinarytoTone(generatedKick);
    const partKick = new Part(playKick, patternKick);
    partKick.loopEnd = '9:0:0';
    partKick.loop = true;

    if (rhythmDensity === 6) {

    }

    //////////////////////////////////////////////////////////////////<<BASS------------------------------------------------------------------------------
    const bassMasterGain = new Volume(0).connect(masterGain);
    bass.out.connect(bassMasterGain);

    const generatedBass = generateBass(rhythmDensity,kicksForBass);
    console.log(generatedBass);

    function playBass(time, note) {
        const random = Math.ceil(Math.random() * 5);
        if (random === 5) bass.kit.player('C1').start(time);
        else if (random === 4) bass.kit.player('D1').start(time);
        else if (random === 3) bass.kit.player('E1').start(time);
        else if (random === 2) bass.kit.player('F1').start(time);
        else bass.kit.player('G1').start(time);
    };

    const patternBass = translateBinarytoTone(converto2Dto1D(generatedBass));
    const partBass = new Part(playBass, patternBass);
    partBass.loopEnd = '9:0:0';
    partBass.loop = true;

    //////////////////////////////////////////////////////////////////<<RF1------------------------------------------------------------------------------
    //let rhythmFigure1 = await import('./class.rhythmFigure1');

    const masterRhythmFigureGain1 = new Volume(-10).connect(masterGain);
    rF1.out.connect(masterRhythmFigureGain1);
    rF1.oscillatorRhythmFigure1.forEach((e) => e.start());

    rF1Noise.out.connect(masterRhythmFigureGain1);
    rF1Noise.noise.start();

    const generatedRF1 = generateRF1(rhythmDensity);

    function playRhythmFigure1(time, note) {
        rF1.env.triggerAttackRelease(time);
        rF1.env.decay = generateRandom(0.2, 1);
        rF1Noise.env.decay = generateRandom(0.2, 0.8)
        rF1Noise.env.triggerAttackRelease(time);
        console.log(limiter.reduction);
    };

    const patternRhythmFigure1 = translateBinarytoTone(generatedRF1);
    const partRhythmFigure1 = new Part(playRhythmFigure1, patternRhythmFigure1);
    partRhythmFigure1.loopEnd = '9:0:0';
    partRhythmFigure1.loop = true;

    //////////////////////////////////////////////////////////////////<<RF2------------------------------------------------------------------------------
    const masterRhythmFigureGain2 = new Volume(-10).connect(masterGain);
    rf2.out.connect(masterRhythmFigureGain2);
    rf2.oscillatorRhythmFigure2.forEach((e) => e.start());

    const fullgeneratedRhythmFigure2 = generateRF2();

    function playRhythmFigure2(time, note) {
        rf2.gains.forEach(
            (e, i) => {
                e.gain.rampTo(exponentialGain(i, numberofSineDrone, 800), ramptime);
            });
        rf2.env.triggerAttackRelease(time, "8n");
    };

    const patternRhythmFigure2 = translateBinarytoTone(fullgeneratedRhythmFigure2);
    const partRhythmFigure2 = new Part(playRhythmFigure2, patternRhythmFigure2);
    partRhythmFigure2.loopEnd = '9:0:0';
    partRhythmFigure2.loop = true;

    //////////////////////////////////////////////////////////////////<<KLICK------------------------------------------------------------------------------
    const klickMasterGain = new Volume(6).connect(masterGain);
    klicks.out.connect(klickMasterGain);

    const oscNoiseClickVolume = new Volume(-4).connect(masterGain);
    const envNoiseKlick = new AmplitudeEnvelope({
        attack: 0.01,
        decay: 0.0001,
        sustain: 0.0,
        release: 0.0,
    }).connect(oscNoiseClickVolume);

    const oscNoiseClick = new Oscillator(440, "sine8").connect(envNoiseKlick).start();
    let randomOSCNoiseClicktype = Math.floor(Math.random() * 4);
    if (randomOSCNoiseClicktype === 0) oscNoiseClick.type = 'sine2'
    if (randomOSCNoiseClicktype === 1) oscNoiseClick.type = 'triangle2'
    if (randomOSCNoiseClicktype === 2) oscNoiseClick.type = 'sawtooth2'
    if (randomOSCNoiseClicktype === 3) oscNoiseClick.type = 'sine16'

    var fullgeneratedKlicks
    if (rhythmDensity === 0) {
        fullgeneratedKlicks = generateKlicks2();
        fullgeneratedKlicks = doubleTime(fullgeneratedKlicks, 2);
    }
    if (rhythmDensity === 1) {
        fullgeneratedKlicks = generateKlicks3();
    }
    if (rhythmDensity === 2) {
        fullgeneratedKlicks = generateKlicks5();
    }
    if (rhythmDensity === 3) {
        let random = Math.ceil(Math.random() * 5);
        if (random === 1) fullgeneratedKlicks = generateKlicks1();
        else if (random === 2) fullgeneratedKlicks = generateKlicks2();
        else if (random === 3) fullgeneratedKlicks = generateKlicks3();
        else if (random === 4) fullgeneratedKlicks = generateKlicks5();
        else fullgeneratedKlicks = generateKlicks2();
        fullgeneratedKlicks = doubleTime(fullgeneratedKlicks, 2);
    }
    if (rhythmDensity === 4) {
        let random = Math.ceil(Math.random() * 4);
        if (random === 1) fullgeneratedKlicks = generateKlicks1();
        else if (random === 2) fullgeneratedKlicks = generateKlicks2();
        else if (random === 3) fullgeneratedKlicks = generateKlicks3();
        else fullgeneratedKlicks = generateKlicks5();
        fullgeneratedKlicks = doubleTime(fullgeneratedKlicks, 2);
    }
    if (rhythmDensity === 5) {
        fullgeneratedKlicks = generateKlicks3();
        fullgeneratedKlicks = doubleTime(fullgeneratedKlicks, 2);
        klickMasterGain.volume.value = -5;
        //reverbKlickVolume.volume.value = -10;
        klicks.reverb.wet.value = 0.5;
        klicks.reverb.decay = 100;
    }
    if (rhythmDensity === 6) {
        fullgeneratedKlicks = generateKlicks3();
        fullgeneratedKlicks = doubleTime(fullgeneratedKlicks, 2);
        klickMasterGain.volume.value = -5;
        klicks.reverb.wet.value = 0.5;
        klicks.reverb.decay = 100;
    }
    if (rhythmDensity === 7) {
        let random = Math.ceil(Math.random() * 4);
        if (random === 1) fullgeneratedKlicks = generateKlicks1();
        //else if(random === 2 )fullgeneratedKlicks = generateKlicks1();
        else if (random === 3) fullgeneratedKlicks = generateKlicks3();
        else fullgeneratedKlicks = generateKlicks5();

    }
    if (rhythmDensity === 8) {
        let random = Math.ceil(Math.random() * 7);
        if (random === 1) fullgeneratedKlicks = generateKlicks1();
        else if (random === 2) fullgeneratedKlicks = generateKlicks2();
        else if (random === 3) fullgeneratedKlicks = generateKlicks3();
        else if (random === 4) fullgeneratedKlicks = generateKlicks5();
        else fullgeneratedKlicks = generateKlicks2();
    }
    if (rhythmDensity === 9) {
        fullgeneratedKlicks = generateKlicks4();
    }

    function playKlick(time, note) {

        const random = Math.floor(Math.random() * 16);
        const random2 = Math.floor(Math.random() * 3);
        if (random === 0) klicks.kit.player('C1').start(time);
        if (random === 1) klicks.kit.player('D1').start(time);
        if (random === 2) klicks.kit.player('E1').start(time);
        if (random === 3) klicks.kit.player('F1').start(time);
        if (random === 4) klicks.kit.player('G1').start(time);
        if (random === 5) klicks.kit.player('A1').start(time);
        if (random === 6) klicks.kit.player('B1').start(time);
        if (random === 7) klicks.kit.player('C2').start(time);
        if (random === 8) klicks.kit.player('D2').start(time);
        if (random === 9) klicks.kit.player('E2').start(time);
        if (random === 10) klicks.kit.player('F2').start(time);
        if (random === 11) klicks.kit.player('G2').start(time);
        if (random === 12) klicks.kit.player('A2').start(time);
        if (random === 13) klicks.kit.player('B2').start(time);
        if (random === 14) klicks.kit.player('C3').start(time);
        if (random === 15) klicks.kit.player('D3').start(time);

        if (rhythmDensity === 7) {
            if (random2 === 0) {
                klicks.reverb.wet.value = generateRandom(0.1,0.9);
                klicks.reverb.decay = 100;
                klicks.delay.delayTime.value = '4n';
            }
            if (random2 === 1) {
                klicks.reverb.wet.value = generateRandom(0.1,0.9);
                klicks.reverb.decay = 100;
                klicks.delay.delayTime.value = '8n';
            }
            if (random2 === 2) {
                klicks.reverb.wet.value = generateRandom(0.1,0.9);
                klicks.reverb.decay = 100;
                klicks.delay.delayTime.value = '2n';
            }
        } else if (rhythmDensity === 9) {
            envNoiseKlick.attack = generateRandom(0.001, 0.0001);
            envNoiseKlick.triggerAttack(time);
        }
    };

    let patternKlick = translateBinarytoTone(fullgeneratedKlicks);
    const partKlick = new Part(playKlick, patternKlick);
    partKlick.loopEnd = '3:0:0';
    partKlick.loop = true;

    //////////////////////////////////////////////////////////////////<<DRONE------------------------------------------------------------------------------

    const masterVolumeDrone = new Volume(6).connect(masterGain);
    drone.out.connect(masterVolumeDrone);
    drone.osc.forEach((e) => e.start());
    droneNoise.out.connect(masterVolumeDrone);
    droneNoise.noise.start();
    droneNoise.lfo.start();
    drone.chorus.start();

    var filterFRQDrone = 100
    const autoFilterDrone = new BiquadFilter(filterFRQDrone, 'highpass').connect(masterVolumeDrone);
    let masterDroneGain = new Gain(1).connect(autoFilterDrone);
    if (rhythmDensity === 0) autoFilterDrone.type = 'bandpass';

    let ramptime = 0.6;
    let numberofSineDrone = 15;
    let minLFODrone = 0;
    let freqLFO = '4n'
    const droneTrigger = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
    let droneTriggerGains = [...Array(144)];

    if (rhythmDensity === 3) {
        //numberofSineDrone = 12;
        ramptime = 1;
        masterRhythmFigureGain1.volume.value = 20;
        masterVolumeDrone.volume.value = 2;
        droneTriggerGains = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    if (rhythmDensity === 4) {
        random = Math.random()
        if (random > 0.5) droneTriggerGains = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        else droneTriggerGains = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    if (rhythmDensity === 5) {
        masterRhythmFigureGain2.volume.value = 0;
        amplitudeLFODrone = 0;
        masterVolumeDrone.volume.value = 2;
        random = Math.random()
        if (random > 0.5) droneTriggerGains = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        else droneTriggerGains = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    if (rhythmDensity === 6) {
        masterRhythmFigureGain2.volume.value = 0;
        masterVolumeDrone.volume.value = 2;
        random = Math.random()
        if (random > 0.5) droneTriggerGains = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        else droneTriggerGains = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    if (rhythmDensity === 7) {
        ramptime = 5;
        numberofSineDrone = 10;
        minLFODrone = 0.2;
        freqLFO = '1n'
        masterVolumeDrone.volume.value = 2;
        droneTriggerGains = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    if (rhythmDensity === 8) {
        masterVolumeDrone.volume.value = 3;
        random = Math.random()
        ramptime = 5;
        if (random > 0.5) droneTriggerGains = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        else droneTriggerGains = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    if (rhythmDensity === 9) {
        masterRhythmFigureGain2.volume.value = 0;
        masterVolumeDrone.volume.value = 3;
        random = Math.random()
        ramptime = 5;
        if (random > 0.5) droneTriggerGains = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        else droneTriggerGains = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    function playDrone(time, note) {
        var length;
        var random = Math.ceil(Math.random() * 3);
        if (random === 1) length = '2n'
        else if (random === 2) length = '3n'
        else if (random === 3) length = '4n'
        if (rhythmDensity === 0) envDrone.triggerAttackRelease(time, length);
    };

    function playDroneGains(time, note) {
        drone.gains.forEach(
            (e, i) => {
                e.gain.rampTo(exponentialGain(i, numberofSineDrone, 800), ramptime);
            });
    };


     if (rhythmDensity === 4) {
        droneNoise.gain.volume.value = -50;
    } else if (rhythmDensity === 5) {
        droneNoise.gain.volume.value = -37;
        droneNoise.lfo.min = 1000;
        droneNoise.lfo.max = 6000;
    } else if (rhythmDensity === 6) {
        droneNoise.gain.volume.value = -37;
        droneNoise.lfo.min = 1000;
        droneNoise.lfo.max = 6000;
        
    } else if (rhythmDensity === 7) {
        droneNoise.gain.volume.value = -37;
        droneNoise.lfo.min = 5500;
        droneNoise.lfo.max = 6000;
    } else if (rhythmDensity === 8) {
        droneNoise.gain.volume.value = -45;
        droneNoise.lfo.min = 4000;
        droneNoise.lfo.max = 6000;
        droneNoise.bitcrusher.wet.value = 0.5
        droneNoise.distortion.wet.value = 0.5
    } else if (rhythmDensity === 9) {
        droneNoise.gain.volume.value = -45;
        droneNoise.lfo.min = 4000;
        droneNoise.lfo.max = 6000;
        droneNoise.bitcrusher.wet.value = 0.5
        droneNoise.distortion.wet.value = 0.5
    }

    const patternDrone = translateBinarytoTone(droneTrigger);
    const partDrone = new Part(playDrone, patternDrone);
    partDrone.loopEnd = '12:0:0';
    partDrone.loop = true;

    const patternDroneGains = translateBinarytoTone(droneTriggerGains);
    const partDroneGains = new Part(playDroneGains, patternDroneGains);
    partDroneGains.loopEnd = '9:0:0';
    partDroneGains.loop = true;

    ///////////NEXUS------------------------------------------------------------------------------
    var sequencer = new Nexus.Sequencer('#seq', {
        'size': [1500, 300],
        'mode': 'toggle',
        'rows': 7,
        'columns': 144,
    });
    sequencer.colorize("fill", "#808080")
    sequencer.colorize("accent", "#000000")


    const bar = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const quarterNote = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0];
    sequencer.matrix.set.row(0, bar);
    sequencer.matrix.set.row(1, quarterNote);
    sequencer.matrix.set.row(2, generatedKick);
    sequencer.matrix.set.row(3, converto2Dto1D(generatedBass));
    sequencer.matrix.set.row(4, generatedRF1);
    sequencer.matrix.set.row(5, fullgeneratedRhythmFigure2);
    sequencer.matrix.set.row(6, fullgeneratedKlicks);

    /////////////PLAY BEAT-------------------------------------------------------------------------------------------------
    console.log('BPM: ' + Transport.bpm.value);
    if (rhythmDensity == 0) {
        partKick.start();
        partBass.start();
        //partRhythmFigure1.start();
        masterRhythmFigureGain1.volume.value = 10;
        //noiseRhythmFigure1.volume.value = 5;
        //partRhythmFigure2.start();
        partKlick.start();
        partDrone.start();
        partDroneGains.start();

    }
    if (rhythmDensity == 3) {
        partKick.start();
        partKlick.start();
        partBass.start();
        partRhythmFigure1.start();
        masterRhythmFigureGain1.volume.value = -10;
        rF1Noise.bitcrusher.wet.value = generateRandom(0.2,0.6);
        rF1Noise.compressor.threshold.value = -50;
        rF1Noise.compressor.ratio.value = 3;
        //partRhythmFigure2.start();
        partDrone.start();
        drone.distortion.wet.value = generateRandom(0.01,0.1);
        partDroneGains.start();
        drone.chorus.wet.value = generateRandom(0.1,0.2);

    }
    if (rhythmDensity == 4) {
        partKick.start();
        partBass.start();
        partRhythmFigure1.start();
        partRhythmFigure2.start();
        masterRhythmFigureGain2.volume.value = -5;
        partKlick.start();
        partDrone.start();
        partDroneGains.start();
    }
    if (rhythmDensity === 5) {
        partKlick.start();
        partBass.start();
        rf2.reverb.decay = 400;
        rf2.reverb.wet.value = 0.3;
        rf2.delay.wet.value = 0.3;
        rf2.filter.type = 'highpass';
        rf2.filter.frequency.value = 400;
        partRhythmFigure2.start();
        partDroneGains.start();
    }
    if (rhythmDensity === 6) {
        kicks.kit.player.playbackRate = 20;
        kicks.kit.player.playbackRate = 20;
        kicks.kit.player.playbackRate = 20;
        kicks.kit.player.playbackRate = 20;
        kicks.biquad.frequency.value  = 300;
        kicks.biquad.type = 'bandpass';
        partKick.start();
        partBass.start();
        partKlick.start();
        partRhythmFigure2.start();
        rf2.reverb.decay = 400;
        rf2.reverb.wet.value = 0.3;
        rf2.delay.wet.value = 0.3;
        rf2.filter.type = 'highpass';
        rf2.filter.frequency.value = 400;
        partDroneGains.start();
    }
    if (rhythmDensity === 7) {
        klicks.delay.wet.value = 0.5
        masterVolumeDrone.volume.value = 8; //6
        partKick.start();
        partBass.start();
        partKlick.start();
        //partRhythmFigure1.start();
        partDroneGains.start();
        partDrone.start();
    }
    if (rhythmDensity === 8) {
        bassMasterGain.volume.value = 2;
        partKick.start();
        partBass.start();
        partKlick.start();
        partDroneGains.start();
    }
    if (rhythmDensity === 9) {
        bassMasterGain.volume.value = 2;
        klickMasterGain.volume.value = -100;
        partKick.start();
        partBass.start();
        partKlick.start();
        partDroneGains.start();
    }

    await start();
    Transport.start();
});