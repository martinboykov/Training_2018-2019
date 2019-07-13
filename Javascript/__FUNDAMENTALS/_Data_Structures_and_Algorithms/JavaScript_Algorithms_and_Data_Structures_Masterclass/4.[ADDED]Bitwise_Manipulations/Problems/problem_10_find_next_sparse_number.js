// Top 10 algorithms in Interview Questions - https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// Find Next Sparse Number - https://www.geeksforgeeks.org/given-a-number-find-next-sparse-number/

// Explanation:
// A number is Sparse if there are no two adjacent 1s in its binary representation.
// For example 5 (binary representation: 101) is sparse,
// but 6 (binary representation: 110) is not sparse.


// // Time: O(logn*logn)
// // Space: O(1)
// function findNextSparseNumber(num) {
//   let bit = (num).toString(2).padStart(32, '0');
//   console.log(bit);
//   let lastBit = false;
//   let cycle = 1;
//   while (!lastBit) { // O(logn)
//     console.log('--------------------');
//     console.log('cycle', cycle);
//     console.log('--------------------');
//     let numNext = num;
//     let lastBitOfDouble = null;
//     let iteration = 0;
//     while (numNext > 0) { // O(logn)
//       if (numNext & (1 << 0) && lastBit) {
//         lastBit = false;
//         lastBitOfDouble = iteration - 1;
//         break;
//       }
//       if (numNext & (1 << 0)) {
//         lastBit = true;
//       } else {
//         lastBit = false;
//       }
//       iteration += 1;
//       numNext >>= 1;
//       const bitNext = (numNext).toString(2).padStart(32, '0');
//       console.log('bitNext', bitNext);
//     }
//     bit = (num).toString(2).padStart(32, '0');
//     console.log('bit', bit);
//     if (lastBitOfDouble === 0) {
//       // num + 1;
//       num += 1;
//     } else if (lastBitOfDouble > 0) {
//       // set bits after lastBitOfDouble to 1's;
//       while (lastBitOfDouble > 0) { // O(logn)
//         if (num | (1 << lastBitOfDouble - 1)) num |= (1 << lastBitOfDouble - 1);
//         bit = (num).toString(2).padStart(32, '0');
//         console.log('bit', bit);
//         lastBitOfDouble -= 1;
//       }
//       // add 1 -> num + 1 -> so 1's after lastBitOfDouble, lastBitOfDouble included, becomes 0's
//       num += 1;
//       bit = (num).toString(2).padStart(32, '0');
//       console.log('bit', bit);
//     }
//     cycle += 1;
//   }
//   return num;
// }

console.log('---------------------------');
// Time: O(logn)
// Space: O(1)
function findNextSparseNumber(num) {
  let bit = (num).toString(2).padStart(32, '0');
  console.log(bit);
  let cycle = 1;
  let lastBit = false;
  let numNext = num;
  let bitNext = (numNext).toString(2).padStart(32, '0');
  let firstBitOfDouble = null;
  let bitDoubleCount = 1;
  let iteration = 0;
  while (numNext > 0) { // O(logn)
    console.log('--------------------');
    console.log('cycle', cycle);
    console.log('--------------------');
    if (numNext & (1 << 0) && lastBit) {
      bitDoubleCount += 1;

      // end case
      if ((numNext).toString(2).length <= 1) {
        bit = (num).toString(2).padStart(32, '0');
        console.log('bit', bit);
        lastBit = false;
        firstBitOfDouble = iteration - 1;
        num = num << 1;
        num = num & (-(Math.pow(2, firstBitOfDouble + 2)));
        bit = (num).toString(2).padStart(32, '0');
        console.log('bit', bit);
        return num;
      }
    } else if (!(numNext & (1 << 0)) && lastBit && bitDoubleCount > 1) {
      lastBit = true;
      firstBitOfDouble = iteration - 1;
      num = num & (-(Math.pow(2, firstBitOfDouble + 1)));
      bit = (num).toString(2).padStart(32, '0');
      console.log('bit', bit);
      // num <<= 1;
      num |= (1 << firstBitOfDouble + 1);
      bit = (num).toString(2).padStart(32, '0');
      console.log('bit', bit);
      numNext = num >> firstBitOfDouble + 1;
      bitNext = (numNext).toString(2).padStart(32, '0');
      console.log('bitNext', bitNext);
      bitDoubleCount = 1;
    } else if (numNext & (1 << 0)) {
      lastBit = true;
    } else {
      lastBit = false;
    }
    iteration += 1;
    numNext >>= 1;
    bitNext = (numNext).toString(2).padStart(32, '0');
    console.log('bitNext', bitNext);
    cycle += 1;
  }
  return num;
}

const num1 = 424912;
console.log(findNextSparseNumber(num1));
