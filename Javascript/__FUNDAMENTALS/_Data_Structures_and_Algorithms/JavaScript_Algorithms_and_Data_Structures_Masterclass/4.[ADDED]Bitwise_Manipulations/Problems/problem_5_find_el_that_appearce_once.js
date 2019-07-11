// Top 10 algorithms in Interview Questions - https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// Find the element that appears once - https://www.geeksforgeeks.org/find-the-element-that-appears-once/

// with bitwise operators
// Time: O(n)
// Space: O(1)
function findElAppearOnce(arr) {
  let res = 1;
  // let max = -Infinity;
  // for (let i = 0; i < arr.length; i++) {
  //   const el = arr[i];
  //   if (max < el) max = el;
  // }
  // let maxNum = max;
  // let length = 0;
  // while (maxNum) {
  //   length += 1;
  //   maxNum = maxNum >> 1;
  // }
  // while (length) {
  //   for (let i = 0; i < arr.length; i++) {
  //     const element = arr[i];

  //   }
  // }
  for (let i = 0; i < arr.length; i++) {
    console.log((arr[i] >>> 0).toString(2).padStart(8, '0'));
    // res |= ;
    // res ^= 0;
  }
  return res;
}

const arr1 = [12, 1, 12, 3, 12, 1, 1, 2, 3, 3];
console.log(findElAppearOnce(arr1));
