//  Detect if threre is a cycle in the linked list

// 1. Solution - if changing the List is possible - loop over the list and reasign each node value as marked
// 2. Solution - make two loops at different speed, if path node coinside at some point => cyrclular dependency

const { BinarySearchTree } =
  require('../../23.Tree_Traversal/binary.search.tree.traversal');

// Solution 1: ~ as DFS In Order + check if array is sorted - Ot(n), Os(logn)
// BinarySearchTree.prototype.isBST = function() { // traverse
//   const sortedArray = [];
//   const isSorted = true;
//   traverse(this.root);
//   return isSorted;
//   function traverse(node) { // Ospace(logn) depth of the tree === depth of recursion (nodes = 2**h - 1)
//     if (node.left) traverse(node.left);
//     sortedArray.push(node.value);
//     checkIfSorted(); // checking if sorted in place -> Ospace(1) constant space
//     if (node.right) traverse(node.right);
//   }
//   function checkIfSorted() {
//     if (sortedArray.length === 2) {
//       if (sortedArray[0] > sortedArray[1]) isSorted = false;
//       sortedArray.shift();
//     }
//   }
// };

// Solution 2: with min/max boundary values  - Ot(n), Os(logn)
BinarySearchTree.prototype.isBST = function() {
  return traverse(this.root);
  function traverse(root, min = -Infinity, max = +Infinity) {
    if (!root) return true;
    if (root.value < min || root.value > max) return false;
    return traverse(root.left, min, root.value)
      && traverse(root.right, root.value, max);
  }
};

const tree = new BinarySearchTree();
tree.insert(9);
tree.insert(4);
tree.insert(6);
tree.insert(20);
tree.insert(170);
tree.insert(15);
tree.insert(1);
// console.log(JSON.stringify(tree));
console.log(tree.isBST());

module.exports = {
  BinarySearchTree, // with all bfs and dfs methods
};
