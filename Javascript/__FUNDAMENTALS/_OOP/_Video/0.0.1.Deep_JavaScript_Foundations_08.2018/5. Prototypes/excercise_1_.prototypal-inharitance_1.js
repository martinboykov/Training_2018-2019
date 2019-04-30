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
// /////////////////////////////////////////
const Employee = function(name, title) {
    Person.call(this, name);
    this.title = title;
};

Employee.prototype = Object.create(Person.prototype);
// Employee.prototype.constructor = Employee;
console.log(Employee.prototype);
console.log(Employee.prototype.constructor);
console.log();

Employee.prototype.greet = function() {
    if (this.canTalk) {
        console.log('Hi, I am ' + this.name + ', the ' + this.title);
    }
};
// ////////////////////////////////////////////
const Customer = function(name) {
    Person.call(this, name);
};

Customer.prototype = Object.create(Person.prototype);
Customer.prototype.constructor = Customer;

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
// ///////////////////////////////////////////////////
const ali = new Person('Ali');
const bob = new Employee('Bob', 'Builder');
const rg = new Employee('Red Green', 'Handyman');
const joe = new Customer('Joe');
const mike = new Customer('Mike');
const mime = new Mime('Mimo', 'Mime');

console.log(Object.getPrototypeOf(bob));

ali.greet();
bob.greet();
joe.greet();
rg.greet();
mike.greet();
mime.greet();
console.log(mime.constructor.prototype);
mime.constructor.prototype.xxx = 'ooo';
console.log(Employee.prototype.xxx);
console.log(mime.xxx);
console.log(mime.name);
console.log(mime.title);

// console.log();
// console.log(Person.prototype.isPrototypeOf(bob));
// console.log('Instance of? ' + (mime instanceof Employee));
