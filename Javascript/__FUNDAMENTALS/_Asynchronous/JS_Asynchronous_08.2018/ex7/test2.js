function* main() {
    yield 1;
    // calling yeld with value:1 =>
    // => returns object {value: 1, done: false}
    // done: false => means generator is not complete
    yield 2;
    yield 3;
    return 'finished';
}
const it = main();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
