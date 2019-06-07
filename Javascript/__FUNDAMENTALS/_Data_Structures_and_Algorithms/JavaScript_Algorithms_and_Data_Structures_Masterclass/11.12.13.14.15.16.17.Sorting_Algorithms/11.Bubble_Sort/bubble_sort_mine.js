/** BUBBLE SORT */
// comparison sort algorithm

// O(n) for almost sorted cases
// for example if we get numbers in array one at a time

function bubbleSort(arr) {
  function swap(first, second) {
    const temp = arr[first];
    arr[first] = arr[second];
    arr[second] = temp;
  }
  const length = arr.length;
  let n = 0;
  while (n < length) {
    let isSorted = true;
    for (let index = 0; index < length - n; index++) {
      const currentEl = arr[index];
      const nextEl = arr[index + 1];
      const lastIndex = length - 1 - n;
      if (lastIndex !== index) {
        if (currentEl > nextEl) {
          isSorted = false;
          swap(index, index + 1);
        }
      }
    }
    if (isSorted) return [arr, n + 1]; // returns sorted array and number of iterations
    n += 1;
  }
  return [arr, n + 1]; // returns sorted array and number of iterations
}

console.log(bubbleSort([11, 33, 7, 12, 3]));
