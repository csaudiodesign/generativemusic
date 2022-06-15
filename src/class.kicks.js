import { Gain, EQ3, Sampler } from "tone";

export class Kicks {

    out;
    kit;

    constructor(volume = -3) {

        this.out = new Gain(volume);
        this.eq = new EQ3(0, 0, -2);

        this.kit = new Sampler({
            'C1' : "./samples/kick01.mp3",
            'C#1': "./samples/kick02.mp3",
            'D1' : "./samples/kick03.mp3",
            // 'D#1': "./samples/kick04.mp3",
        }, () => {
            console.log('samples loaded');
            this.kit.chain(this.eq, this.out);

        });
    };   
}
