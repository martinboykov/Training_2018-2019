// https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/

// Maximum Path Sum in a Binary Tree -  https://www.geeksforgeeks.org/find-maximum-path-sum-in-a-binary-tree/

const { BinarySearchTree } = require('../binary.search.tree');
const { Stack } = require('../../21.Stacks_Queues/stack.array');

// BinarySearchTree.prototype.dfsPreorder = function(node, arr = []) {
//   if (!node) return 0;
//   arr.push(node.value);
//   const left = this.dfsPreorder(node.left, arr);
//   const right = this.dfsPreorder(node.right, arr);
//   return arr;
// };

// function canRepresentBST(arr) {
//   const tree = new BinarySearchTree(); // Space O(n)
//   arr.forEach((el) => {
//     tree.insert(el);
//   });
//   const arrTrav = tree.dfsPreorder(tree.root); // Space O(n)
//   for (let index = 0; index < arr.length; index++) {
//     const el = arr[index];
//     if (el !== arrTrav[index]) return false;
//   }
//   return true;
// }
// Time O(n)
// Space O(2n)

function canRepresentBST(arr) {
  // Create an empty stack
  const stack = new Stack(); // Space O(n)

  // Initialize current root as minimum
  let root = -Infinity;

  // Traverse given array
  for (let index = 0; index < arr.length; index++) {
    // If we find a node who is on right side
    // and smaller than root, return false
    if (arr[index] < root) return false;

    // If pre[i] is in right subtree of stack top,
    // Keep removing items smaller than pre[i]
    // and make the last removed item as new root.
    while (stack.items.length > 0 && stack.peek() < arr[index]) {
      root = stack.peek();
      stack.pop();
    }

    // At this point either stack is empty or
    // pre[i] is smaller than root, push pre[i]
    stack.push(arr[index]);
  }
  return true;
}
// Time O(n)
// Space O(n)

// test 1
const arr = [];
arr.push(2);
arr.push(4);
arr.push(3);
console.log(canRepresentBST(arr)); // true

// // test 2
// const arr = [];
// arr.push(2);
// arr.push(4);
// arr.push(1);
// console.log(canRepresentBST(arr)); // false

// // test 3
// const arr = [];
// arr.push(40);
// arr.push(30);
// arr.push(35);
// arr.push(80);
// arr.push(100);
// console.log(canRepresentBST(arr)); // true

// // test 4
// const arr = [];
// arr.push(40);
// arr.push(30);
// arr.push(35);
// arr.push(20);
// arr.push(80);
// arr.push(100);
// console.log(canRepresentBST(arr)); // false
