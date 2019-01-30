// ARROW FUNCTION
function foo() {
    return () => this.bar;
}

bar = 'bar1';
const o1 = { bar: 'bar2', foo: foo };
const o2 = { bar: 'bar3' };

const f1 = foo();
const f2 = o1.foo();
const f3 = foo.call(o2);
const f4 = f1.call(o2);

console.log(f1());
console.log(f2());
console.log(f3());
console.log(f4);

