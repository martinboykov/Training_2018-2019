// The operands of all bitwise operators are converted to signed 32-bit integers in two's complement format
// except >>> (Zero-fill right shift) which results in an unsigned 32-bit integer.

function toBit(num, w) {
  return (num >>> 0).toString(2).padStart(w, '0');
}

// Get n-th bit
console.log('-------------');
console.log(`Get n-th bit`);
console.log('-------------');
// 00101100
// &
// 00100000 (1<<n) here n=5
// ------------
// 00100000 (n is not zero)

let num1 = 44;
function checkNthBit(num, n) {
  num = (num & (1 << n));
  console.log(toBit(num, 32));
  return num;
}
console.log(num1);
num1 = checkNthBit(num1, 5);
console.log(num1);


// Set n-th bit
console.log('-------------');
console.log(`Set n-th bit`);
console.log('-------------');
// 00101100
// &
// 00100000 (1<<n) here n=1
// ------------
// 00101110 (n is not zero)

num1 = 44;
function setNthBit(num, n) {
  num = (num | (1 << n));
  console.log(toBit(num, 32));
  return num;
}
console.log(num1);
num1 = setNthBit(num1, 1);
console.log(num1);


// Clear n-th bit
console.log('-------------');
console.log(`Clear n-th bit`);
console.log('-------------');
// 00101100
// &
// 00100000 (1<<n) here n=5
// ------------
// 00101110 (n is not zero)

num1 = 44;
function clearNthBit(num, n) {
  num = (num & ~(1 << n));
  console.log(toBit(num, 32));
  return num;
}
console.log(num1);
console.log(toBit(num1, 32));
num1 = clearNthBit(num1, 5);
console.log(num1);

