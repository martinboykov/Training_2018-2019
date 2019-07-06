// Top 10 algorithms in Interview Questions - https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// Count triplets with sum smaller than a given value - https://www.geeksforgeeks.org/count-triplets-with-sum-smaller-that-a-given-value/

// Time - O(n)
// Space - O(1)
// can solve also [1, 2, 2, 1, 2, 1, 1, 1, 1, 2, 2, 2];
// function arrangeZigZag(arr) {
//   console.log(arr);
//   let ifSwap = true;
//   let counter = 0;
//   while (ifSwap) {
//     ifSwap = false;
//     let left = 0;
//     let right = left + 1;
//     while (right < arr.length - 1) {
//       if (right % 2 !== 0) { // odd
//         if (arr[left] >= arr[right]) {
//           ifSwap = true;
//           const next = arr[right + 1];
//           arr[right + 1] = arr[right];
//           arr[right] = next;
//         }
//       } else if (right % 2 === 0) { // even
//         if (arr[left] <= arr[right]) {
//           ifSwap = true;
//           const next = arr[right + 1];
//           arr[right + 1] = arr[right];
//           arr[right] = next;
//         }
//       }
//       left += 1;
//       right += 1;
//     }
//     counter += 1;
//     left = arr.length - 2;
//     right = left + 1;
//     if (ifSwap) {
//       while (left > 0) {
//         if (right % 2 !== 0) { // odd
//           if (arr[left] >= arr[right]) {
//             ifSwap = true;
//             const next = arr[left - 1];
//             arr[left - 1] = arr[left];
//             arr[left] = next;
//           }
//         } else if (right % 2 === 0) { // even
//           if (arr[left] <= arr[right]) {
//             ifSwap = true;
//             const next = arr[left - 1];
//             arr[left - 1] = arr[left];
//             arr[left] = next;
//           }
//         }
//         left -= 1;
//         right -= 1;
//       }
//     }
//     counter += 1;
//   }
//   console.log(counter);
//   return arr;
// }

// Time - O(n)
// Space - O(1)
// cant solve [1, 2, 2, 1, 2, 1, 1, 1, 1, 2, 2, 2];
function arrangeZigZag(arr) {
  console.log(arr);
  let cur = 0;
  let next = cur + 1;
  while (next < arr.length) {
    if (next % 2 !== 0) { // odd
      if (arr[cur] >= arr[next]) {
        const temp = arr[cur];
        arr[cur] = arr[next];
        arr[next] = temp;
      }
    } else if (next % 2 === 0) { // even
      if (arr[cur] <= arr[next]) {
        const temp = arr[cur];
        arr[cur] = arr[next];
        arr[next] = temp;
      }
    }
    cur += 1;
    next += 1;
  }
  return arr;
}
const arr1 = [4, 3, 7, 8, 6, 2, 1];
console.log(arrangeZigZag(arr1));
const arr2 = [1, 4, 3, 2];
console.log(arrangeZigZag(arr2));

const arr4 = [10, 0, 9, 1, 8, 3, 7, 4, 6, 5];
console.log(arrangeZigZag(arr4));
const arr5 = [10, 9, 1, 2, 3, 0, 8, 7, 6, 5, 4];
console.log(arrangeZigZag(arr5));

// special case
// const arr3 = [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2];
// console.log(arrangeZigZag(arr3));
