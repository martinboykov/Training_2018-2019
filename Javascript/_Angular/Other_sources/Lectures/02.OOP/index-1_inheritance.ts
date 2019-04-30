class Animal {
    constructor(protected name: string, protected age: number) {
    }
    public makeSound(): void {
        console.log("I am an abstract animal!");
    }
}

enum FeatherColor {
    Brown,
    Red,
    Blue,
    Green
}

class Kolibri extends Animal {
    constructor(name: string, age: number, public readonly featherColor: FeatherColor) {
        super(name, age);
    }
    public makeSound(): void {
        console.log("I am a Kolibri!");
    }

}
class Dog extends Animal {
    public makeSound(): void {
        console.log("I am a Dog!");
    }

}



let animal: Animal = new Animal("Gosho", 5);
console.log(animal);



let kolibri: Kolibri = new Kolibri("Gosho", 5, FeatherColor.Brown);
console.log(kolibri);
console.log(FeatherColor[kolibri.featherColor]);


let dog: Animal = new Dog("Murat", 8);
console.log(dog);




function callTheMakeSoundMethod(animal: Animal) {
    animal.makeSound();
}
animal.makeSound();
kolibri.makeSound();
dog.makeSound();

callTheMakeSoundMethod(animal);
callTheMakeSoundMethod(kolibri);
callTheMakeSoundMethod(dog);
