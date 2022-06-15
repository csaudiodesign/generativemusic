import { ToneAudioBuffer } from 'tone';

const kickFiles = [
    'kick01.mp3',
    'kick02.mp3',
    'kick03.mp3',
    'kick04.mp3'
];

const bassFiles = [
    'bass101.mp3',
    'bass102.mp3',
    'bass103.mp3',
    'bass104.mp3',
    'bass105.mp3'
];

const klickFiles = [
    'klick1.mp3',
    'klick2.mp3',
    'klick3.mp3',
    'klick4.mp3',
    'klick5.mp3',
    'klick6.mp3',
    'klick7.mp3',
    'klick8.mp3',
    'klick9.mp3',
    'klick10.mp3',
    'klick11.mp3',
    'klick12.mp3',
    'klick13.mp3',
    'klick14.mp3',
    'klick15.mp3',
    'klick16.mp3'
];

export const kickSamples = {
    load: function() {
        return new Promise(resolve => {
            const samples = []
            kickFiles.forEach(async (f) => {
                const b = new ToneAudioBuffer();
                await b.load(`samples/${f}`);
                samples.push(b);
            });
            console.log('loaded samples...', samples);
            resolve(samples);
    });
    },
    samples: []
}

export const bassSamples = {
    load: function() {
        return new Promise(resolve => {
            const samples = []
            bassFiles.forEach(async (f) => {
                const b = new ToneAudioBuffer();
                await b.load(`samples/${f}`);
                samples.push(b);
            });
            console.log('loaded samples...');
            resolve(samples);
    });
    },
    samples: []
}

export const klickSamples = {
    load: function() {
        return new Promise(resolve => {
            const samples = []
            klickFiles.forEach(async (f) => {
                const b = new ToneAudioBuffer();
                await b.load(`samples/${f}`);
                samples.push(b);
            });
            console.log('loaded samples...');
            resolve(samples);
    });
    },
    samples: []
}

/* export const bassSamples = {
    load: function() {
        bassFiles.forEach(async (f) => {
            const b = new ToneAudioBuffer();
            await b.load(`samples/${f}`);
            this.samples.push(b);
        });
    },
    samples: []
}

export const klickSamples = {
    load: function() {
        klickFiles.forEach(async (f) => {
            const b = new ToneAudioBuffer();
            await b.load(`samples/${f}`);
            this.samples.push(b);
        });
    },
    samples: []
}


 */