/** Multiple Pointers - averagePair **/

// Write a function called averagePair. Given a sorted array of integers and a target average,
// determine if there is a pair of values in the array where the average of the pair equals the
// target average. There may be more than one pair that matches the average

// Bonus Contrains:
// Time: O(N)
// Space: O(1)

function averagePair(arr, int) {
  const objArr = {};
  arr.forEach((element) => {
    objArr[element] = 1;
  });
  let tempInt = 0;
  let tempDiff = 0;
  for (let index = 0; index < arr.length - 1; index++) {
    tempInt = arr[index];
    tempDiff = int * 2 - tempInt;
    if (objArr[tempDiff]) return true;
  }
  return false;
}
// Time: O(N)
// Space: O(N)


console.log(averagePair([1, 2, 3], 2.5)); // true
console.log(averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8)); // true
console.log(averagePair([-1, 0, 3, 4, 5, 6], 4.1));// false
console.log(averagePair([], 4)); // false
