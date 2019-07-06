// Top 10 algorithms in Interview Questions - https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// Count triplets with sum smaller than a given value - https://www.geeksforgeeks.org/count-triplets-with-sum-smaller-that-a-given-value/

// Time - O(n^2) for count/ O(n^3) if we need also the combinations
// Space - O(n)
function getTriplets(arr, target, memo = []) {
  arr.sort((x, y) => x - y); // O(nlogn -> n^2)
  const length = arr.length;
  let count = 0;
  for (let i = 0; i < length - 2; i++) {
    let j = i + 1;
    let k = length - 1;
    while (j < k) {
      if (arr[i] + arr[j] + arr[k] >= target) {
        k -= 1; // decrease k
      } else { // if sum < target => everything in between j and k also satisfies (for first iteration j=3, k=7 in between are 4 and 5)
        count += k - j; // if we only need the combinations count // O(n^2)
        // while (j < k) { // if we need the exact combinations // O(n^3), because we backtrack O(n-2) in worst case
        //   memo.push([arr[i], arr[j], arr[k]]);
        //   k -= 1; // decrease k
        // }
        j += 1; // increase j
        k = length - 1; // reset k to last element
      }
    }
  }
  return count;
  // return memo;
}
// const arr1 = [-2, 0, 1, 3];
// const target1 = 2;
// console.log(getTriplets(arr1, target1));
const arr2 = [5, 1, 3, 4, 7];
const target2 = 12;
console.log(getTriplets(arr2, target2));
