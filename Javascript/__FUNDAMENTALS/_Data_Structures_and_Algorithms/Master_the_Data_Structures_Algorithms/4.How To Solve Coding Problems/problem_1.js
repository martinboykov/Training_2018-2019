// Given 2 arrays, create a function that let's a user know (true/false) whether these two arrays contain any common items
// For Example:
// const array1 = ['a', 'b', 'c', 'x'];//const array2 = ['z', 'y', 'i'];
// should return false.
// -----------
// const array1 = ['a', 'b', 'c', 'x'];//const array2 = ['z', 'y', 'x'];
// should return true.

// 2 parameters - arrays - no size limit
// return true or false

function checkForIdenticalValue(arr1, arr2) {
  const hashSetObj = {};
  let bool = false;
  arr2.forEach((arr) => {
    hashSetObj[arr] = true;
  });
  // for (let a of arr1) {
  //   if (hashSetObj.hasOwnProperty(a)) {
  //     return true;
  //   }
  // }
  // // console.log(bool)
  // // return bool;
  // return false;
  arr1.forEach((a) => {
    if (hashSetObj.hasOwnProperty(a)) {
      bool = true;
    }
  });
  return bool;
}
const arrA = ['a', 'b', 'c', 'x'];
const arrB = ['z', 'y', 'i'];
const arrC = ['z', 'y', 'x'];
const resultA = checkForIdenticalValue(arrA, arrB);
const resultB = checkForIdenticalValue(arrA, arrC);

console.log(resultA);
console.log(resultB);


