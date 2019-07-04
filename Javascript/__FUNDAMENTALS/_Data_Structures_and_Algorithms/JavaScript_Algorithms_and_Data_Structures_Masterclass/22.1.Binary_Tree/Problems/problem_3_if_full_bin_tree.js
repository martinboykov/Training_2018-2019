// https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/

// Check whether a binary tree is a full binary tree or not -  https://www.geeksforgeeks.org/check-whether-binary-tree-full-binary-tree-not/


// Conditions of full binary tree:
// 1) If a binary tree node is NULL then it is a full binary tree.
// 2) If a binary tree node does have empty left and right sub-trees, then it is a full binary tree by definition.
// 3) If a binary tree node has left and right sub-trees, then it is a part of a full binary tree by definition. In this case recursively check if the left and right sub-trees are also binary trees themselves.
// 4) In all other combinations of right and left sub-trees, the binary tree is not a full binary tree.

const { Node, BinaryTree } = require('../binary.tree');

BinaryTree.prototype.isFullBinaryTreeUtil = function(node, memo) {
  if (!node) return null;
  const left = this.isFullBinaryTreeUtil(node.left);
  const right = this.isFullBinaryTreeUtil(node.right);
  if ((left && !right) || (!left && right)) return false;
  return true;
};

function isFullBinaryTree(tree) {
  const memo = { res: 0 };
  return tree.isFullBinaryTreeUtil(tree.root, memo);
}

const tree = new BinaryTree();
tree.root = new Node(1);
tree.root.left = new Node(2);
tree.root.left.left = new Node(4);
tree.root.left.right = new Node(5);
tree.root.left.right.left = new Node(6);
tree.root.left.right.right = new Node(7);
tree.root.right = new Node(3);
console.log(tree.root);
console.log(isFullBinaryTree(tree));
