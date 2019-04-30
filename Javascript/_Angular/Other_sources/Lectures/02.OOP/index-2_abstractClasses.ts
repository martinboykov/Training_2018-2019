class PointIn3D {
    constructor(private xCoord: number, private yCoord: number, private zCoord: number) {
    }
}

abstract class Shape {
    constructor(private position: PointIn3D) {
    }

    public abstract calculateSurface(): number;
}

class Square extends Shape {
    constructor(private heigth: number, private weidth: number) {
        super(new PointIn3D(0, 0, 0))
    };
    public calculateSurface(): number {
        return this.heigth * this.weidth;
    }
}

class Circle extends Shape {
    constructor(private radius: number) {
        super(new PointIn3D(0, 0, 0))
    };
    public calculateSurface(): number {
        return Math.PI * Math.pow(this.radius, 2);
    }
}
let square: Square = new Square(5, 10);
let circle: Circle = new Circle(10);

function printShapeSurface(shape:Shape){
    const surface = shape.calculateSurface();
    console.log(surface);
}

printShapeSurface(square);
printShapeSurface(circle);