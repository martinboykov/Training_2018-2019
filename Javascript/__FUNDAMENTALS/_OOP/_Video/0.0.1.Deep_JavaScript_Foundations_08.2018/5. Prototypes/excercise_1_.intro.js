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
console.log(a1.identify());
console.log(a2.identify());
console.log(a2.speak());
console.log();

console.log(a1.constructor);
// a1 doesnt have direct constructor
// following its [[Protoype]] chain => a1 is linked to Foo.prototype,
// which has constructor --> Foo
console.log(a2.constructor);
console.log();

console.log('(Foo.prototype === Object.getPrototypeOf(a1)) = ' +
    (Foo.prototype === Object.getPrototypeOf(a1)));
console.log(Foo.prototype);
console.log(Object.getPrototypeOf(a1));
console.log();

console.log(
    '(Foo.prototype.constructor === a1.constructor) = ' +
    (Foo.prototype.constructor === a1.constructor));
console.log(Foo.prototype.constructor);
console.log(a1.constructor);
console.log();

console.log(Object.getPrototypeOf(a1)); // === console.log(a1.__proto__);

