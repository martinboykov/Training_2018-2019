/** SLIDING WINDOW PATTERN **/

// This pattern involves creating a window which can either be an array
// or number from one position to another. Depending on a certain condition,
// the window either increases or closes (and a new window is created).
// Very useful for keeping track of a subset of data in an array/string etc.

function maxSubarraySum(arr, num) {
  if (arr.length < num) return null;
  let max = 0;
  for (let index = 0; index < num; index++) {
    max += arr[index];
  }
  let temp = max;
  for (let index = 0; index < arr.length - num; index++) {
    temp = temp - arr[index] + arr[index + num];
    max = Math.max(temp, max);
  }
  return max;
}
// Time Complecity => O(n)
// Space Complecity => O(1) (no aditional structures)

console.log(maxSubarraySum([2, 6, 9, 2, 1, 8, 5, 6, 3], 3)); // 19
console.log(maxSubarraySum([1, 6, 11, 2, 1, 8, 5, 16, 3], 5)); // 33
