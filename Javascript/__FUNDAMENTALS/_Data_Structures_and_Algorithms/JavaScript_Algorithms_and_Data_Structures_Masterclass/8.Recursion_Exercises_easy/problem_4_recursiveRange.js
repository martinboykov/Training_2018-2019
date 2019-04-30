// Write a function called recursiveRange which accepts a number and
// adds up all the numbers from 0 to the number passed to the function

// pure recursion
function recursiveRange(int) {
  return int === 1 ? int : int + recursiveRange(int - 1);
}

console.log(recursiveRange(6)); // 21
console.log(recursiveRange(10)); // 55
