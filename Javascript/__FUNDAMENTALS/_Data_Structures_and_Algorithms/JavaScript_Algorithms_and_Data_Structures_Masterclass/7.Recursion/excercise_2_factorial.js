// Calculate n!

// recursive
// function factorial(num) {
//   if (num === 1) return 1;
//   return num * factorial(num - 1);
// }

// iterative
function factorial(num) {
  let f = 1;
  while (num >= 1) {
    f = f * (num );
    num -= 1;
  }
  return f;
}

console.log(factorial(3));
console.log(factorial(5));
console.log(factorial(10));

