class PointIn3D {
    constructor(xCoord, yCoord, zCoord) {
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.zCoord = zCoord;
    }
}
class Shape {
    constructor(position) {
        this.position = position;
    }
}
class Square extends Shape {
    constructor(heigth, weidth) {
        super(new PointIn3D(0, 0, 0));
        this.heigth = heigth;
        this.weidth = weidth;
    }

    calculateSurface() {
        return this.heigth * this.weidth;
    }
}
class Circle extends Shape {
    constructor(radius) {
        super(new PointIn3D(0, 0, 0));
        this.radius = radius;
    }

    calculateSurface() {
        return Math.PI * Math.pow(this.radius, 2);
    }
}
const square = new Square(5, 10);
const circle = new Circle(10);
function printShapeSurface(shape) {
    const surface = shape.calculateSurface();
    console.log(surface);
}
printShapeSurface(square);
printShapeSurface(circle);
// # sourceMappingURL=index-2_abstractClasses.js.map
