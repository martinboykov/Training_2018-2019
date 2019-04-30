function Foo(who) {
    this.me = who;
}
Foo.prototype.identify = function() {
    return 'I am ' + this.me;
};

function Bar(who) {
    Foo.call(this, who);
}


Bar.prototype.speak = function() {
    console.log('Hello, ' + this.identify() + '.');
};

const b1 = new Bar('b1');
const b2 = new Bar('b2');

b1.speak();
console.log(b1.identify());

console.log();
console.log(b1.constructor === Foo);
console.log(b1.constructor === b2.constructor);
console.log(b1.__proto__ === Object.getPrototypeOf(b1));
console.log(b1.__proto__ === Foo.prototype);
console.log(b1.__proto__ === b2.__proto__);

