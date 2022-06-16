import { Gain, EQ3, Sampler, Players } from "tone";

export class Bass {

    out;
    kit;

    constructor(volume) {

        this.out = new Gain(volume);
        this.eq = new EQ3(0, 0, 0);

        this.kit = new Players({
            C1: './samples/bass101.mp3',
            D1: './samples/bass102.mp3',
            E1: './samples/bass103.mp3',
            F1: './samples/bass104.mp3',
            G1: './samples/bass105.mp3'
        }, () => {
            console.log('Bass loaded');
            this.kit.chain(this.eq, this.out);

        });
    };   
}