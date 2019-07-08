// Top 10 algorithms in Interview Questions - https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// Smallest subarray with sum greater than a given value - https://www.geeksforgeeks.org/minimum-length-subarray-sum-greater-given-value/

// SUBARRAY (next to each other elements of array)

// Time - n^2
// Space - 1
function getSmallestSubArr(arr, target) {
  let window = 0;
  let sum = 0;
  let sumArr = [];
  while (window < arr.length) {
    for (let i = 0; i < arr.length - window; i++) {
      const el1 = arr[i];
      sum += el1;
      sumArr.push(el1);
      if (sum > target) return sumArr;
      for (let j = i + 1; j < i + window + 1 && j < arr.length; j++) {
        const el2 = arr[j];
        sum += el2;
        sumArr.push(el2);
      }
      console.log(sumArr);
      if (sum > target) return sumArr;
      sum = 0;
      sumArr = [];
    }
    window += 1;
  }
  return null;
}


const arr = [5, 9, 7, 1, 2];
const target = 22;
console.log(getSmallestSubArr(arr, target));

