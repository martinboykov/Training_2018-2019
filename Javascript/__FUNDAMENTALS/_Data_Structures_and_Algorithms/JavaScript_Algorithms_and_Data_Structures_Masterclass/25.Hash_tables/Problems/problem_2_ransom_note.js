// Hash Tables: Ransom Note
// https://www.youtube.com/watch?v=1uIwiIjw1fw&list=PLI1t_8YX-Apv-UiRlnZwqqrRT8D1RhriX&index=14
// https://www.hackerrank.com/challenges/ctci-ransom-note/problem

// Given the words in the magazine and the words in the ransom note,
// print Yes if he can replicate his ransom note exactly using whole words from the magazine;
// otherwise, print No.

function solve(str1, str2) {
  let counter = 'Yes';
  const obj1 = getObject(str1); // space O(n)
  const obj2 = getObject(str2); // space O(n)
  removeDifferences();
  checkCoverage();
  return counter;
  function checkCoverage() {
    for (const key in obj2) { // time O(n)
      if (obj2.hasOwnProperty(key)) {
        counter = 'No';
        break;
      }
    }
  }
  function removeDifferences() {
    for (const key in obj1) { // time O(n)
      if (obj1.hasOwnProperty(key)) {
        while (obj2[key] && obj1[key]) {
          if (obj1[key] === 1) {
            delete obj1[key];
          } else {
            obj1[key] -= 1;
          }
          if (obj2[key] === 1) {
            delete obj2[key];
          } else {
            obj2[key] -= 1;
          }
        }
      }
    }
  }

  function getObject(sentence) {
    const obj = {};
    const arr = sentence.split(' ');
    for (let index = 0; index < arr.length; index++) { // time O(n)
      const str = arr[index];
      if (!obj[str]) {
        obj[str] = 1;
      } else {
        obj[str] += 1;
      }
    }
    return obj;
  }
}
const str1 = 'give me one grand today night';
const str2 = 'give one grand today';
console.log(solve(str1, str2)); // Yes
const str3 = 'two times three is not four';
const str4 = 'two times two is four';
console.log(solve(str3, str4)); // No
const str5 = 'ive got a lovely bunch of coconuts';
const str6 = 'ive got some coconuts';
console.log(solve(str5, str6)); // No
