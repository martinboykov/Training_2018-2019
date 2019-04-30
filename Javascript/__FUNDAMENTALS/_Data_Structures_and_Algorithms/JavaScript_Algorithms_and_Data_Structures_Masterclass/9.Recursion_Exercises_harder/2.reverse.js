// Write a recursive function called reverse which accepts a string
// and returns a new string in reverse

// helper method pattern
// function reverse(str) {
//   let strRev = '';
//   function helper(strTemp) {
//     if (strTemp.length === 0) return;
//     strRev = strRev.concat(strTemp[strTemp.length - 1]);
//     helper(strTemp.slice(0, strTemp.length-1));
//   }
//   helper(str);
//   return strRev;
// }

// pure recursion
function reverse(str) {
  return str.length === 0 ? '' : reverse(str.slice(1)) + str[0];
}

console.log(reverse('awesome')); // 'emosewa'
console.log(reverse('rithmschool')); // 'loohcsmhtir'
