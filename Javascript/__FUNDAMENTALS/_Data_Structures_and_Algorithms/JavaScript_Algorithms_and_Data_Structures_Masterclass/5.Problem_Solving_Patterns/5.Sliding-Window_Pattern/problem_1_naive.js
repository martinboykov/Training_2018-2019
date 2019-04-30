/** SLIDING WINDOW PATTERN **/

// This pattern involves creating a window which can either be an array
// or number from one position to another. Depending on a certain condition,
// the window either increases or closes (and a new window is created).
// Very useful for keeping track of a subset of data in an array/string etc.

function maxSubarraySum(arr, num) {
  if (num > arr.length) return null;

  let max = -Infinity;
  for (let i = 0; i < arr.length - num + 1; i++) {
    let temp = 0;
    for (let j = 0; j < num; j++) {
      temp += arr[i + j];
    }
    if (temp > max) {
      max = temp;
    }
  }
  return max;
}
// Time Complecity => O(n^2)
// Space Complecity => O(1) (no aditional structures)

console.log(maxSubarraySum([2, 6, 9, 2, 1, 8, 5, 6, 3], 3)); // 19
console.log(maxSubarraySum([1, 6, 11, 2, 1, 8, 5, 16, 3], 5)); // 33
