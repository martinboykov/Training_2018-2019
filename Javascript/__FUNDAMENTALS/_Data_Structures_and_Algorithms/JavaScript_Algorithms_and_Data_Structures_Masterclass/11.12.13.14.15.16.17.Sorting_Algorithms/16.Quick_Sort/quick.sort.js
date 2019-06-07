/** QUICK SORT **/
// comparison sort algorithm

//                                    best     -> average  -> worst
// Time Complexity /pivot/          - O(n)     -> O(n)     -> O(n)
// *
// Time Complexity /main/           - O(logn)  -> O(logn)  -> O(n) (extreme case when calling quicksort on sorted array and pivot is in the beggining or end)
// =
// Resulting Time Complexity        - O(nlogn) -> O(nlogn) -> O(n^2) (extreme case when calling quicksort on sorted array and pivot is in the beggining or end)
// -------------------------------------------------------------------
// Space Complexity O(depth of recursion)


function pivot(arr, start = 0, end = arr.length - 1) {
  const swap = (arr, idx1, idx2) => {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  };

  // We are assuming the pivot is always the first element
  let pivot = arr[start];
  let swapIdx = start;

  for (let i = start + 1; i <= end; i++) {
    if (pivot > arr[i]) {
      swapIdx++;
      swap(arr, swapIdx, i);
    }
  }

  // Swap the pivot from the start the swapPoint
  swap(arr, start, swapIdx);
  return swapIdx;
}

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivotIndex = pivot(arr, left, right);
    quickSort(arr, left, pivotIndex - 1); // left
    quickSort(arr, pivotIndex + 1, right); // right
  }
  return arr;
}
console.log(quickSort([32, 27, 31, 4, 30, 34, 8, 35, 49, 12, 9, 4, 48]));
// console.log(pivot([33, 11, 111, 73, 170, 1], 0, 5));
// console.log(quickSort((Array.from(Array(2000000).keys()).map((el) => Math.floor(Math.random() * 10 ** 2)))));
// console.log(((Array.from(Array(2000000).keys()).map((el) => Math.floor(Math.random() * 10 ** 2)).sort())));
