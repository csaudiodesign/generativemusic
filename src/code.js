"use strict";
import {
    BiquadFilter,
    Volume,
    EQ3,
    Limiter,
    Part,
    Oscillator,
    Gain,
    Transport,
    AmplitudeEnvelope,
} from 'tone';
import {
    Kicks,
    generateKicks
} from './class.kicks';
import {
    Klicks,
    genrateKlicks
} from './class.klicks';
import {
    Bass,
    generateBass
} from './class.bass';

const kicks = new Kicks(3);
const klicks = new Klicks(0);
const bass = new Bass(1);

import {
    rhythmFigure1,
    rhythmFigure1Noise,
    generateRF1
} from './class.rhythmFigure1';
const rF1 = new rhythmFigure1(12);
const rF1Noise = new rhythmFigure1Noise(0);

import {
    Drone,
    DroneNoise,
    generateDroneGains
} from './class.drone';
const drone = new Drone(0);
const droneNoise = new DroneNoise(0);

import {
    rhythmFigure2,
    generateRF2
} from './class.rhythmFigure2';

const rfx = fxrand;
const rf2 = new rhythmFigure2;

function nonRepeatingRhythmArray(length) {
    let arr = [];
    do {
        let ran = Math.floor(rfx() * length); 
        arr = arr.indexOf(ran) > -1 ? arr : arr.concat(ran);
     }while (arr.length < length)
     
     return arr;
  }
  

