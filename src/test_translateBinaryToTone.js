function translateBinarytoTone(array) {

    let current = 0;
    return array
        .map((e, i) => {
            if (i <= 15) {
                current = i;
                return [e, `0:${Math.floor(current/4)}:${i%4}`]
            } else if (i >= 16 && i < 32) {
                current = i - 16;
                return [e, `1:${Math.floor(current/4)}:${i%4}`]
            } else if (i >= 32 && i < 48) {
                current = i - 32;
                return [e, `2:${Math.floor(current/4)}:${i%4}`]
            } else if (i >= 48 && i < 64) {
                current = i - 48;
                return [e, `3:${Math.floor(current/4)}:${i%4}`]
            } else if (i >= 64 && i < 80) {
                current = i - 64;
                return [e, `4:${Math.floor(current/4)}:${i%4}`]
            } else if (i >= 80 && i < 96) {
                current = i - 80;
                return [e, `5:${Math.floor(current/4)}:${i%4}`]
            } else if (i >= 96 && i < 112) {
                current = i - 96;
                return [e, `6:${Math.floor(current/4)}:${i%4}`]
            } else if (i >= 112 && i < 128) {
                current = i - 112;
                return [e, `7:${Math.floor(current/4)}:${i%4}`]
            } else {
                current = i - 128;
                return [e, `8:${Math.floor(current/4)}:${i%4}`]
            }
        })
        .filter(e => e[0] === 1)
        .map((e, i) => [e[1], `C0`]);

        //1 8:1:3 tone Format
        //0 8:2:1 -->wird gelöscht mit filter
}

// tests ===============

// setup test 1
const arr = []
for (let i = 0; i < 144; i++) {
    arr.push(0);
}

const result = translateBinarytoTone(arr);

// test 1
if (result.length === 0) {
    console.log('test 1: OK');
} else {
    console.error('test 1: FAIL');
}

// setup test 2
let arr2 = new Array(144).fill(0).map(d=>Math.round(Math.random()))

// test 2
const result2 = translateBinarytoTone(arr2);
/* console.log(result2); */

let temp1 = 0;
let temp2 = 0;
let temp3 = 0;



for(let i= 0; i<= result2.length; i++){
    result2.forEach((e,i)=>{

        console.log("String: " + e[0].toString());
        
    
        let str1 = Number(e[0].toString().slice(0,1));
        console.log("Str 1: " + str1);
        let str2 = Number(e[0].toString().slice(2,3));
        console.log("Str 2: " + str2);
    
        
    });
    

}



/* setTimeout(function cb(){
    console.log(arr2)
},1000);
 */
