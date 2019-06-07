/** SELECTION SORT */
// comparison sort algorithm

// better than bubble sort only if we want less swapping

function selectionSort(arr) {
  function swap(n, minIndex) {
    console.log(n, minIndex);
    const temp = arr[n];
    arr[n] = arr[minIndex];
    arr[minIndex] = temp;
  }
  const length = arr.length;
  let n = 0;
  while (n < length - 1) {
    let minEl = arr[n];
    let minIndex = n;
    for (let index = 1 + n; index < length; index++) {
      const currentEl = arr[index];
      if (currentEl < minEl) {
        minEl = currentEl;
        minIndex = index;
      }
    }
    if (minIndex !== n) {
      swap(n, minIndex);
    }
    n += 1;
  }
  return arr; // always O(n^2)
}

console.log(selectionSort([111, 33, 7, 12, 3]));
