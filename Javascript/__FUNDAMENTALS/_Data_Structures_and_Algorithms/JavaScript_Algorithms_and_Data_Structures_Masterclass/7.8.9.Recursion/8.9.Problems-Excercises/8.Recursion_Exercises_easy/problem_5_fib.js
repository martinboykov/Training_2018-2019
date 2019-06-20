// Write a recursive function called fib which accepts a number and returns the
// nth number in the Fibonacci sequence. Recall that the Fibonacci sequence is
// the sequence of whole numbers 1,1,2,3,5,8, ... which starts with 1 and 1, and
// where every number thereafter is equal to the sum of the previous two numbers

// recursion
// helper method pattern
// function fib(int) {
//   if (int === 0) return [1];
//   if (int === 1) return [1];

//   let fibArr = [1, 1];
//   function helper(intTemp) {
//     if (intTemp > int) return;
//     fibArr.push(fibArr[0] + fibArr[1]);
//     fibArr.splice(0, 1);
//     helper(intTemp + 1);
//   }
//   helper(2);
//   return fibArr[0];
// }

// recursion
function fib(num, memo = {}) {
  if (num === 0) return 0;
  if (num === 1) return 1;
  if (memo[num]) return memo[num];
  memo[num] = fib(num - 1, memo) + fib(num - 2, memo);
  return memo[num];
}
// iteration
// function fib(num) {
//   let i;
//   const fibArr = [0, 1]; // Initialize array!
//   for (i = 2; i <= num; i++) {
//     // Next fibonacci number = previous + one before previous
//     fibArr[i] = fibArr[i - 2] + fibArr[i - 1];
//   }
//   return fibArr[fibArr.length - 1];
// }

console.log(fib(4)); // 3
console.log(fib(10)); // 55
console.log(fib(28)); // 317811
console.log(fib(35)); // 9227465
console.log(fib(42)); // 267914296
console.log(fib(1002)); // 267914296
