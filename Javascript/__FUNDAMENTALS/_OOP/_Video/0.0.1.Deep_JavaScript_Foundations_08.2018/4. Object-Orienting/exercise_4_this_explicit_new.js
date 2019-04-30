
// Explicit
// using new

// Four things that NEW keyword does:
// 1. Creates new object out of thin air
// 2. Newly created object gets linked to another object
// 3. Newly created object from step 1 gets past in as the THIS CONTEXT to the function call
// 4. if that function does already returned its own object
//    the NEW keyword asumes that you meant to return that object that was passed in (so implies a return THIS)
// function foo() {
//     this.baz = 'baz';
//     console.log(this.baz);
// }
// const obj = { baz: 'baz1' };
// const bam = new foo();

function something(x) {
    console.log(this.who);
}
something();
const obj = { who: 'obj1', something: something };
obj.something();
const smt = new something('newWho');

