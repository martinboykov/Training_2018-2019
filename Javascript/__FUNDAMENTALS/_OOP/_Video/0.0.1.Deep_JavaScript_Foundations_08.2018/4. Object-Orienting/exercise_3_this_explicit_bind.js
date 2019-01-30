// using bind (bind uses apply under the hood)
// console.log('using BIND()');
// function fooBind(bazBind, bamBind) {
//     console.log(this.barBind + ' ' + bazBind + ' ' + bamBind);
// }

// const objBind = { barBind: 'barBind' };
// fooBind = fooBind.bind(objBind, 'bazBind');

// fooBind('bamBind');

// const modul1 = {
//     x: 42,
//     getX: function() {
//         return this.x;
//     },
// };

// const retrieveX = modul1.getX;
// console.log(retrieveX()); // The function gets invoked at the global scope
// // expected output: undefined

// const boundGetX = retrieveX.bind(modul1);
// console.log(boundGetX());
//   // expected output: 42


//   Creating a bound function

// this.x = 9; // this refers to global "global" object here in the browser
// const modul = {
//     x: 81,
//     getX: function() {
//         return this.x;
//     },
// };

// modul.getX(); // 81

// const retrieveX = modul.getX;
// console.log(retrieveX());

// // returns 9 - The function gets invoked at the global scope

// // Create a new function with 'this' bound to modul
// // New programmers might confuse the
// // global const x with modul's property x
// const boundGetX = retrieveX.bind(modul);
// console.log(boundGetX()); // 81


// Partially applied functions

// function list() {
//     return Array.prototype.slice.call(arguments);
// }

// const list1 = list(1, 2, 3);
// console.log(list1); // [1, 2, 3]

// // Create a function with a preset leading argument
// const leadingThirtysevenList = list.bind(null, 37);

// const list2 = leadingThirtysevenList();
// console.log(list2); // [37]

// const list3 = leadingThirtysevenList(1, 2, 3);
// console.log(list3); // [37, 1, 2, 3]


// With setTimeout
function LateBloomer() {
    // const obj = {};
    this.petalCount = Math.floor(Math.random() * 12) + 1;
    return this;
}
LateBloomer.prototype.show = function() {
    console.log('I am a beautiful flower with ' +
        this.petalCount + ' petals!');
};
// Declare bloom after a delay of 1 second
LateBloomer.prototype.bloom = function() {
   return this.show.bind(this);
     // setTimeout(this.show.bind(this), 5);
};
const flower = new LateBloomer();
console.log(flower === global);
// flower.show();
  // after 1 second, triggers the 'show' method
