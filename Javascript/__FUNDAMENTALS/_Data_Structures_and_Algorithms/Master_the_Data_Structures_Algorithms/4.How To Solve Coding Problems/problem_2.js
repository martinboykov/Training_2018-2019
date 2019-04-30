// Given 2 arrays, create a function that let's a user know (true/false) whether these two arrays contain any common items
// For Example:
// const array1 = [1, 2, 4, 5];//const sum = 8;
// should return false.
// -----------
// const array1 = [1, 2, 4, 4];//const sum = 8;
// should return true.

// 2 parameters - array and variable - no size limit
// return true or false

function checkForIdenticalValue(arr, sum) {
  const hashSetObj = {};
  const hashSetObjDouble = {};
  let bool = false;
  arr.forEach((a) => {
    if (hashSetObj[a]) {
      hashSetObjDouble[a] = true;
      return;
    }
    hashSetObj[a] = true;
  });
  // for (let a of arr1) {
  //   if (hashSetObj.hasOwnProperty(a)) {
  //     return true;
  //   }
  // }
  // // console.log(bool)
  // // return bool;
  // return false;
  let difference = 0;
  arr.forEach((a) => {
    difference = sum - a;
    if (difference < 0) return;
    if (hashSetObj.hasOwnProperty(difference)) {
      if (difference === a && hashSetObjDouble[a]) {
        bool = true;
        return;
      }
      if (difference === a && !hashSetObjDouble[a]) {
        return;
      }
      bool = true;
    }
  });
  return bool;
}
function checkForIdenticalValueCleaner(arr, sum) {
  const hashSetObj = {};
  for (const a of arr) {
    if (hashSetObj[a]) {
      return true;
    }
    hashSetObj[sum - a] = true;
  }
  return false;
}
const arrA = [1, 2, 4, 5];
const arrB = [1, 6, 2, 4, 8];
const resultA = checkForIdenticalValueCleaner(arrA, 8);
const resultB = checkForIdenticalValueCleaner(arrB, 8);
// const resultA = checkForIdenticalValue(arrA, 8);
// const resultB = checkForIdenticalValue(arrB, 8);

console.log(resultA);
console.log(resultB);


