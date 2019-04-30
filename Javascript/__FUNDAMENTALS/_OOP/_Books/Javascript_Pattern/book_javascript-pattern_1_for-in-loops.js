// for-in loops should be used to iterate over nonarray objects.
// Looping with for-in is also called enumeration.

// Technically, you can also use for-in to loop over arrays (because in JavaScript arrays
// are objects), but it’s not recommended. It may lead to logical errors if the array object
// has already been augmented with custom functionality. Additionally, the order (the
// sequence) of listing the properties is not guaranteed in a for-in. So it’s preferable to
// use normal for loops with arrays and for-in loops for objects.
console.log('//////hasOwnProperty//////');
const man = {
    hands: 2,
    legs: 2,
    heads: 1,
};
// somewhere else in the code
// a method was added to all objects
// for-in loop
for (let i in man) {
    if (man.hasOwnProperty(i)) { // filter
        console.log(i, ':', man[i]);
    }
}
console.log('//////Object.prototype.hasOwnProperty//////');
const hasOwn = Object.prototype.hasOwnProperty;
for (let i in man) if (hasOwn.call(man, i)) {// filter
    console.log(i, ':', man[i]);
}
console.log();

function Person(name) {
    const person = {};
    person.name = name;
    return person;
}
const pesho = Person('Pesho');
console.log(pesho);
console.log(pesho.name);


// constructor
// function Waffle() {
//     this.tastes = "yummy";
// }
function Waffle() {
    const that = this;
    that.tastes = "yummy";
    return that;
}
Waffle.prototype.sayHi = function() {
    return ('Hi');
};
// a new object
let good_morning = new Waffle();
console.log(typeof good_morning); // "object"
console.log(good_morning.tastes); // "yummy"
console.log(good_morning.sayHi()); // "Hi"
// antipattern:
// forgotten `new`
// good_morning = Waffle();
// console.log(typeof good_morning); // "undefined"
// console.log(good_morning.tastes); // "yummy"
// console.log(good_morning.sayHi()); // "yummy"


