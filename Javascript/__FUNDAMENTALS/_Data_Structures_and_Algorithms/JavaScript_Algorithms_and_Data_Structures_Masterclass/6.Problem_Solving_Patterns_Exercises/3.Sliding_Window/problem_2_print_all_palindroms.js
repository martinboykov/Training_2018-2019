// Top 10 algorithms in Interview Questions - https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// Given a string, print all possible palindromic partitions - https://www.geeksforgeeks.org/given-a-string-print-all-possible-palindromic-partition/

// Space: O(n) - depth of recursion; O(1) - iterative
// Recursive with memoization
// function getPalindromsUtil(arr, memo = {}) {
//   if (arr.length === 1) return null;
//   if (memo[arr]) return null;
//   let left = 0;
//   let right = arr.length - 1;
//   let isPalindrom = true;
//   while (left <= right) {
//     if (arr[left] !== arr[right]) {
//       isPalindrom = false;
//       break;
//     }
//     left += 1;
//     right -= 1;
//   }
//   if (isPalindrom) memo[arr] = [arr.join('')];
//   else memo[arr] = true; // without memoization -> O(n^2)
//   getPalindromsUtil(arr.slice(1), memo); // Time O(n) nitin -> itin -> tin -> in -> n -> null
//   getPalindromsUtil(arr.slice(0, arr.length - 1), memo); // Time O(n) nitin -> niti -> nit -> ni -> n -> null
//   return memo;
// }
// Space: O(n) - depth of recursion; O(1) - iterative
// Iterative
function getPalindromsUtil(arr, memo = {}) {
  while (arr.length > 1) {
    // arr is full
    let left = 0;
    let right = arr.length - 1;
    let isPalindrom = true;
    while (left <= right) {
      if (arr[left] !== arr[right]) {
        isPalindrom = false;
        break;
      }
      left += 1;
      right -= 1;
    }
    if (isPalindrom) memo[arr] = [arr.join('')];

    // arr without left
    let arrPart = arr.slice(1);
    left = 0;
    right = arrPart.length - 1;
    isPalindrom = true;
    while (left <= right) {
      if (arrPart[left] !== arrPart[right]) {
        isPalindrom = false;
        break;
      }
      left += 1;
      right -= 1;
    }
    if (isPalindrom) memo[arrPart] = [arrPart.join('')];

    // arr without right
    arrPart = arr.slice(0, arr.length - 1);
    left = 0;
    right = arrPart.length - 1;
    isPalindrom = true;
    while (left <= right) {
      if (arrPart[left] !== arrPart[right]) {
        isPalindrom = false;
        break;
      }
      left += 1;
      right -= 1;
    }
    if (isPalindrom) memo[arrPart] = [arrPart.join('')];
    arr = arr.slice(1, arr.length - 1);
  }


  // getPalindromsUtil(arr.slice(1), memo); // Time O(n) nitin -> itin -> tin -> in -> n -> null
  // getPalindromsUtil(arr.slice(0, arr.length - 1), memo); // Time O(n) nitin -> niti -> nit -> ni -> n -> null
  return memo;
}
function getPalindroms(str) {
  const arr = str.split('');
  const memo = getPalindromsUtil(arr);
  return memo;
}
const str1 = 'nitin';
console.log(getPalindroms(str1));
// const str2 = 'geeks';
// console.log(getPalindroms(str2));
