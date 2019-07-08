// Top 10 algorithms in Interview Questions - https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// Count triplets with sum smaller than a given value - https://www.geeksforgeeks.org/count-triplets-with-sum-smaller-that-a-given-value/

// Time - O(nlogn)
// Space - O(1)
// function findLongestSubsequence(arr) {
//   arr.sort((x, y) => x - y); // O(nlogn)
//   let i = 0;
//   let j = i + 1;
//   let currMax = 1;
//   let totalMax = 1;
//   while (i < arr.length - 1 && j < arr.length) { // O(n)
//     while (arr[i] + 1 === arr[j] && i < arr.length - 1 && j < arr.length) {
//       i += 1;
//       j += 1;
//       currMax += 1;
//       if (currMax > totalMax) totalMax = currMax;
//     }
//     i += 1;
//     j += 1;
//     currMax = 1;
//   }
//   return totalMax;
// }

// with hash
// Time - O(n)
// Space - O(n)
function findLongestSubsequence(arr) {
  const arrObj = {};
  arr.forEach((el) => { // O(n)
    arrObj[el] = true;
  });
  let i = 0;
  let currMax = 1;
  let totalMax = 1;
  while (i < arr.length) { // O(n)
    let next = arr[i] + 1;
    while (arrObj[next]) {
      currMax += 1;
      if (currMax > totalMax) totalMax = currMax;
      next += 1;
    }
    i += 1;
    currMax = 1;
  }
  return totalMax;
}
const arr1 = [10, 12, 11];
console.log(findLongestSubsequence(arr1));
const arr2 = [14, 12, 11, 20];
console.log(findLongestSubsequence(arr2));
const arr3 = [1, 56, 58, 57, 90, 92, 94, 93, 91, 45];
console.log(findLongestSubsequence(arr3));
