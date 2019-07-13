// Top 10 algorithms in Interview Questions - https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// Count number of bits to be flipped to convert A to B - https://www.geeksforgeeks.org/count-number-of-bits-to-be-flipped-to-convert-a-to-b/

// for n>0
// Time: O(logn)
// Space: O(1)
function countBitstoBeFlipped(num1, num2) {
  let bit1 = (num1).toString(2).padStart(32, '0');
  let bit2 = (num2).toString(2).padStart(32, '0');
  console.log(bit1);
  console.log(bit2);
  let res = num1 ^ num2;
  let bitRes = (res).toString(2).padStart(32, '0');
  let count = 0;
  while (res > 0) {
    if (res & (1 << 0)) count += 1;
    res >>= 1;
    bitRes = (res).toString(2).padStart(32, '0');
    console.log(bitRes);
  }
  return count;
}

const num1 = 7;
const num2 = 10;
console.log(countBitstoBeFlipped(num1, num2));
