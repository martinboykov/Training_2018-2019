// // This is a constructor function that initializes new Range objects.
// // Note that it does not create or return the object. It just initializes this.
// function Range(from, to) {
//     // Store the start and end points (state) of this new range object.
//     // These are noninherited properties that are unique to this object.
//     this.from = from;
//     this.to = to;
// }
// // All Range objects inherit from this object.
// // Note that the property name must be "prototype" for this to work.
// Range.prototype = {
//     // Return true if x is in the range, false otherwise
//     // This method works for textual and Date ranges as well as numeric.
//     includes: function(x) { return this.from <= x && x <= this.to; },
//     // Invoke f once for each integer in the range.
//     // This method works only for numeric ranges.
//     foreach: function(f) {
//         for (let x = Math.ceil(this.from); x <= this.to; x++) f(x);
//     },
//     // Return a string representation of the range
//     toString: function() { return '(' + this.from + '...' + this.to + ')'; },
//     f: function() {
//         return 'not changed';
//     },
// };

// console.log(Range.constructor);
// console.log(Range.prototype);
// console.log(Range.prototype.constructor);

// // Here are example uses of a range object
// let r = new Range(1, 3); // Create a range object
// r.includes(2); // => true: 2 is in the range
// r.foreach(console.log); // Prints 1 2 3
// console.log(r); // Prints (1...3)
// console.log(r.f());
// console.log(r instanceof Range);
// console.log(Range.prototype.isPrototypeOf(r));


const Range = (function invocation() {
    function Range() {
        this.x = 0;
        this.y = 0;
    }
    Range.prototype.display = function() {
        console.log(this.x + this.y);
    };
    return Range;
}());
const r = new Range();
console.log(Range.prototype);
