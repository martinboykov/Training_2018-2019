// Top 10 algorithms in Interview Questions - https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// Swap all odd and even bits - https://www.geeksforgeeks.org/swap-all-odd-and-even-bits/

// with bitwise operators
// Time: O()
// Space: O(1)
function swapOddWithEvenBits(num) {
  let res = 0;
  let lastNum = num;
  let length = 0;
  while (lastNum) {
    length += 1;
    lastNum = lastNum >> 1;
  }
  res = (num >> 1) | (1<<length);
  console.log(length);

  return res;
}

const num1 = 23;
console.log(swapOddWithEvenBits(num1));
// const num2 = 43;
// console.log(swapOddWithEvenBits(num2));
