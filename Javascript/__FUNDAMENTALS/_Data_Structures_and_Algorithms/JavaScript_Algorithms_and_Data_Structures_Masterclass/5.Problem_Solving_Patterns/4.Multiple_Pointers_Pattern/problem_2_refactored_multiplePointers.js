// Implement a function called countUniqueValues,
// which accepts a sorted array, and counts the
// unique values in the array. There can be negative
// numbers in the array, but it will always be sorted

// using two pointers (left, right)

function countUniqueValues(arr) {
  if (arr.length === 0) return 0;
  let left = 0;
  let right = left + 1;
  let counter = 1;
  while (left <= right && right <= arr.length - 1) {
    if (arr[left] !== arr[right]) {
      counter += 1;
      left = right;
    } else {
      right += 1;
    }
  }
  return counter;
}

// Time Complecity => O(n)
// Space Complecity => O(1)

console.log(countUniqueValues([-2, -1, 0, 0, 1, 1, 2, 5, 6, 6, 7, 9, 10, 11]));

