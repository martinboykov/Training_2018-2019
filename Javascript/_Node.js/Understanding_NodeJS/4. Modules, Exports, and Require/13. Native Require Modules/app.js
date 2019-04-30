const util = require('util');

// console.log(util);
const name = 'Marto';
const greeting = util.format('Hello, %s!', name);
util.log(greeting);
