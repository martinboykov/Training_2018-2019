// https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/

// Find Minimum Depth of a Binary Tree - https://www.geeksforgeeks.org/find-minimum-depth-of-a-binary-tree/

const { BinaryTree } = require('../binary.tree');

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
tree.insert(10);
tree.insert(2);
tree.insert(10);
tree.insert(20);
tree.insert(1);
tree.insert(0);
tree.insert(-25);
tree.insert(0);
tree.insert(0);
tree.insert(0);
tree.insert(0);
tree.insert(0);
tree.insert(0);
tree.insert(3);
tree.insert(4);
console.log(findMaxPath(tree));
