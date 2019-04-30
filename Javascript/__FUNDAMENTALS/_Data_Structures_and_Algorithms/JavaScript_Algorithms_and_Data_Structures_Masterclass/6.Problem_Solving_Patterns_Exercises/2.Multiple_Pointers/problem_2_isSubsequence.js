/** Multiple Pointers - isSubsequence ***/

// Write a function called isSubsequence which takes in two strings and checks whether
// the characters in the first string form a subsequence of the characters in the second
// string. In other words, the function should check whether the characters in the first
// string appear somewhere in the second string, without their order changing.

// Your solution MUST have AT LEAST the following complexities:
// Time Complexity - O(N + M)
// Space Complexity - O(1)

function isSubsequence(str1, str2) {
  if (str2.search(str1) < 0) { // same with "indexOf()"
    return false;
  }
  return true;
}

// Time Complexity - O(N)
// Space Complexity - O(1)

// Examples:
console.log(isSubsequence('hello', 'by hecatl in hello l o world'));
console.log(isSubsequence('sing', 'sting'));
console.log(isSubsequence('abc', 'abracadabra'));
console.log(isSubsequence('abc', 'acb'));
