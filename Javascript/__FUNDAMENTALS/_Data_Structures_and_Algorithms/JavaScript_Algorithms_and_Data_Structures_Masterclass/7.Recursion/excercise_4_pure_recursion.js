// Collect all "ODD" values for the given array of inegers
function collectOddValues(arr) {
  const arrOdd = [];
  if (arr.length === 0) return arrOdd;
  if (arr[0] % 2 !== 0) arrOdd.push(arr[0]);
  return arrOdd.concat(collectOddValues(arr.slice(1)));
}

console.log(collectOddValues([1, 2, 3, 4, 5]));
console.log(collectOddValues([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log(
  collectOddValues([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]));