function converto2Dto1D(array){
    var newArr = [];
    for(var i = 0; i < array.length; i++)
    {
        newArr = newArr.concat(array[i]);
    }
    return newArr;
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

const generateButton = document.getElementById('generate');

function generateRandom(min, max) {

    // find diff
    let difference = max - min;

    // generate random number 
    let rand = rfx();

    // multiply with difference 
    rand = Math.round(rand * difference * 100) / 100;

    // add with min value 
    rand = rand + min;

    return rand;
}

function exponentialGain(index, dropgains, loudnessControl) {
    const scaledIndex = index / 32;
    const random = Math.ceil(rfx() * 32);
    let exponentialGainValue = Math.round(Math.pow(scaledIndex - 1, 2) * 100) / loudnessControl;
    exponentialGainValue *= Math.round(rfx() * 10) / 10;

    if (random <= dropgains) return (exponentialGainValue);
    else return 0;
}

function startAudio(){

    //////////////////////////////////////////////////////////////////<<DENSITY------------------------------------------------------------------------------
    let rhythmDensity = Math.round(generateRandom(3, 9));
    /* rhythmDensity = 7; */
    console.log(rhythmDensity);

    //////////////////////////////////////////////////////////////////<<MASTER------------------------------------------------------------------------------
    const finalMasterVolume = new Volume(0).toDestination();
    const limiter = new Limiter(0).connect(finalMasterVolume);
    const volMaster = new Volume(10).connect(limiter);
    const eq = new EQ3({
        low: -6,
        mid: -3,
        high: 0,
        highFrequency: 8600
    }).connect(volMaster);
    const masterGain = new Gain(1).connect(eq);
    Transport.bpm.value = 150;

    volMaster.volume.value = -100;
    volMaster.volume.rampTo(6, 3);

    //////////////////////////////////////////////////////////////////<<KICK------------------------------------------------------------------------------
    const kickEvent = new CustomEvent('kick', { "detail": "kick trigger" });
    const masterVolumeKick = new Volume(0).connect(masterGain);
    kicks.out.connect(masterVolumeKick);
    

    const kicksForBass = generateKicks(rhythmDensity);
    const kick = converto2Dto1D(kicksForBass);

    let nonRepeatingArray = nonRepeatingRhythmArray(7);


    let kickCounter = 1;
    //console.log(nonRepeatingArray);

    function playKick(time, note) {
        document.dispatchEvent(kickEvent);
        //const random = Math.ceil(rfx() * 4);
        kickCounter++
        //console.log('Kick Counter: ' +kickCounter)
        let random;

        if(kickCounter>6){
            kickCounter = 0;
            random = nonRepeatingArray[kickCounter];
            let lastNumberofArray = nonRepeatingArray[6]
            while(true){
                nonRepeatingArray = nonRepeatingRhythmArray(7);
                //console.log(nonRepeatingArray);
                if(lastNumberofArray === nonRepeatingArray[6]) return false;
                else{
                    return true;
                }
            }
        }
        else {
            //console.log('ELSE: ' +kickCounter);
            random = nonRepeatingArray[kickCounter];
        }

        //onsole.log(random);

        if (random === 6) kicks.kit.player('G1').start(time);
        if (random === 5) kicks.kit.player('A1').start(time);
        if (random === 4) kicks.kit.player('B1').start(time);
        if (random === 3) kicks.kit.player('C1').start(time);
        else if (random === 2) kicks.kit.player('D1').start(time);
        else if (random === 1) kicks.kit.player('E1').start(time);
        else kicks.kit.player('F1').start(time);
    };

    const patternKick = translateBinarytoTone(kick);
    const partKick = new Part(playKick, patternKick);
    partKick.loopEnd = '9:0:0';
    partKick.loop = true;

    //////////////////////////////////////////////////////////////////<<BASS------------------------------------------------------------------------------
    const bassEvent = new CustomEvent('bass', { "detail": "bass trigger" });
    const bassMasterGain = new Volume(0).connect(masterGain);
    bass.out.connect(bassMasterGain);

    const generatedBass = generateBass(rhythmDensity,kicksForBass);

    function playBass(time, note) {
        document.dispatchEvent(bassEvent);
        const random = Math.ceil(rfx() * 5);
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
    const rf1Event = new CustomEvent('rf1', { "detail": "rf1 trigger" });
    const masterRhythmFigureGain1 = new Volume(-10).connect(masterGain);
    rF1.out.connect(masterRhythmFigureGain1);
    rF1.oscillatorRhythmFigure1.forEach((e) => e.start());

    rF1Noise.out.connect(masterRhythmFigureGain1);
    rF1Noise.noise.start();

    const generatedRF1 = generateRF1(rhythmDensity);

    function playRhythmFigure1(time, note) {
        document.dispatchEvent(rf1Event);
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
    const rf2Event = new CustomEvent('rf2', { "detail": "rf2 trigger" });
    rf2.out.connect(masterRhythmFigureGain2);
    rf2.oscillatorRhythmFigure2.forEach((e) => e.start());

    const fullgeneratedRhythmFigure2 = generateRF2();

    function playRhythmFigure2(time, note) {
        document.dispatchEvent(rf2Event);
        rf2.gains.forEach(
            (e, i) => {
                e.gain.rampTo(exponentialGain(i, numberofSineDrone, 800), rampTimeDroneGain);
            });
        rf2.env.triggerAttackRelease(time, "8n");
    };

    const patternRhythmFigure2 = translateBinarytoTone(fullgeneratedRhythmFigure2);
    const partRhythmFigure2 = new Part(playRhythmFigure2, patternRhythmFigure2);
    partRhythmFigure2.loopEnd = '9:0:0';
    partRhythmFigure2.loop = true;

    //////////////////////////////////////////////////////////////////<<KLICK------------------------------------------------------------------------------
    const masterVolumeKlick = new Volume(6).connect(masterGain);
    const klickEvent = new CustomEvent('klick', { "detail": "kick trigger" });
    klicks.out.connect(masterVolumeKlick);

    const fullgeneratedKlicks = genrateKlicks(rhythmDensity);

    const oscNoiseClickVolume = new Volume(-4).connect(masterGain);
    const envNoiseKlick = new AmplitudeEnvelope({
        attack: 0.01,
        decay: 0.0001,
        sustain: 0.0,
        release: 0.0,
    }).connect(oscNoiseClickVolume);

    const oscNoiseClick = new Oscillator(440, "sine8").connect(envNoiseKlick).start();
    let randomOSCNoiseClicktype = Math.floor(rfx() * 4);
    if (randomOSCNoiseClicktype === 0) oscNoiseClick.type = 'sine2'
    if (randomOSCNoiseClicktype === 1) oscNoiseClick.type = 'triangle2'
    if (randomOSCNoiseClicktype === 2) oscNoiseClick.type = 'sawtooth2'
    if (randomOSCNoiseClicktype === 3) oscNoiseClick.type = 'sine16'

    function playKlick(time, note) {
        document.dispatchEvent(klickEvent);
        const random = Math.floor(rfx() * 16);
        const random2 = Math.floor(rfx() * 3);
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
                klicks.reverb.wet.value = generateRandom(0.01,0.15);
                klicks.delay.wet.value = generateRandom(0.01,0.2);
                klicks.delay.delayTime.value = '4n';
            }
            if (random2 === 1) {
                klicks.reverb.wet.value = generateRandom(0.01,0.15);
                klicks.delay.wet.value = generateRandom(0.01,0.2);
                klicks.delay.delayTime.value = '8n';
            }
            if (random2 === 2) {
                klicks.reverb.wet.value = generateRandom(0.01,0.15);
                klicks.delay.wet.value = generateRandom(0.01,0.2);
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
    const droneEvent = new CustomEvent('drone', { "detail": "drone trigger" });
    drone.out.connect(masterVolumeDrone);
    drone.osc.forEach((e) => e.start());
    droneNoise.out.connect(masterVolumeDrone);
    droneNoise.noise.start();
    droneNoise.lfo.start();
    drone.chorus.start();

    let filterFRQDrone = 100
    const autoFilterDrone = new BiquadFilter(filterFRQDrone, 'highpass').connect(masterVolumeDrone);
    let masterDroneGain = new Gain(1).connect(autoFilterDrone);
    if (rhythmDensity === 0) autoFilterDrone.type = 'bandpass';

    let rampTimeDroneGain = 0.6;
    let numberofSineDrone = 15;

    const droneTriggerGains = generateDroneGains(rhythmDensity);

    function playDroneGains(time, note) {
        document.dispatchEvent(droneEvent);
        drone.gains.forEach(
            (e, i) => {
                e.gain.rampTo(exponentialGain(i, numberofSineDrone, 800), rampTimeDroneGain);
            });
        if(rhythmDensity===7) numberofSineDrone = Math.round(generateRandom(5,12));
    };

    const patternDroneGains = translateBinarytoTone(droneTriggerGains);
    const partDroneGains = new Part(playDroneGains, patternDroneGains);
    partDroneGains.loopEnd = '9:0:0';
    partDroneGains.loop = true;


    const bar = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const quarterNote = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0];

    /////////////PLAY BEAT-------------------------------------------------------------------------------------------------
    
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
        Transport.bpm.value = generateRandom(100, 160);

        partKick.start();
        partKlick.start();
        partBass.start();
        partRhythmFigure1.start();
        masterRhythmFigureGain1.volume.value = -10;
        rF1Noise.bitcrusher.wet.value = generateRandom(0.2,0.6);
        rF1Noise.compressor.threshold.value = -50;
        rF1Noise.compressor.ratio.value = 3;

        //DRONE
        partDroneGains.start();
        masterVolumeDrone.volume.value = 2;
        droneNoise.gain.volume.value = generateRandom(-55,-50);
        droneNoise.distortion.wet.value = 1;
        drone.distortion.wet.value = generateRandom(0.01,0.1);
        drone.chorus.wet.value = generateRandom(0.1,0.2);
        rampTimeDroneGain = generateRandom(0.01,1);
        numberofSineDrone = Math.round(generateRandom(5,20));

    }
    if (rhythmDensity == 4) {
        Transport.bpm.value = generateRandom(180, 200);

        partKick.start();
        partBass.start();
        partRhythmFigure1.start();
        //partRhythmFigure2.start();
        masterRhythmFigureGain2.volume.value = -5;
        //partKlick.start();

        //DRONE
        partDroneGains.start();
        masterVolumeDrone.volume.value = 0;
        droneNoise.gain.volume.value = generateRandom(-45,-30);
        droneNoise.lfo.frequency.value = '16n';
        droneNoise.lfo.min = generateRandom(500,8000);
        droneNoise.lfo.min = droneNoise.lfo.min+100;
        droneNoise.lfo.phase = 10;
        rampTimeDroneGain = 0.6;
        numberofSineDrone = Math.round(generateRandom(5,15));
        
        
    }
    if (rhythmDensity === 5) {
        Transport.bpm.value = generateRandom(120, 150);

        partKlick.start();
        partBass.start();
        rf2.reverb.decay = 400;
        rf2.reverb.wet.value = 0.3;
        rf2.delay.wet.value = 0.3;
        rf2.filter.type = 'highpass';
        rf2.filter.frequency.value = 400;
        partRhythmFigure2.start();
        partDroneGains.start();
        masterVolumeKlick.volume.value = -5;
        //reverbKlickVolume.volume.value = -10;
        klicks.reverb.wet.value = 0.5;
        klicks.reverb.decay = 100;
        rampTimeDroneGain = 0.6;
        numberofSineDrone = 15;
        masterRhythmFigureGain2.volume.value = 0;
        //amplitudeLFODrone = 0;
        masterVolumeDrone.volume.value = 2;
        droneNoise.gain.volume.value = -37;
        droneNoise.lfo.min = 1000;
        droneNoise.lfo.max = 6000;
    }
    if (rhythmDensity === 6) {
        Transport.bpm.value = generateRandom(120, 150);
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
        masterVolumeKlick.volume.value = -5;
        klicks.reverb.wet.value = 0.5;
        klicks.reverb.decay = 100;
        rampTimeDroneGain = 10;
        numberofSineDrone = Math.round(generateRandom(1,5));
        masterRhythmFigureGain2.volume.value = 0;
        masterVolumeDrone.volume.value = 2;
        droneNoise.gain.volume.value = -37;
        droneNoise.lfo.min = 1000;
        droneNoise.lfo.max = 6000;
    }
    if (rhythmDensity === 7) {
        let random1 = rfx();
        let random2 = rfx();

        Transport.bpm.value = generateRandom(120, 180);

        if (random1 >= 0.5){
            partKick.start();
        }     
        partBass.start();

        //KLICKS
        if (random2 >= 0.5){
            partKlick.start();
        }
        if (random1 >= 0.5 && random2 < 0.5){
            masterVolumeKick.volume.value = -10;
        }

        masterVolumeKlick.volume.value = 4;
        klicks.eq.highFrequency.value = 3;

        //DRONE
        partDroneGains.start();
        masterVolumeDrone.volume.value = 2;
        droneNoise.gain.volume.value = generateRandom(-50,-40);
        droneNoise.distortion.wet.value = 1;
        drone.distortion.wet.value = generateRandom(0.01,0.1);
        droneNoise.lfo.min = 5500;
        droneNoise.lfo.max = 6000;
        klicks.delay.wet.value = 0;
        klicks.reverb.wet.value = 0.9;
        rampTimeDroneGain = Math.round(generateRandom(4,7));
        numberofSineDrone = Math.round(generateRandom(5,20));
    }
    if (rhythmDensity === 8) {
        let random1 = rfx();
        let random2 = rfx();

        Transport.bpm.value = generateRandom(160, 185);

        bassMasterGain.volume.value = 2;
        partKick.start();
        
        if (random1 >= 0.5){
            partBass.start();
        }
        if (random2 >= 0.5){
            partKlick.start();
        }


        //DRONE
        partDroneGains.start();
        masterVolumeDrone.volume.value = 3;
        droneNoise.gain.volume.value = -45;
        droneNoise.lfo.min = Math.round(generateRandom(3000,5000));
        droneNoise.lfo.max = Math.round(generateRandom(6000,8000));
        droneNoise.bitcrusher.wet.value = generateRandom(0.3,0.6);
        droneNoise.distortion.wet.value = generateRandom(0.3,0.6);
        rampTimeDroneGain = Math.round(generateRandom(5,9));
        
    }
    if (rhythmDensity === 9) {
        Transport.bpm.value = generateRandom(160, 185);

        bassMasterGain.volume.value = 2;
        masterVolumeKlick.volume.value = -100;
        partKick.start();
        partBass.start();
        partKlick.start();

        masterRhythmFigureGain2.volume.value = 0;

        partDroneGains.start();
        masterVolumeDrone.volume.value = 3;
        rampTimeDroneGain = Math.round(generateRandom(4,7));
        numberofSineDrone = Math.round(generateRandom(5,20));
        
        droneNoise.gain.volume.value = -45;
        droneNoise.lfo.min = 4000;
        droneNoise.lfo.max = 6000;
        droneNoise.bitcrusher.wet.value = 0.5
        droneNoise.distortion.wet.value = 0.5
    }

    console.log('BPM: ' + Transport.bpm.value);

    //await start();
    Transport.start();
}

window.startAudio = startAudio;