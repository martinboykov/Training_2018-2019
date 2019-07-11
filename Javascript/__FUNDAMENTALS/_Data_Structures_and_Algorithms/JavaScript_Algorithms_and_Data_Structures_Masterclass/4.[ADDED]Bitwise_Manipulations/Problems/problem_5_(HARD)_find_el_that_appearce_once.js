// Top 10 algorithms in Interview Questions - https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// Find the element that appears once - https://www.geeksforgeeks.org/find-the-element-that-appears-once/

// with hash
// Time: O(n)
// Space: O(n)
// function findElAppearOnce(arr) {
//   let arrObj = {}
//   for (let i = 0; i < arr.length; i++) {
//     if (arrObj[arr[i]]) arrObj[arr[i]] += 1;
//     else arrObj[arr[i]] = 1;
//   }
//   for (const key in arrObj) {
//     if (arrObj.hasOwnProperty(key)) {
//       const el = arrObj[key];
//       if (el === 1) return key;
//     }
//   }
//   return null;
// }

// ---------------------------

// with bitwise operators
// Time: O(n^2)
// Space: O(1) - arr mutation
// function findElAppearOnce(arr) {
//   let max = -Infinity;
//   for (let i = 0; i < arr.length; i++) {
//     const el = arr[i];
//     if (max < el) max = el;
//   }
//   let iterations = 0;
//   let maxNum = max;
//   let length = 0;
//   while (maxNum) {
//     length += 1;
//     maxNum = maxNum >> 1;
//   }
//   let iBit = 0;
//   while (iBit < length) { // O(w)
//     let bitSum = 0;
//     for (let i = 0; i < arr.length; i++) {
//       const el = arr[i];
//       if (el & (1 << iBit)) bitSum += 1;
//     }
//     // console.log(bitSum % 3);
//     if (bitSum % 3 !== 0) {
//       let l = 0;
//       while (l < arr.length) { // O(n)
//         iterations += 1;
//         const el = arr[l];
//         if (!(el & (1 << iBit)) > 0) {
//           arr.splice(l, 1); // O(n)
//         } else {
//           l += 1;
//         }
//       }
//     }
//     console.log(arr);
//     iBit += 1;
//   }
//   console.log(iterations);
//   return arr[0];
// }

// with bitwise operators
// Time: O(n)
// Space: O(1)
function findElAppearOnce(arr) {
  let ones = 0;
  let twos = 0;
  let notThrees = 0;
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    console.log(ones, twos);
    twos |= ones & el; // twos: The bits that have appeared 2nd time or 5th time or 8th time .. etc.
    ones ^= el; // ones: The bits that have appeared 1st time or 4th time or 7th time .. etc.
    console.log(ones, twos);
    notThrees = ~(ones & twos);
    ones &= notThrees;
    twos &= notThrees;
    console.log(ones, twos);
    console.log('--------------------');
  }
  return ones;
}

const arr1 = [2, 12, 1, 12, 3, 12, 1, 1, 3, 3];
console.log(findElAppearOnce(arr1));
