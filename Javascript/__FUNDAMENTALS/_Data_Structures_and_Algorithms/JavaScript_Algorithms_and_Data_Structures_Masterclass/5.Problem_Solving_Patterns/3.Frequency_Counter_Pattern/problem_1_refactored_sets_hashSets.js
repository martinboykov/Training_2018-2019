// Write a function called same, which accepts two arrays.
// The function should return true if every value in the
// array has it's corresponding value squared in the second array
// The frequency of values must be the same.

// ************************* //
// **    MY SOLUTION      ** //
// ************************* //

// Works for both arrOne[i] = arrTwo[j] ** 2
// and for arrTwo[i] = arrOne[j] ** 2

function same(arrFirst, arrSecond) {
  // check if inputs are arrays
  // check if arrays are not empty
  if (arrFirst.length !== arrSecond.length) return false;
  const setFirst = new Set([...arrFirst]); // loop through arrFirst => O(n)
  const setSecond = new Set([...arrSecond]); // loop through arrSecond => O(n)
  // if support for E11 is required use hashset instead => hashSetFirst = { arrFirst[index]: true, ...}
  if (setFirst.size !== setSecond.size) return false;
  let checkOne = true;
  let checkTwo = true;
  for (const setFirstValue of setFirst) { // loop through setFirst => O(n)
    if (!setSecond.has(setFirstValue ** 2)) {
      checkOne = false;
      break;
    }
  }
  for (const setSecondValue of setSecond) { // loop through setSecond => O(n)
    if (!setFirst.has(setSecondValue ** 2)) {
      checkTwo = false;
      break;
    }
  }
  if (checkOne || checkTwo) {
    return true;
  }
  return false;
}

// Time Complecity => O = O(a) + O(b) + O(a) + O(b) = O(2*a + 2*b)
// Space Complecity => O(a+b) (two aditional structures => sets(hashSets))

const arrA = [2, 0, 1];
const arrB = [4, 0, 1];
const arrC = [1, 4, 6];
const resultA = same(arrA, arrB);
const resultB = same(arrA, arrC);

console.log(resultA);
console.log(resultB);
