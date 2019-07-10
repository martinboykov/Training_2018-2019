// The operands of all bitwise operators are converted to signed 32-bit integers in two's complement format
// except >>> (Zero-fill right shift) which results in an unsigned 32-bit integer.

function getBites(num, w) {
  return (num >>> 0).toString(2).padStart(w, '0');
}

// ADDITION
console.log('---------------------------');
console.log('/// NEGATIVE ///');
console.log('---------------------------');
// positive numbers
// base 10
let num1 = 3; // 011
let num2 = 2; // 100
let sum = num1 + num2; // 111
console.log(num1);
console.log(num2);
console.log(sum);

// base 2
console.log((num1 >>> 0).toString(2).padStart(32, '0'));
console.log((num2 >>> 0).toString(2).padStart(32, '0'));
console.log((sum >>> 0).toString(2).padStart(32, '0'));


// negative numbers
// base 10
num1 = -3; // 101
num2 = -2; // 100
sum = num1 + num2; // 1001
console.log(num1);
console.log(num2);
console.log(sum);

// base 2
console.log((num1 >>> 0).toString(2).padStart(32, '0'));
console.log((num2 >>> 0).toString(2).padStart(32, '0'));
console.log((sum >>> 0).toString(2).padStart(32, '0'));


// MULTIPLICATION
console.log('---------------------------');
console.log('/// SHIFTING ///');
console.log('---------------------------');
// positive numbers
// base 10
console.log('<< left shift');
num1 = 9; // 1001
num2 = 3;
let res = num1 << num2; // 1001000
// 9 * (2 ** 3) = 9 * (8) = 72
console.log(num1);
console.log(num2);
console.log(res);

console.log('>> right shift');
num1 = 9; // 1001
num2 = 2;
res = num1 >> num2; // 0001
console.log(num1);
console.log(num2);
console.log(res);

console.log(` >>> (Zero-fill right shift)`);
num1 = -9; // 11111111111111111111111111110111
num2 = 3;
res = num1 >> num2; // 00111111111111111111111111111101
console.log(num1);
console.log(num2);
console.log(res);

