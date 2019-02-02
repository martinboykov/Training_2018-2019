exports.greet = function() {
    console.log('Hello');
};
console.log(exports);
console.log(module.exports);
// when we "MUTATE" exports we are not setting new value to it,
// but adding a method (new key value pair with value function)
// so, exports and module.exports still are pointing to the same object
// but this object now has additional method attached to it
