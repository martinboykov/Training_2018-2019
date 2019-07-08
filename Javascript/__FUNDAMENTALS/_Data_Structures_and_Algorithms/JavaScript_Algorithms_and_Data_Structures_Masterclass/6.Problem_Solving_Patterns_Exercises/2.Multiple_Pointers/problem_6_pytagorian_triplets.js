// Top 10 algorithms in Interview Questions - https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// Pythagorean Triplet in an array - https://www.geeksforgeeks.org/find-pythagorean-triplet-in-an-unsorted-array/

// Time - close to O(nlogn), less than O(n^2)
// Space -
// function getPitagorianTriplet(arr) {
//   arr.sort((x, y) => x - y); // O(nlogn -> n^2)
//   console.log(arr);
//   let i = 0;
//   let j = i + 1;
//   let k = j + 1;
//   const memo = {};
//   arr.forEach((el, index) => { // O(n)
//     memo[index] = Math.pow(arr[index], 2);
//   });
//   while (i < arr.length && j < arr.length && k < arr.length) {
//     console.log(i, j, k, [memo[i] + memo[j], memo[k]]);
//     if (memo[i] + memo[j] < memo[k]) {
//       j += 1;
//       if (j === k) {
//         i += 1;
//         j = i + 1;
//         k = j + 1;
//       }
//     } else if (memo[i] + memo[j] > memo[k]) {
//       k += 1;
//       if (k === arr.length) {
//         i += 1;
//         j = i + 1;
//         k = j + 1;
//       }
//     } else if (memo[i] + memo[j] === memo[k]) {
//       return true;
//     }
//   }
//   return false;
// }

// using hash
// Time - close to O(nlogn), less than O(n^2)
function getPitagorianTriplet(arr) {
  arr.sort((x, y) => x - y); // O(nlogn -> n^2)
  arr = arr.map((el) => {
    return Math.pow(el, 2);
  });
  let i = 0;
  let j = i + 1;
  let k = j + 1;
  const memo = { pow: {}, result: {} };
  arr.forEach((el, ind) => { // O(n)
    memo.pow[ind] = el;
    memo.result[el] = true;
  });
  let iterations = 0;
  while (i < arr.length - 2 && j < arr.length - 1 && k < arr.length) {
    // console.log(i, j, k);
    if (memo.result[arr[i] + arr[j]]) {
      // console.log(memo.pow[i], memo.pow[j], memo.result[memo.pow[i] + memo.pow[j]]);
      return true;
    }
    if (arr[i] + arr[j] < arr[k]) {
      j += 1;
      if (j === k) {
        i += 1;
        j = i + 1;
        k = j + 1;
      }
    } else if (arr[i] + arr[j] > arr[k]) {
      k += 1;
      if (k === arr.length) {
        i += 1;
        j = i + 1;
        k = j + 1;
      }
    }
    iterations += 1;
  }
  console.log(arr.length);
  console.log(iterations);
  return false;
}
const arr1 = [3, 1, 4, 6, 5];
console.log(getPitagorianTriplet(arr1));
let arr2 = Array.from({ length: 1000000 }, () => Math.floor(Math.random() * 1000000));
console.log('DONE');
console.time('end ?');
console.log(getPitagorianTriplet(arr2));
console.timeEnd('end ?');
console.time('end logn');
let length = arr2.length;
while (length >= 100) {
  // arr2.splice(0, Math.floor(arr2.length / 2));
  length = length / 2;
}
console.timeEnd('end logn');
arr3 = Array.from({ length: 1000000 }, () => Math.floor(Math.random() * 1000000));
console.time('end n');
arr2.forEach((element) => {
});
console.timeEnd('end n');
console.time('end nlogn');
arr3.sort((x, y) => Math.pow(x, 2) - Math.pow(y, 2));
console.timeEnd('end nlogn');

// console.time('end n^2');
// arr2.forEach((element) => {
//   arr2.forEach((el) => {
//     const sum = el * element;
//   });
// });
// console.timeEnd('end n^2');
