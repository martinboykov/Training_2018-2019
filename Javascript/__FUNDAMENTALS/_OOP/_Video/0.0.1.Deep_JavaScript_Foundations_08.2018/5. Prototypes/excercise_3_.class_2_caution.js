// 1. Cant extend objects!!!!
// cant mix classes and objects together

// const Foo = {
// constructor(who) {
//     this.me = who;
// }
// identify() {
//     return 'I am ' + this.me;
// }
// };

// class Bar extends Foo {
//
// }

// 2. Cant use call, apply, bind
// cant do anything dynamic with them
// Bar.call({}); // <-- error!

// 3. "super" is awlays before "this" in the constructor with "extends"
// class Car extends Bar {
//     constructor(who) {
//         this.x = 1; // <--error! This is not allowed before super!!!
//         super(who);
//     }
//      fn() {
//          this.x = 1;
//          super(who); // here its ok, as its method not constructor
//                      // by the time we go to method the constructor is
//                      // already been initialzed and super with it
// }
// }

// 4. Cant use super to extend the prototype of constructor function
// becouse super is statically bound
// Car.prototype.newFunc = function(){
//     this.one();
//     super.two(); <-- error!
// }
