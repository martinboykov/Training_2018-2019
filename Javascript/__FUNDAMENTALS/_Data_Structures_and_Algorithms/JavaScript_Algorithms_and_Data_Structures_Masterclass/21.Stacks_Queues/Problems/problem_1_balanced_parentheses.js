//  Balanced Parentheses in Expression
// {}, [], ()

// Balanced      Unbalanced
// {}()[{}]      [({)}]
// [({})]        ({[})
// ({[]})        ()}[]

// Example: {()[{({})[]()}]}([])

function checkIfBalanced(str) {
  const stack = [];
  const strOpen = '{[(';
  const strClose = '}])';
  const strLength = str.length;
  if (strLength === 0) return false;
  for (let index = 0; index < strLength; index += 1) {
    const currentChar = str[index];
    if (isOpen(currentChar)) {
      stack.push(currentChar);
    } else if (isClose(currentChar)) {
      if (isEmpty() || !isMatch(stack.pop(), currentChar)) return false;
    }
  }
  if (isEmpty()) return true;
  return false;

  function isMatch(char1, char2) {
    const index1 = strOpen.indexOf(char1);
    const index2 = strClose.indexOf(char2);
    if (index1 === index2) return true;
    return false;
  }
  function isOpen(char) {
    if (strOpen.indexOf(char) >= 0) return true;
    return false;
  }
  function isClose(char) {
    if (strClose.indexOf(char) >= 0) return true;
    return false;
  }
  function isEmpty() {
    if (stack.length === 0) return true;
    return false;
  }
}


const strTest1 = '{}()[{}]'; // true
const strTest2 = '[({})]'; // true
const strTest3 = '({[]})'; // true
const strTest4 = '[({)}]'; // false
const strTest5 = '({[})'; // false
const strTest6 = '()}[]'; // false
const strReal1 = '{()[{({})[]()}]}([])'; // true
const strReal2 = '[({)}]'; // false
const strReal3 = ''; // false
const strReal4 = '{}()     [    adasdads{}]'; // false
console.log(checkIfBalanced(strTest1));
console.log(checkIfBalanced(strTest2));
console.log(checkIfBalanced(strTest3));
console.log(checkIfBalanced(strTest4));
console.log(checkIfBalanced(strTest5));
console.log(checkIfBalanced(strTest6));
console.log(checkIfBalanced(strReal1));
console.log(checkIfBalanced(strReal2));
console.log(checkIfBalanced(strReal3));
console.log(checkIfBalanced(strReal4));
