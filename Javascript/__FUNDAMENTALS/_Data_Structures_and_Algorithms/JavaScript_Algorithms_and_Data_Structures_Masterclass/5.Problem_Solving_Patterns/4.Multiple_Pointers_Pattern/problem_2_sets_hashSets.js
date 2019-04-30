// Implement a function called countUniqueValues,
// which accepts a sorted array, and counts the
// unique values in the array. There can be negative
// numbers in the array, but it will always be sorted

function countUniqueValues(arr) {
  const setFirst = new Set([...arr]); // loop through setFirst => O(n)
  return setFirst.size;
}

// Time Complecity => O(n)
// Space Complecity => O(n) (aditional structure -> Set)

console.log(countUniqueValues([-11, -1, 0, 1, 1, 2, 3, 3, 4, 5, 6, 6, 7]));
