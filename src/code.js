"use strict";
import {FeedbackDelay,Distortion,BitCrusher,Delay, BiquadFilter,Volume, EQ3,Limiter,Destination, LFO, Waveform, Reverb, Tremolo, Noise, start, MidiClass, Part, Oscillator, Gain, Transport, AmplitudeEnvelope, Synth, Offline, ToneAudioBuffer, Player} from 'tone';
import * as Nexus from 'nexusui';
//import { asdf } from './stuff';
///////////VARIATION-----------------------------------------------------------------------------------
function generateRandom(min, max) {

    // find diff
    let difference = max - min;

    // generate random number 
    let rand = Math.random();

    // multiply with difference 
    rand = Math.round(rand * difference*100)/100;

    // add with min value 
    rand = rand + min;

    return rand;
}


let rhythmDensity = Math.round(generateRandom(3,8));
rhythmDensity = 3;
console.log(rhythmDensity);

///////////MASTER CHAIN--------------------------------------------------------------------------------
const limiter = new Limiter(0).toDestination();
limiter.threshold = -0.9;
const volMaster = new Volume(6).connect(limiter);
const eq = new EQ3(-6,-3,0).connect(volMaster);
eq.highFrequency = 8600;
const masterGain = new Gain(1).connect(eq);
Transport.start();
Transport.bpm.value = 150;

///////////KICK----------------------------------------------------------------------------------------
const kickMasterGain = new Volume(4).connect(masterGain);

import audioFileUrlKick1 from 'url:./samples/kick01.mp3';
import audioFileUrlKick2 from 'url:./samples/kick02.mp3';
import audioFileUrlKick3 from 'url:./samples/kick03.mp3';
import audioFileUrlKick4 from 'url:./samples/kick04.mp3';

const bufferKick1 = new ToneAudioBuffer();
const bufferKick2 = new ToneAudioBuffer();
const bufferKick3 = new ToneAudioBuffer();
const bufferKick4 = new ToneAudioBuffer();
const biquadKickVolume = new Volume(-100).connect(masterGain);
const biquadKick = new BiquadFilter(200,'bandpass').connect(biquadKickVolume)

const playerKick1 = new Player(bufferKick1).connect(kickMasterGain).connect(biquadKick);
const playerKick2 = new Player(bufferKick2).connect(kickMasterGain).connect(biquadKick);
const playerKick3 = new Player(bufferKick3).connect(kickMasterGain).connect(biquadKick);
const playerKick4 = new Player(bufferKick4).connect(kickMasterGain).connect(biquadKick);

