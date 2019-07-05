// https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/

// Remove nodes on root to leaf paths of length < K - https://www.geeksforgeeks.org/remove-nodes-root-leaf-paths-length-k/

const { Node, BinarySearchTree } = require('../binary.search.tree');
const { Queue } =
  require('../../21.Stacks_Queues/queue.array');
const { PriorityQueue } =
  require('../../24.Binary_Heaps_&_Priority_Queues/priority.queues');

// // traversing with dfsPreorder // O(n)
// BinarySearchTree.prototype.lowestCommonAncestorUtil = // O(n)
//   function(node, prev = null, memo = {}) {
//     if (!node) return null;
//     if (prev === null) memo[node.value] = [node.value];
//     else memo[node.value] = [...memo[prev], node.value];
//     this.lowestCommonAncestorUtil(node.left, node.value, memo);
//     this.lowestCommonAncestorUtil(node.right, node.value, memo);
//     return memo;
//   };
// // Time: O(n)
// // Space: O(n)
// function lowestCommonAncestor(tree, v1, v2) {
//   const memo = tree.lowestCommonAncestorUtil(tree.root); // O(n)
//   if (!memo[v1] || !memo[v2]) return null;
//   let smallerArr = [];
//   const biggerObj = {};
//   if (memo[v1].length <= memo[v2].length) {
//     smallerArr = [...memo[v1]]; // O(n) - one sided BST
//     memo[v2].forEach((el) => {
//       biggerObj[el] = true;
//     });
//   } else {
//     smallerArr = [...memo[v2]];
//     memo[v1].forEach((el) => { // O(n) - one sided BST
//       biggerObj[el] = true;
//     });
//   }
//   console.log(smallerArr);
//   console.log(biggerObj);
//   for (let index = smallerArr.length - 1; index >= 0; index--) {
//     const el = smallerArr[index];
//     if (biggerObj[el]) return el;
//   }
//   return false;
// }

// recursive -> Time: O(h)/ Space: O(h)
// BinarySearchTree.prototype.lowestCommonAncestorUtil = // O(h)
//   function(node, v1, v2) {
//     if (!node) return null;
//     if (node.value > v1 && node.value > v2) {
//       return this.lowestCommonAncestorUtil(node.left, v1, v2);
//     }
//     if (node.value < v1 && node.value < v2) {
//       return this.lowestCommonAncestorUtil(node.right, v1, v2);
//     }
//     return node.value;
//   };

// iterative -> Time: O(h)/ Space: O(1)
BinarySearchTree.prototype.lowestCommonAncestorUtil = // O(h)
  function(node, v1, v2) {
    let currNode = node;
    while (currNode) {
      if (currNode.value > v1 && currNode.value > v2) {
        currNode = currNode.left;
      } else if (currNode.value < v1 && currNode.value < v2) {
        currNode = currNode.right;
      } else {
        return currNode.value;
      }
    }
    return null;
  };
// Time: O(h)
// Space: O(h) depth of recursion / O(1) - for iterative
function lowestCommonAncestor(tree, v1, v2) {
  return tree.lowestCommonAncestorUtil(tree.root, v1, v2); // O(n)
}

// // test 1 - https://www.geeksforgeeks.org/remove-nodes-root-leaf-paths-length-k/
const tree = new BinarySearchTree();
tree.root = new Node(20);
tree.root.left = new Node(8);
tree.root.left.left = new Node(4);
tree.root.left.right = new Node(12);
tree.root.left.right.left = new Node(10);
tree.root.left.right.right = new Node(14);
tree.root.right = new Node(22);
console.log(tree.root);

const val1 = 12;
const val2 = 10;
console.log(lowestCommonAncestor(tree, val1, val2));
