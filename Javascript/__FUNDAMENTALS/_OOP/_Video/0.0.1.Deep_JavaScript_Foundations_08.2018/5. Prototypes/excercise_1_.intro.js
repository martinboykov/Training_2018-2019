function Foo(who) {
    this.me = who;
}
Foo.prototype.identify = function() {
    return 'I am ' + this.me;
};
const a1 = new Foo('a1');
const a2 = new Foo('a2');

a2.speak = function() {
    return 'Hello, ' + this.identify() + '.';
};
console.log(a1.identify()); // I am a1
console.log(a2.identify()); // I am a2
console.log(a2.speak()); // Hello, I am a2.
console.log();

console.log(a1.constructor); // [Function: Foo]
// a1 doesnt have direct constructor
// following its [[Protoype]] chain => a1 is linked to Foo.prototype,
// which has constructor --> Foo
console.log(a2.constructor); // [Function: Foo]
console.log();

console.log(Foo.prototype === Object.getPrototypeOf(a1)); // true
console.log(Foo.prototype); // Foo { identify: [Function] }
console.log(Object.getPrototypeOf(a1)); // Foo { identify: [Function] }
console.log();

console.log(Foo.prototype.constructor === a1.constructor); // true
console.log(Foo.prototype.constructor); // [Function: Foo]
console.log(a1.constructor); // [Function: Foo]
