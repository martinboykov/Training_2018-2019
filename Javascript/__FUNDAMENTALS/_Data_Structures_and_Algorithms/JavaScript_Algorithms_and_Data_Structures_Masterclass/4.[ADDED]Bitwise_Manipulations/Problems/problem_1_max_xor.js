// Top 10 algorithms in Interview Questions - https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// Find the maximum subarray XOR in a given array - https://www.geeksforgeeks.org/find-the-maximum-subarray-xor-in-a-given-array/

function findMaxXorSubarray(arr) {
  let localMaxXor = arr[0];
  let localMaxXorArr = [arr[0]];
  let next = 1;
  while (next < arr.length) {
    localMaxXor ^= arr[next];
    localMaxXorArr.push(arr[next]);
    next += 1;
  }
  let l = 0;
  let r = arr.length - 1;
  while (l <= r) {
    console.log(localMaxXor);
    console.log(localMaxXor ^ arr[l]);
    console.log(localMaxXor ^ arr[r]);
    console.log('-------------------');
    if ((localMaxXor ^ arr[l]) > localMaxXor) {
      localMaxXor ^= arr[l];
      localMaxXorArr.shift();
      l += 1;
    } else if ((localMaxXor ^ arr[r]) > localMaxXor) {
      localMaxXor ^= arr[r];
      localMaxXorArr.pop();
      r -= 1;
    } else {
      break;
    }
  }

  return { max: localMaxXor, arr: localMaxXorArr };
}
const arr1 = [1, 2, 3, 4];
console.log(findMaxXorSubarray(arr1));
// const arr2 = [8, 1, 2, 12, 7, 6];
// console.log(findMaxXorSubarray(arr2));
// const arr3 = [4, 6];
// console.log(findMaxXorSubarray(arr3));
const arr4 = [1, 2, 2222, 7, 8];
console.log(findMaxXorSubarray(arr4));

