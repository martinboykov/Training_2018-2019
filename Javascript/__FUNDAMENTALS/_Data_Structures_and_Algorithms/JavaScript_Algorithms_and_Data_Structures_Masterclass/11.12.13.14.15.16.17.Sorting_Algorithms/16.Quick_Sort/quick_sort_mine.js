/** QUICK SORT **/
// comparison sort algorithm

//                                    best     -> average  -> worst
// Time Complexity /pivot/          - O(n)     -> O(n)     -> O(n)
// *
// Time Complexity /main/           - O(logn)  -> O(logn)  -> O(n) (extreme case when calling quicksort on sorted array and pivot is in the beggining or end)
// =
// Resulting Time Complexity        - O(nlogn) -> O(nlogn) -> O(n^2) (extreme case when calling quicksort on sorted array and pivot is in the beggining or end)
// -------------------------------------------------------------------
// Space Complexity O(logn)
function quickSort(arr, pivotStartIndex = 0, endIndex = arr.length - 1) {
  if (pivotStartIndex < endIndex) {
    const pivotEndIndex = pivotUtil(arr, pivotStartIndex, endIndex);
    quickSort(arr, pivotStartIndex, pivotEndIndex - 1); // array elements on the left of pivotEndPosition
    quickSort(arr, pivotEndIndex + 1, endIndex); // array elements on the right of pivotEndPosition
  }
  // if (pivotStartIndex >= endIndex) bottom of recursion
  return arr;
}
function pivotUtil(arr, pivotStartIndex, endIndex) {
  let swapIndex = pivotStartIndex;
  let i = swapIndex + 1;
  while (i <= endIndex) { // swapping all smaller than arr[pivot]
    if (arr[i] < arr[pivotStartIndex]) {
      swapIndex += 1;
      swapUtil(arr, swapIndex, i);
    }
    i += 1;
  }
  swapUtil(arr, pivotStartIndex, swapIndex);
  return swapIndex; // its end position
}
function swapUtil(arr, idx1, idx2) {
  // [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  const temp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = temp;
}

// console.log([32, 27, 31, -4, 0, 34, 8, 35, 49, 12, 9, 4, 48]);
// console.log(quickSort([32, 27, 31, -4, 0, 34, 8, 35, 49, 12, 9, 4, 48]));

// hits stack overflow for array length >  0,53 mill
// console.log(quickSort((Array.from(Array(20).keys()).map((el) => Math.floor(Math.random() * 10 ** 2)))));

// console.log(pivot([33, 11, 111, 73, 170, 1], 0, 5));

module.exports = quickSort;
