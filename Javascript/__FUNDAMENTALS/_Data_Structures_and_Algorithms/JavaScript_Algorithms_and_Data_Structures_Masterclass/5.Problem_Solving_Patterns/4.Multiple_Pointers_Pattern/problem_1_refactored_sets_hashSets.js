// Write a function called sumZero which accepts a sorted
// array of integers. The function should find the first pair
// where the sum is 0. Return an array that includes both
// values that sum to zero or undefined if a pair does not exist

// ************************* //
// **    MY SOLUTION      ** //
// ************************* //

function countUniqueValues(arr) {
  // check if inputs is arrays
  // check if array is not empty
  if (arr.length === 0) return;
  const allZeroArr = arr.filter((el) => el === 0); // loop through arr => O(n)
  if (allZeroArr.length > 1) {
    return [0, 0];
  }
  const setFirst = new Set([...arr]); // loop through setFirst => O(n)
  // if support for E11 is required use hashset instead => hashSetFirst = { arr[index]: true, ...}
  for (const value of arr) { // loop through arr => O(n)
    if (setFirst.has(-value) && value !== 0) {
      return [value, -value];
    }
  }
}

// Time Complecity => O(n)
// Space Complecity => O(n) (aditional structures)

console.log(countUniqueValues([0, 0, 1, 1, 2, 5, 6, 6, 7, 9, 10]));

