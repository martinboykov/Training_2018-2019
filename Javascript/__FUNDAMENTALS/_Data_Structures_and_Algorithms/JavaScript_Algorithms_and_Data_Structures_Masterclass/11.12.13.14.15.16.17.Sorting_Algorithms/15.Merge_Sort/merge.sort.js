/** MERGE SORT */
// comparison sort algorithm

// Time Complexity - O(logn) decomposition(splits) of array
// *
// Time Complexity - O(n) comparisons per decomposition (sorting)
// =
// Resulting Time Complexity - O(nlogn)
// its always O(nlogn), no matter the case
// -------------------------------------------
// Space Complexity O(n) <= ( at bottom of recursion n amount of arrays with one element in them)

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return sort(left, right);

  function sort(arrL, arrR) {
    const result = [];
    let i = 0;
    let j = 0;
    while (i < arrL.length && j < arrR.length) {
      if (arrL[i] < arrR[j]) {
        result.push(arrL[i]);
        i += 1;
      } else if (arrL[i] > arrR[j]) {
        result.push(arrR[j]);
        j += 1;
      } else {
        result.push(arrL[i]);
        result.push(arrR[j]);
        i += 1;
        j += 1;
      }
    }
    while (i < arrL.length) {
      result.push(arrL[i]);
      i += 1;
    }
    while (j < arrR.length) {
      result.push(arrR[j]);
      j += 1;
    }
    return result;
  }
}
// let start = new Date();
// console.log(mergeSort([-1, 101, 24, 76, 73, -0, 0, -0, 0.5]));
console.log(mergeSort((Array.from(Array(10).keys()).map((el) => Math.floor(Math.random() * 10 ** 4)))));
// let end = new Date();
// console.log(end - start);
