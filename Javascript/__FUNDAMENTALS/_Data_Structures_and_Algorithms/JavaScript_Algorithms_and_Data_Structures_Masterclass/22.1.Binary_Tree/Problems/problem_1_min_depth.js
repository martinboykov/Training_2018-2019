// https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/

// Find Minimum Depth of a Binary Tree - https://www.geeksforgeeks.org/find-minimum-depth-of-a-binary-tree/

const { BinarySearchTree } = require('../binary.search.tree');

BinarySearchTree.prototype.findMinHeight = function(node, height = 0) {
  if (!node.left || !node.right) return height;
  height += 1;

  return Math.min(
    this.findMinHeight(node.left, height),
    this.findMinHeight(node.right, height));
};

const tree = new BinarySearchTree();
tree.insert(100);
tree.insert(10);
tree.insert(200);
tree.insert(6);
tree.insert(20);
tree.insert(120);
tree.insert(220);

console.log(JSON.stringify(tree));
console.log(tree.findMinHeight(tree.root));
