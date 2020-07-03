// ARROW FUNCTION
function foo() {
    return () => this.bar;
}
foo1 = () => this.bar;
function foo2() {
    this.bar = 'bar0'
    return () => this.bar;
}
bar = 'bar1';
const o1 = { bar: 'bar2', foo: foo };
const o2 = { bar: 'bar3' };

const f1 = foo(); // bar1
const f2 = o1.foo(); // bar2
const f3 = foo.call(o2); // bar3
const f4 = foo2.call(o2); // bar1

console.log(f1());
console.log(f2());
console.log(f3());
console.log(f4);
console.log(f4());
console.log(f1.toString());
console.log(this.bar);

