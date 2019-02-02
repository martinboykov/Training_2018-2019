exports = function() {
    console.log('Hello');
};
console.log(exports);
console.log(module.exports);
// although exports and module exports initialy point to the same object
// as we set a value to exports it points no longer to the same
// object as module.exports, but new one
