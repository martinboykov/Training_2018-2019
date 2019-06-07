// Calculate the sum of all the integers between 1 and the integer "num"
function sumRange(num) {
  if (num === 1) return 1;
  return num + sumRange(num - 1);
}

console.log(sumRange(3));
console.log(sumRange(5));
console.log(sumRange(10));