if(rhythmDensity === 0){
    var bar1Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar2Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar3Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar4Kick = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar5Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar6Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar7Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar8Kick = [1,1,1,,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar9Kick = [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0];
    kickMasterGain.volume.value = 3;
    Transport.bpm.value = 140;
}
else if(rhythmDensity === 1){
    var bar1Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar2Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar3Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar4Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar5Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar6Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar7Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar8Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar9Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    kickMasterGain.volume.value = 4;
    Transport.bpm.value = 170;
}
else if(rhythmDensity === 2){
    var bar1Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar2Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar3Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar4Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar5Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar6Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar7Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar8Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar9Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    
}
else if(rhythmDensity === 3){
    Transport.bpm.value = generateRandom(130,160);
    random = Math.random()
    if (random >= 0.3){
        var bar1Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var bar2Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var bar3Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var bar4Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var bar5Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var bar6Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var bar7Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var bar8Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var bar9Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }
    else {
        var bar1Kick = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var bar2Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var bar3Kick = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var bar4Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var bar5Kick = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var bar6Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var bar7Kick = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var bar8Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        var bar9Kick = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }
    
}
else if (rhythmDensity === 4){
    Transport.bpm.value = generateRandom(120,150);
    random = Math.random()
    var bar1Kick = [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar2Kick = [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar3Kick = [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar4Kick = [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar5Kick = [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar6Kick = [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar7Kick = [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar8Kick = [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar9Kick = [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0];
    //const lfoDrone = new LFO({frequency: '4n', min: 80, max: 90, phase: 0}).connect(Transport).start();
}
else if (rhythmDensity === 5){
    Transport.bpm.value = generateRandom(120,150);
    random = Math.random()
    var bar1Kick = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar2Kick = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar3Kick = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar4Kick = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar5Kick = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar6Kick = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar7Kick = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar8Kick = [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0];
    var bar9Kick = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    //const lfoDrone = new LFO({frequency: '4n', min: 80, max: 90, phase: 0}).connect(Transport).start();
}
else if (rhythmDensity === 6){
    Transport.bpm.value = generateRandom(120,150);
    random = Math.random()
    var bar1Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar2Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar3Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar4Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar5Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar6Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar7Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar8Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar9Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
}
else if (rhythmDensity === 7){
    Transport.bpm.value = generateRandom(150,180);
    random = Math.random()
    var bar1Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar2Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar3Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar4Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar5Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar6Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar7Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar8Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar9Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
}
else if (rhythmDensity === 8){
    Transport.bpm.value = generateRandom(160,185);
    random = Math.random()
    var bar1Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar2Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar3Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar4Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar5Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar6Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar7Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar8Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar9Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
}
///////////BASS----------------------------------------------------------------------------------------
const bassMasterGain = new Volume(0).connect(masterGain);

import audioFileUrlBass101 from 'url:./samples/bass101.mp3';
import audioFileUrlBass102 from 'url:./samples/bass103.mp3';
import audioFileUrlBass103 from 'url:./samples/bass102.mp3';
import audioFileUrlBass104 from 'url:./samples/bass104.mp3';
import audioFileUrlBass105 from 'url:./samples/bass105.mp3';

const bufferBass101 = new ToneAudioBuffer();
const bufferBass102 = new ToneAudioBuffer();
const bufferBass103 = new ToneAudioBuffer();
const bufferBass104 = new ToneAudioBuffer();
const bufferBass105 = new ToneAudioBuffer();

const playerBass = new Player(bufferBass101).connect(bassMasterGain);
const playerBass2 = new Player(bufferBass102).connect(bassMasterGain);
const playerBass3 = new Player(bufferBass103).connect(bassMasterGain);
const playerBass4 = new Player(bufferBass104).connect(bassMasterGain);
const playerBass5 = new Player(bufferBass105).connect(bassMasterGain);

let bar1Bass;
let bar2Bass;
let bar3Bass;
let bar4Bass;
let bar5Bass;
let bar6Bass;
let bar7Bass;
let bar8Bass;
let bar9Bass;

if(rhythmDensity === 0){
    bar1Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar2Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar3Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar4Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar5Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar6Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar7Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar8Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar9Bass = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bassMasterGain.volume.value = 3;
}
else if(rhythmDensity === 1){
    bar1Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar2Bass = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar3Bass = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar4Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar5Bass = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar6Bass = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar7Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar8Bass = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar9Bass = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bassMasterGain.volume.value = 5;
}
else if(rhythmDensity === 2){
    bar1Bass = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar2Bass = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar3Bass = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar4Bass = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar5Bass = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar6Bass = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar7Bass = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar8Bass = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar9Bass = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
}
else if(rhythmDensity === 3){
    bar1Bass = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar2Bass = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar3Bass = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar4Bass = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar5Bass = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar6Bass = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar7Bass = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar8Bass = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar9Bass = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
}
else if(rhythmDensity === 4){
    bar1Bass = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar2Bass = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar3Bass = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar4Bass = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar5Bass = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar6Bass = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar7Bass = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar8Bass = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar9Bass = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
}
else if(rhythmDensity === 5){
    bar1Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar2Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar3Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar4Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar5Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar6Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar7Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar8Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar9Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
}
else if(rhythmDensity === 6){
    bar1Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar2Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar3Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar4Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar5Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar6Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar7Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar8Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar9Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
}
else if(rhythmDensity === 7){
    bar1Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar2Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar3Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar4Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar5Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar6Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar7Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar8Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar9Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
}
else if(rhythmDensity === 8){
    bar1Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar2Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar3Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar4Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar5Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar6Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar7Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar8Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    bar9Bass = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
}
///////////RHYTHM FIGURE 1------------------------------------------------------------------------------
const masterRhythmFigureGain1 = new Volume(3).connect(masterGain);
const masterNoiseGain = new Volume(2).connect(masterGain);

const bitCrusherNoiseVolume = new Volume(0).connect(masterNoiseGain);
const bitCrusherNoise = new BitCrusher(4).connect(bitCrusherNoiseVolume);
const distortionNoiseVolume = new Volume(0).connect(masterNoiseGain);
const distortionNoise = new Distortion(0.5).connect(distortionNoiseVolume);

const masterBitCrusherRF1 = new Volume(-10).connect(masterRhythmFigureGain1);
const bitCrusherRF1 = new BitCrusher(4).connect(masterBitCrusherRF1);
const masterDistortionRF1 = new Volume(-10).connect(masterRhythmFigureGain1);
const distortionRF1 = new Distortion(0.5).connect(masterDistortionRF1);

distortionNoise.wet.value = 0;
distortionRF1.wet.value = 0;
bitCrusherNoise.wet.value = 0;
bitCrusherRF1.wet.value = 0;
bitCrusherNoiseVolume.volume.value = -100;

let frequenciesRF1 =  [...Array(32)];
let frequenciesRF13 =  [...Array(5)];

if (rhythmDensity===3){
    var oscillatorRhythmFigure1 = [...Array(32)];
    var gainsRythmFigure1 = [...Array(32)]; 
    distortionRF1.wet.value = 0;
    bitCrusherRF1.wet.value = 0;
    masterDistortionRF1.volume.value = -100;
    bitCrusherNoiseVolume.volume.value = -100;
}
else {
    var gainsRythmFigure1 = [...Array(32)];
    var oscillatorRhythmFigure1 = [...Array(32)];
}

const envRhythmFigure1 = new AmplitudeEnvelope({
    attack: 0.01,
    decay: 0.5,
    sustain: 0.0,
    release: 0.0,
}).connect(masterRhythmFigureGain1);

const envRhythmFigure1Noise = new AmplitudeEnvelope({
    attack: 0.01,
    decay: 0.3,
    sustain: 0.0,
    release: 0.0,
}).connect(masterNoiseGain).connect(bitCrusherNoise);

if(rhythmDensity===1){
    var bar1RhythmFigure1 = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar2RhythmFigure1 = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar3RhythmFigure1 = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar4RhythmFigure1 = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar5RhythmFigure1 = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar6RhythmFigure1 = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar7RhythmFigure1 = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar8RhythmFigure1 = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar9RhythmFigure1 = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

}

else{
    var bar1RhythmFigure1 = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar2RhythmFigure1 = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar3RhythmFigure1 = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar4RhythmFigure1 = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar5RhythmFigure1 = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar6RhythmFigure1 = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar7RhythmFigure1 = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar8RhythmFigure1 = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var bar9RhythmFigure1 = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
}

///////////RHYTHM FIGURE 2------------------------------------------------------------------------------
const masterRhythmFigureGain2 = new Volume(-10).connect(masterGain);
const filterRF2 = new BiquadFilter(750,'bandpass').connect(masterRhythmFigureGain2);
const gainDelayRF2 = new Volume(-3).connect(masterRhythmFigureGain2);
const delayRF2 = new FeedbackDelay('2n',0.5).connect(gainDelayRF2);
const gainReverbRF2 = new Volume().connect(filterRF2)
const reverbRF2 = new Reverb(150).connect(gainReverbRF2);


let oscillatorRhythmFigure2 = [...Array(32)];
let gainsRythmFigure2 = [...Array(32)];

const envRhythmFigure2 = new AmplitudeEnvelope({
    attack: 0.9,
    decay: 0.01,
    sustain: 1,
    release: 0.01,
}).connect(filterRF2).connect(delayRF2).connect(reverbRF2);

 

///////////Klick------------------------------------------------------------------------------
const klickMasterGain = new Volume(6).connect(masterGain);
const reverbKlickVolume = new Volume(-20).connect(klickMasterGain);
const reverbKlick = new Reverb(100).connect(reverbKlickVolume);
reverbKlickVolume.volume.value = -100;
const delayKlickVolume = new Volume(-100).connect(klickMasterGain);
const delayKlick = new FeedbackDelay('4n', 0.5).connect(delayKlickVolume);

import audioFileUrlKlick1 from 'url:./samples/klick1.mp3';
import audioFileUrlKlick2 from 'url:./samples/klick2.mp3';
import audioFileUrlKlick3 from 'url:./samples/klick3.mp3';
import audioFileUrlKlick4 from 'url:./samples/klick4.mp3';
import audioFileUrlKlick5 from 'url:./samples/klick5.mp3';
import audioFileUrlKlick6 from 'url:./samples/klick6.mp3';
import audioFileUrlKlick7 from 'url:./samples/klick7.mp3';
import audioFileUrlKlick8 from 'url:./samples/klick8.mp3';
import audioFileUrlKlick9 from 'url:./samples/klick9.mp3';
import audioFileUrlKlick10 from 'url:./samples/klick10.mp3';
import audioFileUrlKlick11 from 'url:./samples/klick11.mp3';
import audioFileUrlKlick12 from 'url:./samples/klick12.mp3';
import audioFileUrlKlick13 from 'url:./samples/klick13.mp3';
import audioFileUrlKlick14 from 'url:./samples/klick14.mp3';
import audioFileUrlKlick15 from 'url:./samples/klick15.mp3';
import audioFileUrlKlick16 from 'url:./samples/klick16.mp3';

const bufferKlick1 = new ToneAudioBuffer();
const bufferKlick2 = new ToneAudioBuffer();
const bufferKlick3 = new ToneAudioBuffer();
const bufferKlick4 = new ToneAudioBuffer();
const bufferKlick5 = new ToneAudioBuffer();
const bufferKlick6 = new ToneAudioBuffer();
const bufferKlick7 = new ToneAudioBuffer();
const bufferKlick8 = new ToneAudioBuffer();
const bufferKlick9 = new ToneAudioBuffer();
const bufferKlick10 = new ToneAudioBuffer();
const bufferKlick11 = new ToneAudioBuffer();
const bufferKlick12 = new ToneAudioBuffer();
const bufferKlick13 = new ToneAudioBuffer();
const bufferKlick14 = new ToneAudioBuffer();
const bufferKlick15 = new ToneAudioBuffer();
const bufferKlick16 = new ToneAudioBuffer();


const playerKlick1 = new Player(bufferKlick1).connect(klickMasterGain).connect(reverbKlick).connect(delayKlick);
const playerKlick2 = new Player(bufferKlick2).connect(klickMasterGain).connect(reverbKlick).connect(delayKlick);
const playerKlick3 = new Player(bufferKlick3).connect(klickMasterGain).connect(reverbKlick).connect(delayKlick);
const playerKlick4 = new Player(bufferKlick4).connect(klickMasterGain).connect(reverbKlick).connect(delayKlick);
const playerKlick5 = new Player(bufferKlick5).connect(klickMasterGain).connect(reverbKlick).connect(delayKlick);
const playerKlick6 = new Player(bufferKlick6).connect(klickMasterGain).connect(reverbKlick).connect(delayKlick);
const playerKlick7 = new Player(bufferKlick7).connect(klickMasterGain).connect(reverbKlick).connect(delayKlick);
const playerKlick8 = new Player(bufferKlick8).connect(klickMasterGain).connect(reverbKlick).connect(delayKlick);
const playerKlick9 = new Player(bufferKlick9).connect(klickMasterGain).connect(reverbKlick).connect(delayKlick);
const playerKlick10 = new Player(bufferKlick10).connect(klickMasterGain).connect(reverbKlick).connect(delayKlick);
const playerKlick11 = new Player(bufferKlick11).connect(klickMasterGain).connect(reverbKlick).connect(delayKlick);
const playerKlick12 = new Player(bufferKlick12).connect(klickMasterGain).connect(reverbKlick).connect(delayKlick);
const playerKlick13 = new Player(bufferKlick13).connect(klickMasterGain).connect(reverbKlick).connect(delayKlick);
const playerKlick14 = new Player(bufferKlick14).connect(klickMasterGain).connect(reverbKlick).connect(delayKlick);
const playerKlick15 = new Player(bufferKlick15).connect(klickMasterGain).connect(reverbKlick).connect(delayKlick);
const playerKlick16 = new Player(bufferKlick16).connect(klickMasterGain).connect(reverbKlick).connect(delayKlick);

///////////NEXUS------------------------------------------------------------------------------
var sequencer = new Nexus.Sequencer('#seq',{
    'size': [1500,300],
    'mode': 'toggle',
    'rows': 7,
    'columns': 144,
    });
sequencer.colorize("fill","#808080")
sequencer.colorize("accent","#000000")

//initialize components
const rhythmfigure2MasterGain = new Gain(1).toDestination();
//const reverbRhythmFigure2 = new Reverb(5).connect(rhythmfigure2MasterGain);
const reverbRhythmFigure2 = new Reverb(5).toDestination();
reverbRhythmFigure2.wet = 0.1
var gaindDroneMaster = new Gain(0.6).toDestination();
let wave = new Waveform();

const masterVolumeDrone = new Volume(6).connect(masterGain);
var filterFRQDrone = 100
if(rhythmDensity===1) filterFRQDrone= 200;
const autoFilterDrone = new BiquadFilter(filterFRQDrone,'highpass').connect(masterVolumeDrone);
if(rhythmDensity===0) autoFilterDrone.type = 'bandpass';

if(rhythmDensity===0){
    const gainReverbDrone = new Volume(-30).connect(masterVolumeDrone)
    const reverbDrone = new Reverb(20).connect(gainReverbDrone);      
    var envDrone = new AmplitudeEnvelope({
        attack: 0.01,
        decay: 0.6,
        sustain: 1,
        release: 0.2,
    }).connect(autoFilterDrone).connect(reverbDrone);
    var masterDroneGain = new Gain(1).connect(envDrone);
}

if(rhythmDensity===1){
    var masterDroneGain = new Gain(1).connect(autoFilterDrone);
}

if(rhythmDensity===2){
    const gainReverbDrone = new Volume(-30).connect(masterVolumeDrone)
    const reverbDrone = new Reverb(100).connect(gainReverbDrone);      
    var masterDroneGain = new Gain(1).connect(autoFilterDrone).connect(reverbDrone);
}
if(rhythmDensity===3){
    var masterDroneGain = new Gain(1).connect(autoFilterDrone);
}
if(rhythmDensity===4){
    var masterDroneGain = new Gain(1).connect(autoFilterDrone);
}
if(rhythmDensity===5){
    var masterDroneGain = new Gain(1).connect(autoFilterDrone);
}
if(rhythmDensity===6){
    var masterDroneGain = new Gain(1).connect(autoFilterDrone);
}
if(rhythmDensity===7){
    var masterDroneGain = new Gain(1).connect(autoFilterDrone);
}
if(rhythmDensity===8){
    var masterDroneGain = new Gain(1).connect(autoFilterDrone);
}


const lfoGainDrone = new Gain(1).connect(masterDroneGain);

import p5 from 'p5';
let sketch = function(p) {
    let masterVolume = -6; // in decibel.

    let ready = false;

    let osc; // these two will be our audio oscillators
    let osc2;
    let lfo; // low frequency oscillator

    let wave; // this object allows us to draw waveforms
    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);
        

        // 4 differents types: sine (default), square, triangle and sawtooth
        osc = new Oscillator({
            type: "sine",
            frequency: 220,
            volume: -3
        });
        osc.toDestination(); // --> shorthand for "connect(Tone.Master)"

        osc2 = new Oscillator({
            type: "triangle",
            frequency: 220,
            volume: -3
        });
        osc2.frequency.value = 220; // 220hz -> A3
        osc2.toDestination(); // --> shorthand for "connect(Tone.Master)"

        lfo = new LFO("0.1hz", 210, 230);
        lfo.connect(osc.frequency);

        wave = new Waveform();
        Destination.connect(wave);

        Destination.volume.value = masterVolume;
    }

// On window resize, update the canvas size
    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };

    p.draw = function() {

        p.background(0);

        if (ready) {
          // do the audio stuff

          osc.frequency.value = p.map(p.mouseX, 0, p.width, 110, 880);
      
          p.stroke(255);

          let buffer = wave.getValue(0);
      
          // look a trigger point where the samples are going from
          // negative to positive
          let start = 0;
          for (let i = 1; i < buffer.length; i++) {
            if (buffer[i - 1] < 0 && buffer[i] >= 0) {
              start = i;
              break; // interrupts a for loop
            }
          }
      
          // calculate a new end point such that we always
          // draw the same number of samples in each frame
          let end = start + buffer.length / 2;
    
          // drawing the waveform
          for (let i = start; i < end; i++) {
            let x1 = p.map(i - 1, start, end, 0, p.width);
            let y1 = p.map(buffer[i - 1], -1, 1, 0, p.height);
            let x2 = p.map(i, start, end, 0, p.width);
            let y2 = p.map(buffer[i], -1, 1, 0, p.height);
            p.line(x1, y1, x2, y2);
          }
        } else {
          p.fill(255);
          p.noStroke();
          p.textAlign(p.CENTER, p.CENTER);
          p.text("CLICK TO START", p.width / 2, p.height / 2);
        }

    };

    p.mousePressed = function() {
        if (!ready) {
          // ! --> not
          // start our audio objects here
      
          //osc.start();
          //osc2.start();
          //lfo.start();
      
          ready = true;
        }
        else {
          ready = false;
          osc.stop();
          osc2.stop();
          lfo.stop();
        }
      }
};
let myp5 = new p5(sketch);


//const buffer = new ToneAudioBuffer();

let oscillatorDrone = [...Array(32)];
let gainsDrone = [...Array(32)];
let frequencies =  [...Array(32)];

let frequenciesDrone =  [...Array(32)];
let frequenciesZwei =  [...Array(32)];
let frequenciesDrei =  [...Array(32)];
let offsetFRQ1 = 5;
if (rhythmDensity===3) offsetFRQ1 = 2;
let frequenciesRhythmFigure2 =  [...Array(32)];
if (rhythmDensity===1) var offsetFRQ2 = 2;
else var offsetFRQ2 = 10;

const synth = new Synth().toDestination();

const generateButton = document.getElementById('generate');
const hideButton = document.getElementById('hideall');

hideButton.addEventListener("keyup", function(event) {
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

frequencies.forEach((item,index) => {
    frequencies[index] = MidiClass.mtof(MidiClass.ftom(Math.pow(index +offsetFRQ1,2)));
});

frequenciesRF1.forEach((item,index) => {
    frequenciesRF1[index] = MidiClass.mtof(MidiClass.ftom(Math.pow(index + 2,2)));
});

frequenciesRF13.forEach((item,index) => {
    frequenciesRF13[index] = MidiClass.mtof(MidiClass.ftom(Math.pow(index +2,3)));
});


frequenciesDrone.forEach((item,index) => {
    frequenciesDrone[index] = MidiClass.mtof(MidiClass.ftom(Math.pow(index +5,2.5)));
});

frequenciesZwei.forEach((item,index) => {
    frequenciesZwei[index] = MidiClass.mtof(MidiClass.ftom(Math.pow(index+3,2)));
});

frequenciesDrei.forEach((item,index) => {
    frequenciesDrei[index] = MidiClass.mtof(MidiClass.ftom(Math.pow(index+2,2)));
});

frequenciesRhythmFigure2.forEach((item,index) => {
    frequenciesRhythmFigure2[index] = MidiClass.mtof(MidiClass.ftom(Math.pow(index +10,2)));
});

function exponentialGain(index,dropgains,loudnessControl){
    const scaledIndex = index / 32;
    const random = Math.ceil(Math.random()*32);
    let exponentialGainValue = Math.round(Math.pow(scaledIndex-1,2)*100)/loudnessControl;
    exponentialGainValue *= Math.round(Math.random()*10)/10;
    
    if (random <= dropgains) return (exponentialGainValue);
    else return 0;
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


function triggerABS(array)
{   
    const arrayABS = [];
    var x = 0;
    var z = 0;
    var y = new Boolean(false);
    var a = new Boolean(false);

        for (var i = 0; i < 16; i++) {
            if (i === 15)
            {   
                z++;
                arrayABS[x] = z;
            }
            else if (array[i] === 0) {
                if (y === true){
                    a = true;
                    z++;
                }
            }
            else if (array[i] === 1){
                y = true;
                if (i > 0 && a === true){
                    z++;
                    arrayABS[x] = z;
                    x++;
                    z = 0;
                }
            }
          }
    return(arrayABS);

}

/*
1. Rule: every trigger lands on even index incl. 0:             [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0]
2. Rule: every trigger has min 4 tringgers distance:            [1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0]
3. Rule: expertion: last trigger can have 2 trigger dicance:    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0]
4. Rule: if there is a trigger on the 2nd last trigger of the bar before, the trigger cant land on the 2nd trigger becuase of 2. Rule: Bar1: [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], Bar2: [0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0]*/
function kickRhythm(array,flag){

    //count how much triggers are in array
    var count = 0;
    array.forEach((e,i) =>{
        if(e===1) count++;
    });

    var arrayABS = [];
    while (true)
    {
        //1. Rule
        while(true) {
            array = shuffle(array);
            if (array.every((e,i) => {
                if(e === 1) return i % 2 === 0;
                else return true; // wenns kein schlag ist alles gut, soll weither ggehen
            })) {
                break;
            }
        }
    

        //2. Rule
        arrayABS = triggerABS(array);

        if(flag === 1){ // 4. Rule
            if(array[0] === 0){
                if (arrayABS.every((e,i) => {
                    if(e < 4 && i === count-1){ // 3. Rule
                        return true
                    }
                    else if(e < 4) return false;
                    else return true;
                })) {
                    break;
                }
            }
        }

        else if (flag === 0){ // 4. Rule
            if (arrayABS.every((e,i) => {
                if(e < 4 && i === count-1){ // 3.Rule
                    return true
                }
                else if(e < 4) return false;
                else return true;
            })) {
                break;
            }
        }



    }
    
return array;
}

function kickRhythm2(array,flag){

    //count how much triggers are in array
    let count = 0;
    array.forEach((e,i) =>{
        if(e===1) count++;
    });

    var arrayABS = [];
    while (true)
    {
        //1. Rule
        while(true) {
            array = shuffle(array);
            if (array.every((e,i) => {
                if(e === 1) return i % 2 === 0;
                else return true; // wenns kein schlag ist alles gut, soll weither ggehen
            })) {
                break;
            }
        }

        //2. Rule
        arrayABS = triggerABS(array);

        if(flag === 1){ // 4. Rule
            if(array[0] === 0){
                if (arrayABS.every((e,i) => {
                    if(e < 2 && i === count-1){ // 3. Rule
                        return true
                    }
                    else if(e < 2) return false;
                    else return true;
                })) {
                    break;
                }
            }
        }

        else if (flag === 0){ // 4. Rule
            if (arrayABS.every((e,i) => {
                if(e < 2 && i === count-1){ // 3.Rule
                    return true
                }
                else if(e < 2) return false;
                else return true;
            })) {
                break;
            }
        }



    }
    
return array;
}

/*
1. Rule: every trigger lands on even index incl. 0:             [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0]
2. Rule: every trigger has min 4 tringgers distance:            [1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0]
3. Rule: expertion: last trigger can have 2 trigger dicance:    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0]
4. Rule: if there is a trigger on the 2nd last trigger of the bar before, the trigger cant land on the 2nd trigger becuase of 2. Rule: Bar1: [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], Bar2: [0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0]
5. Rule: tirgger can not land on Kick tirgger*/
function bassRhythm(array, fullKickOutput,flag){

    //count how much triggers are in array
    var count = 0;
    array.forEach((e,i) =>{
        if(e===1) count++;
    });

    var arrayABS = [];

    while(true){
        while (true)
        {
            //1. Rule
            while(true) {
                array = shuffle(array);
                if (array.every((e,i) => {
                    if(e === 1) return i % 2 === 0;
                    else return true; // wenns kein schlag ist alles gut, soll weither ggehen
                })) {
                    break;
                }
            }
    
            //2. Rule
             arrayABS = triggerABS(array);
    
            if(flag === 1){ // 4. Rule
                if(array[0] === 0){
                    if (arrayABS.every((e,i) => {
                        if(e < 4 && i === count-1){ // 3. Rule
                            return true
                        }
                        else if(e < 4) return false;
                        else return true;
                    })) {
                        break;
                    }
                }
            }
    
            else { // 4. Rule
                if (arrayABS.every((e,i) => {
                    if(e < 4  && i === count-1){ // 3.Rule
                        return true
                    }
                    else if(e < 4) return false;
                    else return true;
                })) {
                    break;
                }
            }
        }
        // 5. Rule 
            array.map((e,i) => {
     
                if(array[i] === 1 && fullKickOutput[i] === 1){
                    return array[i] = 0;
                }
                else return e;
            });
             {
                break;
            }

    }

    return array;

}
function bassRhythm2(array, fullKickOutput,flag){

    //count how much triggers are in array
    var count = 0;
    array.forEach((e,i) =>{
        if(e===1) count++;
    });

    var arrayABS = [];

    while(true){
        while (true)
        {
            //1. Rule
            while(true) {
                array = shuffle(array);
                if (array.every((e,i) => {
                    if(e === 1) return i % 2 === 0;
                    else return true; // wenns kein schlag ist alles gut, soll weither ggehen
                })) {
                    break;
                }
            }
    
            //2. Rule
            arrayABS = triggerABS(array);
    
            if(flag === 1){ // 4. Rule
                if(array[0] === 0){
                    if (arrayABS.every((e,i) => {
                        if(e < 2 && i === count-1){ // 3. Rule
                            return true
                        }
                        else if(e < 2) return false;
                        else return true;
                    })) {
                        break;
                    }
                }
            }
    
            else { // 4. Rule
                if (arrayABS.every((e,i) => {
                    if(e < 2 && i === count-1){ // 3.Rule
                        return true
                    }
                    else if(e < 2) return false;
                    else return true;
                })) {
                    break;
                }
            }
        }

        // 5. Rule 
        array.map((e,i) => {
     
            if(array[i] === 1 && fullKickOutput[i] === 1){
                return array[i] = 0;
            }
            else return e;
        });
        {
            break;
        }

    }

    return array;

}

/*
1. Rule: every trigger lands on even index incl. 0:             [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0]
2. Rule: every trigger has min 4 tringgers distance:            [1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0]
3. Rule: expertion: last trigger can have 2 trigger dicance:    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0]
4. Rule: if there is a trigger on the 2nd last trigger of the bar before, the trigger cant land on the 2nd trigger becuase of 2. Rule: Bar1: [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0], Bar2: [0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0]*/
function RhythmFigures(array, flag){

    //CHECK IF ARRAY EVEN HAVE TRIGGER

    //count how much triggers are in array
    var count = 0;
    array.forEach((e,i) =>{
        if(e===1) count++;
    });

    var arrayABS = [];

    while(true){
        while (true)
        {
            //1. Rule
            while(true) {
                array = shuffle(array);
                if (array.every((e,i) => {
                    if(e === 1) return i % 2 === 0;
                    else return true; // wenns kein schlag ist alles gut, soll weither ggehen
                })) {
                    break;
                }
            }
    
            //2. Rule
            arrayABS = triggerABS(array);
    
            if(flag === 1){ // 4. Rule
                if(array[0] === 0){
                    if (arrayABS.every((e,i) => {
                        if(e < 4 && i === count-1){ // 3. Rule
                            return true
                        }
                        else if(e < 4) return false;
                        else return true;
                    })) {
                        break;
                    }
                }
            }
    
            else if (flag === 0){ // 4. Rule
                if (arrayABS.every((e,i) => {
                    if(e < 4 && i === count-1){ // 3.Rule
                        return true
                    }
                    else if(e < 4) return false;
                    else return true;
                })) {
                    break;
                }
            }
    
        }
     {
        break;
    }

    }
    return array;
}

function checklastTrigger(array){
    if(array[14] === 1 ) return 1;
    else return 0;
}

/*
1. Rule: Klicks düfren überall laden
2. Rule: Klicks werden in zwei Gruppen abwechselnd abgespielt
3. Rule: Wenn Gruppe1(Klicks werde nicht gepielt, Pause) dann wird bis zu 4 Schläge lang keine Klicks abgespielt
4. Rule: Wenn Gruppe2(Klicks werden gepielt) dann werden bis zu 6 Klicks hintereinander abgespielt
5. Rule: Wenn Gruppe2(Klicks werden gepielt) dann werden kommt danach immer Gruppe1 mit einer Pause
6. Rule: Länge von beiden Gruppen sind zufällig
*/
function generateKlicks2(){
    var array = new Array(144).fill(0);
    array = array.map((e,i) => {
        if(i % 2 === 0) return 1;
        else return 0;
    });
    return array;
}

function generateKlicks3(){
    var array = new Array(144).fill(0);
    array = array.map((e,i) => {
        if(i % 6 === 0) return 1;
        else if(i % 6 === 2) {
            const random = Math.random()
            if(random>=0.5) return 1;
            else return 0;
        } 
        else return 0;
    });
    return array;
}
function generateKlicks5(){
    var array = new Array(144).fill(0);
    array = array.map((e,i) => {
        if(i % 8 === 2) return 1;
        else return 0;
    });
    return array;
}
function generateKlicks1(){
    var array = new Array(144).fill(0);
    array = array.map((e,i) => {
        if(i % 8 === 0) return 1;
        else return 0;
    });
    return array;
}

function generateRF2(){
    var array = new Array(144).fill(0);
    array = array.map((e,i) => {
        if(i % 24 === 4){
            random = Math.random()
            if(random>0.5)return 1
            else return 0;
        }
        else return 0;
    });
    return array;
}

function translateBinarytoTone(array){

    let current = 0;
    var returnArray = array.map((e,i) => {
        if(i<=15){
            current = i;
            return [e, `0:${Math.floor(current/4)}:${i%4}`]
        }
        else if(i>=16 && i<32) {
            current = i-16;
            return [e, `1:${Math.floor(current/4)}:${i%4}`]
        } 
        else if(i>=32 && i<48){
            current = i-32;
            return [e, `2:${Math.floor(current/4)}:${i%4}`]
        }
        else if(i>=48 && i<64){
            current = i-48;
            return [e, `3:${Math.floor(current/4)}:${i%4}`]
        }
        else if(i>=64 && i<80){
            current = i-64;
            return [e, `4:${Math.floor(current/4)}:${i%4}`]
        }
        else if(i>=80 && i<96){
            current = i-80;
            return [e, `5:${Math.floor(current/4)}:${i%4}`]
        }
        else if(i>=96 && i<112){
            current = i-96;
            return [e, `6:${Math.floor(current/4)}:${i%4}`]
        }
        else if(i>=112 && i<128){
            current = i-112;
            return [e, `7:${Math.floor(current/4)}:${i%4}`]
        }
        else{
            current = i-128;
            return [e, `8:${Math.floor(current/4)}:${i%4}`]
        }
    });
        
    returnArray = returnArray.filter(e => e[0] === 1)
    returnArray = returnArray.map((e,i) => [e[1], `C${i}`]);

    return returnArray;
}

function doubleTime(array,amount){

    for(let i = 0; i < amount; i++){
        const random = Math.floor(Math.random()*72) * 2 -1;
        array[random] = 1;
    }
    return array;
}

generateButton.addEventListener('click', async () => {

    volMaster.volume.value = -100;
    await start();
    volMaster.volume.rampTo(6,3);
    if(rhythmDensity===5) await reverbRF2.ready;
    

    ////////////LOAD AUDIO SAMPLES----------------------------------------------------------------------------------------
    await bufferKick1.load(audioFileUrlKick1);
    await bufferKick2.load(audioFileUrlKick2);
    await bufferKick3.load(audioFileUrlKick3);
    await bufferKick4.load(audioFileUrlKick4);
    await bufferBass101.load(audioFileUrlBass101);
    await bufferBass102.load(audioFileUrlBass102);
    await bufferBass103.load(audioFileUrlBass103);
    await bufferBass104.load(audioFileUrlBass104);
    await bufferBass105.load(audioFileUrlBass105);
    await bufferKlick1.load(audioFileUrlKlick1);
    await bufferKlick2.load(audioFileUrlKlick2);
    await bufferKlick3.load(audioFileUrlKlick3);
    await bufferKlick4.load(audioFileUrlKlick4);
    await bufferKlick5.load(audioFileUrlKlick5);
    await bufferKlick6.load(audioFileUrlKlick6);
    await bufferKlick7.load(audioFileUrlKlick7);
    await bufferKlick8.load(audioFileUrlKlick8);
    await bufferKlick9.load(audioFileUrlKlick9);
    await bufferKlick10.load(audioFileUrlKlick10);
    await bufferKlick11.load(audioFileUrlKlick11);
    await bufferKlick12.load(audioFileUrlKlick11);
    await bufferKlick12.load(audioFileUrlKlick12);
    await bufferKlick13.load(audioFileUrlKlick13);
    await bufferKlick14.load(audioFileUrlKlick14);
    await bufferKlick15.load(audioFileUrlKlick15);
    await bufferKlick16.load(audioFileUrlKlick16);

    ////////////GENERATE KICK----------------------------------------------------------------------------------------
    let flag = 0;
    let generatedBar1Kick;
    let generatedBar2Kick;
    let generatedBar3Kick;
    let generatedBar4Kick;
    let generatedBar5Kick;
    let generatedBar6Kick;
    let generatedBar7Kick;
    let generatedBar8Kick;
    let generatedBar9Kick;

    if(rhythmDensity===4){
        generatedBar1Kick = kickRhythm2(bar1Kick,flag);
        flag = checklastTrigger(generatedBar1Kick);
        generatedBar2Kick = kickRhythm2(bar2Kick,flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar3Kick = kickRhythm2(bar3Kick,flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar4Kick = kickRhythm2(bar4Kick,flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar5Kick = kickRhythm2(bar5Kick,flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar6Kick = kickRhythm2(bar6Kick,flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar7Kick = kickRhythm2(bar7Kick,flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar8Kick = kickRhythm2(bar8Kick,flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar9Kick = kickRhythm2(bar9Kick,flag);
        flag = checklastTrigger(generatedBar2Kick);
    }
    if(rhythmDensity===8){
        generatedBar1Kick = kickRhythm2(bar1Kick,flag);
        flag = checklastTrigger(generatedBar1Kick);
        generatedBar2Kick = kickRhythm2(bar2Kick,flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar3Kick = kickRhythm2(bar3Kick,flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar4Kick = kickRhythm2(bar4Kick,flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar5Kick = kickRhythm2(bar5Kick,flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar6Kick = kickRhythm2(bar6Kick,flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar7Kick = kickRhythm2(bar7Kick,flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar8Kick = kickRhythm2(bar8Kick,flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar9Kick = kickRhythm2(bar9Kick,flag);
        flag = checklastTrigger(generatedBar2Kick);
    }
    else {
        generatedBar1Kick = kickRhythm(bar1Kick,flag);
        flag = checklastTrigger(generatedBar1Kick);
        generatedBar2Kick = kickRhythm(bar2Kick,flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar3Kick = kickRhythm(bar3Kick,flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar4Kick = kickRhythm(bar4Kick,flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar5Kick = kickRhythm(bar5Kick,flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar6Kick = kickRhythm(bar6Kick,flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar7Kick = kickRhythm(bar7Kick,flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar8Kick = kickRhythm(bar8Kick,flag);
        flag = checklastTrigger(generatedBar2Kick);
        generatedBar9Kick = kickRhythm(bar9Kick,flag);
        flag = checklastTrigger(generatedBar2Kick);
    }

    
    const fullgeneratedKick = generatedBar1Kick.concat(generatedBar2Kick,generatedBar3Kick,generatedBar4Kick,generatedBar5Kick,generatedBar6Kick,generatedBar7Kick,generatedBar8Kick,generatedBar9Kick);
    const fullKickOutput = [generatedBar1Kick, generatedBar2Kick, generatedBar3Kick,generatedBar4Kick,generatedBar5Kick,generatedBar6Kick,generatedBar7Kick,generatedBar8Kick,generatedBar9Kick];

    ////////////GENERATE BASS----------------------------------------------------------------------------------------
    flag = 0;

    let generatedBar1Bass;
    let generatedBar2Bass;
    let generatedBar3Bass;
    let generatedBar4Bass;
    let generatedBar5Bass;
    let generatedBar6Bass;
    let generatedBar7Bass;
    let generatedBar8Bass;
    let generatedBar9Bass;

    if(rhythmDensity===8){
        generatedBar1Bass = bassRhythm2(bar1Bass,fullKickOutput[0],flag);
        flag = checklastTrigger(generatedBar1Bass);
        generatedBar2Bass = bassRhythm2(bar2Bass,fullKickOutput[1],flag);
        flag = checklastTrigger(generatedBar2Bass);
        generatedBar3Bass = bassRhythm2(bar3Bass,fullKickOutput[2],flag);
        flag = checklastTrigger(generatedBar3Bass);
        generatedBar4Bass = bassRhythm2(bar4Bass,fullKickOutput[3],flag);
        flag = checklastTrigger(generatedBar4Bass);
        generatedBar5Bass = bassRhythm2(bar5Bass,fullKickOutput[4],flag);
        flag = checklastTrigger(generatedBar5Bass);
        generatedBar6Bass = bassRhythm2(bar6Bass,fullKickOutput[5],flag);
        flag = checklastTrigger(generatedBar6Bass);
        generatedBar7Bass = bassRhythm2(bar7Bass,fullKickOutput[6],flag);
        flag = checklastTrigger(generatedBar7Bass);
        generatedBar8Bass = bassRhythm2(bar8Bass,fullKickOutput[7],flag);
        flag = checklastTrigger(generatedBar8Bass);
        generatedBar9Bass = bassRhythm2(bar9Bass,fullKickOutput[8],flag);
    }
    else {
        generatedBar1Bass = bassRhythm(bar1Bass,fullKickOutput[0],flag);
        flag = checklastTrigger(generatedBar1Bass);
        generatedBar2Bass = bassRhythm(bar2Bass,fullKickOutput[1],flag);
        flag = checklastTrigger(generatedBar2Bass);
        generatedBar3Bass = bassRhythm(bar3Bass,fullKickOutput[2],flag);
        flag = checklastTrigger(generatedBar3Bass);
        generatedBar4Bass = bassRhythm(bar4Bass,fullKickOutput[3],flag);
        flag = checklastTrigger(generatedBar4Bass);
        generatedBar5Bass = bassRhythm(bar5Bass,fullKickOutput[4],flag);
        flag = checklastTrigger(generatedBar5Bass);
        generatedBar6Bass = bassRhythm(bar6Bass,fullKickOutput[5],flag);
        flag = checklastTrigger(generatedBar6Bass);
        generatedBar7Bass = bassRhythm(bar7Bass,fullKickOutput[6],flag);
        flag = checklastTrigger(generatedBar7Bass);
        generatedBar8Bass = bassRhythm(bar8Bass,fullKickOutput[7],flag);
        flag = checklastTrigger(generatedBar8Bass);
        generatedBar9Bass = bassRhythm(bar9Bass,fullKickOutput[8],flag);
    }
 

    const fullgeneratedBass = generatedBar1Bass.concat(generatedBar2Bass,generatedBar3Bass,generatedBar4Bass,generatedBar5Bass,generatedBar6Bass,generatedBar7Bass,generatedBar8Bass,generatedBar9Bass);

    /////////////GENERATE RHYTHM FIGURE 1----------------------------------------------------------------------------------------
    flag = 0;
    const generatedRhythmFigure1Bar1 = RhythmFigures(bar1RhythmFigure1,flag);
    flag = checklastTrigger(generatedRhythmFigure1Bar1);
    const generatedRhythmFigure1Bar2 = RhythmFigures(bar2RhythmFigure1,flag);
    flag = checklastTrigger(generatedRhythmFigure1Bar2);
    const generatedRhythmFigure1Bar3 = RhythmFigures(bar3RhythmFigure1,flag);
    flag = checklastTrigger(generatedRhythmFigure1Bar2);
    const generatedRhythmFigure1Bar4 = RhythmFigures(bar4RhythmFigure1,flag);
    flag = checklastTrigger(generatedRhythmFigure1Bar2);
    const generatedRhythmFigure1Bar5 = RhythmFigures(bar5RhythmFigure1,flag);
    flag = checklastTrigger(generatedRhythmFigure1Bar2);
    const generatedRhythmFigure1Bar6 = RhythmFigures(bar6RhythmFigure1,flag);
    flag = checklastTrigger(generatedRhythmFigure1Bar2);
    const generatedRhythmFigure1Bar7 = RhythmFigures(bar7RhythmFigure1,flag);
    flag = checklastTrigger(generatedRhythmFigure1Bar2);
    const generatedRhythmFigure1Bar8 = RhythmFigures(bar8RhythmFigure1,flag);
    flag = checklastTrigger(generatedRhythmFigure1Bar2);
    const generatedRhythmFigure1Bar9 = RhythmFigures(bar9RhythmFigure1,flag);

    const fullgeneratedRhythmFigure1 = generatedRhythmFigure1Bar1.concat(generatedRhythmFigure1Bar2,generatedRhythmFigure1Bar3,generatedRhythmFigure1Bar4,generatedRhythmFigure1Bar5,generatedRhythmFigure1Bar6,generatedRhythmFigure1Bar7,generatedRhythmFigure1Bar8,generatedRhythmFigure1Bar9);

    /////////////GENERATE RHYTHM FIGURE 2----------------------------------------------------------------------------------------
    const fullgeneratedRhythmFigure2 = generateRF2();

    /////////////GENERATE KLICKS-------------------------------------------------------------------------------------------------
    var fullgeneratedKlicks
    if(rhythmDensity===0) {
        fullgeneratedKlicks = generateKlicks2();
        fullgeneratedKlicks = doubleTime(fullgeneratedKlicks,2);
    }
    if(rhythmDensity===1) {
        fullgeneratedKlicks = generateKlicks3();
    }
    if(rhythmDensity===2) {
        fullgeneratedKlicks = generateKlicks5();
    }
    if(rhythmDensity===3) {
        let random = Math.ceil( Math.random()*5);
        if(random === 1) fullgeneratedKlicks = generateKlicks1();
        else if(random === 2 )fullgeneratedKlicks = generateKlicks2();
        else if(random === 3 )fullgeneratedKlicks = generateKlicks3();
        else if(random === 4 )fullgeneratedKlicks = generateKlicks5();
        else fullgeneratedKlicks = generateKlicks2();
        fullgeneratedKlicks = doubleTime(fullgeneratedKlicks,2);
    }
    if(rhythmDensity===4) {
        let random = Math.ceil( Math.random()*4);
        if(random === 1) fullgeneratedKlicks = generateKlicks1();
        else if(random === 2 )fullgeneratedKlicks = generateKlicks2();
        else if(random === 3 )fullgeneratedKlicks = generateKlicks3();
        else fullgeneratedKlicks = generateKlicks5();
        fullgeneratedKlicks = doubleTime(fullgeneratedKlicks,2);
    }
    if(rhythmDensity===5) {
        fullgeneratedKlicks = generateKlicks3();
        fullgeneratedKlicks = doubleTime(fullgeneratedKlicks,2);
        klickMasterGain.volume.value = -5;
        reverbKlickVolume.volume.value = -10;
    }
    if(rhythmDensity===6) {
        fullgeneratedKlicks = generateKlicks3();
        fullgeneratedKlicks = doubleTime(fullgeneratedKlicks,2);
        klickMasterGain.volume.value = -5;
        reverbKlickVolume.volume.value = -10;
    }
    if(rhythmDensity===7) {
        let random = Math.ceil( Math.random()*4);
        if(random === 1) fullgeneratedKlicks = generateKlicks1();
        //else if(random === 2 )fullgeneratedKlicks = generateKlicks1();
        else if(random === 3 )fullgeneratedKlicks = generateKlicks3();
        else fullgeneratedKlicks = generateKlicks5();
        
    }
    if(rhythmDensity===8) {
        let random = Math.ceil( Math.random()*7);
        if(random === 1) fullgeneratedKlicks = generateKlicks1();
        else if(random === 2 )fullgeneratedKlicks = generateKlicks2();
        else if(random === 3 )fullgeneratedKlicks = generateKlicks3();
        else if(random === 4 )fullgeneratedKlicks = generateKlicks5();
        else fullgeneratedKlicks = generateKlicks2();
    }

    /////////////PLAY KICKS-------------------------------------------------------------------------------------------------
    function playKick(time, note) {
        const random = Math.ceil(Math.random()*4);
        if(random === 3) playerKick1.start(time);
        else if(random === 2) playerKick2.start(time);
        else if (random === 1) playerKick3.start(time);
        else  playerKick4.start(time);
    };
    
    const patternKick = translateBinarytoTone(fullgeneratedKick);
    const partKick = new Part(playKick, patternKick);
    partKick.loopEnd = '9:0:0';
    partKick.loop = true;

    if(rhythmDensity===6){
        playerKick1.playbackRate = 20;
        playerKick2.playbackRate = 20;
        playerKick3.playbackRate = 20;
        playerKick4.playbackRate = 20;
    }

    /////////////PLAY BASS-------------------------------------------------------------------------------------------------
    function playBass(time, note) {
        const random = Math.ceil(Math.random()*5);
        if(random === 5) playerBass.start(time);
        else if(random === 4) playerBass2.start(time);
        else if(random === 3) playerBass4.start(time);
        else if(random === 2) playerBass5.start(time);
        else playerBass3.start(time);
    };

    const patternBass = translateBinarytoTone(fullgeneratedBass);
    const partBass = new Part(playBass, patternBass);
    partBass.loopEnd = '9:0:0';
    partBass.loop = true;

    /////////////PLAY RHYTHM FIGURE 1-------------------------------------------------------------------------------------------------
    function playRhythmFigure1(time, note) {
        envRhythmFigure1.decay = generateRandom(0.2,1)
        if(rhythmDensity===1){
            random = Math.random()
            envRhythmFigure1Noise.attack = generateRandom(0.01,0.05)
            if(random>0.1) envRhythmFigure1Noise.decay = generateRandom(0.02,0.06)
            else envRhythmFigure1Noise.decay = generateRandom(0.2,0.4)
            
        }
        else envRhythmFigure1Noise.decay = generateRandom(0.2,0.8)
        envRhythmFigure1Noise.triggerAttackRelease(time);
        envRhythmFigure1.triggerAttackRelease(time);
        console.log(limiter.reduction);
    };

    gainsRythmFigure1 = gainsRythmFigure1.map((item,index) => {
        return (new Gain({gain: exponentialGain(index,15,200)}).connect(envRhythmFigure1)); //connect(env)
    });

    const gainNoiseRhythmFigure1 = new Gain(0.2).connect(envRhythmFigure1Noise);
    const noiseRhythmFigure1 = new Noise("pink").connect(gainNoiseRhythmFigure1).start();

    if (rhythmDensity===0){
        masterRhythmFigureGain1.volume.value = -100;
        bitCrusherNoise.wet.value = 0.3;
        masterNoiseGain.volume.value = 3;
    }

    if (rhythmDensity===1){
        oscillatorRhythmFigure1 = oscillatorRhythmFigure1.map((item,index) => {
            return (new Oscillator({frequency: frequenciesDrei[index], type: "sine"})).connect(gainsRythmFigure1[index]).start();
        });
        distortionNoise.wet.value = 1;
        masterNoiseGain.volume.value = -5;
        noiseRhythmFigure1.type = 'white'
        masterRhythmFigureGain1.volume.value = -100;
    }

    else if (rhythmDensity===3) {
        masterNoiseGain.volume.value = -6;
        //masterRhythmFigureGain1.volume.value=6;
        oscillatorRhythmFigure1 = oscillatorRhythmFigure1.map((item,index) => {
            return (new Oscillator({frequency: frequenciesRF13[index], type: "sine"})).connect(gainsRythmFigure1[index]).start();
        });
    }

    else {
        oscillatorRhythmFigure1 = oscillatorRhythmFigure1.map((item,index) => {
            return (new Oscillator({frequency: frequenciesRF1[index], type: "sine"})).connect(gainsRythmFigure1[index]).start();
        });
    }

    const patternRhythmFigure1 = translateBinarytoTone(fullgeneratedRhythmFigure1);
    const partRhythmFigure1 = new Part(playRhythmFigure1, patternRhythmFigure1);
    partRhythmFigure1.loopEnd = '9:0:0';
    partRhythmFigure1.loop = true;

    /////////////PLAY RHYTHM FIGURE 2-------------------------------------------------------------------------------------------------
    function playRhythmFigure2(time, note) {
        gainsRythmFigure2.forEach(
            (e,i) => {
                e.gain.rampTo(exponentialGain(i, numberofSineDrone, 800),ramptime);
            });
        envRhythmFigure2.triggerAttackRelease(time,"8n");
    };

    gainsRythmFigure2 = gainsRythmFigure2.map((item,index) => {
        return (new Gain({gain: exponentialGain(index,32,500)}).connect(envRhythmFigure2)); //connect(env)
    });

    oscillatorRhythmFigure2 = oscillatorRhythmFigure2.map((item,index) => {
        return (new Oscillator({frequency: frequenciesZwei[index], type: "sine"})).connect(gainsRythmFigure2[index]).start();
    });

    const patternRhythmFigure2 = translateBinarytoTone(fullgeneratedRhythmFigure2);
    const partRhythmFigure2 = new Part(playRhythmFigure2, patternRhythmFigure2);
    partRhythmFigure2.loopEnd = '9:0:0';
    partRhythmFigure2.loop = true;
    
    /////////////PLAY KLICK-------------------------------------------------------------------------------------------------
    function playKlick(time, note) {
        const random = Math.floor(Math.random()*16);
        const random2 = Math.floor(Math.random()*3);
        if (random === 0) playerKlick1.start(time);
        if (random === 1) playerKlick2.start(time);
        if (random === 2) playerKlick3.start(time);
        if (random === 3) playerKlick4.start(time);
        if (random === 4) playerKlick5.start(time);
        if (random === 5) playerKlick6.start(time);
        if (random === 6) playerKlick7.start(time);
        if (random === 7) playerKlick8.start(time);
        if (random === 8) playerKlick9.start(time);
        if (random === 9) playerKlick10.start(time);
        if (random === 10) playerKlick11.start(time);
        if (random === 11) playerKlick12.start(time);
        if (random === 12) playerKlick13.start(time);
        if (random === 13) playerKlick14.start(time);
        if (random === 14) playerKlick15.start(time);
        if (random === 15) playerKlick16.start(time);

        if (rhythmDensity===7){
            if (random2 === 0){
                reverbKlickVolume.volume.value =  generateRandom(-30,-15);
                delayKlick.delayTime.value = '4n'
            }
            if (random2 === 1){
                reverbKlickVolume.volume.value =  generateRandom(-40,-15);
                delayKlick.delayTime.value = '8n'
            }
            if (random2 === 2){
                reverbKlickVolume.volume.value =  generateRandom(-40,-15);
                delayKlick.delayTime.value = '2n'
            }
        }
    };

    current = 0;
    var patternKlick = translateBinarytoTone(fullgeneratedKlicks);
    const partKlick = new Part(playKlick, patternKlick);
    partKlick.loopEnd = '3:0:0';
    partKlick.loop = true;


    /////////////PLAY DRONE-------------------------------------------------------------------------------------------------
    
    let ramptime = 0.6;
    let numberofSineDrone = 15;
    let amplitudeLFODrone = 0;
    let minLFODrone = 0;
    let freqLFO = '4n'
    const droneTrigger = [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0];
    let droneTriggerGains =  [...Array(144)];

    if(rhythmDensity===0){
        numberofSineDrone = 25;
        ramptime = 0.1;
        amplitudeLFODrone = 0.8;
        minLFODrone = 0.2;
        masterVolumeDrone.volume.value = 0;
        freqLFO = '8n'
    }
    if(rhythmDensity===1){
        numberofSineDrone = 15;
        amplitudeLFODrone = 0;
        masterVolumeDrone.volume.value = 5;
        klickMasterGain.volume.value = 6;
    }
    if(rhythmDensity===2){
        numberofSineDrone = 15;
        ramptime = 4;
        amplitudeLFODrone = 0.4;
        minLFODrone = 0.2;
        masterVolumeDrone.volume.value = 0;
        freqLFO = '1n'
    }
    if(rhythmDensity===3){
        numberofSineDrone = 12;
        ramptime = 1;
        masterRhythmFigureGain1.volume.value = 20;
        masterVolumeDrone.volume.value = 2;
        droneTriggerGains =            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }
    if(rhythmDensity===4){
        random = Math.random()
        if(random>0.5) droneTriggerGains = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        else droneTriggerGains = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }
    if(rhythmDensity===5){
        masterRhythmFigureGain2.volume.value = 0;
        amplitudeLFODrone = 0;
        masterVolumeDrone.volume.value = 2;
        random = Math.random()
        if(random>0.5) droneTriggerGains = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        else droneTriggerGains = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }
    if(rhythmDensity===6){
        masterRhythmFigureGain2.volume.value = 0;
        amplitudeLFODrone = 0;
        masterVolumeDrone.volume.value = 2;
        random = Math.random()
        if(random>0.5) droneTriggerGains = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        else droneTriggerGains = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }
    if(rhythmDensity===7){
        ramptime = 5;
        numberofSineDrone = 10;
        amplitudeLFODrone = 0.2;
        minLFODrone = 0.2;
        freqLFO = '1n'
        masterVolumeDrone.volume.value = 2;
        droneTriggerGains = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }
    if(rhythmDensity===8){
        masterRhythmFigureGain2.volume.value = 0;
        amplitudeLFODrone = 0;
        masterVolumeDrone.volume.value = 3;
        random = Math.random()
        ramptime = 5;
        if(random>0.5) droneTriggerGains = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        else droneTriggerGains = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }

    function playDrone(time, note) {
        var length;
        var random = Math.ceil( Math.random()*3);
        if(random===1) length = '2n'
        else if(random===2) length = '3n'
        else if(random===3) length = '4n'
        if(rhythmDensity===0) envDrone.triggerAttackRelease(time, length);
    };

    function playDroneGains(time, note) {
        gainsDrone.forEach(
        (e,i) => {
            e.gain.rampTo(exponentialGain(i, numberofSineDrone, 800),ramptime);
        });
    };

    gainsDrone = gainsDrone.map((item,index) => {
    return (new Gain({gain: exponentialGain(index,numberofSineDrone,800)}).connect(masterDroneGain)); //connect(env)
    });
    
    if(rhythmDensity===0){
        oscillatorDrone = oscillatorDrone.map((item,index) => {
            return (new Oscillator({frequency: frequenciesDrone[index],type: "sine"})).connect(gainsDrone[index]).start();
        });
    }
    else if(rhythmDensity===1){
        oscillatorDrone = oscillatorDrone.map((item,index) => {
            return (new Oscillator({frequency: frequenciesZwei[index],type: "sine"})).connect(gainsDrone[index]).start();
        });
    }
    else if(rhythmDensity===2){
        oscillatorDrone = oscillatorDrone.map((item,index) => {
            return (new Oscillator({frequency: frequenciesDrei[index],type: "sine"})).connect(gainsDrone[index]).start();
        });
    }
    else if(rhythmDensity === 3){
        let random = Math.random()
        oscillatorDrone = oscillatorDrone.map((item,index) => {
            return (new Oscillator({frequency: frequenciesDrei[index],type: "sine"})).connect(gainsDrone[index]).start();
        });
        const noiseDroneVolume = new Volume(-50).connect(masterGain);
        const noiseDroneFilter = new BiquadFilter(2000, 'highpass').connect(noiseDroneVolume);
        const noiseDrone = new Noise('pink').connect(noiseDroneFilter).start();
        const noiseDroneLFO =  new LFO({frequency: 0.1, min: 1000, max: 4500, amplitude: 1, phase: 0}).connect(noiseDroneFilter.frequency).start();

    }
    else if(rhythmDensity === 4){
        oscillatorDrone = oscillatorDrone.map((item,index) => {
            return (new Oscillator({frequency: frequenciesDrei[index],type: "sine"})).connect(gainsDrone[index]).start();
        });
        const noiseDroneVolume = new Volume(-50).connect(masterGain);
        const noiseDroneFilter = new BiquadFilter(2000, 'highpass').connect(noiseDroneVolume);
        const noiseDrone = new Noise('pink').connect(noiseDroneFilter).start();
        const noiseDroneLFO =  new LFO({frequency: 0.1, min: 1000, max: 6000, amplitude: 1, phase: 0}).connect(noiseDroneFilter.frequency).start();
    }
    else if(rhythmDensity === 5){
        oscillatorDrone = oscillatorDrone.map((item,index) => {
            return (new Oscillator({frequency: frequenciesDrei[index],type: "sine"})).connect(gainsDrone[index]).start();
        });
        const noiseDroneVolume = new Volume(-37).connect(masterGain);
        const noiseDroneFilter = new BiquadFilter(2000, 'highpass').connect(noiseDroneVolume);
        const noiseDrone = new Noise('pink').connect(noiseDroneFilter).start();
        const noiseDroneLFO =  new LFO({frequency: 0.1, min: 1000, max: 6000, amplitude: 1, phase: 0}).connect(noiseDroneFilter.frequency).start();
    }
    else if(rhythmDensity === 6){
        oscillatorDrone = oscillatorDrone.map((item,index) => {
            return (new Oscillator({frequency: frequenciesDrei[index],type: "sine"})).connect(gainsDrone[index]).start();
        });
        const noiseDroneVolume = new Volume(-37).connect(masterGain);
        const noiseDroneFilter = new BiquadFilter(2000, 'highpass').connect(noiseDroneVolume);
        const noiseDrone = new Noise('pink').connect(noiseDroneFilter).start();
        const noiseDroneLFO =  new LFO({frequency: 0.1, min: 1000, max: 6000, amplitude: 1, phase: 0}).connect(noiseDroneFilter.frequency).start();
    }
    else if(rhythmDensity === 7){
        oscillatorDrone = oscillatorDrone.map((item,index) => {
            return (new Oscillator({frequency: frequenciesDrei[index],type: "sine"})).connect(gainsDrone[index]).start();
        });
        const noiseDroneVolume = new Volume(-37).connect(masterGain);
        const noiseDroneFilter = new BiquadFilter(2000, 'highpass').connect(noiseDroneVolume);
        const noiseDrone = new Noise('pink').connect(noiseDroneFilter).start();
        const noiseDroneLFO =  new LFO({frequency: 0.1, min: 5500, max: 6000, amplitude: 1, phase: 0}).connect(noiseDroneFilter.frequency).start();
    }
    else if(rhythmDensity === 8){
        oscillatorDrone = oscillatorDrone.map((item,index) => {
            return (new Oscillator({frequency: frequenciesDrei[index],type: "sine"})).connect(gainsDrone[index]).start();
        });
        const noiseDroneVolume = new Volume(-40).connect(masterGain);
        const noiseDroneFilter = new BiquadFilter(2000, 'highpass').connect(noiseDroneVolume);
        const noiseBitcrusherVolume = new Volume(-2).connect(noiseDroneVolume);
        const noiseBitcrusher = new BitCrusher(10).connect(noiseBitcrusherVolume);
        const noiseDistortionVolume = new Volume(-4).connect(noiseDroneVolume);
        const noiseDistortion = new Distortion(1).connect(noiseDistortionVolume);
        const noiseDrone = new Noise('pink').connect(noiseDroneFilter).connect(noiseBitcrusher).connect(noiseDistortion).start();
        const noiseDroneLFO =  new LFO({frequency: 0.1, min: 4000, max: 6000, amplitude: 1, phase: 0}).connect(noiseDroneFilter.frequency).start();
    }

    const lfoDrone = new LFO({frequency: freqLFO, min: 0, max: 1, amplitude: amplitudeLFODrone, phase: 125}).connect(masterDroneGain.gain).start();
    lfoDrone.min = minLFODrone;

    const patternDrone = translateBinarytoTone(droneTrigger);
    const partDrone = new Part(playDrone, patternDrone);
    partDrone.loopEnd = '12:0:0';
    partDrone.loop = true;

    const patternDroneGains = translateBinarytoTone(droneTriggerGains);
    const partDroneGains = new Part(playDroneGains, patternDroneGains);
    partDroneGains.loopEnd = '9:0:0';
    partDroneGains.loop = true;

    /////////////SET Interface Slide-------------------------------------------------------------------------------------------------
    const bar = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    const quarterNote = [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0];
    sequencer.matrix.set.row(0,bar);
    sequencer.matrix.set.row(1,quarterNote);
    sequencer.matrix.set.row(2,fullgeneratedKick);
    sequencer.matrix.set.row(3,fullgeneratedBass);
    sequencer.matrix.set.row(4,fullgeneratedRhythmFigure1);
    sequencer.matrix.set.row(5,fullgeneratedRhythmFigure2);
    sequencer.matrix.set.row(6,fullgeneratedKlicks);


    
    /////////////PLAY BEAT-------------------------------------------------------------------------------------------------
    console.log('BPM: '+ Transport.bpm.value);
    if(rhythmDensity==3){
        partKick.start();
        partBass.start();
        partRhythmFigure1.start();
        masterRhythmFigureGain1.volume.value = 0;
        noiseRhythmFigure1.volume.value = 0;
        //partRhythmFigure2.start();
        partKlick.start();
        partDrone.start();
        partDroneGains.start();

    }
    if(rhythmDensity==4){
        partKick.start();
        partBass.start();
        partRhythmFigure1.start();
        partRhythmFigure2.start();
        partKlick.start();
        partDrone.start();
        partDroneGains.start();
    }
    if (rhythmDensity===5){
        partKlick.start();
        partBass.start();
        partRhythmFigure2.start();
        partDroneGains.start();
    }
    if (rhythmDensity===6){
        kickMasterGain.volume.value = -100;
        biquadKickVolume.volume.value = -10;
        partKick.start();
        partBass.start();
        partKlick.start();
        partRhythmFigure2.start();
        partDroneGains.start();
    }
    if (rhythmDensity===7){
        delayKlickVolume.volume.value = -10;
        masterVolumeDrone .volume.value = 8; //6
        partKick.start();
        partBass.start();
        partKlick.start();
        //partRhythmFigure1.start();
        partDroneGains.start();
        partDrone.start();
    }
    if (rhythmDensity===8){
        bassMasterGain.volume.value = 2;
        partKick.start();
        partBass.start();
        partKlick.start();
        //partRhythmFigure2.start();
        partDroneGains.start();
    }
    

});

