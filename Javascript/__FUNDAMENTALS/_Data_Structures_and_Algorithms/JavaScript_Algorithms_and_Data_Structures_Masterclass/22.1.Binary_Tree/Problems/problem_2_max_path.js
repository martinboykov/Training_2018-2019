// https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/

// Maximum Path Sum in a Binary Tree -  https://www.geeksforgeeks.org/find-maximum-path-sum-in-a-binary-tree/

const { Node, BinaryTree } = require('../binary.tree');

BinaryTree.prototype.findMaxUtil = function(node, memo) {
  if (!node || node === -Infinity) return 0;
  const left = this.findMaxUtil(node.left, memo);
  const right = this.findMaxUtil(node.right, memo);
  // Max path for parent call of root. This path must include at-most one child of root
  const maxSingle = Math.max(Math.max(left, right) + node.value, node.value);
  // Max Top represents the sum when the Node under consideration is the root of the maxsum path
  // and no ancestors of root are there in max sum path
  const maxTop = Math.max(maxSingle, left + right + node.value);
  memo.res = Math.max(memo.res, maxTop); // Store the Maximum Result.

  return maxSingle;
};

function findMaxPath(tree) {
  const memo = { res: 0 };
  tree.findMaxUtil(tree.root, memo);
  return memo.res;
}

const tree = new BinaryTree();
tree.root = new Node(10);
tree.root.left = new Node(2);
tree.root.right = new Node(10);
tree.root.left.left = new Node(20);
tree.root.left.right = new Node(1);
tree.root.right.right = new Node(-25);
tree.root.right.right.left = new Node(3);
tree.root.right.right.right = new Node(4);
console.log(findMaxPath(tree));
