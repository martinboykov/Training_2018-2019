/** Frequency Counter: Anagram Challenge **/

// Given two strings, write a function to determine if the
// second string is an anagram of the first. An anagram is
// a word, phrase, or name formed by rearranging the letters
// of another, such as 'cinema', formed from 'iceman'.

function validAnagram(anagram1, anagram2) {
  const arrFirst = anagram1.split(''); // Ospace (a)
  const arrSecond = anagram2.split(''); // Ospace (b)
  if (arrFirst.length !== arrSecond.length) {
    return false;
  }
  const frequencyCounterOne = {}; // Ospace (a)
  const frequencyCounterTwo = {}; // Ospace (b)
  for (const valFirst of arrFirst) { // Otime (a)
    frequencyCounterOne[valFirst] = (frequencyCounterOne[valFirst] || 0) + 1;
  }
  for (const valSecond of arrSecond) { // Otime (b)
    frequencyCounterTwo[valSecond] = (frequencyCounterTwo[valSecond] || 0) + 1;
  }
  for (const key in frequencyCounterOne) { // Otime (a)
    if (frequencyCounterOne.hasOwnProperty(key)) { // Otime (1)
      if (!frequencyCounterTwo[key]) { // Otime (1)
        return false;
      }
      if (frequencyCounterOne[key] !== frequencyCounterTwo[key]) {
        return false;
      }
    }
  }
  return true;
}

// Time Complecity => O = 2*O(a) + 2*O(b) ~ O(n)
// Space Complecity => O = 2*O(a) + 2*O(b) (two arrays + two objects) ~ O(n)

console.log(validAnagram('', '')); // true
console.log(validAnagram('aaz', 'zza')); // false
console.log(validAnagram('anagram', 'nagaram')); // true
console.log(validAnagram('rat', 'car')); // false
console.log(validAnagram('awesome', 'awesom')); // false
console.log(validAnagram('qwerty', 'qweryt')); // true
console.log(validAnagram('texttwisttime', 'timetwisttext')); // true
