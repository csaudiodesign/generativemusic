import { Gain, EQ3, Players, Reverb,FeedbackDelay} from "tone";

function doubleTime(array, amount) {

    for (let i = 0; i < amount; i++) {
        const random = Math.floor(Math.random() * 72) * 2 - 1;
        array[random] = 1;
    }
    return array;
}

function converto2Dto1D(array){
    var newArr = [];
    for(var i = 0; i < array.length; i++)
    {
        newArr = newArr.concat(array[i]);
    }
    return newArr;
}

/*
1. Rule: Klicks düfren überall laden
2. Rule: Klicks werden in zwei Gruppen abwechselnd abgespielt
3. Rule: Wenn Gruppe1(Klicks werde nicht gepielt, Pause) dann wird bis zu 4 Schläge lang keine Klicks abgespielt
4. Rule: Wenn Gruppe2(Klicks werden gepielt) dann werden bis zu 6 Klicks hintereinander abgespielt
5. Rule: Wenn Gruppe2(Klicks werden gepielt) dann werden kommt danach immer Gruppe1 mit einer Pause
6. Rule: Länge von beiden Gruppen sind zufällig
*/
function generateKlicks2() {
    var array = new Array(144).fill(0);
    array = array.map((e, i) => {
        if (i % 2 === 0) return 1;
        else return 0;
    });
    return array;
}

function generateKlicks3() {
    var array = new Array(144).fill(0);
    array = array.map((e, i) => {
        if (i % 6 === 0) return 1;
        else if (i % 6 === 2) {
            const random = Math.random()
            if (random >= 0.5) return 1;
            else return 0;
        } else return 0;
    });
    return array;
}

function generateKlicks5() {
    var array = new Array(144).fill(0);
    array = array.map((e, i) => {
        if (i % 8 === 2) return 1;
        else return 0;
    });
    return array;
}

function generateKlicks1() {
    var array = new Array(144).fill(0);
    array = array.map((e, i) => {
        if (i % 8 === 0) return 1;
        else return 0;
    });
    return array;
}

function generateKlicks4() {
    var array = new Array(144).fill(0);
    array = array.map((e, i) => {
        if (i % 2 === 1) return 1;
        else return 0;
    });
    return array;
}

function generateRF2() {
    var array = new Array(144).fill(0);
    array = array.map((e, i) => {
        if (i % 24 === 4) {
            random = Math.random()
            if (random > 0.5) return 1
            else return 0;
        } else return 0;
    });
    return array;
}
export class Klicks {

    out;
    kit;

    constructor(volume) {

        this.out = new Gain(volume);
        this.eq = new EQ3(0, 0, 0);
        this.reverb = new Reverb (1);
        this.reverb.wet.value = 0;
        this.delay = new FeedbackDelay('4n', 0.5);
        this.delay.wet.value = 0;

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
            this.kit.chain(this.eq, this.reverb, this.delay, this.out);

        });
    };   
}

export function genrateKlicks (rhythmDensity){
    let fullgeneratedKlicks;

    if (rhythmDensity === 3) {
        let random = Math.ceil(Math.random() * 5);
        if (random === 1) fullgeneratedKlicks = generateKlicks1();
        else if (random === 2) fullgeneratedKlicks = generateKlicks2();
        else if (random === 3) fullgeneratedKlicks = generateKlicks3();
        else if (random === 4) fullgeneratedKlicks = generateKlicks5();
        else fullgeneratedKlicks = generateKlicks2();
        fullgeneratedKlicks = doubleTime(fullgeneratedKlicks, 2);
    }
    else if (rhythmDensity === 4) {
        let random = Math.ceil(Math.random() * 4);
        if (random === 1) fullgeneratedKlicks = generateKlicks1();
        else if (random === 2) fullgeneratedKlicks = generateKlicks2();
        else if (random === 3) fullgeneratedKlicks = generateKlicks3();
        else fullgeneratedKlicks = generateKlicks5();
        fullgeneratedKlicks = doubleTime(fullgeneratedKlicks, 2);
    }
    else if (rhythmDensity === 5) {
        fullgeneratedKlicks = generateKlicks3();
        fullgeneratedKlicks = doubleTime(fullgeneratedKlicks, 2);
    }
    else if (rhythmDensity === 6) {
        fullgeneratedKlicks = generateKlicks3();
        fullgeneratedKlicks = doubleTime(fullgeneratedKlicks, 2);
    }
    else if (rhythmDensity === 7) {
        let random = Math.ceil(Math.random() * 4);
        if (random === 1) fullgeneratedKlicks = generateKlicks1();
        else if (random === 3) fullgeneratedKlicks = generateKlicks3();
        else fullgeneratedKlicks = generateKlicks5();

    }
    else if (rhythmDensity === 8) {
        let random = Math.ceil(Math.random() * 7);
        if (random === 1) fullgeneratedKlicks = generateKlicks1();
        else if (random === 2) fullgeneratedKlicks = generateKlicks2();
        else if (random === 3) fullgeneratedKlicks = generateKlicks3();
        else if (random === 4) fullgeneratedKlicks = generateKlicks5();
        else fullgeneratedKlicks = generateKlicks2();
    }
    else if (rhythmDensity === 9) {
        fullgeneratedKlicks = generateKlicks4();
    }

    return converto2Dto1D(fullgeneratedKlicks);
}
