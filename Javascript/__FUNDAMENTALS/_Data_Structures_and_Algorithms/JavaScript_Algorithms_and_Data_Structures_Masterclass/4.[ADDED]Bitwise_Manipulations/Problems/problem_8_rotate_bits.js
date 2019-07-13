// Top 10 algorithms in Interview Questions - https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// Rotate bits of a number - https://www.geeksforgeeks.org/rotate-bits-of-an-integer/

// for n>0
// Time: O(logn)
// Space: O(1)
function rotateBits(num, limit, shiftSize = 2) {
  let bit = (num).toString(2).padStart(limit, '0');
  if (num < 0) bit = (-(~(1 << limit - 1)) - 1).toString(2).padStart(limit, '0');
  let iteration = 1;
  console.log(bit);
  while (shiftSize > 0) {
    // left shift
    // console.log((num & ~(1 << limit - 1)).toString(2).padStart(limit, '0'));
    if (Math.abs((num & (1 << limit - 1)) >> limit - 1)) {
      console.log('------------------');
      console.log('shift iteration', iteration);
      console.log('------------------');
      console.log((num).toString(2).padStart(limit, '0'));
      num = (num ^ (-(~(1 << limit - 1)) - 1)); // Y._._._._._._._ -> set Y to 0
      console.log((num).toString(2).padStart(limit, '0'));
      num = (num << 1) | 1; // Y._._._._._.Z.X -> shift and set X position to Y=1 ->  _._._._._.Z.X.Y
      console.log((num).toString(2).padStart(limit, '0'));
    } else {
      num = (num << 1);
    }
    shiftSize -= 1;
    iteration += 1; // just for visualisation
  }
  console.log('------------------');
  console.log('result');
  console.log('------------------');
  if (num < 0) {
    num = (num ^ (-(~(1 << limit - 1)) - 1)).toString(2).padStart(limit - 1, '0');
    console.log('1' + num.toString(2).padStart(limit - 1, '0'));
    num = '1' + num.toString(2).padStart(limit - 1, '0');
  }
  return num.toString(2).padStart(limit, '0');
}

const num1 = (2 ** 30 + 1);
const intLengthLimit = 32;
console.log(rotateBits(num1, intLengthLimit));
