// Write a function called sumZero which accepts a sorted
// array of integers. The function should find the first pair
// where the sum is 0. Return an array that includes both
// values that sum to zero or undefined if a pair does not exist

// using two pointers (left, right)

function countUniqueValues(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    if (arr[left] + arr[right] === 0) {
      return [arr[left], arr[right]];
    } else if (arr[left] + arr[right] < 0) {
      left += 1;
    } else {
      right -= 1;
    }
  }
  return 'undefined';
}

// Time Complecity => O(n)
// Space Complecity => O(1)

console.log(countUniqueValues([0, 0, 1, 1, 2, 5, 6, 6, 7, 9, 10]));

