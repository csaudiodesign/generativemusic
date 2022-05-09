"use strict";
//import * as Tone from 'tone';

import { start, MidiClass, Oscillator, Gain, Transport, AmplitudeEnvelope, Synth, Offline, ToneAudioBuffer, Player} from 'tone';
import * as Nexus from 'nexusui';

//import files
import audioFileUrlKick1 from 'url:./samples/kick01.mp3';
import audioFileUrlKick2 from 'url:./samples/kick02.mp3';
import audioFileUrlKick3 from 'url:./samples/kick03.mp3';

import audioFileUrlBass101 from 'url:./samples/bass101.mp3';
import audioFileUrlBass102 from 'url:./samples/bass102.mp3';
import audioFileUrlBass103 from 'url:./samples/bass103.mp3';

//initialize kicks into buffer
const bufferKick1 = new ToneAudioBuffer();
const bufferKick2 = new ToneAudioBuffer();
const bufferKick3 = new ToneAudioBuffer();

const bufferBass101 = new ToneAudioBuffer();
const bufferBass102 = new ToneAudioBuffer();
const bufferBass103 = new ToneAudioBuffer();

//Sequencer Interface
var sequencer = new
Nexus.Sequencer('#seq',{
    'size': [750,150],
    'mode': 'toggle',
    'rows': 5,
    'columns': 48,
   });
sequencer.colorize("fill","#808080")
sequencer.colorize("accent","#000000")

//initialize array


//const buffer = new ToneAudioBuffer();
let oscillator1 = [...Array(32)]; // player voices
let gains = [...Array(32)];
let randomGainValues= [...Array(32)];
let exponentialGainValues = [...Array(32)];
let arrayTest = [...Array(32)];
let frequencies =  [...Array(32)];
let offsetFRQ = 5;
const synth = new Synth().toDestination();

Transport.bpm.value = 80;

const startButton = document.getElementById('start');
//const stopButton = document.getElementById('stop');
//const newRandomGainsButton = document.getElementById('init');

/*document.getElementById('init').addEventListener('click', () => {
    console.log('blubb');
})*/

frequencies.forEach((item,index) => {
    frequencies[index] = MidiClass.mtof(MidiClass.ftom(Math.pow(index +offsetFRQ,2)));
});

//console.log(frequencies);

function exponentialGains(index){
    let scaledIndex = index / 32;
    exponentialGainValues [index] = Math.round(Math.pow(scaledIndex-1,2)*100)/1000;
    arrayTest[index] = exponentialGainValues [index] * Math.round(Math.random()*10)/10;

    return (arrayTest[index]);
}

function randomGains (index){
    randomGainValues[index] = Math.round(Math.random()*10)/1000;
    return (randomGainValues[index]);
};

const env = new AmplitudeEnvelope({
    attack: 0.1,
    decay: 0.2,
    sustain: 1.0,
    release: 0.8,
}).toDestination();

function shuffle(array) {
    //const r = (from = 0, to = 1) => from + Math.random() * (to - from);
	var m = array.length,
		t,
		i;
	while (m) {
		i = Math.floor(Math.random() * m--); 
		t = array[m]; // temporary storage
		array[m] = array[i];
		array[i] = t;
	}

	return array;
}

function kickRhythm(array){

    while(true) {
        array = shuffle(array);
        if (array.every((e,i) => {
            if(e === 1) return i % 2 === 0;
            else return true; // wenns kein schlag ist alles gut, soll weither ggehen
        })) {
            break;
        }
    }
    sequencer.matrix.set.row(2,array);

};

/*function bassRhythm1(){

};*/

startButton.addEventListener('click', async () => {
    await start();
    Transport.start();

    const bar = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    const quarterNote = [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0];

    const bar1Kick = [1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0];
    const bar2Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    const bar4Kick = [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    sequencer.matrix.set.row(0,bar);
    sequencer.matrix.set.row(1,quarterNote);
    

    kickRhythm(bar1Kick);
    //bassRhythm1()


    await bufferKick1.load(audioFileUrlKick1);
    await bufferKick2.load(audioFileUrlKick2);
    await bufferKick3.load(audioFileUrlKick3);

    await bufferBass101.load(audioFileUrlBass101);
    await bufferBass102.load(audioFileUrlBass102);
    await bufferBass103.load(audioFileUrlBass103);



    const player = new Player(bufferKick1).toDestination();
    player.loop = true;
    //player.start();

    gains = gains.map((item,index) => {
        return (new Gain({gain: exponentialGains(index)}).connect(env)); //connect(env)
    });

    /*oscillator1 = oscillator1.map((item,index) => {
        return (new Oscillator({frequency: frequencies[index], type: "sine"})).connect(gains[index]).start();
    });*/

    //console.log(exponentialGainValues);
    //console.log(arrayTest);
    //console.log(randomGainValues);

  });

Transport.scheduleRepeat((time) => {
	// use the callback time to schedule events
	env.triggerAttackRelease('16n',time);
}, "8n");