// Top 10 algorithms in Interview Questions - https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// Find nth Magic Number - https://www.geeksforgeeks.org/find-nth-magic-number/

// with bitwise operators
// Time: O(n < x < nlogn)
// Space: O(1)
// function sumBitDiffAllPairs(arr) {
//   let sum = 0;
//   let iterations = 0;
//   let lastNum = arr[arr.length - 1];
//   let length = 0;
//   while (lastNum) {
//     length += 1;
//     lastNum = lastNum >> 1;
//   }
//   for (let i = 0; i < arr.length - 1; i++) {
//     const el1 = arr[i];
//     for (let j = i + 1; j < arr.length; j++) {
//       const el2 = arr[j];
//       let xor = el1 ^ el2;
//       while (xor) {
//         iterations += 1;
//         if (xor & 1) sum += 2;
//         xor = xor >> 1;
//       }
//     }
//   }
//   return { sum, length, iterations };
// }

// good for small numbers (word-size plays huge role)
// Time: O(count(n-count)), where count is the sum of 1-bits at position i for all numbers in arr
// Space: O(1)
function sumBitDiffAllPairs(arr) {
  const n = arr.length;
  let sum = 0;
  let iterations = 0;
  let lastNum = arr[arr.length - 1]; // for sorted arr, if its not sorted-> fst find max
  let length = 0;
  while (lastNum) {
    length += 1;
    lastNum = lastNum >> 1;
  }
  const bitLength = length;
  while (length > 0) {
    let localSum = 0;
    for (let i = 0; i < arr.length; i++) {
      iterations += 1;
      if (arr[i] & 1) localSum += 1;
      arr[i] = arr[i] >> 1;
    }
    sum += n - localSum;
    length -= 1;
  }
  sum *= 2;
  return { sum, bitLength, iterations };
}

// Explanation:
// count = Count of numbers out of all n which has same bit at i-th bit position
// so n - count = for different bit
// see for case of 1 3 5 and at bit position 1
// 00000001 // 1st bit position
// --------
// 00000001 // for 1
// 00000011 // for 3
// 00000101 // for 5
// look all three have same bit set value for 1st position so count = 3
// so no of diff set value = n - count = 3 - 3 = 0
// total = (n - count) * 2 = 0

// 00000010 // 2nd bit position
// --------
// 00000001 // for 1
// 00000011 // for 3
// 00000101 // for 5
// only one bit (for 3) at position 2 => n - count = 3 - 1 = 2
// total = (n - count) * 2 = 4

// 00000100 // 3rd bit position
// --------
// 00000001 // for 1
// 00000011 // for 3
// 00000101 // for 5
// only one bit (for 5) at position 3 =>  = 3 - 1 = 2
// total = (n - count) * 2 = 4

// we have x - iterations for every bit position => x = word size (for 1=1 (001), 2=2(011), 5=3(111), 8=4(1000))
// word size - the left-most bt position of a integer in the array
// so formula for tatalSum = "word size" * [(n - count) * 2]
// we are calculating differences for (x, y) so for (y, x) just multiply it with 2
// SO FORMULA = COUNT * (N - COUNT) * 2


const arr1 = [1, 2];
console.log(sumBitDiffAllPairs(arr1));
const arr2 = [1, 3, 323235];
console.log(sumBitDiffAllPairs(arr2));
