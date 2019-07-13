// Top 10 algorithms in Interview Questions - https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// Count total set bits in all numbers from 1 to n - https://www.geeksforgeeks.org/count-total-set-bits-in-all-numbers-from-1-to-n/

// Time: O(logn^2)
// Space: O(logn)
// function countTotalSetBitsUtil(pow, memo) {
//   if (pow < 0) return 0;
//   if (pow === 0) return 1; // Math.pow(2, pow)
//   if (memo[pow]) return memo[pow] + countTotalSetBitsUtil(pow - 1, memo);
//   return Math.pow(2, pow) + countTotalSetBitsUtil(pow - 1, memo);
// }
// function countTotalSetBits(num) {
//   const bit = Number(num).toString(2); // // O(logn x logn)
//   const length = Math.floor(Math.log2(num)); // O(logn x logn)
//   let sum = 0;
//   // get the sum of repeating leading 1-ones
//   // get local difference for 2^0
//   let pow = length;
//   while (pow >= 0) { // O(logn)
//     let localPow = length;
//     let localSum = 0;
//     let localDiff = 0;
//     if (num & (1 << pow)) {
//       // console.log(num & (1 << pow));
//       while (localPow >= 0) { // O(logn)
//         if (num & (1 << localPow) && pow <= localPow) {
//           console.log('localPow', localPow, Math.pow(2, localPow));
//           localSum += Math.pow(2, localPow);
//         }
//         localPow -= 1;
//       }
//       console.log('localSum', localSum);
//       localDiff = num - (localSum - 1);
//       console.log('localDiff', localDiff);
//       sum += localDiff;
//     }
//     pow -= 1;
//   }
//   console.log('sum', sum);
//   let memo = {};
//   pow = 0;
//   while (pow <= length - 1) { // O(logn)
//     memo[pow] = countTotalSetBitsUtil(pow, memo);
//     console.log('pow', pow, memo[pow]);
//     pow += 1;
//   }
//   console.log(memo);
//   let arrpowSum = Object.values(memo);
//   console.log(arrpowSum);
//   let powSum = 0;
//   let powSumLocal = 0;
//   for (let i = 0; i <= length; i++) { // O(logn)
//     const el1 = arrpowSum[i];
//     if (num & (1 << i)) {
//       powSumLocal = 0;
//       for (let j = i - 1; j >= 0; j--) { // O(logn)
//         const el2 = arrpowSum[j];
//         powSumLocal += el2;
//       }
//       console.log(i, 'powSumLocal', powSumLocal);
//       powSum += powSumLocal;
//     }
//     console.log('powSum', powSum);
//   }
//   // powSum += el1;
//   console.log('sum', sum + powSum);
//   return sum + powSum;
// }

// -------------------------------------------------
// Time: O(logn^2)
// Space: O(1)
// function countTotalSetBits(num) {
//   let count = 0;
//   while (num > 0) {
//     let n = 0;
//     while (num >= 1 << (n + 1)) {
//       n += 1;
//     }
//     num -= 1 << n;
//     count += (num + 1 + (1 << (n - 1)) * n);
//   }
//   return count;
// }
// -------------------------------------------------
// Time: O(logn)
// Space: O(1)
// function countTotalSetBits(n) {
//   let ans = 0;
//   let i = 0;
//   let rem;
//   let ques;
//   for (i = 0; i <= Math.floor(Math.log2(n)); i++) {
//     if (n >> i === 0) {
//       break;
//     }
//     ques = n + 1 >> i + 1;
//     ans += ques << i;
//     rem = ((n + 1) % (1 << i + 1)) - (1 << i);
//     if (rem > 0) {
//       ans += rem;
//     }
//   }
//   return ans;
// }

// -------------------------------------------------
// Time: O(logn)
// Space: O(1)
function countTotalSetBits(n) {
  let count = 0;
  while (n > 0) {
    console.log(n.toString(2));
    let i = Math.floor((Math.log10(n) / Math.log10(2)));
    console.log(i);
    count += Math.pow(2, i - 1) * i;
    count += n - Math.pow(2, i) + 1;
    n -= Math.pow(2, i);
  }
  return count;
}

const num1 = 290000000;
console.log(countTotalSetBits(num1));
// const num2 = 6;
// console.log(swapOddWithEvenBits(num2));
// const num3 = 7;
// console.log(swapOddWithEvenBits(num3));
// const num4 = 8;
// console.log(swapOddWithEvenBits(num4));
