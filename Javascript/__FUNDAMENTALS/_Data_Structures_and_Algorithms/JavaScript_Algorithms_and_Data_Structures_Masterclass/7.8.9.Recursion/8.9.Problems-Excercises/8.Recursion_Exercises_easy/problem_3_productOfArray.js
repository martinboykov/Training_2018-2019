// Write a function called productOfArray which takes in an array of numbers
// and returns the product of them all

// helper method pattern
function productOfArray(arr) {
  let product = 1;
  function helper(array) {
    if (array.length === 0) return 1;
    product *= array[0];
    return helper(array.slice(1));
  }
  helper(arr);
  return product;
}

// pure recursion
// function productOfArray(arr) {
//   return arr.length === 0 ? 1 : arr[0] * productOfArray(arr.slice(1));
// }

console.log(productOfArray([1, 2, 3])); // 6
console.log(productOfArray([1, 2, 3, 10])); // 60
