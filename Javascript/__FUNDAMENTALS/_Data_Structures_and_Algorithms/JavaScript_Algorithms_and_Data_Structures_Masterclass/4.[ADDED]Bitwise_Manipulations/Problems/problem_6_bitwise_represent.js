// Top 10 algorithms in Interview Questions - https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// Binary representation of a given number - https://www.geeksforgeeks.org/binary-representation-of-a-given-number/

// THEORY:
// Double precision arithmetics: https://www.youtube.com/watch?v=MqHDDtVYJRI&feature=youtu.be
// Numbers in JS: https://medium.com/@sarafecadu/64-bit-floating-point-a-javascript-story-fa6aad266665

// Convertion of int to bit:
// 1) An integer is a number without a decimal and will be represented in 64-bit floating point behind the scenes.
// 2) As long as you’re working with integer values:
//    less than
//    Number.MAX_SAFE_INTEGER = 2^53 - 1 -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
//    and greater than
//    Number.MIN_SAFE_INTEGER = (-(2^53 - 1)) -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER
// you’re going to get a consistent result.

// https://stackoverflow.com/questions/16155592/negative-numbers-to-binary-string-in-javascript
// Syntax - numObj.toString([radix])
// -> If the numObj is negative, the sign is preserved.
//    This is the case even if the radix is 2;
//    the string returned is the positive binary representation
//    of the numObj preceded by a - sign,
//    not the two's complement of the numObj.
//    (-3).toString(2); // print "-11", not (-101)

// -> but if you fake a bit shift operation it works as expected
//    (-3 >>> 0).toString(2); // print "11111111111111111111111111111101" : https://tc39.es/ecma262/#sec-unsigned-right-shift-operator
//    A zero fill right shift converts it's operands to signed 32-bit integers.
//    The result of that operation is always an unsigned 32-bit integer.
//    The operands of all bitwise operators are converted to
//    signed 32-bit integers in two's complement format.


// with bitwise operators - not for large numbers
// Time: O(n)
// Space: O(1)
// function getBits(num) {
//   if (num >= 0) return (num).toString(2).padStart(64, '0'); // 2^64 only +/
//   return (num >>> 0).toString(2).padStart(64, '1'); // -2^31 +/- (fails at -2^32+1)
// }

// Time: O(n)
// Space: O(1)
// from (2 ** 51 + 1) to (-(2 ** 52 + 1));
function getBits(num) {
  if (num >= 0) return num.toString(2).padStart(64, '0');
  return (-num - 1).toString(2).replace(/[01]/g, function(d) { return +!+d; }).padStart(64, '1');
}

// IIFE to scope internal variables: from (2 ** 51 + 1) to (-(2 ** 52 + 1));
// let getBits = (function() {
//   // create union
//   let flt64 = new Float64Array(1);
//   let uint16 = new Uint16Array(flt64.buffer);
//   // 2**53-1
//   let MAX_SAFE = 9007199254740991;
//   // 2**31
//   let MAX_INT32 = 2147483648;

//   function uint16ToBinary() {
//     let bin64 = '';

//     // generate padded binary string a word at a time
//     for (let word = 0; word < 4; word++) {
//       bin64 = uint16[word].toString(2).padStart(16, 0) + bin64;
//     }

//     return bin64;
//   }

//   return function getBits(number) {
//     // NaN would pass through Math.abs(number) > MAX_SAFE
//     if (!(Math.abs(number) <= MAX_SAFE)) {
//       throw new RangeError('Absolute value must be less than 2**53')
//     }

//     const sign = number < 0 ? 1 : 0;

//     // shortcut using other answer for sufficiently small range
//     if (Math.abs(number) <= MAX_INT32) {
//       return (number >>> 0).toString(2).padStart(64, sign);
//     }

//     // little endian byte ordering
//     flt64[0] = number;

//     // subtract bias from exponent bits
//     const exponent = ((uint16[3] & 0x7FF0) >> 4) - 1022;

//     // encode implicit leading bit of mantissa
//     uint16[3] |= 0x10;
//     // clear exponent and sign bit
//     uint16[3] &= 0x1F;

//     // check sign bit
//     if (sign === 1) {
//       // apply two's complement
//       uint16[0] ^= 0xFFFF;
//       uint16[1] ^= 0xFFFF;
//       uint16[2] ^= 0xFFFF;
//       uint16[3] ^= 0xFFFF;
//       // propagate carry bit
//       let word = 0;
//       for (word = 0; word < 3 && uint16[word] === 0xFFFF; word++) {
//         // apply integer overflow
//         uint16[word] = 0;
//       }

//       // complete increment
//       uint16[word]++;
//     }

//     // only keep integer part of mantissa
//     const bin64 = uint16ToBinary().substr(11, Math.max(exponent, 0));
//     // sign-extend binary string
//     return bin64.padStart(64, sign);
//   };
// }());

console.log(getBits(+(2 ** 51 + 1)));
console.log(getBits(-(2 ** 52 + 1)));
