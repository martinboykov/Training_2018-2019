// Data Structures: Anagram Problem Solution
// https://www.youtube.com/watch?v=3MwRGPPB4tw&list=PLI1t_8YX-Apv-UiRlnZwqqrRT8D1RhriX&index=12

// given two strings, find the number of characters required to remove from each string,
// so both strings are composed of the same types and amount of characters
// hello <-> billion => 6
// glue <-> legs => 2
// candy <-> day => 2
function solve(str1, str2) {
  const obj1 = getObject(str1); // space O(n)
  const obj2 = getObject(str2); // space O(n)
  const totalLength = str1.length + str2.length;
  let counter = 0;
  removeDifferences();
  return totalLength - counter * 2;
  function removeDifferences() {
    for (const key in obj1) { // time O(n)
      if (obj1.hasOwnProperty(key)) {
        while (obj2[key] && obj1[key]) {
          counter += 1;
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

  function getObject(str) {
    const obj = {};
    for (let index = 0; index < str.length; index++) { // time O(n)
      const char = str[index];
      if (!obj[char]) {
        obj[char] = 1;
      } else {
        obj[char] += 1;
      }
    }
    return obj;
  }
}
// hello <-> billion => 6
const str1 = 'hello';
const str2 = 'billion';
console.log(solve(str1, str2)); // 3
// glue <-> legs => 2
const str3 = 'glue';
const str4 = 'legs';
console.log(solve(str3, str4)); // 2
// candy <-> day => 2
const str5 = 'candy';
const str6 = 'day';
console.log(solve(str5, str6)); // 2
