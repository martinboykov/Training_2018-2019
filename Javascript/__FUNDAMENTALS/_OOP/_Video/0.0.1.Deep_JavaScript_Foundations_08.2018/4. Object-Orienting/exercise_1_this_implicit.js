// THE ONLY THING THAT MATTERS IS HOW THE FUNCTION WAS CALLED

// Rules order for showing where is 'this' pointing:

// 1. Is the function called by NEW?
// 2. Is the function called by CALL() or APPLY()?
// Note: BIND() effectively uses apply()

// 3. Is the function called on a CONTEXT OBJECT?
//    (const o2 = { bar: 'bar2', foo: foo };
//     o2.foo();)
// 4. DEFAULT: global object (except strict mode)

// Implicit
function foo() {
    console.log(this === global, this.bar);
}
// global
// in node 'var bar' wont generate global variable,
// as every file is scoped (in module)
const bar = 'bar1';
foo();

// local
const o2 = { bar: 'bar2', foo: foo };
o2.foo();
const o3 = { bar: 'bar3', foo: foo };
o3.foo();
