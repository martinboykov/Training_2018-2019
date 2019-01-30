// function ass() {
//     const a = 1;
//     return function() {
//         console.log(a);
//     };
// }
// ass()();

// function init() {
// const name = 'Mozilla'; // name is a local variable created by init
// function displayName() { // displayName() is the inner function, a closure
//     console.log(name); // use variable declared in the parent function
//     }
//     displayName();
// }
// init();

for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i);
    }, 3000);
}
