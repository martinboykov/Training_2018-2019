// https://www.hackerrank.com/challenges/equal/problem

function equal(arr) {
  // First find min {1 5 5}. In this case it's 1.
  let min = +Infinity;
  arr.forEach((el) => {
    if (min > el) min = el;
  });

  // In general, you need to try the following targets: min, min-1, min-2, min-3 and min-4 and target >=0.
  // So in this particular case min=1 so we try only min and min-1.
  // Case 1: target is (1 1 1)
  // Find the delta between (1 5 5) and (1 1 1):
  // delta = (1 5 5) - (1 1 1) = (0 4 4)

  let resMin = +Infinity;
  for (let target = 0; target <= Infinity; target++) {
    let resultArr = arr.slice();
    resultArr = resultArr.map((el, idx) => resultArr[idx] - target);
    console.log(resultArr);
    let checkIfNeg = false;
    checkIfNeg = resultArr.some((el) => el < 0);
    if (checkIfNeg) {
      console.log('checkIfNeg');
      console.log(resMin);
      return resMin;
    }
    // In terms of {1, 2, 5} operations we can minimally partition (0 4 4) elements as follows:
    // 0 = 0 * 5 + 0 * 2 + 0 * 1
    // 4 = 0 * 5 + 2 * 2 + 0 * 1
    // 4 = 0 * 5 + 2 * 2 + 0 * 1
    // Note that you get above partition as follows:
    // For some delta = (d0 d1 ... dn-1)
    // di = ai * 5 + bi * 2 + ci * 1
    // ai = di / 5
    // bi = (di % 5) / 2
    // ci = (((di % 5) % 2) / 1)


    resultArr = resultArr.map((el, i) => {
      let a = 0;
      let b = 0;
      let c = 0;
      let rest = 0;
      if (el >= 5) {
        rest = el % 5;
        el -= rest;
        a = el / 5;
        el = rest;
      }
      if (el >= 2) {
        rest = el % 2;
        el -= rest;
        b = el / 2;
        el = rest;
      }
      c = el;
      return a + b + c;
    });
    console.log(resultArr);
    let res = resultArr.reduce((acc, curr) => {
      acc += curr;
      return acc;
    }, 0);

    console.log(res);
    if (resMin > res) resMin = res;
    console.log(resMin);
  }
  return resMin;
  // Now count the occurences of {1, 2, 5} in (0 4 4) partition and this is the min number of operations to reduce (1 5 5) -> (1 1 1):
  // min number of ops = (0 + 0 + 0) + (0 + 2 + 0) + (0 + 2 + 0) = 4
}
const arr0 = [1, 5, 5]; // ...
const arr = [1, 3, 1123834]; // ...
const arr1 = [2, 2, 3, 7]; // 2
const arr2 = [10, 7, 12]; // 3
const arr3 = [249, 666, 500, 101, 227, 85, 963, 681, 331, 119, 448, 587, 668, 398, 802]; // 1123
const arr4 = [851, 183, 48, 473, 610, 678, 725, 87, 95, 50, 311, 258, 854]; // 927
// equal(arr0);
// equal(arr);
// equal(arr1);
// equal(arr2);
// equal(arr3);
equal(arr4);

// not optimal
// function equal(arr, iter = 0) {
//   let max = -Infinity;
//   let min = +Infinity;
//   let maxInd = 0;
//   arr.forEach((el, i) => { // O(n)
//     if (max < el) {
//       max = el;
//       maxInd = i;
//     }
//     if (min > el) {
//       min = el;
//     }
//   });
//   let diff = max - min;
//   // console.log('iter', iter);
//   if (diff === 0) return iter;
//   // console.log('arr', arr);
//   if (diff >= 5) diff = 5;
//   else if (diff <= 2 && diff > 1) diff = 2;
//   else diff = 1;
//   // console.log('diff', diff);
//   arr = arr.map((el, i) => {
//     if (i !== maxInd) return el + diff;
//     return el;
//   });
//   return equal(arr, iter + 1);
// }
