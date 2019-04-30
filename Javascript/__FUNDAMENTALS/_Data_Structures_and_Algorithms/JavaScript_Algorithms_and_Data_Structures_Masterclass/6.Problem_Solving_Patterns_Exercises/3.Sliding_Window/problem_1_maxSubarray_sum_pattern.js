/** Sliding Window - maxSubarraySum **/

// Given an array of integers and a number, write a function called maxSubArraySum,
// which finds the maximum sum of a subarray with the length of the number passed
// to the function. Note that a subarray consist of consecutive elements from the
// original array. In the first example below, [100, 200, 300] is a subarray of the
// original array, but [100,300] is not.

// Constraints:
// Time Complexity - O(N)
// Space Complexity - O(1)

function maxSubarraySum(arr, int) {
  if ((typeof (int) !== 'number')) return null;
  if ((!Array.isArray(arr))) return null;
  let max = 0;
  const length = arr.length;
  for (let index = 0; index < int; index++) {
    max += arr[index];
  }
  let maxTemp = max;
  for (let index = 0; index < length - int; index++) {
    maxTemp = maxTemp - arr[index] + arr[index + int];
    if (maxTemp > max) max = maxTemp;
  }
  return max;
}
// Time Complexity - O(N)
// Space Complexity - O(1)

console.log(maxSubarraySum([100, 200, 300, 400], 2)); // 700
console.log(maxSubarraySum([1, 4, 2, 10, 23, 3, 1, 0, 20], 4)); // 39
console.log(maxSubarraySum([-3, 4, 0, -2, 6, -1], 2)); // 5
console.log(maxSubarraySum([3, -2, 7, -4, 1, -1, 4, -2, 1], 2)); // 5
console.log(maxSubarraySum([2, 3], 'num')); // null
