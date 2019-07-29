// https://www.hackerrank.com/challenges/sherlock-and-cost/problem?utm_campaign=challenge-recommendation&utm_medium=email&utm_source=24-hour-campaign
function getMaxCost(B) {
  const n = B.length;
  let low = 0;
  let hi = 0;
  for (let i = 1; i <= n - 1; i++) {
    const deltaHighToLow = Math.abs(B[i - 1] - 1); // ..., 1 , i-1 , i
    const deltaLowToHigh = Math.abs(B[i] - 1); //  // ..., . ,  1  , i
    const lowNext = Math.max(low, hi + deltaHighToLow); //
    console.log('lowNext', lowNext);
    const hiNext = low + deltaLowToHigh;
    console.log('hiNext', hiNext);
    low = lowNext;
    hi = hiNext;
  }
  return Math.max(hi, low);
}

const arr = [10, 1, 10, 1, 10]; // 36
// const arr1 = [2, 3, 8, 5]; // 15
// const arr2 = [4, 7, 9]; // 12
// const arr3 = [100, 2, 100, 2, 100]; // 396
// const arr4 = [69, 19, 15, 81, 93, 100, 35, 18, 81, 16, 65, 20, 4, 45, 81, 83, 90, 14, 82, 85, 43, 7, 64, 76, 33, 47, 95, 12, 78, 93, 14, 22, 97, 36, 65, 66, 36, 26, 59, 81, 81, 82, 44, 79, 89, 94, 32, 94, 22, 33, 19, 46, 46, 62, 19, 47, 70, 91, 97, 62, 17, 43, 11, 25, 74, 73, 64, 98, 73, 7, 40, 8, 2, 96, 89, 81, 80, 17, 88, 13, 31, 44, 64]; // 5001
// const arr5 = [100000, 1000, 100000, 10000, 8, 2, 1000, 100, 100000, 10000, 9, 100000, 100000, 10000]; // ...
// const arr6 = [43, 36, 62, 20, 71, 56, 27, 48, 66, 94, 14, 39, 4, 47, 19, 20, 14, 94, 95, 42, 84, 3, 49, 33, 51, 41, 1, 60, 80, 33, 47, 96, 39, 32, 4, 96, 17, 72]; // ...
console.log(getMaxCost(arr));
// console.log(getMaxCost(arr1));
// console.log(getMaxCost(arr2));
// console.log(getMaxCost(arr3));
// console.log(getMaxCost(arr4));
// console.log(getMaxCost(arr5));
// console.log(getMaxCost(arr6)); // 2035

module.exports = getMaxCost;

// Soliution 1
// fails at 4,7,9 // gives 11, instead 12
// function getMaxIdx(arrB) {
//   let max = 0;
//   let maxIdx = 0;
//   arrB.forEach((el, idx) => {
//     if (max < el) {
//       max = el;
//       maxIdx = idx;
//     }
//   });
//   if (max === 0) return null;
//   return maxIdx; // idx
// }
// function fillA(idx, arrA, arrB) {
//   arrA[idx] = arrB[idx];
// }
// function fillB(idx, arrB) {
//   if (arrB[idx - 1]) arrB[idx - 1] = 0;
//   arrB[idx] = 0;
//   if (arrB[idx + 1]) arrB[idx + 1] = 0;
// }
// function sumA(arrA) {
//   let sum = 0;
//   for (let idx = 1; idx < arrA.length; idx++) {
//     const el = arrA[idx];
//     sum += Math.abs(arrA[idx] - arrA[idx - 1]);
//   }
//   return sum;
// }
// function getMaxCost(B) {
//   const A = new Array(B.length).fill(1);
//   console.log('B', B);
//   console.log('A', A);
//   let maxIdx = getMaxIdx(B);
//   console.log('maxIdx', maxIdx);
//   console.log('max', B[maxIdx]);
//   while (maxIdx !== null) {
//     fillA(maxIdx, A, B);
//     fillB(maxIdx, B);
//     console.log('B', B);
//     console.log('A', A);
//     maxIdx = getMaxIdx(B);
//     console.log('maxIdx', maxIdx);
//     console.log('max', B[maxIdx]);
//   }
//   const res = sumA(A);
//   // console.log(res);
//   return res;
// }


// Soliution 2 - better than 1, but still errors
// function fillEvenNums(AB, arr, first, last, initial) {
//   // ... 10^5 ... 1 ... 10^5 ... 1
//   for (let index = first; index <= last; index += 2) {
//     if (initial === 1) {
//       AB[index] = 1;
//     } else if (initial > 1) {
//       AB[index] = arr[index];
//     }
//   }
// }
// function fillOddNums(AB, arr, first, last, initial) {
//   // ... 1 ... 10^5 ... 1 ... 10^5 ...
//   for (let index = first + 1; index <= last; index += 2) {
//     if (initial === 1) {
//       AB[index] = arr[index];
//     } else if (initial > 1) {
//       AB[index] = 1;
//     }
//   }
// }

