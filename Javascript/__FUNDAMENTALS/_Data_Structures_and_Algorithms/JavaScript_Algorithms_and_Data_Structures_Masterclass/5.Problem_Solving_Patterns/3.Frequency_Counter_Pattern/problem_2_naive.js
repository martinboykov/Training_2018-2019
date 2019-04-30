/** Frequency Counter: Anagram Challenge **/

// Given two strings, write a function to determine if the
// second string is an anagram of the first. An anagram is
// a word, phrase, or name formed by rearranging the letters
// of another, such as 'cinema', formed from 'iceman'.

function validAnagram(anagram1, anagram2) {
  const arrFirst = anagram1.split('');
  const arrSecond = anagram2.split('');
  if (arrFirst.length !== arrSecond.length) {
    return false;
  }
  let checkIf = true;
  arrFirst.forEach((element) => { // O(n) - forEach is looping trough arrFirst
    const correctIndex = arrSecond.indexOf(element); // O(n) - indexOf is looping trough arrSecond
    if (correctIndex === -1) {
      checkIf = false;
      return;
    }
    arrSecond.splice(correctIndex, 1);
  });
  return checkIf;
}

// Time Complecity => O = O(a) * O(b) = O(n^2)
// Space Complecity => O = O(a) + O(b) (two arrays) ~ O(n)

console.log(validAnagram('', '')); // true
console.log(validAnagram('aaz', 'zza')); // false
console.log(validAnagram('anagram', 'nagaram')); // true
console.log(validAnagram('rat', 'car')); // false
console.log(validAnagram('awesome', 'awesom')); // false
console.log(validAnagram('qwerty', 'qweryt')); // true
console.log(validAnagram('texttwisttime', 'timetwisttext')); // true
