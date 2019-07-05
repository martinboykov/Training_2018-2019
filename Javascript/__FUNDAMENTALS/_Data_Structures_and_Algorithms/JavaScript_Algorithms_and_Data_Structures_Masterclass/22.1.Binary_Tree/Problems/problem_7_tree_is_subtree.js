// https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/

// Check if a binary tree is subtree of another binary tree | Set 2 - https://www.geeksforgeeks.org/check-binary-tree-subtree-another-binary-tree-set-2/

const { Node, BinaryTree } = require('../binary.tree');
const { Queue } =
  require('../../21.Stacks_Queues/queue.array');
const { PriorityQueue } =
  require('../../24.Binary_Heaps_&_Priority_Queues/priority.queues');

// Time: O(size small tree)
// Space: O(d1 || d2) - depth of trees;
BinaryTree.prototype.equalityCheckUtil = // O(n)
  function(nodeSubTreeBig) {
    if (!nodeSubTreeBig) return false;
    const queueBig = new Queue(); // Space: O(d1) d1 - depth of subtree of big tree
    const queueSmall = new Queue(); // Space: O(d2) d2 - depth of small tree
    queueBig.enqueue(nodeSubTreeBig);
    queueSmall.enqueue(this.root);
    while (!queueBig.isEmpty() && !queueSmall.isEmpty()) {
      const currBig = queueBig.dequeue();
      const currSmall = queueSmall.dequeue();
      if (currBig.value !== currSmall.value) return false;
      if (currSmall.left && !currBig.left) return false;
      if (currSmall.right && !currBig.right) return false;
      if (currSmall.left) {
        queueBig.enqueue(currBig.left);
        queueSmall.enqueue(currSmall.left);
      }
      if (currSmall.right) {
        queueBig.enqueue(currBig.right);
        queueSmall.enqueue(currSmall.right);
      }
    }
    return true;
  };

// Time: O(n)
// Space: O(d) - depth of tree;
BinaryTree.prototype.findSubtreeRoot = // O(n)
  function(subRootValue) {
    const queue = new Queue();
    queue.enqueue(this.root);
    while (!queue.isEmpty()) {
      const currNode = queue.dequeue();
      if (currNode.value === subRootValue) return currNode;
      if (currNode.left) queue.enqueue(currNode.left);
      if (currNode.right) queue.enqueue(currNode.right);
    }
    return null;
  };

// Time: O(n)
// Space: O(h) - depth of recursion;
BinaryTree.prototype.sizeUtil = // O(n)
  function(node, size = { total: 0 }) {
    if (!node) return null;
    size.total += 1;
    this.sizeUtil(node.left, size);
    this.sizeUtil(node.right, size);
    return size;
  };

// Time: O(n)
// Space: O(n)
function isSubtree(tree1, tree2) {
  const size1 = tree1.sizeUtil(tree1.root); // Time: O(n)
  const size2 = tree2.sizeUtil(tree2.root); // Time: O(n)
  let nodeSubTreeBig;
  let treeSmall;
  if (size1.total <= size2.total) {
    nodeSubTreeBig = tree2.findSubtreeRoot(tree1.root.value); // Time: O(n); Space: O(sizeSubtree)
    treeSmall = tree1;
  } else {
    nodeSubTreeBig = tree1.findSubtreeRoot(tree2.root.value); // Time: O(n); Space: O(size small tree)
    treeSmall = tree2;
  }
  return treeSmall.equalityCheckUtil(nodeSubTreeBig); // Time: O(n); Space: O(size small tree)
}


// test 1 - https://www.geeksforgeeks.org/check-binary-tree-subtree-another-binary-tree-set-2/
const tree1 = new BinaryTree();
tree1.root = new Node('x');
tree1.root.left = new Node('a');
tree1.root.left.right = new Node('c');
tree1.root.right = new Node('b');

const tree2 = new BinaryTree();
tree2.root = new Node('z');
tree2.root.left = new Node('x');
tree2.root.left.left = new Node('a');
tree2.root.left.left.right = new Node('c');
tree2.root.left.right = new Node('b');
tree2.root.right = new Node('e');
tree2.root.right.right = new Node('k');

console.log(tree1.root);
console.log(tree2.root);
console.log(isSubtree(tree1, tree2));

// // test 2 - // // test 1 - https://www.geeksforgeeks.org/check-binary-tree-subtree-another-binary-tree-set-2/
// const tree1 = new BinaryTree();
// tree1.root = new Node('x');
// tree1.root.left = new Node('a');
// tree1.root.left.left = new Node('c');
// tree1.root.right = new Node('b');

// const tree2 = new BinaryTree();
// tree2.root = new Node('x');
// tree2.root.left = new Node('a');
// tree2.root.left.left = new Node('c');
// tree2.root.right = new Node('b');
// tree2.root.right.right = new Node('d');

// console.log(tree1.root);
// console.log(tree2.root);
// console.log(isSubtree(tree1, tree2));
