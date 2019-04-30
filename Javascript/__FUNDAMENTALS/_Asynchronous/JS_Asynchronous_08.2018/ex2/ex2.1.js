(function thunk(cb) {
    return (function addAsync(x, y) {
        return setTimeout(function() {
            return cb(x + y);
            //cb is the function sum ===> cb(x+y) is actually sum(x+y)!!!!!!!!!!
            //f(sum) is the callback function and after the function that is calling is executed it returns its value to the callback function
        }, 1000);
    }(10, 15, cb));
}(function(sum) {
    console.log(sum);
}));


// function addAsync(x, y) {
//     return (x + y);
// }
// const thunk = function() {
//     return function() {
//         return addAsync(10, 15);
//     };
// };
// console.log(thunk()());

