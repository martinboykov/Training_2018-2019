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

function pivot(arr, pivotIndex, endIndex) {
  let storeIndex = pivotIndex + 1;
  let i = storeIndex;
  while (i <= endIndex) { // swapping all smaller than arr[pivot]
    if (arr[i] < arr[pivotIndex]) {
      const temp = arr[storeIndex];
      arr[storeIndex] = arr[i];
      arr[i] = temp;
      storeIndex += 1;
    }
    i += 1;
  }
  while (pivotIndex < storeIndex - 1) { // swapping arr[pivot] with leftmost swapped index
    const temp = arr[pivotIndex + 1];
    arr[pivotIndex + 1] = arr[pivotIndex];
    arr[pivotIndex] = temp;
    pivotIndex += 1;
  }
  return pivotIndex;
}

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivotIndex = pivot(arr, left, right);
    // console.log([arr, pivotIndex]);
    quickSort(arr, left, pivotIndex - 1);
    // console.log('leftArr', arr.slice(left, pivotIndex - 1));
    quickSort(arr, pivotIndex + 1, right);
    // console.log('rightArr', arr.slice(pivotIndex + 1, right));
  }
  return arr;
}
console.log([32, 27, 31, 4, 30, 34, 8, 35, 49, 12, 9, 4, 48]);
console.log(quickSort([32, 27, 31, 4, 30, 34, 8, 35, 49, 12, 9, 4, 48]));
// console.log(pivot([33, 11, 111, 73, 170, 1], 0, 5));
