// https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/

// Remove nodes on root to leaf paths of length < K - https://www.geeksforgeeks.org/remove-nodes-root-leaf-paths-length-k/

const { Node, BinaryTree } = require('../binary.tree');
const { Queue } =
  require('../../21.Stacks_Queues/queue.array');
const { PriorityQueue } =
  require('../../24.Binary_Heaps_&_Priority_Queues/priority.queues');

// traversing with dfsPreorder // O(n)
// Doesnt print nodes above each other in corretc order
BinaryTree.prototype.verticalOrderTraversalUtil = // O(n)
  function(node, k, level = 1) {
    if (!node) return 0;
    const previousLevel = level - 1;
    const left = this.removeLeafPathsUtil(node.left, k, level + 1) + 1;
    if (left + previousLevel < k) node.left = null;
    const right = this.removeLeafPathsUtil(node.right, k, level + 1) + 1;
    if (right + previousLevel < k) node.right = null;
    return Math.max(left, right);
  };
// Time: O(n) best case with DLL
// Space: O(n)
function removeLeafPaths(tree, k) {
  tree.removeLeafPathsUtil(tree.root, k); // O(n) best case with DLL
  return tree.root;
}

// // test 1 - https://www.geeksforgeeks.org/remove-nodes-root-leaf-paths-length-k/
const tree = new BinaryTree();
tree.root = new Node(1);
tree.root.left = new Node(2);
tree.root.left.left = new Node(4);
tree.root.left.left.left = new Node(7);
tree.root.left.right = new Node(5);
// tree.root.left.right.right = new Node(9);
tree.root.right = new Node(3);
tree.root.right.right = new Node(6);
tree.root.right.right.left = new Node(8);
// console.log(tree.root);
const k = 4;
console.log(removeLeafPaths(tree, k));
