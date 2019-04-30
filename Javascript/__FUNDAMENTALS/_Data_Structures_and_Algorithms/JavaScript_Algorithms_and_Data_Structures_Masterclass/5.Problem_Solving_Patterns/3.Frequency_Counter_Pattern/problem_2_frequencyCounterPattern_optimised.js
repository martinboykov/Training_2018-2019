/** Frequency Counter: Anagram Challenge **/

// Given two strings, write a function to determine if the
// second string is an anagram of the first. An anagram is
// a word, phrase, or name formed by rearranging the letters
// of another, such as 'cinema', formed from 'iceman'.

function validAnagram(first, second) {
  if (first.length !== second.length) {
    return false;
  }
  const lookup = {}; // Ospace (a)
  const firstLength = first.length;
  for (let index = 0; index < firstLength; index++) { // Otime (a)
    const element = first[index];
    lookup[element] = (lookup[element] || 0) + 1;
  }
  const secondLength = second.length;
  for (let index = 0; index < secondLength; index++) { // Otime (b)
    const element = second[index];
    if (!lookup[element]) {
      return false;
    }
    lookup[element] -= 1;
  }
  return true;
}

// Time Complecity => O = O(a) + O(b) ~ O(n)
// Space Complecity => O = O(a) (one object) ~ O(n)

console.log(validAnagram('', '')); // true
console.log(validAnagram('aaz', 'zza')); // false
console.log(validAnagram('anagram', 'nagaram')); // true
console.log(validAnagram('rat', 'car')); // false
console.log(validAnagram('awesome', 'awesom')); // false
console.log(validAnagram('qwerty', 'qweryt')); // true
console.log(validAnagram('texttwisttime', 'timetwisttext')); // true
