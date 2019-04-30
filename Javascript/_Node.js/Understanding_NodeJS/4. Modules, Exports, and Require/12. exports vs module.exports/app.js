const greet1 = require('./greet1');
// although exports and module exports initialy point to the same object
// as we set a value to exports it points no longer to the same
// object as module.exports, but new one
// greet1(); // as result this will give error as require('./greet1');
// returns empty object

const greet2 = require('./greet2');
greet2.greet();
