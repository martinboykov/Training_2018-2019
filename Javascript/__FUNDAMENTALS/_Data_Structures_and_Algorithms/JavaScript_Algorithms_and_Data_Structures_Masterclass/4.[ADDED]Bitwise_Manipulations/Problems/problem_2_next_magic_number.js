// Top 10 algorithms in Interview Questions - https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// Find nth Magic Number - https://www.geeksforgeeks.org/find-nth-magic-number/

// without bitwise operators
// Time: O(1)
// Space: O(1)
// function findNextMagicNumber(n) {
//   if (n === 1) return 5;
//   if (n % 2 === 0) {
//     return Math.pow(5, n / 2 + 1);
//   }
//   return 5 + Math.pow(5, ((n - 1) / 2) + 1);
// }

// with bitwise operators
// Time: O(n.toString(2).length)
// Space: O(1)
function findNextMagicNumber(n) {
  let pow = 1;
  let answer = 0;
  while (n) {
    pow = 5 * pow;
    if (n & 1) answer += pow;
    n = n >> 1;
  }
  return answer;
}
const n1 = 6;
console.log(findNextMagicNumber(n1));
// const n2 = 5;
// console.log(findNextMagicNumber(n2));


