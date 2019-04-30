import { Point } from './point';
const point = new Point(undefined, 1, 2);
point.X = 4;
console.log(point.X);

point.draw();
point.drawPoint();
point.getDistance();
