const person = {
    firstName: '',
    lastName: '',
    greet: function(){
        return this.firstName + ' ' + this.lastName;
    }
};

const john = Object.create(person);
john.firstName = 'John';
john.lastName = 'Malkovich';
console.log(john.greet());
console.log(Object.getPrototypeOf(john));
console.log(john.constructor.prototype);
