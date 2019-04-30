// function* foo(x) {
//     const y = x * (yield);
//     return y;
// }

// const it = foo(6);
// // declares object iterator
// // const y = 6 * (yield);

// // start `foo(..)` execution
// it.next(); // stops at (yield)

// const res = it.next(7);
// //continuing again with yield returning 7
// // const y = 6 * (7);
// console.log(res);
// console.log(res.value); // 42
// console.log(res.done); // true - finishes execution of the gen fn


function* foo(x) {
    const y = x * (yield 'Hello');    // <-- yield a value!
    return y;
}

const it = foo(6);

let res = it.next();    // first `next()`, don't pass anything
console.log(res.value); // "Hello"

res = it.next(7);        // pass `7` to waiting `yield`
console.log(res);
// 42
