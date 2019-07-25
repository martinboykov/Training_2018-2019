// //////////////////////////////////////////

const Person = function(name) {
    this.name = name;
    this.canTalk = true;
};
Person.prototype.xxx = 'xxx';
Person.prototype.greet = function() {
    if (this.canTalk) {
        console.log('Hi, I am ' + this.name);
    }
};
console.log('"Person"');
console.log(Person.prototype);
console.log(Person.prototype.constructor);
console.log();
// /////////////////////////////////////////
const Employee = function(name, title) {
    Person.call(this, name);
    this.title = title;
};

Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;


Employee.prototype.greet = function() {
    if (this.canTalk) {
        console.log('Hi, I am ' + this.name + ', the ' + this.title);
    }
};
console.log('"Employee"');
console.log(Employee.prototype);
console.log(Employee.prototype.constructor);
console.log();
// ////////////////////////////////////////////
const Customer = function(name) {
    Person.call(this, name);
};

Customer.prototype = Object.create(Person.prototype);
Customer.prototype.constructor = Customer;

console.log('"Customer"');
console.log(Customer.prototype);
console.log(Customer.prototype.constructor);
console.log();
// ////////////////////////////////////////////
const Mime = function(name, title) {
    Employee.call(this, name, title);
    this.canTalk = true;
};

Mime.prototype = Object.create(Employee.prototype);
Mime.prototype.constructor = Mime;
Mime.prototype.greet = function() {
    if (this.canTalk) {
        console.log('Hi, I am ' + this.name + ', the ' + this.title + '!!!');
    }
};

console.log('"Mime"');
console.log(Mime.prototype);
console.log(Mime.prototype.constructor);
console.log();
// // ///////////////////////////////////////////////////
// const ali = new Person('Ali');
// const bob = new Employee('Bob', 'Builder');
// const rg = new Employee('Red Green', 'Handyman');
// const joe = new Customer('Joe');
// const mike = new Customer('Mike');
// const mime = new Mime('Mimo', 'Mime');

// console.log(Object.getPrototypeOf(bob)); // Person {}

// ali.greet(); // Hi, I am Ali
// bob.greet(); // Hi, I am Bob, the Builder
// joe.greet(); // Hi, I am Joe
// rg.greet(); // Hi, I am Red Green, the Handyman
// mike.greet(); // Hi, I am Mike
// mime.greet(); // Hi, I am Mimo, the Mime!!!
// console.log(mime.constructor.prototype); // Mime { constructor: [Function: Mime], greet: [Function] }
// mime.constructor.prototype.xxx = 'ooo';
// console.log(Employee.prototype.xxx); // xxx
// console.log(mime.xxx); // ooo
// console.log(mime.name); // Mimo
// console.log(mime.title); // Mime

// console.log();
// console.log(Person.prototype.isPrototypeOf(bob)); // true
// console.log(mime instanceof Employee); // true
