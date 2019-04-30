// const Module = (function () {
//     const privateMethod = function (message) {
//         console.log(message);
//     };
//     const publicMethod = function (text) {
//         privateMethod(text);
//     };
//     return {
//         publicMethod: publicMethod,
//     };
// })();

// Module.publicMethod('Im private method');


// const foo = {
//     o: {
//         bar: 'bar',
//     },
//     bar: function() {
//         console.log(this.o.bar);
//     },
// };
// foo.bar();

const foo = (function() {
    const o = {
        bar: 'bar',
    };
    return {
        bar() {
            console.log(o.bar);
        },
    };
}());
foo.bar();
