// https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/

// Bottom View of a Binary Tree - https://www.geeksforgeeks.org/bottom-view-binary-tree/
// https://www.youtube.com/watch?v=fPhgtqKdG5k
// https://www.youtube.com/watch?v=V7alrvgS5AI

// Vertical Order Traversal of a Binary tree (Algorithm) - https://www.youtube.com/watch?v=PQKkr036wRc

const { Node, BinaryTree } = require('../binary.tree');
const { Queue } =
  require('../../21.Stacks_Queues/queue.array');
const { PriorityQueue } =
  require('../../24.Binary_Heaps_&_Priority_Queues/priority.queues');

BinaryTree.prototype.verticalOrderTraversalUtil =
  function(node, memo, level = 0) {
    const queue = new PriorityQueue();
    queue.enqueue(node, level);
    memo[level] = [node.value];
    while (!queue.isEmpty()) { // O(n)
      const currNode = queue.dequeue();
      const currLevel = currNode.priority;
      if (currNode.value.left) {
        if (!memo[currLevel - 1]) memo[currLevel - 1] = [];
        memo[currLevel - 1].push(currNode.value.left.value);
        queue.enqueue(currNode.value.left, currLevel - 1);
      }
      if (currNode.value.right) {
        if (!memo[currLevel + 1]) memo[currLevel + 1] = [];
        memo[currLevel + 1].push(currNode.value.right.value);
        queue.enqueue(currNode.value.right, currLevel + 1);
      }
    }
    return memo;
  };

function getBottomView(tree) {
  const memo = {};
  tree.verticalOrderTraversalUtil(tree.root, memo);
  console.log(memo);
  const result = [];
  const keysArr = Object.keys(memo);
  keysArr.sort((x, y) => x - y);
  keysArr.forEach((key) => {
    result.push(memo[key].pop());
  });

  return result;
}

const tree = new BinaryTree();
tree.root = new Node(20);
tree.root.left = new Node(8);
tree.root.left.left = new Node(5);
tree.root.left.left.left = new Node(18);
tree.root.left.left.right = new Node(19);
tree.root.left.right = new Node(3);
tree.root.left.right.left = new Node(10);
tree.root.left.right.right = new Node(14);
tree.root.right = new Node(22);
tree.root.right.left = new Node(4);
tree.root.right.right = new Node(25);
// console.log(tree.root);
console.log(getBottomView(tree));
