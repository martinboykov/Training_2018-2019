// https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/

// Print Nodes in Top View of Binary Tree - https://www.geeksforgeeks.org/print-nodes-top-view-binary-tree/
// https://www.youtube.com/watch?v=fPhgtqKdG5k
// https://www.youtube.com/watch?v=V7alrvgS5AI

// Vertical Order Traversal of a Binary tree (Algorithm) - https://www.geeksforgeeks.org/print-binary-tree-vertical-order-set-2/
// https://www.youtube.com/watch?v=PQKkr036wRc

const { Node, BinaryTree } = require('../binary.tree');
const { Queue } =
  require('../../21.Stacks_Queues/queue.array');
const { PriorityQueue } =
  require('../../24.Binary_Heaps_&_Priority_Queues/priority.queues');

// // traversing with dfsPreorder // O(n)
// // Doesnt print nodes above each other in corretc order
// BinaryTree.prototype.verticalOrderTraversalUtil = // O(n)
//   function(node, memo, level = 0) {
//     if (!node) return null;

//     if (!memo[level]) memo[level] = [];
//     memo[level].push(node.value);

//     this.verticalOrderTraversalUtil(node.left, memo, level - 1);
//     this.verticalOrderTraversalUtil(node.right, memo, level + 1);

//     return memo;
//   };

// // traversing with bfs and priority queue // O(n->nlogd)
// BinaryTree.prototype.verticalOrderTraversalUtil =
//   function(node, memo, level = 0) {
//     const queue = new PriorityQueue();
//     queue.enqueue(node, level);
//     memo[level] = [node.value];
//     while (!queue.isEmpty()) { // O(n)
//       const currNode = queue.dequeue(); // O(1->logd) , 1 - for one sided, d - depth of tree (how wide in perfect balanced tree)
//       const currLevel = currNode.priority;
//       if (currNode.value.left) {
//         if (!memo[currLevel - 1]) memo[currLevel - 1] = [];
//         memo[currLevel - 1].push(currNode.value.left.value);
//         queue.enqueue(currNode.value.left, currLevel - 1);
//       }
//       if (currNode.value.right) {
//         if (!memo[currLevel + 1]) memo[currLevel + 1] = [];
//         memo[currLevel + 1].push(currNode.value.right.value);
//         queue.enqueue(currNode.value.right, currLevel + 1);
//       }
//     }
//     return memo;
//   };

// BEST SOLUTION
// traversing with bfs and queue with object as node {value, priority) // O(n)
BinaryTree.prototype.verticalOrderTraversalUtil =
  function(node, memo) {
    const level = 0;
    const queue = new Queue();
    queue.enqueue({ value: node, priority: level });
    memo[level] = [node.value];
    while (!queue.isEmpty()) { // queue: implemented with DLL O(n), with array O(n->n*d) /one sided->perfect tree/
      const currNode = queue.dequeue(); // O(1->d) , 1 - for one sided, d - depth of tree (how wide in perfect balanced tree)
      const currLevel = currNode.priority;
      if (currNode.value.left) {
        if (!memo[currLevel - 1]) memo[currLevel - 1] = [];
        memo[currLevel - 1].push(currNode.value.left.value);
        queue.enqueue({ value: currNode.value.left, priority: currLevel - 1 });
      }
      if (currNode.value.right) {
        if (!memo[currLevel + 1]) memo[currLevel + 1] = [];
        memo[currLevel + 1].push(currNode.value.right.value);
        queue.enqueue({ value: currNode.value.right, priority: currLevel + 1 });
      }
    }
    return memo;
  };

// Time: O(n) best case with DLL
// Space: O(n)
function getTopView(tree) {
  const memo = {};
  tree.verticalOrderTraversalUtil(tree.root, memo); // O(n) best case with DLL
  const result = [];
  const keysArr = Object.keys(memo);
  console.log(memo);
  // O(d->n)
  let min = 0;
  let max = 0;
  keysArr.forEach((key) => {
    if (min > key) min = +key;
    if (max < key) max = +key;
  });

  let curr = min;
  while (curr <= max) { // O(d->n)
    result.push(memo[curr][0]);
    curr += 1;
  }


  return result;
}

// // test 1 - https://www.geeksforgeeks.org/print-nodes-top-view-binary-tree/
// const tree = new BinaryTree();
// tree.root = new Node(1);
// tree.root.left = new Node(2);
// tree.root.left.left = new Node(4);
// tree.root.left.right = new Node(5);
// tree.root.right = new Node(3);
// tree.root.right.left = new Node(6);
// tree.root.right.right = new Node(7);
// // console.log(tree.root);
// console.log(getTopView(tree));

// test 2 - https://www.geeksforgeeks.org/print-nodes-top-view-binary-tree/
const tree = new BinaryTree();
tree.root = new Node(1);
tree.root.left = new Node(2);
tree.root.left.right = new Node(4);
tree.root.left.right.right = new Node(5);
tree.root.left.right.right.right = new Node(6);

tree.root.right = new Node(3);
// console.log(tree.root);
console.log(getTopView(tree));
