// const foo = 'foo1';

// // function declaration
// function bob() {
//     const foo = 'function declaration';
//     console.log(foo);
// }
// bob();

// // function expression
// (function bob() {
//     const foo = 'function expression';
//     console.log(foo);
// }());
// // console.log(bob); // bob is not defined (as its IIFE)
// console.log(foo);


// const foo = 'foo1';
// (function IIFE(bar) {
//     console.log(bar);
//     const foo = 'foo2';
//     console.log(foo);
// }(foo));
// console.log(foo);


// for (let i = 0; i < 5; i++) {
//     (function IIFE() {
//         const j = i;
//         console.log(j);
//     }());
// }


// function diff(x, y) {
//     if (x > y) {
//         let tmp = x;
//         x = y;
//         y = tmp;
//     }
//     return y - x;
// }
// console.log(diff(3, 1));


// function repeat(n) {
//     var result = 0;
//     for (let i = 0; i < n; i += 1) {
//         result += i;
//         console.log(result);
//     }
//     return result;
// }

// console.log(repeat(10));
// The same applies to arrays


const foo = 'bar';


function bar() {
    const foo = 'baz';
    console.log(foo);
}

function baz(foo) {
    foo = 'bam';
    console.log(foo);
    bam = 'yay';
    console.log(bam);
}

bar();
baz(foo);
console.log(foo);
bam = 'zzzz';
console.log(bam);
