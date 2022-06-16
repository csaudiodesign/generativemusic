import { Gain, EQ3, Sampler, Players } from "tone";

export class Klicks {

    out;
    kit;

    constructor(volume) {

        this.out = new Gain(volume);
        this.eq = new EQ3(0, 0, 0);

        this.kit = new Players({
            C1: './samples/klick1.mp3',
            D1: './samples/klick2.mp3',
            E1: './samples/klick3.mp3',
            F1: './samples/klick4.mp3',
            G1: './samples/klick5.mp3',
            A1: './samples/klick6.mp3',
            B1: './samples/klick7.mp3',
            C2: './samples/klick8.mp3',
            D2: './samples/klick9.mp3',
            E2: './samples/klick10.mp3',
            F2: './samples/klick11.mp3',
            G2: './samples/klick12.mp3',
            A2: './samples/klick13.mp3',
            B2: './samples/klick14.mp3',
            C3: './samples/klick15.mp3',
            D3: './samples/klick16.mp3'
        }, () => {
            console.log('Klicks loaded');
            this.kit.chain(this.eq, this.out);

        });
    };   
}
