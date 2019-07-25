// ///////////////////////////////////
function Foo(who) {
    this.xXx = 'xXx';
    this.me = who;
}
Foo.prototype.identify = function() {
    return 'Hello, I am ' + this.me + '! ';
};
const a1 = new Foo('a1');

// a1.identify = function() {
//     return 'Hello, ' + this.__proto__.identify.call(this) + '.';
// };
// ///////////////////////////////////

function Bar(who) {
    Foo.call(this, who);
}
Bar.prototype = Object.create(Foo.prototype);
Bar.prototype.identify = function() {
    return Foo.prototype.identify.call(this) + 'Cya, later!';
};
Bar.prototype.constructor = Bar;
const b1 = new Bar('b1');
// b1.identify = function() {
//     return 'Hello, ' + this.__proto__.identify.call(this) + '.';
// };
// ///////////////////////////////////
function Car(who) {
    Bar.call(this, who);
}
Car.prototype = Object.create(Bar.prototype);
Car.prototype.constructor = Car;
Car.prototype.identify = function() {
    return Bar.prototype.identify.call(this) + ' Bye, Bye!';
};

Car.alarm = function() {
    return 'Beeeep';
};

const c1 = new Car('c1');
c1.identify = function() {
    return 'Hello, ' + this.prototype.identify.call(this) + '.';
};
// ///////////////////////////////////
// console.log(a1);
// console.log(b1);
// console.log(c1);
// console.log();
// console.log(a1.identify());
// console.log(b1.identify());
// console.log(c1.identify());
// console.log();
console.log(Object.getPrototypeOf(a1));
console.log(Object.getPrototypeOf(b1));
console.log(Object.getPrototypeOf(c1));
console.log();
console.log(a1);
console.log(b1);
console.log(c1);
console.log();
// console.log(c1.__proto__.__proto__.__proto__);
// console.log(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(c1))));
// console.log(c1.__proto__.__proto__);
// console.log(Object.getPrototypeOf(Object.getPrototypeOf(c1)));
// console.log(c1.__proto__);
// console.log(Object.getPrototypeOf(c1));
// console.log();
// console.log(c1 instanceof Object);
// console.log(c1 instanceof Foo);
// console.log(c1 instanceof Bar);
// console.log(c1 instanceof Car);
// console.log();
// console.log(Object.prototype.isPrototypeOf(c1));
// console.log(Foo.prototype.isPrototypeOf(c1));
// console.log(Bar.prototype.isPrototypeOf(c1));
// console.log(Car.prototype.isPrototypeOf(c1));
