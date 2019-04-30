/** Coding Exercise 4: Frequency Counter / Multiple Pointers - areThereDuplicates ***/

// Implement a function called, areThereDuplicates which accepts a
// variable number of arguments, and checks whether there are any
// duplicates among the arguments passed in. You can solve this using
// the frequency counter pattern OR the multiple pointers pattern.

// areThereDuplicates(1, 2, 3) // false
// areThereDuplicates(1, 2, 2) // true
// areThereDuplicates('a', 'b', 'c', 'a') // false (must be consecutive)

// Restrictions:
//     Time - O(N)
//     Space - O(N)
// Bonus:
//     Time - O(N LOG N)
//     Space - O(1)

// -------------------------
// frequency counter pattern
// -------------------------
function areThereDuplicates(...args) {
  const obj = {};
  let lastVar = args[0];
  args.forEach((element) => {
    if (obj[element] && lastVar === element) {
      obj[element] += 1;
    } else {
      obj[element] = 1;
    }
    lastVar = element;
  });
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const element = obj[key];
      if (element > 1) return true;
    }
  }
  return false;
}
//     Time - O(N)
//     Space - O(N)

// -------------------------
// multiple pointers pattern
// -------------------------
// function areThereDuplicates(...args) {
//   // Two pointers
//   args.sort((a, b) => a - b);
//   let start = 0;
//   let next = 1;

//   while (next < args.length) {
//     if (args[start] === args[next]) {
//       return true;
//     }
//     start++;
//     next++;
//   }

//   return false;
// }
//     Time - O(N)
//     Space - O(N)

// -------------------------
// hash
// -------------------------
// function areThereDuplicates(...args) {
//   const set = new Set(args);
//   if (set.size < args.length) return true;
//   return false;
// }
//     Time - O(N)
//     Space - O(N)

console.log(areThereDuplicates(-1, 2, 3)); // false
console.log(areThereDuplicates(1, 0, 2, 3, 3)); // true
console.log(areThereDuplicates('a', 'b', 'c', 'a')); // false
