// Top 10 algorithms in Interview Questions - https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// Find the smallest positive integer value that
// cannot be represented as sum of any subset of a given array - https://www.geeksforgeeks.org/find-smallest-value-represented-sum-subset-given-array/

// SUBSET - is all combinations of array elements (not permutations)

// Time - ~nlogn
// Space - n
// function combinations(array) {
//   return new Array(1 << array.length)
//     .fill()
//     .map((e1, i) => {
//       return array.filter((e2, j) => {
//         console.log(j);
//         const result = i & 1 << j;
//         return result;
//       });
//     });
// }

// function getSmallest(arr, memo = {}) {
//   let result = combinations(arr).filter((a) => a.length >= 1).map((a) => a.reduce((accumulator, currentValue) => accumulator + currentValue));
//   result = new Set(result);
//   result = [...result];
//   let res = result.filter((el, index) => {
//     return el + 1 !== result[index + 1];
//   })[0];
//   return res + 1;
// }

// Time - n
// Space - 1
// binary representation:
// Check aggain after visiting Binary manipulations
// function getSmallest(arr) {
//   let res = 1;
//   for (let index = 0; index < arr.length && arr[index] <= res; index++) {
//     res = res + arr[index];
//   }
//   return res;
// }
// const arr1 = [1, 2, 3, 4, 5, 6];
// console.log(getSmallest(arr1));


// Explanation of binary solution:
// So, Binary number have one golden rule
// (2^i)-1 = 2^0 + 2^1 + 2^2 + ... + 2^(i-1)
// Weight ith number is 1 + sum of weight of 0 to i-1 binary elements.

// Compare array elements with binary representation of number and weight of each element in binary.
// So, if you have 4-bit binary number( same as array with 1,2,4,8 elements )
// then you can generate upto 2^4-1 = 15 different positive number.

// Lets take your array elements as {1,2,4,8,17} if you compare it with binary representation then
// you can generate number 1 to 15 using first four elements of array.
// But you can not generate 16 because 17-1 != 15 ( 1+ 2+ 4+ 8 ).

// If we compare with ' res ' variable then we have
// res = 1(initialize result) + a[0] + a[1] + a[2] ... + a[i-1]
// at any point a[i] >= res then you can not generate ' res '
// sum value since we don't have proper weight.
