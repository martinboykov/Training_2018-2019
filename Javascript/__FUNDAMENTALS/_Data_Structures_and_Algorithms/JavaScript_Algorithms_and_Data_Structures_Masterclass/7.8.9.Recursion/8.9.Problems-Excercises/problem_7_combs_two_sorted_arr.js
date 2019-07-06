// Top 10 algorithms in Interview Questions - https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// Count triplets with sum smaller than a given value - https://www.geeksforgeeks.org/count-triplets-with-sum-smaller-that-a-given-value/

// THE GIVEN IN GEEKS SOLUTION WASNT CLEAR (COMPLEXITY and AS HOLE)

// Time -
// Space -
function getCombs(arr1, arr2, memo = { combs: {}, count: 0, permutations: 0 }) {
  if (arr1.length === 0) return null;
  if (memo[arr1]) return null;
  memo[arr1] = arr1;
  memo.permutations += 1;
  let i = 0;
  let j = 0;
  const length1 = arr1.length;
  const length2 = arr2.length;
  let checkIfComb = true;
  let currComb = [];
  while (checkIfComb && j < length2) {
    while (i < length1 && j < length2) {
      if (i === 0) {
        while (arr1[i] > arr2[j] && j < length2) {
          j += 1;
        }
        if (j === length2) {
          checkIfComb = false;
          break;
        }
      } else if (i > 0) {
        if (arr1[i] < currComb[i]) {
          checkIfComb = false;
          break;
        }
      }
      currComb.push(arr1[i]);
      currComb.push(arr2[j]);
      i += 1;
      j += 1;
    }
    if (checkIfComb && i === length1) { // if there was no errors (breaks) and arr1 has looped entirely
      memo.combs[currComb] = true;
      memo.count += 1;
      // resset => to find diff comb with same arr1 and other arr2
      i = 0;
      j = 0;
      while (j < length2) {
        j += 1;
        if (arr2[j] === currComb[1]) {
          j += 1;
          break;
        }
      }
      currComb = [];
    }
  }
  let pivot = 0;
  while (pivot < length1) {
    getCombs([...arr1.slice(0, pivot), ...arr1.slice(pivot + 1, length1)], arr2, memo);
    pivot += 1;
  }

  return { combinations: memo.count, permutations: memo.permutations };
  // return Object.keys(memo.combs);
}
const arr1 = [10, 15, 25, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170];
const arr2 = [1, 5, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 151, 152, 153, 154, 155, 156, 167, 170, 180, 190, 200];
if (arr1.length <= arr2.length) {
  console.log(getCombs(arr1, arr2));
} else {
  console.log(getCombs(arr2, arr1));
}

