function* foo() {
    const x = yield 2;
    console.log('x = ' + x);
    z++;
    console.log('z = ' + z);
    const y = yield (x * z);
    console.log('y = ' + y);
    return [x, y, z];
    //console.log(x, y, z);
}

let z = 1;

const it1 = foo();
const it2 = foo();
console.log(it1);
console.log(it2);
let val1 = it1.next().value;            // 2 <-- yield 2
let val2 = it2.next().value;            // 2 <-- yield 2
console.log('val1 = '+val1);
console.log('val2 = '+val2);

val1 = it1.next(val2 * 10).value;        // 40  <-- x:20,  z:2
val2 = it2.next(val1 * 5).value;        // 600 <-- x:200, z:3
console.log('val1 = '+val1);
console.log('val2 = '+val2);

console.log(it1.next(val2 / 2));    // y:300
// 20 300 3
console.log(it2.next(val1 / 4));  // y:10
// 200 10 3

