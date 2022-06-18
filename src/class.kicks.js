import { Volume, EQ3, Sampler,Players, BiquadFilter} from "tone";

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
