// LONGEST dOMMON SUBSEQUENCE
// problem - Hackerrank: https://www.hackerrank.com/challenges/dynamic-programming-classics-the-longest-common-subsequence/problem
// video - CS Dojo: https://www.youtube.com/watch?v=Qf5R-uYQRPk&list=PLBZBJbE_rGRU5PrgZ9NBHJwcaZsNpf8yD&index=3
// video - MIT Lecture: https://www.youtube.com/watch?v=V5hZoJ6uK-s

// My solution 1
// function solve(arr1, arr2) {
//   let memo;
//   if (arr1.length <= arr2.length) {
//     memo = lcs(arr1, arr2);
//   } else {
//     memo = lcs(arr2, arr1);
//   }
//   // console.log(memo);
//   const memoArraysOnly = Object.values(memo).filter((arr) => arr !== true);
//   // console.log(memoArraysOnly);
//   const result = Object.values(memoArraysOnly)
//     .filter((arr) => arr.length === memo.maxLength);
//   console.log(result);
//   return result[0];
//   // console.log('exit');
// }

// function lcs(arrSmall, arrBig, memo = { maxLength: 0 }) {
//   if (arrSmall.length === 0) return null;
//   const ifCSFound = check(arrSmall, arrBig);
//   if (!ifCSFound) {
//     for (let index = 0; index < arrSmall.length; index++) {
//       const arrTemp = arrSmall.filter((el, idx) => index !== idx);
//       if (!memo[arrTemp]) lcs(arrTemp, arrBig, memo);
//     }
//   }
//   return memo;

//   function check(arrS, arrB) {
//     let i = 0;
//     let indexCurr = -1;
//     let indexNext = -1;
//     const result = [];
//     if (arrS[i]) indexCurr = arrB.indexOf(arrS[i], 0);
//     if (indexCurr >= 0) result.push(arrS[i]);
//     i += 1;
//     // getNextIndex();
//     if (arrS[i]) indexNext = arrB.indexOf(arrS[i], indexCurr + 1);

//     while (indexCurr >= 0 && indexNext > indexCurr) {
//       result.push(arrS[i]);
//       i += 1;
//       indexCurr = indexNext;

//       // getNextIndex();
//       if (arrS[i] || arrS[i] === 0) {
//         indexNext = arrB.indexOf(arrS[i], indexCurr + 1);
//       }
//     }
//     if (result.length === arrS.length) {
//       if (memo.maxLength < result.length) {
//         memo.maxLength = result.length;
//       }
//       memo[arrS] = result;
//     } else {
//       memo[arrS] = true;
//     }
//     // console.log(arrS, result, arrB);
//     return result.length === arrS.length;
//   }
// }

// Solution 2
function maxLCSLength(P, Q, n, m, memo) {
  let result;
  if (memo[n][m]) return memo[n][m];
  if (n === 0 || m === 0) {
    result = 0;
  } else if (P[n - 1] === Q[m - 1]) {
    result = 1 + maxLCSLength(P, Q, n - 1, m - 1, memo);
  } else {
    result = Math.max(
      maxLCSLength(P, Q, n - 1, m, memo),
      maxLCSLength(P, Q, n, m - 1, memo));
  }
  memo[n][m] = result;
  // console.log(memo);
  return result;
}
function solve(arr1, arr2) {
  const memo = Array(arr2.length + 1).fill(0)
    .map(() => Array(arr1.length + 1).fill(0));
  maxLCSLength(arr2, arr1, arr2.length, arr1.length, memo);
  // console.log(memo);
  // console.log(result);
  return getLCS(arr2.length, arr1.length, memo);
  function getLCS(rowIndex, columnIndex, lcsMatrix) {
    const strLCS = [];
    // console.log('current', current, n, m);
    while (columnIndex > 0 || rowIndex > 0) {
      if (arr1[columnIndex - 1] === arr2[rowIndex - 1]) {
        // Move by diagonal left-top.
        strLCS.unshift(arr1[columnIndex - 1]);
        columnIndex -= 1;
        rowIndex -= 1;
      } else if (lcsMatrix[rowIndex][columnIndex] === lcsMatrix[rowIndex][columnIndex - 1]) {
        // Move left.
        columnIndex -= 1;
      } else {
        // Move up.
        rowIndex -= 1;
      }
    }
    // console.log(strLCS);
    return strLCS;
  }
}

// Solution 3
// function solve(set1, set2) {
//   // Init LCS matrix.
//   const lcsMatrix = Array(set2.length + 1).fill(null).map(() => Array(set1.length + 1).fill(null));

//   // Fill first row with zeros.
//   for (let columnIndex = 0; columnIndex <= set1.length; columnIndex += 1) {
//     lcsMatrix[0][columnIndex] = 0;
//   }

