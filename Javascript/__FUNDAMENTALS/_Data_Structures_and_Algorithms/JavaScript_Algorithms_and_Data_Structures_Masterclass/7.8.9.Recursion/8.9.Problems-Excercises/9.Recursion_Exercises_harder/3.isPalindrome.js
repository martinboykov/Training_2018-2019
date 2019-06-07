// Write a recursive function called isPalindrome which returns true if the
// string passed to it is a palindrome. Otherwise it returns false

// recursion with Multiple pointer pattern
function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;
  if (left >= right) return true;
  if (str[left] !== str[right]) return false;
  left += 1;
  right -= 1;
  return isPalindrome(str.substring(1, str.length - 1));
}

// Time Complexity - O(N)
// Space Complexity - O(N)

// To generalize, a recursive function's memory complexity is O(recursion depth).
// As our fuction depth suggests, we will have n total return statements and thus the memory complexity is O(n).
// https://stackoverflow.com/questions/26564646/space-complexity-of-iterative-vs-recursive-binary-search-tree

console.log(isPalindrome('awesome')); // false
console.log(isPalindrome('foobar')); // false
console.log(isPalindrome('tacocat')); // true
console.log(isPalindrome('amanaplanacanalpanama')); // true
console.log(isPalindrome('amanaplanacanalpandemonium')); // false
