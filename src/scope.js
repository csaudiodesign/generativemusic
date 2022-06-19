import { Waveform} from "tone";
import p5 from 'p5';

function scope() {
 
    sketch = function (p) {
        let ready = false;
        let wave; // this object allows us to draw waveforms
        p.setup = function () {
            p.createCanvas(p.windowWidth, p.windowHeight);


            wave = new Waveform();
            Destination.connect(wave);
        }

        // On window resize, update the canvas size
        p.windowResized = function () {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        };

        p.draw = function () {

            p.background(0);

            if (ready) {

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

        p.mousePressed = function () {
            if (!ready) {
                ready = true;
            } else {
                ready = false;
            }
        }
    };
}

export function running() {
    let myp5 = new p5(scope());
}