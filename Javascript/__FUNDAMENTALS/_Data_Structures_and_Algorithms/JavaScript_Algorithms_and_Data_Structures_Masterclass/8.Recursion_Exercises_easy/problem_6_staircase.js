// Recursive Staircase - https://www.youtube.com/watch?v=eREiwuvzaUM&list=PLI1t_8YX-ApvMthLj56t1Rf-Buio5Y8KL&index=6
// https://www.hackerrank.com/challenges/icecream-parlor/problem

// Matrix Exponentiation - https://www.youtube.com/watch?v=-BbfrK4eV0k
// Part of Geometrical and Network Flow Algorithms -https://www.geeksforgeeks.org/top-algorithms-and-data-structures-for-competitive-programming/#algo6
// Time O(logn) Space O(1)
// ...

// recursion with memoization ("Top Down" Dynamic programmin, while building the table is commonly called "Bottom Up" from what I've seen)
// Time O(n) Space O(n)
// function stepComb(steps, memo = {}) {
//   if (steps < 0) return 0;
//   else if (steps === 0) return 1;
//   if (!memo[steps]) {
//     memo[steps] = // makes it linear time O(n)
//       stepComb(steps - 1, memo) +
//       stepComb(steps - 2, memo) +
//       stepComb(steps - 3, memo);
//   }
//   return memo[steps];
// }

// recursion with building the table ("Bottum Up" Dynamic programming)
// Time O(n) Space O(n)
function stepComb(steps) {
  if (steps < 0) return 0;
  else if (steps === 0) return 0;
  else if (steps === 1) return 1;
  else if (steps === 2) return 2;
  let combs = 0;
  let prev = 1;
  let cur = 1;
  let next = 2;
  let currentStep = 3;
  while (currentStep <= steps) {
    combs = prev + cur + next;
    prev = cur;
    cur = next;
    next = combs;
    currentStep += 1;
  }
  return combs;
}

// recursion
// Time O(nlogn) Space O(n)
// function stepPerms(n) {
//   let combinations = 0;
//   recursion(n, 0);
//   return combinations;
//   function recursion(stepsLeft, step) {
//     const currentStepsLeft = stepsLeft - step;
//     if (currentStepsLeft < 0) return;
//     if (currentStepsLeft === 0) {
//       ++combinations;
//       return;
//     }
//     for (let currentStep = 1; currentStep <= 3; currentStep++) {
//       recursion(currentStepsLeft, currentStep);
//     }
//   }
// }

// with combinations
// function stepPerms(n) {
//   let combinations = 0;
//   const allCombsArray = [];
//   const tempArray = [];
//   recursion(n, 0, tempArray);
//   return { allCombsArray, combinations };
//   function recursion(stepsLeft, stepType, tempComboArray) {
//     const currentStepsLeft = stepsLeft - stepType;
//     for (let step = 1; step <= 3; step++) {
//       tempComboArray.push(step);
//       if (currentStepsLeft - step < 0) return;
//       if (currentStepsLeft - step === 0) {
//         allCombsArray.push(tempComboArray);
//         ++combinations;
//         return;
//       }
//       recursion(currentStepsLeft, step, tempComboArray.slice());
//       tempComboArray.splice(0, step);
//     }
//   }
// }

console.log(stepComb(1000));
