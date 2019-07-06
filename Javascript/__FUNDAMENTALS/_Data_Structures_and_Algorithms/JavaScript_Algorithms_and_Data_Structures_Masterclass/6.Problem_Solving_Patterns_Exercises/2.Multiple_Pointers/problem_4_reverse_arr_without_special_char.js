// Top 10 algorithms in Interview Questions - https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// Reverse an array without affecting special characters - https://www.geeksforgeeks.org/reverse-an-array-without-affecting-special-characters/

function reverseArr(str) {
  const arr = str.split('');
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const charCodeLeft = arr[left].charCodeAt(0);
    const charCodeRight = arr[right].charCodeAt(0);
    const isLeftAlfa = (charCodeLeft >= 97 && charCodeLeft <= 122) ||
      (charCodeLeft >= 65 && charCodeLeft <= 90);
    const isRightAlfa = (charCodeRight >= 97 && charCodeRight <= 122) ||
      (charCodeRight >= 65 && charCodeRight <= 90);
    if (isLeftAlfa && isRightAlfa) {
      const temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;
      left += 1;
      right -= 1;
    } else if (!isLeftAlfa && !isRightAlfa) {
      left += 1;
      right -= 1;
    } else if (isLeftAlfa) {
      right -= 1;
    } else if (isRightAlfa) {
      left += 1;
    }
  }
  return arr.join('');
}
const str1 = 'a,b$c';
console.log(reverseArr(str1));
const str2 = 'Ab,c,de!$';
console.log(reverseArr(str2));
