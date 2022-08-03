"use strict";
import {
    Volume,
    EQ3,
    Limiter,
    Part,
    Oscillator,
    Gain,
    Transport,
    AmplitudeEnvelope,
    context,
    start,
} from 'tone';

import { Kicks } from './class.kicks';
import { Bass } from './class.bass';

import { generateRandom } from './lib';

function startAudio() {
    //////////////////////////////////////////////////////////////////<<DENSITY------------------------------------------------------------------------------
    let rhythmDensity = Math.round(generateRandom(3, 9));

    //////////////////////////////////////////////////////////////////<<MASTER------------------------------------------------------------------------------
    ///////// masterGain -> eq -> volMaster -> limiter -> finalMasterVolume
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

    volMaster.volume.value = -100;

    Transport.bpm.value = 150;

    // them kicks
    const kicks = new Kicks(3, rhythmDensity);
    const masterVolumeKick = new Volume(0).connect(masterGain);
    kicks.out.connect(masterVolumeKick);
    kicks.part.start();
    
    // them basses
    const bass = new Bass(1, rhythmDensity, kicks.baserhythm);
    const bassMasterGain = new Volume(0).connect(masterGain);
    bass.out.connect(bassMasterGain);
    bass.part.start();

    // fade in the shizzle
    volMaster.volume.rampTo(6, 1);
}

function initialize() {
    console.log("Clicked!")
    start();
    Transport.start();
    startAudio();
    window.removeEventListener('click', initialize, false);
}

window.addEventListener('click', initialize);
