/** INSERTION SORT */
// comparison sort algorithm

// O(n) for almost sorted cases
// for example if we get numbers in array one at a time
function insertionSort(arr) {
  function swap(index, n) {
    const temp = arr[index];
    arr[index] = arr[n];
    arr[n] = temp;
  }
  const length = arr.length;
  let n = 1;
  while (n < length) {
    let currentEl = arr[n];
    let currentIndex = n;
    for (let index = n - 1; index >= 0 && arr[index] > currentEl; index--) {
      const el = arr[index];
      if (currentEl < el) {
        swap(index, currentIndex);
        currentEl = arr[index];
        currentIndex = index;
      }
    }
    n += 1;
  }
  return [arr, n]; // O(....)
}

console.log(insertionSort([0, 1, 7, 12, 3]));