//   // Fill first column with zeros.
//   for (let rowIndex = 0; rowIndex <= set2.length; rowIndex += 1) {
//     lcsMatrix[rowIndex][0] = 0;
//   }

//   // Fill rest of the column that correspond to each of two strings.
//   for (let rowIndex = 1; rowIndex <= set2.length; rowIndex += 1) {
//     for (let columnIndex = 1; columnIndex <= set1.length; columnIndex += 1) {
//       if (set1[columnIndex - 1] === set2[rowIndex - 1]) {
//         lcsMatrix[rowIndex][columnIndex] = lcsMatrix[rowIndex - 1][columnIndex - 1] + 1;
//       } else {
//         lcsMatrix[rowIndex][columnIndex] = Math.max(
//           lcsMatrix[rowIndex - 1][columnIndex],
//           lcsMatrix[rowIndex][columnIndex - 1],
//         );
//       }
//     }
//   }
// console.log(lcsMatrix);
//   // Calculate LCS based on LCS matrix.
//   if (!lcsMatrix[set2.length][set1.length]) {
//     // If the length of largest common string is zero then return empty string.
//     return [''];
//   }

//   const longestSequence = [];
//   let columnIndex = set1.length;
//   let rowIndex = set2.length;

//   while (columnIndex > 0 || rowIndex > 0) {
//     if (set1[columnIndex - 1] === set2[rowIndex - 1]) {
//       // Move by diagonal left-top.
//       longestSequence.unshift(set1[columnIndex - 1]);
//       columnIndex -= 1;
//       rowIndex -= 1;
//     } else if (lcsMatrix[rowIndex][columnIndex] === lcsMatrix[rowIndex][columnIndex - 1]) {
//       // Move left.
//       columnIndex -= 1;
//     } else {
//       // Move up.
//       rowIndex -= 1;
//     }
//   }
//   console.log(longestSequence);
//   return longestSequence;
// }

solve(['a', 'd'], ['a', 'b', 'b', 'd']);

solve([1, 2, 0, 3], [3, 2, 1, 2, 4]); // 1 2 -> i recieve 2,2 wrong answer

// simple tests
// solve([1, 2, 3, 4, 1], [3, 4, 1, 2, 1, 3]); // 3 4 1
// solve([3, 9, 8, 3, 9, 7, 9, 7, 0], [3, 3, 9, 9, 9, 1, 7, 2, 0, 6]); // 3 3 9 9 7 0

// main tests
// solve([16, 27, 89, 79, 60, 76, 24, 88, 55, 94, 57, 42, 56, 74, 24, 95, 55, 33, 69, 29, 14, 7, 94, 41, 8, 71, 12, 15, 43, 3, 23, 49, 84, 78, 73, 63, 5, 46, 98, 26, 40, 76, 41, 89, 24, 20, 68, 14, 88, 26],
// [27, 76, 88, 0, 55, 99, 94, 70, 34, 42, 31, 47, 56, 74, 69, 46, 93, 88, 89, 7, 94, 41, 68, 37, 8, 71, 57, 15, 43, 89, 43, 3, 23, 35, 49, 38, 84, 98, 47, 89, 73, 24, 20, 14, 88, 75]); // 26 length

// solve([697, 953, 900, 438, 899, 593, 591, 963, 31, 160, 894, 493, 782, 445, 326, 452, 988, 657, 7, 544, 768, 398, 791, 650, 818, 12, 347, 928, 828, 336, 692, 339, 130, 837, 548, 487, 989, 333, 875, 711, 957, 341, 821, 319, 338, 328, 234, 7, 670, 328, 451, 200, 685, 699, 855, 668, 609, 322, 752, 386, 81, 635, 952, 618, 133, 73, 548, 163, 221, 105, 773, 398, 639, 579, 660, 746, 718, 918, 224, 984, 265, 242, 506, 762, 734, 98, 324, 100, 896, 346, 344, 27, 420, 353, 532, 105, 914, 130, 695],
//   [438, 591, 768, 160, 777, 894, 782, 398, 445, 306, 326, 282, 452, 607, 241, 513, 185, 7, 544, 12, 347, 828, 336, 83, 924, 143, 692, 339, 130, 515, 837, 466, 989, 875, 711, 957, 338, 266, 305, 480, 328, 28, 7, 670, 328, 699, 849, 668, 609, 979, 100, 322, 283, 386, 655, 263, 826, 169, 635, 952, 618, 73, 238, 897, 221, 863, 34, 372, 732, 398, 579, 666, 545, 660, 794, 746, 526, 718, 918, 403, 615, 946, 224, 822, 242, 506, 734, 324, 100, 55, 346, 704, 24, 650, 678, 532, 914, 130, 423, 998])
