class Animal {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    makeSound() {
        console.log("I am an abstract animal!");
    }
}
var FeatherColor;
(function (FeatherColor) {
    FeatherColor[FeatherColor["Brown"] = 0] = "Brown";
    FeatherColor[FeatherColor["Red"] = 1] = "Red";
    FeatherColor[FeatherColor["Blue"] = 2] = "Blue";
    FeatherColor[FeatherColor["Green"] = 3] = "Green";
})(FeatherColor || (FeatherColor = {}));
class Kolibri extends Animal {
    constructor(name, age, featherColor) {
        super(name, age);
        this.featherColor = featherColor;
    }
    makeSound() {
        console.log("I am a Kolibri!");
    }
}
class Dog extends Animal {
    makeSound() {
        console.log("I am a Dog!");
    }
}
let animal = new Animal("Gosho", 5);
console.log(animal);
let kolibri = new Kolibri("Gosho", 5, FeatherColor.Brown);
console.log(kolibri);
console.log(FeatherColor[kolibri.featherColor]);
let dog = new Dog("Murat", 8);
console.log(dog);
function callTheMakeSoundMethod(animal) {
    animal.makeSound();
}
animal.makeSound();
kolibri.makeSound();
dog.makeSound();
callTheMakeSoundMethod(animal);
callTheMakeSoundMethod(kolibri);
callTheMakeSoundMethod(dog);
//# sourceMappingURL=index-1_inheritance.js.map