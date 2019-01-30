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

const c1 = new Car('c1');
// c1.identify = function() {
//     return 'Hello, ' + this.__proto__.identify.call(this) + '.';
// };
// ///////////////////////////////////
console.log(a1);
console.log(b1);
console.log(c1);
console.log();
console.log(a1.identify());
console.log(b1.identify());
console.log(c1.identify());
console.log();
console.log(Object.getPrototypeOf(a1));
console.log(Object.getPrototypeOf(b1));
console.log(Object.getPrototypeOf(c1));
console.log();
console.log(c1.__proto__.__proto__.__proto__);
console.log(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(c1))));
console.log(c1.__proto__.__proto__);
console.log(Object.getPrototypeOf(Object.getPrototypeOf(c1)));
console.log(c1.__proto__);
console.log(Object.getPrototypeOf(c1));
console.log();
console.log(c1 instanceof Object);
console.log(c1 instanceof Foo);
console.log(c1 instanceof Bar);
console.log(c1 instanceof Car);
console.log();
console.log(Object.prototype.isPrototypeOf(c1));
console.log(Foo.prototype.isPrototypeOf(c1));
console.log(Bar.prototype.isPrototypeOf(c1));
console.log(Car.prototype.isPrototypeOf(c1));
// ////////////////////////////////////////////////////
// ////////////////////////////////////////////////////
// const Person = function(name, age, state) {
//     this.age = age || '\'unknown\'';
//     this.name = name || '\'unknown\'';
//     this.state = state || '\'unknown\'';

//     this.printPerson = function() {
//         console.log(this.name, this.age, this.state);
//     };
// };
// const pesho = new Person();
// // pesho.printPerson = function() {
// //     console.log('Im shadowing prototypical printperson()');
// // };
// pesho.printPerson();
// console.log('age' in pesho);
// console.log(pesho.hasOwnProperty('age'));
// ////////////////////////////////////////////////////
// const Person = function() {

// };
// Person.prototype.age = '\'unknown\'';
// Person.prototype.name = '\'unknown\'';
// Person.prototype.state = '\'unknown\'';
// Person.prototype.printPerson = function() {
//     console.log(this.name, this.age, this.state);
// };
// const pesho = new Person();
// // pesho.printPerson = function() {
// //     console.log('Im shadowing prototypical printperson()');
// // };
// pesho.printPerson();
// console.log('age' in pesho);
// console.log(pesho.hasOwnProperty('age'));
// console.log(pesho.age);
// ////////////////////////////////////////////////////
// const Person = function(name, age, state) {
//     const temp = {};
//     temp.age = age || '\'unknown\'';
//     temp.name = name || '\'unknown\'';
//     temp.state = state || '\'unknown\'';
//     temp.printPerson = function() {
//         console.log(this.name, this.age, this.state);
//     };
//     return temp;
// };
// const pesho = new Person();
// pesho.printPerson();
// console.log('age' in pesho);
// console.log(pesho.hasOwnProperty('age'));
// console.log(pesho.age);

// console.log();
// function Person(firstName, secondName) {
//     this.firstName = firstName || null;
//     this.secondName = secondName || null;
// }
// Person.prototype.greet = function() {
//     console.log('Hi! I am ' + this.firstName + ' ' + this.secondName + '!');
// };

// const newPerson1 = new Person('Martin', 'Martinov');
// const newPerson2 = new Person('Boyko', 'Martinov');
// newPerson1.greet();
// newPerson2.greet();
// // console.log(newPerson1.greet() === newPerson2.greet());
// console.log(newPerson1);
// console.log();
// const personPrototype = {
//     greet: function(person) {
//         return this.firstName + ' says: Hello, ' + person.firstName + '!';
//     },
// };

// function PersonConstructor(firstName, lastName) {
//     this.firstName = firstName;
//     this.lastName = lastName;
// }
// PersonConstructor.prototype = Object.create(personPrototype);
// const person1 = new PersonConstructor('John', 'Doe');
// const person2 = new PersonConstructor('Jonny', 'Doe');
// console.log(person1.greet === person2.greet);
// console.log(person1);
// console.log(person1.greet(person2));
console.log();

function Thing() {
    this.x = 42;
    this.y = 3.14;
}

Thing.prototype.f = function() { };
Thing.prototype.g = function() { };
// function create(fn) {
//     const o = Object.create(fn.prototype);
//     fn.call(o);
//     return o;
// }
// var o = create(Thing);
const o = new Thing();
console.log(o.constructor.prototype);
console.log(o instanceof Thing);
console.log();
console.log(Object.getPrototypeOf(Thing));
console.log(Object.getPrototypeOf(Thing.prototype));
console.log();
console.log(Object.getPrototypeOf(Object.prototype));
console.log();
console.log(Thing.toString());
console.log(Thing.__proto__.toString());
console.log(Thing.__proto__.__proto__.toString());
