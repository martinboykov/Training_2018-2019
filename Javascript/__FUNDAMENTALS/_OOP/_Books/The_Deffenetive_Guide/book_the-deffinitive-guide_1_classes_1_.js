// Shape - superclass
function SuperClass() {
    this.x = 0;
    this.y = 0;
}

// superclass method
SuperClass.prototype.move = function(x, y) {
    this.x = this.x + 1;
    this.y = this.y + 1;
    console.info('SuperClass muved');
};

// Rectangle - subclass
function OtherSuperClass() {
    this.a = 0;
    this.b = 0;
}
OtherSuperClass.prototype.jump = function(a, b) {
    if (this.a > 0) {
        this.a = this.a * this.a;
        this.b = this.b * this.b;
    } else {
        this.a = 2;
        this.b = 2;
    }
    console.info('OtherSuperClass jumbed.');
};


function MyClass() {
    SuperClass.call(this);
    OtherSuperClass.call(this);
}

// inherit one class
MyClass.prototype = Object.create(SuperClass.prototype);
// mixin another
Object.assign(MyClass.prototype, OtherSuperClass.prototype);
// re-assign constructor
MyClass.prototype.constructor = MyClass;

MyClass.prototype.display = function() {
    console.log(this.x, this.y, this.a, this.b);
};

const myClassInstance = new MyClass();

console.log(Object.getPrototypeOf(MyClass.prototype));

// console.log(myClassInstance);
// myClassInstance.display();
// myClassInstance.move();
// myClassInstance.jump();
// myClassInstance.display();
// myClassInstance.move();
// myClassInstance.jump();
// myClassInstance.display();
// myClassInstance.move();
// myClassInstance.jump();
// myClassInstance.display();
