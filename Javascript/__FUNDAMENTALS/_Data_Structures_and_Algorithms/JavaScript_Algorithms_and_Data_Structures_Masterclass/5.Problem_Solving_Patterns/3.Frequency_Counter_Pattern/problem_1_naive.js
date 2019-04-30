// Write a function called same, which accepts two arrays.
// The function should return true if every value in the
// array has it's corresponding value squared in the second array
// The frequency of values must be the same.


function same(arrFirst, arrSecond) {
  if (arrFirst.length !== arrSecond.length) {
    return false;
  }
  let checkIf = true;
  arrFirst.forEach((element, index) => { // O(n) - forEach is looping trough arrFirst
    const correctIndex = arrSecond.indexOf(arrFirst[index] ** 2); // O(n) - indexOf is looping trough arrSecond
    if (correctIndex === -1) {
      checkIf = false;
      return;
    }
    arrSecond.splice(correctIndex, 1);
  });
  return checkIf;
}

// Time Complecity => O = O(a) * O(b) = O(n^2)
// Space Complecity => O(1) (no aditional structures)

const arrA = [2, 1, 3];
const arrB = [4, 9, 1];
const arrC = [1, 4, 6];
const resultA = same(arrA, arrB);
const resultB = same(arrA, arrC);

console.log(resultA);
console.log(resultB);

