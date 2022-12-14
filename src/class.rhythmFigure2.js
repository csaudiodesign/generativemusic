import { Volume, EQ3, AmplitudeEnvelope,Gain, Oscillator,MidiClass,Noise,Distortion,BitCrusher,FeedbackDelay,Reverb, BiquadFilter} from "tone";

let oscillatorRhythmFigure2 = [...Array(32)];
let gains = [...Array(32)];
let frequenciesZwei = [...Array(32)];
const rfx = fxrand;

function exponentialGain(index, dropgains, loudnessControl) {
    const scaledIndex = index / 32;
    const random = Math.ceil(rfx() * 32);
    let exponentialGainValue = Math.round(Math.pow(scaledIndex - 1, 2) * 100) / loudnessControl;
    exponentialGainValue *= Math.round(rfx() * 10) / 10;

    if (random <= dropgains) return (exponentialGainValue);
    else return 0;
}

frequenciesZwei.forEach((item, index) => {
    frequenciesZwei[index] = MidiClass.mtof(MidiClass.ftom(Math.pow(index + 3, 2)));
});

function generateRhythmFigure2() {
    var array = new Array(144).fill(0);
    array = array.map((e, i) => {
        if (i % 24 === 4) {
            let random = rfx()
            if (random > 0.5) return 1
            else return 0;
        } else return 0;
    });
    return array;
}



export class rhythmFigure2 {

    out;
    env;

    constructor(volume) {

        this.out = new Volume(volume);
        //this.eq = new EQ3(0, 0, 0);
        //this.filter = new BiquadFilter(0, 'highpass');
        this.reverb = new Reverb(150);
        this.reverb.wet.value = 0;
        this.delay = new FeedbackDelay('2n', 0.5);
        this.delay.wet.value = 0;
       

        this.env = new AmplitudeEnvelope({
            attack: 0.9,
            decay: 0.01,
            sustain: 1,
            release: 0.01,
        });

        this.gains = gains.map((item, index) => {
            return (new Gain({
                gain: exponentialGain(index, 32, 500)
            }).connect(this.env));
        });

        this.oscillatorRhythmFigure2 = oscillatorRhythmFigure2.map((item, index) => {
            return (new Oscillator({
                frequency: frequenciesZwei[index],
                type: "sine"
            })).connect(this.gains[index])
        });

       //console.log('RhyhtmFigure2 ready');
       //this.env.chain(this.delay,this.reverb, this.filter,this.eq, this.out);
       this.env.chain(this.delay,this.reverb,this.out);

    };   
}

export class rhythmFigure1Noise {

    env;
    out;
    noise;

    constructor(volume){

        this.out = new Volume(volume);
        //this.eq = new EQ3(0, 0, 0);
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
        //this.env.chain(this.bitcrusher,this.distortion,this.eq, this.out);
        this.env.chain(this.bitcrusher,this.distortion,this.out);
    }

}

export function generateRF2(rhythmDensity){
    return generateRhythmFigure2();
}