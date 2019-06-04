// https://www.youtube.com/watch?v=Ifwf3DBN1sc&list=PLI1t_8YX-ApvMthLj56t1Rf-Buio5Y8KL&index=2
// https://www.hackerrank.com/challenges/icecream-parlor/problem

function solve(m, array) {
  const sortedArr = array.slice().sort(compare);
  let curFlavour;
  let curFlavourIndex = 0;
  let otherFlavour = 0;
  for (curFlavourIndex = 0; curFlavourIndex < sortedArr.length; curFlavourIndex++) {
    curFlavour = sortedArr[curFlavourIndex];
    const diff = m - curFlavour;
    otherFlavour = binarySearch(diff, sortedArr.slice(curFlavourIndex + 1));
    if (otherFlavour > 0) break;
  }
  const index1 = findIndex(curFlavour, array, +Infinity) + 1;
  const index2 = findIndex(otherFlavour, array, index1 - 1) + 1;
  const result = [index1, index2].sort(compare);
  console.log(`${result[0]} ${result[1]}`);
  if (index1 && index2) return result;
  return -1;
  function compare(x, y) {
    return x - y;
  }
  function binarySearch(x, arr) {
    if (arr.length === 0) return -1;
    const mid = Math.floor(arr.length / 2);
    if (x === arr[mid]) return arr[mid];
    if (x < arr[mid]) {
      return binarySearch(x, arr.slice(0, mid));
    } else if (x > arr[mid]) {
      return binarySearch(x, arr.slice(mid + 1, arr.length));
    }
    return -1;
  }
  function findIndex(flavour, arr, otherIndex) {
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      if (flavour === element && index !== otherIndex) return index;
    }
    return NaN;
  }
}

console.log(solve(3, [1, 14, 5, 3, 2]));
console.log(solve(4, [2, 2, 4, 3]));
