/**    Frequency Counter    **/

// Write a function called sameFrequency
// Given two positive integers, find out if the two
// numbers have the same frequency of digits.

// Your solution MUST have the following complexities:
// Time: O(N)

function sameFrequency(int1, int2) {
  let tempInt1 = int1;
  const objInt1 = {};
  while (tempInt1 / 10 > 0) {
    const modalInt1 = tempInt1 % 10;
    if (objInt1[modalInt1]) {
      objInt1[modalInt1] += 1;
    } else {
      objInt1[modalInt1] = 1;
    }
    tempInt1 = Math.floor(tempInt1 / 10);
  }
  let tempInt2 = int2;
  while (tempInt2 / 10 > 0) {
    const modalInt2 = tempInt2 % 10;
    if (objInt1[modalInt2]) {
      objInt1[modalInt2] -= 1;
    } else {
      return false;
    }
    if (objInt1[modalInt2] < 0) {
      return false;
    }
    tempInt2 = Math.floor(tempInt2 / 10);
  }
  return true;
}

// Time: O(N)
// Space: O(N)

console.log(sameFrequency(1822, 2281)); // true
console.log(sameFrequency(34, 14)); // false
console.log(sameFrequency(3589578, 5879385)); // true
console.log(sameFrequency(2202, 2220)); // false
