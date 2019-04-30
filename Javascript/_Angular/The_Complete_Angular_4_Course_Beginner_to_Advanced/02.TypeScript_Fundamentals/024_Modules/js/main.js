"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var point_1 = require("./point");
var point = new point_1.Point(undefined, 1, 2);
point.X = 4;
console.log(point.X);
point.draw();
point.drawPoint();
point.getDistance();
