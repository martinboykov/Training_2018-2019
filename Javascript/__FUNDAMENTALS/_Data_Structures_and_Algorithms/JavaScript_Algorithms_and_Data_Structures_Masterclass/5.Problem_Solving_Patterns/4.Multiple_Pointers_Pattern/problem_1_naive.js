// Write a function called sumZero which accepts a sorted
// array of integers. The function should find the first pair
// where the sum is 0. Return an array that includes both
// values that sum to zero or undefined if a pair does not exist

function countUniqueValues(arr) {
  for (const i of arr) {
    for (const j of arr) {
      if (i + j === 0) {
        return [i, j];
      }
    }
  }
  return 'undefined';
}

// Time Complecity => O(n^2)
// Space Complecity => O(1) (no aditional structures)

console.log(countUniqueValues([1, 1, 2, 3, 3, 4, 5, 6, 6, 7]));
