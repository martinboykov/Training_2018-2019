const Foo = {
    init: function(name) {
        this.name = name;
    },
    identify: function() {
        return 'I am ' + this.name;
    },
};
const Bar = Object.create(Foo);
Bar.speak = function() {
    return 'Hello, ' + this.identify() + ' and i can speak.';
};
const b1 = Object.create(Bar);
console.log(b1);
console.log(Object.getOwnPropertyNames(b1));
b1.init('b1');
console.log(Object.getPrototypeOf(b1) === b1.__proto__);
console.log(b1.identify());
console.log(b1.speak());
console.log(b1);
console.log(Bar);
console.log(Foo);
console.log(Foo instanceof Object);
console.log(Bar instanceof Object);
console.log(b1 instanceof Object);


