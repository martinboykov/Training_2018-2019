function Person(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
}
Person.prototype.greet = function() {
    console.log(`Hello, ${this.firstname} ${this.lastname}.`);
};
const john = new Person('John', 'Doe');
john.greet();
const jane = new Person('Jane', 'Doe');
jane.greet();
console.log(Object.getPrototypeOf(john) === Object.getPrototypeOf(jane));


