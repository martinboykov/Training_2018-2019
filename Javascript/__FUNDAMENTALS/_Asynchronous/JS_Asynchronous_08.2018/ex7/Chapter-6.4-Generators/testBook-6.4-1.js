let x = 1;

function* foo() {
    x++;
    yield; // pause!
    console.log('x:', x);
}

function bar() {
    x++;
}
const run = foo();
run.next();
run.next();
