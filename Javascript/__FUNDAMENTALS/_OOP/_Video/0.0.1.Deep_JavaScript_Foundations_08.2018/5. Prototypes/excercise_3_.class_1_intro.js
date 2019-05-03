class Foo {
    constructor(who) {
        this.xxx = 'xxx';
        this.me = who;
    }
    identify() {
        return 'I am ' + this.me;
    }
    static hello() {
        // constructor inheritance!!!
        console.log('Hello, i\'m static method');
    }
}
Foo.prototype.xxxx = 'newXXXX';
const a1 = new Foo('a1');
const a2 = new Foo('a2');
console.log(a1.identify()); // Hello, I am а1.
console.log(a2.identify()); // Hello, I am а2.
class Bar extends Foo {
    identify() {
        console.log('Hello, ' + super.identify() + '.');
    }
}
const b1 = new Bar('b1');
const b2 = new Bar('b2');
b1.identify(); // I am b1
b2.identify(); // I am b2
Foo.hello();// Hello, i'm static method
Bar.hello();// Hello, i'm static method
console.log(Foo);// [Function: Foo]
console.log(Foo.prototype);// Foo { xxxx: 'newXXXX' }
console.log(Foo.constructor);// [Function: Function]
console.log(Foo.constructor.prototype);// [Function]
console.log(Bar);// [Function: Bar]
console.log(Bar.prototype);// Bar {}
console.log(Bar.constructor);// [Function: Function]
console.log(Bar.constructor.prototype);// [Function]
console.log(b1);// Bar { xxx: 'xxx', me: 'b1' }
console.log(b1.constructor);// [Function: Bar]
console.log(b1.constructor.prototype);// Bar {}
console.log(Object.getPrototypeOf(b1));// Bar {}
console.log(b1 instanceof Object);// true
console.log(b1 instanceof Foo);// true
console.log(b1 instanceof Bar);// true
