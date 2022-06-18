import { Volume, EQ3, AmplitudeEnvelope,Gain, Oscillator,MidiClass,Noise,Distortion,BitCrusher} from "tone";

let frequenciesRF1 = [...Array(32)];
let frequenciesRF13 = [...Array(5)];
let oscillatorRhythmFigure1 = [...Array(32)];
let gainsRythmFigure1 = [...Array(32)];

function exponentialGain(index, dropgains, loudnessControl) {
    const scaledIndex = index / 32;
    const random = Math.ceil(Math.random() * 32);
    let exponentialGainValue = Math.round(Math.pow(scaledIndex - 1, 2) * 100) / loudnessControl;
    exponentialGainValue *= Math.round(Math.random() * 10) / 10;

    if (random <= dropgains) return (exponentialGainValue);
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

        console.log('RhyhtmFigure2 ready');
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

        this.env = new AmplitudeEnvelope({
            attack: 0.01,
            decay: 0.3,
            sustain: 0.0,
            release: 0.0,
        })

        this.noise = new Noise("pink").connect(this.env);


        this.env.chain(this.bitcrusher,this.distortion,this.eq, this.out);
    }

}




/* const envRhythmFigure1 = new AmplitudeEnvelope({
    attack: 0.01,
    decay: 0.5,
    sustain: 0.0,
    release: 0.0,
}).connect(masterRhythmFigureGain1); */

/* if (rhythmDensity === 1) {
    oscillatorRhythmFigure1 = oscillatorRhythmFigure1.map((item, index) => {
        return (new Oscillator({
            frequency: frequenciesDrei[index],
            type: "sine"
        })).connect(gainsRythmFigure1[index]).start();
    });
    distortionNoise.wet.value = 1;
    masterNoiseGain.volume.value = -5;
    noiseRhythmFigure1.type = 'white'
    masterRhythmFigureGain1.volume.value = -100;
} else if (rhythmDensity === 3) {
    masterNoiseGain.volume.value = -6;
    //masterRhythmFigureGain1.volume.value=6;
    oscillatorRhythmFigure1 = oscillatorRhythmFigure1.map((item, index) => {
        return (new Oscillator({
            frequency: frequenciesRF13[index],
            type: "sine"
        })).connect(gainsRythmFigure1[index]).start();
    });
} else {
    oscillatorRhythmFigure1 = oscillatorRhythmFigure1.map((item, index) => {
        return (new Oscillator({
            frequency: frequenciesRF1[index],
            type: "sine"
        })).connect(gainsRythmFigure1[index]).start();
    });
} */
