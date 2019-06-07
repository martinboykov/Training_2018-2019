/** RADIX SORT **/
// special sorting algorithm (no comparisons)
// Only for integers


//                                    best     -> average     -> worst
// Resulting Time Complexity        - O(nk)    -> O(nk)       -> O(nk)
// n - number of integers, k - length of the numbers
// not suitable for reaaly big numbers => k goes up

// if taking into account how numbers are stored in computer memory (controversial)
// Resulting Time Complexity        - O(nk)    -> O(nlogn)    -> O(nk)
// -------------------------------------------------------------------
// Space Complexity O(n+k)

function radixSort(arr) {
  let interval = 1;
  let ifSorted = false;
  let ifMaxIntervalCount = 0;
  while (!ifSorted) { // Time O(logn)
    const matrix = getMatrix();
    const arrTemp = getTempArray(matrix);
    arr = arrTemp;
    if (ifMaxIntervalCount === arr.length) ifSorted = true;
    interval *= 10;
    ifMaxIntervalCount = 0;
  }
  return arr;

  // helper functions
  function getDigit(int, i) {
    return Math.floor(int / i) % 10;
  }
  function getMatrix() {
    const matrix = [];
    for (let index = 0; index < arr.length; index++) { // Time O(n)
      const el = arr[index];
      let digit = getDigit(el, interval);

      // if all digits are zero => reached the log limit of all integers => array is sorted
      if (digit === 0) ifMaxIntervalCount += 1;

      // adding case for negative number
      if (digit < 0) {
        digit = 0;
      } else {
        digit += 1;
      }

      // checking if matrix[i] is not defined
      if (!matrix[digit]) matrix[digit] = [];
      matrix[digit].push(el);
    }
    return matrix;
  }
  function getTempArray(matrix) {
    let arrTemp = [];
    for (let index = 0; index < matrix.length; index++) { // Time O(1)
      const matrixArray = matrix[index];
      if (matrixArray) arrTemp = [...arrTemp, ...matrixArray];
    }
    return arrTemp;
  }
}
const arr = [32, 27, 31, 4, 30, 0, -832, 35, 4029, 12, 9, 4, 48];
// console.log(arr);
console.log(radixSort(arr));
