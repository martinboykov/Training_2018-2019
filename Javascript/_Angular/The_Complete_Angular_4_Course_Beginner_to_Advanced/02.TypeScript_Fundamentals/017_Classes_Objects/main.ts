class Point {
  // public x: number;
  // public y: number;
  constructor(private x?: number, private y?: number, private z?: number) {
    // this.x = x;
    // this.y = x;
  }
  get X() {
    return this.x;
  }
  set X(value) {
    if (value && value < 0) {
      throw new Error('value must be positive');
    }
    this.x = value;
  }
  draw() {
    if (this.x !== undefined && this.y !== undefined) {
      console.log(`X: ${this.x}, Y: ${this.y}`);
    }
  }
  drawPoint() {
    if (this.x !== undefined && this.y !== undefined) {
      console.log(this.x, this.y);
    }
  }
  getDistance() {
    if (this.x !== undefined && this.y !== undefined) {
      console.log(this.x - this.y);
    }
  }
}
const point = new Point(undefined, 1, 2);
point.X = 4;
console.log(point.X);

point.draw();
point.drawPoint();
point.getDistance();
