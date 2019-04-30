"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Point = /** @class */ (function () {
    // public x: number;
    // public y: number;
    function Point(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        // this.x = x;
        // this.y = x;
    }
    Object.defineProperty(Point.prototype, "X", {
        get: function () {
            return this.x;
        },
        set: function (value) {
            if (value && value < 0) {
                throw new Error('value must be positive');
            }
            this.x = value;
        },
        enumerable: true,
        configurable: true
    });
    Point.prototype.draw = function () {
        if (this.x !== undefined && this.y !== undefined) {
            console.log("X: " + this.x + ", Y: " + this.y);
        }
    };
    Point.prototype.drawPoint = function () {
        if (this.x !== undefined && this.y !== undefined) {
            console.log(this.x, this.y);
        }
    };
    Point.prototype.getDistance = function () {
        if (this.x !== undefined && this.y !== undefined) {
            console.log(this.x - this.y);
        }
    };
    return Point;
}());
exports.Point = Point;
