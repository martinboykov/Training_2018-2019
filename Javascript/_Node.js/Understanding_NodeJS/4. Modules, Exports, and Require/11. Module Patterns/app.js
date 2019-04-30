// MODULE TYPE 1
const greet1 = require('./greet1');
greet1();

// MODULE TYPE 2
const greet2 = require('./greet2').greet;
greet2();

// MODULE TYPE 3
const greet3a = require('./greet3');
// node is running the line -> module.exports = new Greetr(); once
// then it caches it as it creates new Object at that line
greet3a.greet();
greet3a.greeting = 'Changed Hello world';
const greet3b = require('./greet3');
// node is using the already created object from
// line -> const greet3a = require('./greet3');
// So, this is only the reference to that object and any change
// to greet3a will transfer to greet3b as they are
// pointing to the same object;
greet3a.greet();
greet3b.greet();

// MODULE TYPE 4
const Greet4a = require('./greet4');
console.log(Greet4a);
const greeter1 = new Greet4a();
console.log(greeter1);
greeter1.greet();
greeter1.greeting = 'Changed Hello world';
// Here require returns Constructor function
// than we cretate new objects with it
// they all point to different point in the memory
// as they are all different objects ("instances" of Greet type)
const Greet4b = require('./greet4');
const greeter2 = new Greet4b();
console.log(greeter2);
greeter2.greet();
greeter1.greet();

// MODULE TYPE 5 (The Revealing module pattern)
const greet5 = require('./greet5');
greet5.greet();
