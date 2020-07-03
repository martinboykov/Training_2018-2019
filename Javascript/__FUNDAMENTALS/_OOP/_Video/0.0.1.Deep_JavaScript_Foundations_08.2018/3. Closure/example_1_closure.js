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
// this.a = 5;
// for (let i = 0; i < 5; i++) {

//     setTimeout(function () {
//         console.log(this);
//     }, 1000);
// }
for (var i = 0; i < 5; i++) {
    console.log(i);
    setTimeout(() => {
        console.log(i);
    }, 1000);
}
