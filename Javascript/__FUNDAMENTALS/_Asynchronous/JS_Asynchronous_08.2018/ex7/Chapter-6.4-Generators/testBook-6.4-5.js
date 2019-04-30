let a = 1;
let b = 2;

function step(gen) {
    const it = gen();
    let last;

    return function() {
        // whatever is `yield`ed out, just
        // send it right back in the next time!
        last = it.next(last).value;
    };
}

function* foo() {
    a++;
    yield;
    b = b * a;
    a = (yield b) + 3;
    console.log([a, b]);
}

// function* bar() {
//     b--;
//     yield;
//     a = (yield 8) + b;
//     b = a * (yield 2);
//     return [a, b];
// }
const nextStep1 = step(foo);


// const s2 = step(bar);

// run `*foo()` completely first
nextStep1();
nextStep1();
nextStep1();

// now run `*bar()`
// s2();
// s2();
// s2();
// s2();

// 11 22

