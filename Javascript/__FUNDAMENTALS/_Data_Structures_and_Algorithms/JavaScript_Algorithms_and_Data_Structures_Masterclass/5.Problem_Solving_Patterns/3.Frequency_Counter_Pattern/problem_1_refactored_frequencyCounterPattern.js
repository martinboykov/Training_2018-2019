// Write a function called same, which accepts two arrays.
// The function should return true if every value in the
// array has it's corresponding value squared in the second array
// The frequency of values must be the same.

// Using frequency counter pattern
// by using object constructing structure for countering patterns

// Works only for arrOne[i] = arrTwo[j] ** 2
// not for arrTwo[i] = arrOne[j] ** 2

function same(arrFirst, arrSecond) {
  // check if inputs are arrays
  // check if arrays are not empty
  if (arrFirst.length !== arrSecond.length) return false;
  const frequencyCounterOne = {}; // Ospace (a)
  const frequencyCounterTwo = {}; // Ospace (b)
  for (const valFirst of arrFirst) { // Otime (a)
    frequencyCounterOne[valFirst] = (frequencyCounterOne[valFirst] || 0) + 1;
  }
  for (const valSecond of arrSecond) { // Otime (b)
    frequencyCounterTwo[valSecond] = (frequencyCounterTwo[valSecond] || 0) + 1;
  }
  for (const key in frequencyCounterOne) { // Otime (a)
    if (frequencyCounterOne.hasOwnProperty(key)) {
      if (!(key ** 2 in frequencyCounterTwo)) {
        return false;
      }
      if (frequencyCounterTwo[key ** 2] !== frequencyCounterOne[key]) {
        return false;
      }
    }
  }

  return true;
}

// Time Complecity => O = O(a) + O(b) + O(a) + O(b) = O(2*a + 1*b) = = O(a + b)
// Space Complecity => O(a+b) (two aditional structures => objects)

const arrA = [2, 3, 1];
const arrB = [4, 9, 1];
const arrC = [1, 4, 6];
const resultA = same(arrA, arrB);
const resultB = same(arrA, arrC);

console.log(resultA);
console.log(resultB);
