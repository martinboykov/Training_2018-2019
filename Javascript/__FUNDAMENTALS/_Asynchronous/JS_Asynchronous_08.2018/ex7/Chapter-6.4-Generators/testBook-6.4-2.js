function* foo(x, y) {
    return x * y;
}

const it = foo(6, 7); // constructs an iterator OBJECT that will control its execution
console.log(it);
const res = it.next(); //generator advance
console.log(res);
console.log(res.value); // returns value 42 and done true
