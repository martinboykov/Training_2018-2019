// Top 10 algorithms in Interview Questions - https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// Binary representation of a given number - https://www.geeksforgeeks.org/binary-representation-of-a-given-number/
// with bitwise operators - not for large numbers
// Time: O(n)
// Space: O(1)
function getBits(num) {
  if (num >= 0) return (num >>> 0).toString(2).padStart(64, '0');
  return (num >>> 0).toString(2).padStart(64, '1');
}

// Time: O(n)
// Space: O(1)
// function getBits(num) {
//   if (num >= 0) {
//     return num
//       .toString(2)
//       .padStart(64, '0');
//   }

//   // else
//   return (-num - 1)
//     .toString(2)
//     .replace(/[01]/g, function(d) { return +!+d; }) // hehe: inverts each char
//     .padStart(64, '1');
// }

console.log(getBits(2 ** 60));
console.log(getBits(-(2 ** 60)));