// function fillSamePowWindow(AB, arr, pow, smallerBefore, smallerAfter, first, last, caseAB) {
//   const windowLength = last + 1 - first;
//   // case 1 EVEN -> if total size of numbers>10^pow next to each other is EVEN
//   // ... 10^5 10^5 ...
//   if (windowLength % 2 === 0) {
//     // case 1.1. if there are numbers before and after the window
//     if (smallerBefore && smallerAfter) {
//       if (smallerBefore >= smallerAfter) {
//         // 10 10^5 10^5 9 -> .. 1, 10^5 ..
//         fillEvenNums(AB, arr, first, last, 1);
//         fillOddNums(AB, arr, first, last, 1);
//       } else if (smallerBefore < smallerAfter) {
//         // 9 10^5 10^5 10 -> .. 10^5, 1 ..
//         fillEvenNums(AB, arr, first, last, arr[first]);
//         fillOddNums(AB, arr, first, last, arr[first]);
//       }
//       // case 1.2. if is number only before the window (window is at the at the end of arr)
//       // ... 10 10^5 10^5 [END]
//     } else if (smallerBefore) {
//       // 9 10^5 10^5 10 -> .. 10^5, 1 ..
//       fillEvenNums(AB, arr, first, last, arr[first]);
//       fillOddNums(AB, arr, first, last, arr[first]);

//       // case 1.3. if is number only after the window (window is at the at the start of arr)
//       // [START] 10^5 10^5 10 ...
//     } else if (smallerAfter) {
//       // 9 10^5 10^5 10 -> .. 10^5, 1 ..
//       fillEvenNums(AB, arr, first, last, 1);
//       fillOddNums(AB, arr, first, last, 1);

//       // case 1.4. if there is no number before ot after the window (window is the same as arr)
//       // [START] 10^5 10^5 10^5 10^5[END]
//     } else {
//       // doesnt matter the order (1 100 1 100 === 100 1 100 1)
//       if (caseAB === 'A') {
//         fillEvenNums(AB, arr, first, last, 1);
//         fillOddNums(AB, arr, first, last, 1);
//       } else if (caseAB === 'B') {
//         fillEvenNums(AB, arr, first, last, arr[first]);
//         fillOddNums(AB, arr, first, last, arr[first]);
//       }
//     }
//     // case ODD -> if total size of numbers > 10^pow next to each other is ODD
//     // ... 10^5 10^5 10^5 ...
//   } else if (windowLength % 2 !== 0) {
//     // 10 10^5 10^5 9 -> .. 1, 10^5 ..
//     if (caseAB === 'A') {
//       fillEvenNums(AB, arr, first, last, 1);
//       fillOddNums(AB, arr, first, last, 1);
//     } else if (caseAB === 'B') {
//       fillEvenNums(AB, arr, first, last, arr[first]);
//       fillOddNums(AB, arr, first, last, arr[first]);
//     }
//   }
// }
// function condCheck(i, pow, arr) {
//   return Math.pow(10, pow) >= arr[i] && arr[i] > Math.pow(10, pow - 1);
// }

// function fillPowers(AB, arr, pow, caseAB) {
//   for (let i = 0; i < arr.length; i += 1) {
//     let cond = condCheck(i, pow, arr);
//     if (cond) {
//       console.log(pow, i, arr[i]);
//       let first = i;
//       let last = i;
//       cond = condCheck(i + 1, pow, arr);
//       while (arr[last + 1] && cond) {
//         console.log(arr[i]);
//         last += 1;
//         i += 1;
//         cond = condCheck(last, pow, arr);
//       }
//       let smallerBefore = null;
//       let smallerAfter = null;
//       if (arr[first - 1]) {
//         if (AB[first - 1] <= Math.pow(10, pow - 1)) {
//           smallerBefore = arr[first - 1];
//         } else if (AB[first - 1] > Math.pow(10, pow)) {
//           AB[first] = 1;
//           first += 1;
//         }
//       }
//       if (arr[last + 1]) {
//         if (AB[last + 1] <= Math.pow(10, pow - 1)) {
//           smallerAfter = arr[last + 1];
//         } else if (AB[last + 1] > Math.pow(10, pow)) {
//           AB[last] = 1;
//           last -= 1;
//         }
//       }
//       if (first === last) {
//         AB[i] = arr[i];
//         // if there are more numbers of same power next to each other
//       } else if (first !== last) {
//         fillSamePowWindow(AB, arr, pow, smallerBefore, smallerAfter, first, last, caseAB);
//       }
//     }
//   }
// }
// function fillOnes(AB, arr) {
//   for (let i = 0; i < arr.length; i += 1) {
//     if (AB[i] === 1) arr[i] = 1;
//     if (AB[i] === 0) AB[i] = 1;
//   }
// }
// function sum(arr) {
//   let total = 0;
//   for (let idx = 1; idx < arr.length; idx++) {
//     total += Math.abs(arr[idx] - arr[idx - 1]);
//   }
//   return total;
// }
// function getMaxCost(arr) {
//   const A = new Array(arr.length).fill(0);
//   const B = A.slice();
//   const caseA = 'A';
//   const caseB = 'B';
//   let pow = 5;

//   console.log('arr', arr);

//   console.log('A', JSON.stringify(A));
//   console.log('B', JSON.stringify(B));
//   while (pow > 1) {
//     console.log('pow', pow);

//     fillPowers(A, arr, pow, caseA);
//     fillPowers(B, arr, pow, caseB);
//     console.log('A', JSON.stringify(A));
//     console.log('B', JSON.stringify(B));
//     pow -= 1;
//   }
//   console.log('pow', pow);

//   fillOnes(A, arr);
//   fillOnes(B, arr);
//   fillPowers(A, arr, pow = 1, caseA);
//   fillPowers(B, arr, pow = 1, caseB);

//   console.log('arr', JSON.stringify(arr));

//   console.log('A', JSON.stringify(A));
//   console.log('B', JSON.stringify(B));

//   const resA = sum(A);
//   const resB = sum(B);
//   console.log(resA);
//   console.log(resB);
//   const res = resA >= resB ? resA : resB;
//   return res;
// }
