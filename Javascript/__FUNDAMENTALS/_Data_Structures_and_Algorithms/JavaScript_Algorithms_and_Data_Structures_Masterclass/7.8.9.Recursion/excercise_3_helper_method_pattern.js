// Collect all "ODD" values for the given array of inegers
function collectOddValues(arr) {
  const arrOdd = [];
  function helper(array) {
    if (array.length === 0) return;
    if (array[0] % 2 !== 0) arrOdd.push(array[0]);
    helper(array.splice(1));
  }
  helper(arr);
  return arrOdd;
}

console.log(collectOddValues([1, 2, 3, 4, 5]));
console.log(collectOddValues([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log(
  collectOddValues([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]));
