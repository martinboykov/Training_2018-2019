/** MERGE SORT */
// comparison sort algorithm

// Time Complexity - O(logn) decomposition of array (recursive) (like binary search)
// *
// Time Complexity - O(n) comparisons per decomposition (merge function)
// =
// Resulting Time Complexity - O(nlogn)
// its always O(nlogn), nomatter the case
// -------------------------------------------
// Space Complexity O(depth of recursion)

function mergeSort(arr) {
  const length = arr.length;
  if (length <= 1) return arr;
  const middle = Math.floor(length / 2);
  const leftArr = mergeSort(arr.slice(0, middle)); // additional space
  const rightArr = mergeSort(arr.slice(middle)); // additional space
  return sort(leftArr, rightArr);

  function sort(arrL, arrR) { // functions are always hoisted to the top (beggining)
    const result = [];
    let i = 0;
    let j = 0;
    let k = 0;
    const lengthL = arrL.length;
    const lengthR = arrR.length;
    while (i < lengthL && j < lengthR) {
      if (arrL[i] < arrR[j]) {
        result[k] = arrL[i];
        k += 1;
        i += 1;
      } else if (arrL[i] === arrR[j]) {
        result[k] = arrL[i];
        k += 1;
        result[k] = arrR[j];
        k += 1;
        i += 1;
        j += 1;
      } else {
        result[k] = arrR[j];
        k += 1;
        j += 1;
      }
    }
    while (i < lengthL) {
      result[k] = arrL[i];
      k += 1;
      i += 1;
    }
    while (j < lengthR) {
      result[k] = arrR[j];
      k += 1;
      j += 1;
    }
    return result;
  }
}

console.log(mergeSort([1, 0, 333, 73, 225, 24]));
